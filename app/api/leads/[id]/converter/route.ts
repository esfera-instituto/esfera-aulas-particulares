import { createClient } from "@supabase/supabase-js";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );

  try {
    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .select("*")
      .eq("id", params.id)
      .single();

    if (leadError || !lead) {
      return Response.json(
        { ok: false, message: "Lead não encontrado." },
        { status: 404 }
      );
    }

    const { error: alunoError } = await supabase.from("alunos").insert({
      nome: lead.nome,
      whatsapp: lead.whatsapp,
      nivel_ensino: lead.nivel_ensino,
      instituicao: lead.instituicao,
      origem_lead_id: lead.id,
      status: "ativo",
      responsavel_financeiro: null,
      forma_pagamento: null,
      endereco: null,
      observacoes: null,
    });

    if (alunoError) {
      console.error("ERRO AO CRIAR ALUNO:", alunoError);
      return Response.json(
        { ok: false, message: "Erro ao criar aluno." },
        { status: 500 }
      );
    }

    const { error: updateLeadError } = await supabase
      .from("leads")
      .update({ status: "convertido" })
      .eq("id", lead.id);

    if (updateLeadError) {
      console.error("ERRO AO ATUALIZAR LEAD:", updateLeadError);
      return Response.json(
        { ok: false, message: "Aluno criado, mas lead não foi atualizado." },
        { status: 500 }
      );
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error("ERRO GERAL:", error);
    return Response.json(
      { ok: false, message: "Erro interno." },
      { status: 500 }
    );
  }
}