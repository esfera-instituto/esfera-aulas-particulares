"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RedefinirSenhaAlunoPage() {
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);

  async function redefinir() {
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
      setErro("Erro ao redefinir: " + error.message);
      return;
    }
    setSucesso(true);
    setTimeout(() => {
      window.location.href = "/sala-do-aluno";
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#08364E] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h1 className="text-lg font-semibold text-white mb-1">
            Criar nova senha
          </h1>
          <p className="text-sm text-white/50 mb-6">
            Defina sua nova senha de acesso.
          </p>

          {sucesso ? (
            <p className="text-green-300 text-sm bg-green-500/10 rounded-lg px-4 py-3">
              ✓ Senha redefinida! Redirecionando...
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="password"
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                placeholder="Nova senha"
                className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/50"
              />
              <input
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="Confirmar nova senha"
                className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/50"
              />
              {erro && <p className="text-red-400 text-xs">{erro}</p>}
              <button
                onClick={redefinir}
                disabled={salvando}
                className="w-full bg-[#1566A0] hover:bg-[#1A7FBA] text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {salvando ? "Salvando..." : "Redefinir senha"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
