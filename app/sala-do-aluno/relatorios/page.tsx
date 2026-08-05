"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AlunoVinculado = { id: string; nome: string };

type Relatorio = {
  id: string;
  tema_aula: string | null;
  resumo_desempenho_familia: string | null;
  resumo_tarefas_familia: string | null;
  aulas?: { data_hora: string; disciplina: string | null };
};

function formatarData(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR");
}

export default function RelatoriosAlunoPage() {
  const [carregandoSessao, setCarregandoSessao] = useState(true);
  const [authUserId, setAuthUserId] = useState<string | null>(null);
  const [alunos, setAlunos] = useState<AlunoVinculado[]>([]);
  const [alunoAtivoId, setAlunoAtivoId] = useState<string | null>(null);

  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);
  const [carregando, setCarregando] = useState(false);
  const [expandidoId, setExpandidoId] = useState<string | null>(null);

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
      const lista: AlunoVinculado[] = (data || [])
        .filter((d: any) => d.aluno_id)
        .map((d: any) => ({ id: d.aluno_id, nome: d.alunos?.nome || "—" }));
      setAlunos(lista);
      if (lista.length > 0) setAlunoAtivoId(lista[0].id);
    }
    carregarAlunos();
  }, [authUserId]);

  useEffect(() => {
    if (alunoAtivoId) carregarRelatorios(alunoAtivoId);
  }, [alunoAtivoId]);

  async function carregarRelatorios(alunoId: string) {
    setCarregando(true);
    const { data } = await supabase
      .from("relatorios_pedagogicos")
      .select(
        "id, tema_aula, resumo_desempenho_familia, resumo_tarefas_familia, aulas!inner(aluno_id, data_hora, disciplina)",
      )
      .eq("aulas.aluno_id", alunoId)
      .order("data_hora", { foreignTable: "aulas", ascending: false });
    setRelatorios((data as unknown as Relatorio[]) || []);
    setCarregando(false);
  }

  useEffect(() => {
    setQuantidadeExibida(15);
  }, [filtroInicio, filtroFim]);

  const filtrados = relatorios.filter((r) => {
    const data = r.aulas?.data_hora.slice(0, 10) || "";
    if (filtroInicio && data < filtroInicio) return false;
    if (filtroFim && data > filtroFim) return false;
    return true;
  });
  const exibidos = filtrados.slice(0, quantidadeExibida);

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
        <span className="text-sm font-medium">Relatórios</span>
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
          Relatórios de {alunoAtivo?.nome || "—"}
        </h1>

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

        {carregando ? (
          <p className="text-sm text-gray-400">Carregando...</p>
        ) : filtrados.length === 0 ? (
          <p className="text-sm text-gray-400">
            Nenhum relatório encontrado no período.
          </p>
        ) : (
          <div className="flex flex-col gap-2">
            {exibidos.map((r) => {
              const aberto = expandidoId === r.id;
              return (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100"
                >
                  <button
                    onClick={() => setExpandidoId(aberto ? null : r.id)}
                    className="w-full text-left"
                  >
                    <p className="text-xs text-gray-400">
                      {r.aulas?.data_hora
                        ? formatarData(r.aulas.data_hora)
                        : ""}
                    </p>
                    <p className="text-sm font-medium text-[#08364E]">
                      {r.tema_aula || r.aulas?.disciplina || "—"}
                    </p>
                  </button>
                  {aberto && (
                    <div className="mt-3 flex flex-col gap-3 border-t border-gray-100 pt-3">
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          Como foi
                        </p>
                        <p className="text-sm text-gray-700">
                          {r.resumo_desempenho_familia ||
                            "Ainda sem resumo disponível."}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 font-medium mb-1">
                          Tarefas e sugestões
                        </p>
                        <p className="text-sm text-gray-700">
                          {r.resumo_tarefas_familia ||
                            "Nenhuma tarefa registrada."}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {filtrados.length > quantidadeExibida && (
              <button
                onClick={() => setQuantidadeExibida((q) => q + 15)}
                className="text-xs text-[#08364E] font-medium hover:underline text-center py-2"
              >
                Ver mais
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
