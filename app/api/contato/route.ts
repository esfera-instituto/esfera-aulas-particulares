import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("BODY RECEBIDO:", body);

    const { nome, whatsapp, nivel, instituicao, disciplina, origem } = body;

    if (!nome || !whatsapp || !nivel || !instituicao) {
      return Response.json(
        { ok: false, message: "Preencha os campos obrigatórios." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.from("leads").insert({
      nome,
      whatsapp,
      nivel_ensino: nivel,
      instituicao,
      disciplina: disciplina || null,
      origem: origem || "site",
      status: "novo",
      observacoes: null,
    });

    console.log("INSERT DATA:", data);
    console.log("INSERT ERROR:", error);

    if (error) {
      return Response.json(
        { ok: false, message: "Erro ao salvar lead.", detail: error.message },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      message: "Solicitação enviada com sucesso.",
    });
  } catch (error) {
    console.error("ERRO GERAL:", error);
    return Response.json(
      { ok: false, message: "Erro interno do servidor." },
      { status: 500 }
    );
  }
}