"use client";

import { FormEvent, useMemo, useState } from "react";
import { niveisEnsino } from "@/data/niveis";

interface ContactFormProps {
  initialNivel?: string;
  initialDisciplina?: string;
  origemPagina?: string;
}

export const ContactForm = ({ initialNivel = "", initialDisciplina = "", origemPagina = "" }: ContactFormProps) => {
  const [mensagem, setMensagem] = useState("");

  const hiddenContext = useMemo(
    () => ({ disciplina: initialDisciplina, origem: origemPagina }),
    [initialDisciplina, origemPagina]
  );

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const form = event.currentTarget;
  const formData = new FormData(form);

  const data = {
    nome: formData.get("nome"),
    whatsapp: formData.get("whatsapp"),
    nivel: formData.get("nivel"),
    instituicao: formData.get("instituicao"),
    disciplina: formData.get("disciplina"),
    origem: formData.get("origemPagina"),
  };

  try {
    const response = await fetch("/api/contato", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setMensagem("Solicitação enviada com sucesso. Em breve entraremos em contato.");
      form.reset();
    } else {
      setMensagem("Erro ao enviar. Tente novamente.");
    }
  } catch (error) {
    setMensagem("Erro de conexão. Tente novamente.");
  }
};

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="nome">Nome</label>
        <input id="nome" name="nome" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="whatsapp">WhatsApp</label>
        <input id="whatsapp" name="whatsapp" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="nivel">Nível de ensino</label>
        <select id="nivel" name="nivel" defaultValue={initialNivel} required className="w-full rounded-lg border border-slate-300 px-3 py-2">
          <option value="" disabled>Selecione</option>
          {niveisEnsino.map((nivel) => (
            <option key={nivel.slug} value={nivel.nome}>{nivel.nome}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700" htmlFor="instituicao">Instituição de ensino</label>
        <input id="instituicao" name="instituicao" required className="w-full rounded-lg border border-slate-300 px-3 py-2" />
      </div>

      <input type="hidden" name="disciplina" value={hiddenContext.disciplina} />
      <input type="hidden" name="origemPagina" value={hiddenContext.origem} />

      <button type="submit" className="w-full rounded-lg bg-marinho px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
        Enviar solicitação
      </button>
      {mensagem && <p className="text-sm text-emerald-700">{mensagem}</p>}
    </form>
  );
};
