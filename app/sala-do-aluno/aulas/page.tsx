"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AlunoVinculado = { id: string; nome: string };

type Aula = {
  id: string;
  data_hora: string;
  disciplina: string | null;
  local: string | null;
  status: string;
  duracao_minutos_real: number | null;
  aluno_id: string | null;
  quantidade_alunos: number;
  local_rua: string | null;
  local_numero: string | null;
  local_complemento: string | null;
  local_bairro: string | null;
  local_cidade: string | null;
  local_estado: string | null;
  alunos?: { nome: string };
  professores?: { nome: string; telefone: string | null };
};

const LABEL_LOCAL: Record<string, string> = {
  online: "On-line",
  espaco_esfera: "Presencial — Espaço ESFERA",
  domicilio: "Presencial — Domicílio",
};

const LABEL_STATUS: Record<string, string> = {
  solicitada: "Solicitada",
  agendada: "Agendada",
  confirmada: "Confirmada",
  realizada: "Realizada",
  paga: "Realizada",
  cancelada: "Cancelada",
};

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

function formatarDataHora(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatarDuracao(minutos: number) {
  const h = Math.floor(minutos / 60);
  const m = minutos % 60;
  if (h === 0) return `${m}min`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}min`;
}

function formatarTelefone(tel: string) {
  const digitos = tel.replace(/\D/g, "");
  if (digitos.length === 11) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 3)} ${digitos.slice(3, 7)}-${digitos.slice(7)}`;
  }
  return tel;
}

function formatarLocalTexto(aula: {
  local: string | null;
  local_rua: string | null;
  local_numero: string | null;
  local_complemento: string | null;
  local_bairro: string | null;
  local_cidade: string | null;
  local_estado: string | null;
}) {
  if (aula.local === "domicilio" && aula.local_rua) {
    const numero = aula.local_numero || "s/n";
    const complemento = aula.local_complemento
      ? ` - ${aula.local_complemento}`
      : "";
    return `Presencial — ${aula.local_rua}, ${numero}${complemento} — ${aula.local_bairro}, ${aula.local_cidade}/${aula.local_estado}`;
  }
  return LABEL_LOCAL[aula.local || ""] || "—";
}

const CAMPOS_AULA =
  "id, data_hora, disciplina, local, status, duracao_minutos_real, aluno_id, quantidade_alunos, local_rua, local_numero, local_complemento, local_bairro, local_cidade, local_estado, alunos(nome), professores(nome, telefone)";

export default function AulasAlunoPage() {
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [alunos, setAlunos] = useState<AlunoVinculado[]>([]);
  const [alunoAtivoId, setAlunoAtivoId] = useState<string | null>(null);

  const [proximas, setProximas] = useState<Aula[]>([]);
  const [historico, setHistorico] = useState<Aula[]>([]);
  const [colegasPorAula, setColegasPorAula] = useState<
    Record<string, string[]>
  >({});
  const [carregando, setCarregando] = useState(false);

  const [proximasExpandidas, setProximasExpandidas] = useState(false);
  const [filtroInicio, setFiltroInicio] = useState("");
  const [filtroFim, setFiltroFim] = useState("");
  const [quantidadeExibida, setQuantidadeExibida] = useState(15);

  useEffect(() => {
    async function verificarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setAuthUserId(session?.user?.id || null);
      setCarregandoSessao(false);
    }
    verificarSessao();
  }, []);

  useEffect(() => {
    if (!authUserId) return;
    async function carregarAlunos() {
      const { data } = await supabase
        .from("acessos_aluno")
        .select("aluno_id, alunos(nome)")
        .eq("auth_user_id", authUserId);

      const vistos = new Set<string>();
      const lista: AlunoVinculado[] = [];
      (data || []).forEach((d: any) => {
        if (!d.aluno_id || vistos.has(d.aluno_id)) return;
        vistos.add(d.aluno_id);
        lista.push({ id: d.aluno_id, nome: d.alunos?.nome || "—" });
      });

      setAlunos(lista);
      if (lista.length > 0) setAlunoAtivoId(lista[0].id);
    }
    carregarAlunos();
  }, [authUserId]);

  useEffect(() => {
    if (alunoAtivoId) carregarAulas(alunoAtivoId);
  }, [alunoAtivoId]);

  async function idsRelevantes(alunoId: string) {
    const { data: participacoes } = await supabase
      .from("aula_alunos")
      .select("aula_id")
      .eq("aluno_id", alunoId);
    return (participacoes || []).map((p) => p.aula_id);
  }

  async function carregarColegas(aulas: Aula[], alunoAtualId: string) {
    const aulasGrupo = aulas.filter((a) => a.quantidade_alunos > 1);
    if (aulasGrupo.length === 0) {
      setColegasPorAula({});
      return;
    }

    const mapa: Record<string, string[]> = {};

    await Promise.all(
      aulasGrupo.map(async (a) => {
        const { data } = await supabase.rpc("nomes_colegas_aula", {
          p_aula_id: a.id,
          p_aluno_id: alunoAtualId,
        });
        mapa[a.id] = (data || []).map((d: { nome: string }) => d.nome);
      }),
    );

    setColegasPorAula(mapa);
  }

  async function carregarAulas(alunoId: string) {
    setCarregando(true);
    const agora = new Date().toISOString();
    const idsGrupo = await idsRelevantes(alunoId);

    const { data: principaisFuturas } = await supabase
      .from("aulas")
      .select(CAMPOS_AULA)
      .eq("aluno_id", alunoId)
      .in("status", ["solicitada", "agendada", "confirmada"])
      .gte("data_hora", agora);

    let grupoFuturas: any[] = [];
    if (idsGrupo.length > 0) {
      const { data } = await supabase
        .from("aulas")
        .select(CAMPOS_AULA)
        .in("id", idsGrupo)
        .in("status", ["solicitada", "agendada", "confirmada"])
        .gte("data_hora", agora);
      grupoFuturas = data || [];
    }

    const todasFuturas = [
      ...((principaisFuturas as unknown as Aula[]) || []),
      ...(grupoFuturas as Aula[]),
    ].sort(
      (a, b) =>
        new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime(),
    );
    setProximas(todasFuturas);

    const { data: principaisPassadas } = await supabase
      .from("aulas")
      .select(CAMPOS_AULA)
      .eq("aluno_id", alunoId)
      .in("status", ["realizada", "paga", "cancelada"]);

    let grupoPassadas: any[] = [];
    if (idsGrupo.length > 0) {
      const { data } = await supabase
        .from("aulas")
        .select(CAMPOS_AULA)
        .in("id", idsGrupo)
        .in("status", ["realizada", "paga", "cancelada"]);
      grupoPassadas = data || [];
    }

    const todasPassadas = [
      ...((principaisPassadas as unknown as Aula[]) || []),
      ...(grupoPassadas as Aula[]),
    ].sort(
      (a, b) =>
        new Date(b.data_hora).getTime() - new Date(a.data_hora).getTime(),
    );
    setHistorico(todasPassadas);

    await carregarColegas([...todasFuturas, ...todasPassadas], alunoId);

    setCarregando(false);
  }

  useEffect(() => {
    setQuantidadeExibida(15);
  }, [filtroInicio, filtroFim]);

  const historicoFiltrado = historico.filter((a) => {
    const data = a.data_hora.slice(0, 10);
    if (filtroInicio && data < filtroInicio) return false;
    if (filtroFim && data > filtroFim) return false;
    return true;
  });
  const historicoExibido = historicoFiltrado.slice(0, quantidadeExibida);

  const LIMITE_PROXIMAS = 2;
  const proximasExibidas = proximasExpandidas
    ? proximas
    : proximas.slice(0, LIMITE_PROXIMAS);
  const proximasRestantes = proximas.length - LIMITE_PROXIMAS;

  function CardAula({ aula }: { aula: Aula }) {
    const colegas = colegasPorAula[aula.id] || [];
    return (
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <p className="text-sm font-semibold text-[#08364E]">
          {formatarDataHora(aula.data_hora)}
        </p>
        <p className="text-sm text-gray-600 mt-1">
          {aula.disciplina || "—"}
          {aula.professores?.nome && ` · com ${aula.professores.nome}`}
        </p>
        {aula.quantidade_alunos > 1 && (
          <div className="bg-blue-50 rounded-lg px-3 py-2 mt-2">
            <p className="text-xs text-blue-700 font-medium">
              Aula em grupo ({aula.quantidade_alunos} aluno(a)s)
            </p>
            {colegas.length > 0 && (
              <p className="text-xs text-blue-600 mt-0.5">
                Com: {colegas.join(", ")}
              </p>
            )}
          </div>
        )}
        <p className="text-xs text-gray-400 mt-1">
          {formatarLocalTexto(aula)} ·{" "}
          <span
            className={
              aula.status === "cancelada"
                ? "text-red-600 font-semibold"
                : undefined
            }
          >
            {LABEL_STATUS[aula.status] || aula.status}
          </span>
          {aula.duracao_minutos_real &&
            ` · ${formatarDuracao(aula.duracao_minutos_real)}`}
        </p>
        {aula.professores?.telefone && (
          <a
            href={`https://wa.me/55${aula.professores.telefone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-green-700 font-medium hover:underline mt-2"
          >
            📞 {formatarTelefone(aula.professores.telefone)} (WhatsApp)
          </a>
        )}
      </div>
    );
  }

  if (carregandoSessao) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-sm text-gray-400">Carregando...</p>
      </div>
    );
  }

  const alunoAtivo = alunos.find((a) => a.id === alunoAtivoId);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#08364E] text-white px-6 py-4 flex items-center gap-3">
        <a
          href="/sala-do-aluno"
          className="text-white/60 hover:text-white text-sm"
        >
          &larr; Sala do(a) Aluno(a)
        </a>
        <span className="text-white/30">/</span>
        <span className="text-sm font-medium">Aulas</span>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-8">
        {alunos.length > 1 && (
          <div className="flex gap-2 mb-6 flex-wrap">
            {alunos.map((a) => (
              <button
                key={a.id}
                onClick={() => setAlunoAtivoId(a.id)}
                className={`px-4 py-2 rounded-lg text-sm border transition-all ${
                  alunoAtivoId === a.id
                    ? "bg-[#08364E] text-white border-[#08364E]"
                    : "bg-white text-gray-600 border-gray-200"
                }`}
              >
                {a.nome}
              </button>
            ))}
          </div>
        )}

        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Aulas de {alunoAtivo?.nome || "—"}
        </h1>

        {carregando ? (
          <p className="text-sm text-gray-400">Carregando...</p>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Próximas aulas
              </h2>
              {proximas.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Nenhuma aula agendada no momento.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {proximasExibidas.map((a) => (
                    <CardAula key={a.id} aula={a} />
                  ))}
                  {proximasRestantes > 0 && !proximasExpandidas && (
                    <button
                      onClick={() => setProximasExpandidas(true)}
                      className="text-xs text-[#08364E] font-medium hover:underline text-center py-2"
                    >
                      ver mais {proximasRestantes} aula
                      {proximasRestantes !== 1 ? "s" : ""}
                    </button>
                  )}
                  {proximasExpandidas && proximas.length > LIMITE_PROXIMAS && (
                    <button
                      onClick={() => setProximasExpandidas(false)}
                      className="text-xs text-gray-400 hover:text-gray-600 text-center py-2"
                    >
                      ver menos
                    </button>
                  )}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Histórico
              </h2>
              <div className="flex items-end gap-2 mb-4 flex-wrap">
                <div>
                  <label className="text-[10px] text-gray-400 block">De</label>
                  <input
                    type="date"
                    value={filtroInicio}
                    onChange={(e) => setFiltroInicio(e.target.value)}
                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#08364E]"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-400 block">Até</label>
                  <input
                    type="date"
                    value={filtroFim}
                    onChange={(e) => setFiltroFim(e.target.value)}
                    className="border border-gray-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#08364E]"
                  />
                </div>
                {(filtroInicio || filtroFim) && (
                  <button
                    onClick={() => {
                      setFiltroInicio("");
                      setFiltroFim("");
                    }}
                    className="text-xs text-gray-400 hover:text-gray-600 underline mb-1"
                  >
                    limpar
                  </button>
                )}
              </div>

              {historicoFiltrado.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Nenhuma aula no período selecionado.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {historicoExibido.map((a) => (
                    <CardAula key={a.id} aula={a} />
                  ))}
                  {historicoFiltrado.length > quantidadeExibida && (
                    <button
                      onClick={() => setQuantidadeExibida((q) => q + 15)}
                      className="text-xs text-[#08364E] font-medium hover:underline text-center py-2"
                    >
                      Ver mais
                    </button>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
