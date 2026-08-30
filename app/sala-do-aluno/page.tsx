"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { valorClienteAula, type AulaPreco } from "@/lib/precoUtils";

type AlunoVinculado = { id: string; nome: string };

type ProximaAula = {
  id: string;
  data_hora: string;
  disciplina: string | null;
  local: string | null;
  status: string;
  aluno_id: string | null;
  quantidade_alunos: number;
  local_rua: string | null;
  local_numero: string | null;
  local_complemento: string | null;
  local_bairro: string | null;
  local_cidade: string | null;
  local_estado: string | null;
  professores?: { nome: string; telefone: string | null };
};

type RelatorioFamilia = {
  id: string;
  tema_aula: string | null;
  resumo_desempenho_familia: string | null;
  resumo_tarefas_familia: string | null;
  aulas?: { data_hora: string; disciplina: string | null };
};

type Cobranca = {
  id: string;
  data_inicio: string;
  data_fim: string;
  valor_total: number;
  status: string;
  criado_em: string;
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

function formatarMoeda(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarTelefone(tel: string) {
  const digitos = tel.replace(/\D/g, "");
  if (digitos.length === 11) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 3)} ${digitos.slice(3, 7)}-${digitos.slice(7)}`;
  }
  if (digitos.length === 10) {
    return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  }
  return tel;
}

const LABEL_LOCAL: Record<string, string> = {
  online: "On-line",
  espaco_esfera: "Presencial — Espaço ESFERA",
  domicilio: "Presencial — Domicílio",
};

const LABEL_STATUS_AULA: Record<string, string> = {
  solicitada: "Solicitada",
  agendada: "Agendada",
  confirmada: "Confirmada",
};

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

const CAMPOS_PROXIMA_AULA =
  "id, data_hora, disciplina, local, status, aluno_id, quantidade_alunos, local_rua, local_numero, local_complemento, local_bairro, local_cidade, local_estado, professores(nome, telefone)";

type AulaDashboard = AulaPreco & {
  id: string;
  data_hora: string;
  disciplina: string | null;
  status: string;
  forma_cobranca: string | null;
  professor_id: string | null;
  pagavel_apesar_cancelamento: boolean;
  professores?: { nome: string };
};

type Pacote = {
  id: string;
  horas_totais: number;
  horas_utilizadas: number;
  status: string;
  data_validade: string | null;
  dias_validade: number;
};

const CORES_ALUNO = { horas: "#0A4A7A", gasto: "#D97706", real: "#16A34A" };

function formatarMoedaAluno(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatarNumeroPtBrAluno(v: number, casas = 1) {
  return v.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: casas });
}

function primeiroDiaMesAluno() {
  const hoje = new Date();
  return new Date(hoje.getFullYear(), hoje.getMonth(), 1).toISOString().slice(0, 10);
}

function ultimoDiaMesAluno() {
  const hoje = new Date();
  return new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0).toISOString().slice(0, 10);
}

function aulaValidaAluno(a: AulaDashboard) {
  return a.status === "realizada" || a.status === "paga" || a.pagavel_apesar_cancelamento;
}

const LABEL_NIVEL_DASH: Record<string, string> = {
  fundamental_1: "Ensino Fundamental I",
  fundamental_2: "Ensino Fundamental II",
  medio: "Ensino Médio",
  superior: "Ensino Superior",
};

function PainelAluno({ alunoId }: { alunoId: string }) {
  const [aulas, setAulas] = useState<AulaDashboard[]>([]);
  const [valorRealPorAula, setValorRealPorAula] = useState<Record<string, number>>({});
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [cobrancasAluno, setCobrancasAluno] = useState<{ valor_total: number; status: string }[]>([]);
  const [carregando, setCarregando] = useState(true);

  const [dataInicio, setDataInicio] = useState(primeiroDiaMesAluno());
  const [dataFim, setDataFim] = useState(ultimoDiaMesAluno());

  useEffect(() => {
    async function carregar() {
      setCarregando(true);

      const { data: participacoes } = await supabase
        .from("aula_alunos")
        .select("aula_id")
        .eq("aluno_id", alunoId);
      const idsGrupo = (participacoes || []).map((p) => p.aula_id);

      const CAMPOS =
        "id, data_hora, disciplina, nivel, local, status, duracao_minutos, duracao_minutos_real, quantidade_alunos, forma_cobranca, professor_id, pagavel_apesar_cancelamento, professores(nome)";

      const { data: principais } = await supabase
        .from("aulas")
        .select(CAMPOS)
        .eq("aluno_id", alunoId)
        .in("status", ["realizada", "paga", "cancelada"]);

      let grupoData: any[] = [];
      if (idsGrupo.length > 0) {
        const { data } = await supabase
          .from("aulas")
          .select(CAMPOS)
          .in("id", idsGrupo)
          .in("status", ["realizada", "paga", "cancelada"]);
        grupoData = data || [];
      }

      const todas = [...((principais as any[]) || []), ...grupoData];
      const unicas = Array.from(new Map(todas.map((a) => [a.id, a])).values()) as AulaDashboard[];
      const validas = unicas.filter(aulaValidaAluno);
      setAulas(validas);

      const idsAulas = validas.map((a) => a.id);
      if (idsAulas.length > 0) {
        const { data: cobradas } = await supabase
          .from("cobranca_aulas")
          .select("aula_id, valor_aula, cobrancas(status)")
          .eq("aluno_id", alunoId)
          .in("aula_id", idsAulas);

        const mapa: Record<string, number> = {};
        (cobradas || []).forEach((c: any) => {
          if (c.cobrancas?.status === "cancelada") return;
          mapa[c.aula_id] = Number(c.valor_aula);
        });
        setValorRealPorAula(mapa);
      } else {
        setValorRealPorAula({});
      }

      const { data: pacotesData } = await supabase
        .from("pacotes_aluno")
        .select("id, horas_totais, horas_utilizadas, status, data_validade, dias_validade")
        .eq("aluno_id", alunoId)
        .eq("status", "ativo");
      setPacotes((pacotesData as Pacote[]) || []);

      const { data: cobrancasData } = await supabase
        .from("cobrancas")
        .select("valor_total, status")
        .eq("aluno_id", alunoId)
        .neq("status", "cancelada");
      setCobrancasAluno(cobrancasData || []);

      setCarregando(false);
    }
    carregar();
  }, [alunoId]);

  function aplicarPreset(preset: "mesAtual" | "mesPassado" | "anoAtual") {
    const hoje = new Date();
    if (preset === "mesAtual") {
      setDataInicio(primeiroDiaMesAluno());
      setDataFim(ultimoDiaMesAluno());
    } else if (preset === "mesPassado") {
      const inicio = new Date(hoje.getFullYear(), hoje.getMonth() - 1, 1);
      const fim = new Date(hoje.getFullYear(), hoje.getMonth(), 0);
      setDataInicio(inicio.toISOString().slice(0, 10));
      setDataFim(fim.toISOString().slice(0, 10));
    } else {
      setDataInicio(`${hoje.getFullYear()}-01-01`);
      setDataFim(`${hoje.getFullYear()}-12-31`);
    }
  }

  const aulasFiltradas = useMemo(() => {
    return aulas.filter((a) => {
      const dia = a.data_hora.slice(0, 10);
      return dia >= dataInicio && dia <= dataFim;
    });
  }, [aulas, dataInicio, dataFim]);

  function paraCentavos(v: number) {
    return Math.round(v * 100);
  }

  function somarEmReaisLocal(valores: number[]) {
    const totalCentavos = valores.reduce((s, v) => s + paraCentavos(v), 0);
    return totalCentavos / 100;
  }

  const valorAPagar = useMemo(() => {
    const aCobrarCentavos = aulas
      .filter((a) => a.forma_cobranca !== "pacote" && valorRealPorAula[a.id] === undefined)
      .reduce((s, a) => s + paraCentavos(valorClienteAula(a)), 0);
    const cobradoPendenteCentavos = cobrancasAluno
      .filter((c) => c.status === "pendente")
      .reduce((s, c) => s + paraCentavos(Number(c.valor_total)), 0);
    return (aCobrarCentavos + cobradoPendenteCentavos) / 100;
  }, [aulas, valorRealPorAula, cobrancasAluno]);

  const valorPago = useMemo(() => {
    const totalCentavos = cobrancasAluno
      .filter((c) => c.status === "paga")
      .reduce((s, c) => s + paraCentavos(Number(c.valor_total)), 0);
    return totalCentavos / 100;
  }, [cobrancasAluno]);

  function gastoRealAula(a: AulaDashboard) {
    if (a.forma_cobranca === "pacote") return valorClienteAula(a);
    if (valorRealPorAula[a.id] !== undefined) return valorRealPorAula[a.id];
    return valorClienteAula(a);
  }

  const horasTotais = aulasFiltradas.reduce(
    (s, a) => s + (a.duracao_minutos_real ?? a.duracao_minutos) / 60,
    0,
  );
  const gastoEstimado = somarEmReaisLocal(aulasFiltradas.map((a) => valorClienteAula(a)));
  const gastoReal = somarEmReaisLocal(aulasFiltradas.map((a) => gastoRealAula(a)));
  const diferenca = Number((gastoEstimado - gastoReal).toFixed(2));

  const horasPorDisciplina = useMemo(() => {
    const mapa: Record<string, number> = {};
    aulasFiltradas.forEach((a) => {
      const chave = a.disciplina || LABEL_NIVEL_DASH[a.nivel] || "—";
      mapa[chave] = (mapa[chave] || 0) + (a.duracao_minutos_real ?? a.duracao_minutos) / 60;
    });
    return Object.entries(mapa)
      .map(([nome, horas]) => ({ nome, horas: Number(horas.toFixed(1)) }))
      .sort((a, b) => b.horas - a.horas)
      .slice(0, 8);
  }, [aulasFiltradas]);

  const horasPorProfessor = useMemo(() => {
    const mapa: Record<string, number> = {};
    aulasFiltradas.forEach((a) => {
      const chave = a.professores?.nome || "—";
      mapa[chave] = (mapa[chave] || 0) + (a.duracao_minutos_real ?? a.duracao_minutos) / 60;
    });
    return Object.entries(mapa)
      .map(([nome, horas]) => ({ nome, horas: Number(horas.toFixed(1)) }))
      .sort((a, b) => b.horas - a.horas)
      .slice(0, 8);
  }, [aulasFiltradas]);

  const comparativoPacoteAvulsa = useMemo(() => {
    const pacote = aulasFiltradas.filter((a) => a.forma_cobranca === "pacote");
    const avulsa = aulasFiltradas.filter((a) => a.forma_cobranca !== "pacote");

    function metricas(lista: AulaDashboard[]) {
      const horas = lista.reduce((s, a) => s + (a.duracao_minutos_real ?? a.duracao_minutos) / 60, 0);
      const gasto = somarEmReaisLocal(lista.map((a) => gastoRealAula(a)));
      const valorPorHora = horas > 0 ? gasto / horas : 0;
      return {
        horas: Number(horas.toFixed(1)),
        gasto: Number(gasto.toFixed(2)),
        valorPorHora: Number(valorPorHora.toFixed(2)),
      };
    }

    return [
      { tipo: "Avulsa", ...metricas(avulsa) },
      { tipo: "Pacote", ...metricas(pacote) },
    ];
  }, [aulasFiltradas, valorRealPorAula]);

  return (
    <div className="mb-8">
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 flex items-end gap-3 flex-wrap">
        <div className="flex gap-2">
          <button onClick={() => aplicarPreset("mesAtual")} className="text-xs px-3 py-2 rounded-lg border border-gray-200 hover:border-[#08364E] text-gray-600">
            Este mês
          </button>
          <button onClick={() => aplicarPreset("mesPassado")} className="text-xs px-3 py-2 rounded-lg border border-gray-200 hover:border-[#08364E] text-gray-600">
            Mês passado
          </button>
          <button onClick={() => aplicarPreset("anoAtual")} className="text-xs px-3 py-2 rounded-lg border border-gray-200 hover:border-[#08364E] text-gray-600">
            Este ano
          </button>
        </div>
        <div className="flex items-end gap-2">
          <div>
            <label className="text-[10px] text-gray-400 block">De</label>
            <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" />
          </div>
          <div>
            <label className="text-[10px] text-gray-400 block">Até</label>
            <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} className="border border-gray-200 rounded-lg px-2 py-1.5 text-xs" />
          </div>
        </div>
      </div>

      {carregando ? (
        <p className="text-sm text-gray-400">Carregando painel...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Valor a pagar</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{formatarMoedaAluno(valorAPagar)}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Valor pago</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{formatarMoedaAluno(valorPago)}</p>
            </div>
          </div>

          {pacotes.length > 0 && (
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-4">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Saldo de pacotes ativos
              </h3>
              <div className="flex flex-col gap-2">
                {pacotes.map((p) => (
                  <div key={p.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                    <span className="text-sm text-gray-700">
                      {p.horas_totais - p.horas_utilizadas}h restantes de {p.horas_totais}h
                    </span>
                    {p.data_validade && (
                      <span className="text-xs text-gray-400">
                        válido até {new Date(p.data_validade + "T00:00:00").toLocaleDateString("pt-BR")}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Aulas realizadas</p>
              <p className="text-2xl font-bold text-[#08364E] mt-1">{formatarNumeroPtBrAluno(horasTotais)}h</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Gasto estimado</p>
              <p className="text-xl font-bold text-gray-500 mt-1">{formatarMoedaAluno(gastoEstimado)}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Gasto real</p>
              <p className="text-xl font-bold text-[#0A4A7A] mt-1">{formatarMoedaAluno(gastoReal)}</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <p className="text-xs text-gray-400 uppercase tracking-wide">Desconto obtido</p>
              <p className="text-xl font-bold text-green-600 mt-1">{formatarMoedaAluno(diferenca)}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Horas por disciplina
              </h3>
              {horasPorDisciplina.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Sem dados no período.</p>
              ) : (
                <ResponsiveContainer width="100%" height={Math.max(180, horasPorDisciplina.length * 32)}>
                  <BarChart data={horasPorDisciplina} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${formatarNumeroPtBrAluno(v)}h`} />
                    <YAxis type="category" dataKey="nome" tick={{ fontSize: 11 }} width={100} />
                    <Tooltip formatter={(v) => `${formatarNumeroPtBrAluno(Number(v))}h`} />
                    <Bar dataKey="horas" fill={CORES_ALUNO.horas} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Horas por professor(a)
              </h3>
              {horasPorProfessor.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Sem dados no período.</p>
              ) : (
                <ResponsiveContainer width="100%" height={Math.max(180, horasPorProfessor.length * 32)}>
                  <BarChart data={horasPorProfessor} layout="vertical" margin={{ left: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                    <XAxis type="number" tick={{ fontSize: 11 }} tickFormatter={(v) => `${formatarNumeroPtBrAluno(v)}h`} />
                    <YAxis type="category" dataKey="nome" tick={{ fontSize: 11 }} width={100} />
                    <Tooltip formatter={(v) => `${formatarNumeroPtBrAluno(Number(v))}h`} />
                    <Bar dataKey="horas" fill={CORES_ALUNO.gasto} radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Aula avulsa vs. Pacote
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {comparativoPacoteAvulsa.map((c) => (
                <div key={c.tipo} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700">{c.tipo}</p>
                  <p className="text-xs text-gray-500 mt-1">{formatarNumeroPtBrAluno(c.horas)}h · {formatarMoedaAluno(c.gasto)}</p>
                  <p className="text-xs text-[#08364E] font-semibold mt-1">
                    {formatarMoedaAluno(c.valorPorHora)}/h em média
                  </p>
                </div>
              ))}
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={comparativoPacoteAvulsa}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="tipo" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `R$${formatarNumeroPtBrAluno(v, 0)}`} />
                <Tooltip formatter={(v) => formatarMoedaAluno(Number(v))} />
                <Bar dataKey="valorPorHora" name="Valor por hora" fill={CORES_ALUNO.real} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}

export default function SalaDoAlunoPage() {
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [sessaoEmail, setSessaoEmail] = useState<string | null>(null);
  const [authUserId, setAuthUserId] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [entrando, setEntrando] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const [alunos, setAlunos] = useState<AlunoVinculado[]>([]);
  const [alunoAtivoId, setAlunoAtivoId] = useState<string | null>(null);
  const [carregandoConteudo, setCarregandoConteudo] = useState(false);

  const [proximaAula, setProximaAula] = useState<ProximaAula | null>(null);
  const [colegasProximaAula, setColegasProximaAula] = useState<string[]>([]);
  const [relatorio, setRelatorio] = useState<RelatorioFamilia | null>(null);
  const [cobrancas, setCobrancas] = useState<Cobranca[]>([]);

  useEffect(() => {
    async function verificarSessao() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSessaoEmail(session?.user?.email || null);
      setAuthUserId(session?.user?.id || null);
      setCarregandoSessao(false);
    }
    verificarSessao();
  }, []);

  useEffect(() => {
    if (authUserId) carregarAlunosVinculados(authUserId);
  }, [authUserId]);

  useEffect(() => {
    if (alunoAtivoId) carregarConteudo(alunoAtivoId);
  }, [alunoAtivoId]);

  async function carregarAlunosVinculados(uid: string) {
    const { data } = await supabase
      .from("acessos_aluno")
      .select("aluno_id, alunos(nome)")
      .eq("auth_user_id", uid);

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

  async function buscarColegasGrupo(aulaId: string, alunoAtualId: string) {
    const { data } = await supabase.rpc("nomes_colegas_aula", {
      p_aula_id: aulaId,
      p_aluno_id: alunoAtualId,
    });
    return (data || []).map((d: { nome: string }) => d.nome);
  }

  async function carregarConteudo(alunoId: string) {
    setCarregandoConteudo(true);

    const agora = new Date().toISOString();

    const { data: aulaPrincipal } = await supabase
      .from("aulas")
      .select(CAMPOS_PROXIMA_AULA)
      .eq("aluno_id", alunoId)
      .in("status", ["solicitada", "agendada", "confirmada"])
      .gte("data_hora", agora)
      .order("data_hora", { ascending: true })
      .limit(1)
      .maybeSingle();

    const { data: participacoes } = await supabase
      .from("aula_alunos")
      .select("aula_id")
      .eq("aluno_id", alunoId);

    let aulaGrupo: any = null;
    const idsGrupo = (participacoes || []).map((p) => p.aula_id);
    if (idsGrupo.length > 0) {
      const { data } = await supabase
        .from("aulas")
        .select(CAMPOS_PROXIMA_AULA)
        .in("id", idsGrupo)
        .in("status", ["solicitada", "agendada", "confirmada"])
        .gte("data_hora", agora)
        .order("data_hora", { ascending: true })
        .limit(1)
        .maybeSingle();
      aulaGrupo = data;
    }

    const candidatas = [aulaPrincipal, aulaGrupo].filter(
      Boolean,
    ) as ProximaAula[];
    candidatas.sort(
      (a, b) =>
        new Date(a.data_hora).getTime() - new Date(b.data_hora).getTime(),
    );
    const aulaEscolhida = candidatas[0] || null;
    setProximaAula(aulaEscolhida);

    if (aulaEscolhida && aulaEscolhida.quantidade_alunos > 1) {
      const colegas = await buscarColegasGrupo(aulaEscolhida.id, alunoId);
      setColegasProximaAula(colegas);
    } else {
      setColegasProximaAula([]);
    }

    const { data: rel } = await supabase
      .from("relatorios_pedagogicos")
      .select(
        "id, tema_aula, resumo_desempenho_familia, resumo_tarefas_familia, aulas!inner(aluno_id, data_hora, disciplina)",
      )
      .eq("aulas.aluno_id", alunoId)
      .order("data_hora", { foreignTable: "aulas", ascending: false })
      .limit(1)
      .maybeSingle();
    setRelatorio((rel as unknown as RelatorioFamilia) || null);

    const { data: cobs } = await supabase
      .from("cobrancas")
      .select("id, data_inicio, data_fim, valor_total, status, criado_em")
      .eq("aluno_id", alunoId)
      .neq("status", "cancelada")
      .order("criado_em", { ascending: false })
      .limit(10);
    setCobrancas((cobs as Cobranca[]) || []);

    setCarregandoConteudo(false);
  }

  async function entrar() {
    setErro("");
    if (!email || !senha) {
      setErro("Informe e-mail e senha.");
      return;
    }
    setEntrando(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });
    setEntrando(false);

    if (error) {
      setErro("E-mail ou senha incorretos.");
      return;
    }

    setSessaoEmail(data.user?.email || null);
    setAuthUserId(data.user?.id || null);
  }

  async function sair() {
    await supabase.auth.signOut();
    setSessaoEmail(null);
    setAuthUserId(null);
    setAlunos([]);
    setAlunoAtivoId(null);
  }

  if (carregandoSessao) {
    return (
      <div className="min-h-screen bg-[#08364E] flex items-center justify-center">
        <p className="text-white/50 text-sm">Carregando...</p>
      </div>
    );
  }

  if (!sessaoEmail) {
    return (
      <div className="min-h-screen bg-[#08364E] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="flex flex-col items-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              className="h-16 w-16"
            >
              <defs>
                <radialGradient
                  id="esferaGrad"
                  cx="38%"
                  cy="33%"
                  r="70%"
                  fx="36%"
                  fy="30%"
                >
                  <stop offset="0%" stopColor="#2A8FC0" />
                  <stop offset="30%" stopColor="#1566A0" />
                  <stop offset="60%" stopColor="#0A4A7A" />
                  <stop offset="85%" stopColor="#083A60" />
                  <stop offset="100%" stopColor="#051E3A" />
                </radialGradient>
              </defs>
              <circle cx="50" cy="50" r="48" fill="url(#esferaGrad)" />
            </svg>
            <p className="mt-3 text-lg font-semibold tracking-widest text-white uppercase">
              Sala do(a) Aluno(a)
            </p>
          </div>

          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-white/60 mb-1 block">
                  E-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/50"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="text-xs text-white/60 mb-1 block">
                  Senha
                </label>
                <div className="relative">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && entrar()}
                    className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 pr-11 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/50"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 text-xs"
                  >
                    {mostrarSenha ? "ocultar" : "ver"}
                  </button>
                </div>
              </div>

              {erro && <p className="text-red-400 text-xs">{erro}</p>}

              <button
                onClick={entrar}
                disabled={entrando}
                className="w-full bg-[#1566A0] hover:bg-[#1A7FBA] text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 mt-2"
              >
                {entrando ? "Entrando..." : "Entrar"}
              </button>

              <a
                href="/sala-do-aluno/esqueci-senha"
                className="text-xs text-white/40 hover:text-white/70 text-center mt-2"
              >
                Esqueci minha senha
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const alunoAtivo = alunos.find((a) => a.id === alunoAtivoId);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#08364E] text-white px-6 py-4 flex items-center justify-between">
        <span className="text-sm font-medium tracking-wide">
          SALA DO(A) ALUNO(A)
        </span>
        <div className="flex items-center gap-4">
          <a
            href="/sala-do-aluno/minha-conta"
            className="text-white/60 hover:text-white text-xs"
          >
            minha conta
          </a>
          <button
            onClick={sair}
            className="text-white/60 hover:text-white text-xs"
          >
            Sair
          </button>
        </div>
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
          Olá, {alunoAtivo?.nome || "aluno(a)"}!
        </h1>

        {alunoAtivoId && <PainelAluno alunoId={alunoAtivoId} />}

        {carregandoConteudo ? (
          <p className="text-sm text-gray-400">Carregando...</p>
        ) : (
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Próxima aula
              </h2>
              {proximaAula ? (
                <div>
                  <p className="text-lg font-semibold text-[#08364E]">
                    {formatarDataHora(proximaAula.data_hora)}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    {proximaAula.disciplina || "—"}
                    {proximaAula.professores?.nome &&
                      ` · com ${proximaAula.professores.nome}`}
                  </p>
                  {proximaAula.quantidade_alunos > 1 && (
                    <div className="bg-blue-50 rounded-lg px-3 py-2 mt-2">
                      <p className="text-xs text-blue-700 font-medium">
                        Aula em grupo ({proximaAula.quantidade_alunos}{" "}
                        aluno(a)s)
                      </p>
                      {colegasProximaAula.length > 0 && (
                        <p className="text-xs text-blue-600 mt-0.5">
                          Com: {colegasProximaAula.join(", ")}
                        </p>
                      )}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {formatarLocalTexto(proximaAula)} ·{" "}
                    {LABEL_STATUS_AULA[proximaAula.status] ||
                      proximaAula.status}
                  </p>
                  {proximaAula.professores?.telefone && (
                    <a
                      href={`https://wa.me/55${proximaAula.professores.telefone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-sm text-green-700 font-medium hover:underline mt-3"
                    >
                      📞 {formatarTelefone(proximaAula.professores.telefone)}{" "}
                      (WhatsApp do professor)
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  Nenhuma aula agendada no momento.
                </p>
              )}
              <a
                href="/sala-do-aluno/aulas"
                className="inline-block text-xs text-[#08364E] font-medium hover:underline mt-4"
              >
                ver todas as aulas →
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Última aula — relatório
              </h2>
              {relatorio ? (
                <div className="flex flex-col gap-4">
                  <p className="text-xs text-gray-400">
                    {relatorio.aulas?.data_hora
                      ? formatarData(relatorio.aulas.data_hora)
                      : ""}{" "}
                    ·{" "}
                    {relatorio.tema_aula || relatorio.aulas?.disciplina || "—"}
                  </p>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Como foi
                    </p>
                    <p className="text-sm text-gray-700">
                      {relatorio.resumo_desempenho_familia ||
                        "Ainda sem resumo disponível."}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Tarefas e sugestões
                    </p>
                    <p className="text-sm text-gray-700">
                      {relatorio.resumo_tarefas_familia ||
                        "Nenhuma tarefa registrada."}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400">
                  Ainda não há relatório disponível.
                </p>
              )}
              <a
                href="/sala-do-aluno/relatorios"
                className="inline-block text-xs text-[#08364E] font-medium hover:underline mt-4"
              >
                ver todos os relatórios →
              </a>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Financeiro
              </h2>
              {cobrancas.length === 0 ? (
                <p className="text-sm text-gray-400">
                  Nenhuma cobrança registrada ainda.
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {cobrancas.map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3"
                    >
                      <div>
                        <p className="text-sm text-gray-700">
                          {formatarData(c.data_inicio + "T00:00:00")} a{" "}
                          {formatarData(c.data_fim + "T00:00:00")}
                        </p>
                        <p className="text-sm font-medium text-gray-800">
                          {formatarMoeda(c.valor_total)}
                        </p>
                      </div>
                      {c.status === "paga" ? (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                          Paga
                        </span>
                      ) : (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full font-medium">
                          Pendente
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
