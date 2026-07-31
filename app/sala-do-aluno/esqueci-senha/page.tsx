"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function EsqueciSenhaAlunoPage() {
  const [email, setEmail] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");
  const [enviado, setEnviado] = useState(false);

  async function enviarLink() {
    setErro("");
    if (!email) {
      setErro("Informe seu e-mail.");
      return;
    }
    setEnviando(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/sala-do-aluno/redefinir-senha`,
    });
    setEnviando(false);

    if (error) {
      setErro("Erro ao enviar: " + error.message);
      return;
    }
    setEnviado(true);
  }

  return (
    <div className="min-h-screen bg-[#08364E] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
          <h1 className="text-lg font-semibold text-white mb-1">
            Esqueci minha senha
          </h1>
          <p className="text-sm text-white/50 mb-6">
            Informe seu e-mail. Vamos enviar um link para criar uma nova senha.
          </p>

          {enviado ? (
            <p className="text-green-300 text-sm bg-green-500/10 rounded-lg px-4 py-3">
              ✓ Se esse e-mail estiver cadastrado, você vai receber um link em
              instantes.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-white/50"
                placeholder="seu@email.com"
              />
              {erro && <p className="text-red-400 text-xs">{erro}</p>}
              <button
                onClick={enviarLink}
                disabled={enviando}
                className="w-full bg-[#1566A0] hover:bg-[#1A7FBA] text-white font-semibold py-3 rounded-lg disabled:opacity-50"
              >
                {enviando ? "Enviando..." : "Enviar link"}
              </button>
              <a
                href="/sala-do-aluno/entrar"
                className="text-xs text-white/40 hover:text-white/70 text-center"
              >
                Voltar ao login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
