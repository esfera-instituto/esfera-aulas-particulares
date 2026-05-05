import { createClient } from "@supabase/supabase-js";
import StatusButtons from "./StatusButtons";

export const dynamic = "force-dynamic";

type Props = {
  params: { id: string };
};

export default async function LeadDetalhe({ params }: Props) {
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );

  const { data: lead, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !lead) {
    return <div>Lead não encontrado</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Detalhe do Lead</h1>

      <p><strong>Nome:</strong> {lead.nome}</p>
      <p><strong>WhatsApp:</strong> {lead.whatsapp}</p>
      <p><strong>Nível:</strong> {lead.nivel_ensino}</p>
      <p><strong>Instituição:</strong> {lead.instituicao}</p>
      <p><strong>Status:</strong> {lead.status}</p>
      <p>
        <strong>Data:</strong>{" "}
        {new Date(lead.created_at).toLocaleString("pt-BR")}
      </p>

      <StatusButtons leadId={lead.id} />
    </div>
  );
}