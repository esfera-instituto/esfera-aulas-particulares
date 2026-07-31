"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function MinhaContaAlunoPage() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  async function trocarSenha() {
    setErro("");
    if (novaSenha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }
    if (novaSenha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }
    setSalvando(true);
    const { error } = await supabase.auth.updateUser({ password: novaSenha });
    setSalvando(false);

    if (error) {
      setErro("Erro ao trocar senha: " + error.message);
      return;
    }
    setSucesso(true);
    setNovaSenha("");
    setConfirmarSenha("");
  }

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
        <span className="text-sm font-medium">Minha Conta</span>
      </header>

      <main className="max-w-sm mx-auto px-6 py-8">
        <h1 className="text-xl font-semibold text-gray-800 mb-1">
          Trocar senha
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          Escolha uma senha de sua preferência para usar daqui em diante.
        </p>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {sucesso ? (
            <p className="text-green-600 text-sm bg-green-50 rounded-lg px-4 py-3">
              ✓ Senha alterada com sucesso!
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Nova senha
                </label>
                <input
                  type="password"
                  value={novaSenha}
                  onChange={(e) => setNovaSenha(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#08364E]"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Confirmar nova senha
                </label>
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && trocarSenha()}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#08364E]"
                  placeholder="••••••••"
                />
              </div>

              {erro && <p className="text-red-500 text-xs">{erro}</p>}

              <button
                onClick={trocarSenha}
                disabled={salvando}
                className="w-full bg-[#08364E] text-white font-medium py-3 rounded-lg hover:bg-[#0a4a6a] disabled:opacity-50 mt-2"
              >
                {salvando ? "Salvando..." : "Salvar nova senha"}
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
