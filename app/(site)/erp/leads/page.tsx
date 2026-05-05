import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  created_at: string;
  nome: string;
  whatsapp: string;
  nivel_ensino: string | null;
  instituicao: string | null;
  disciplina: string | null;
  origem: string | null;
  status: string | null;
  observacoes: string | null;
};

function formatarData(data: string) {
  return new Date(data).toLocaleString("pt-BR");
}

export default async function LeadsPage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const statusFiltro = searchParams?.status || "todos";

  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );

  let query = supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (statusFiltro !== "todos") {
    query = query.eq("status", statusFiltro);
  }

  const { data: leads, error } = await query;

  if (error) {
    return <div>Erro ao carregar leads</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>ERP ESFERA - Leads</h1>

      <div style={{ marginBottom: 20 }}>
        <a href="/erp/leads">Todos</a>{" | "}
        <a href="/erp/leads?status=novo">Novo</a>{" | "}
        <a href="/erp/leads?status=em_contato">Em atendimento</a>{" | "}
        <a href="/erp/leads?status=convertido">Convertido</a>{" | "}
        <a href="/erp/leads?status=perdido">Perdido</a>
      </div>

      <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>WhatsApp</th>
            <th>Nível</th>
            <th>Instituição</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {leads?.map((lead: Lead) => (
            <tr key={lead.id}>
              <td>
                <a href={`/erp/leads/${lead.id}`}>{lead.nome}</a>
              </td>
              <td>{lead.whatsapp}</td>
              <td>{lead.nivel_ensino}</td>
              <td>{lead.instituicao}</td>
              <td>
                <span
                  style={{
                    color:
                      lead.status === "novo"
                        ? "orange"
                        : lead.status === "em_contato"
                        ? "blue"
                        : lead.status === "convertido"
                        ? "green"
                        : lead.status === "perdido"
                        ? "red"
                        : "black",
                    fontWeight: "bold",
                  }}
                >
                  {lead.status}
                </span>
              </td>
              <td>{formatarData(lead.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}