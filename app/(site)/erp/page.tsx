import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Lead = {
  id: string;
  status: string | null;
};

function contarPorStatus(leads: Lead[], status: string) {
  return leads.filter((lead) => lead.status === status).length;
}

export default async function ErpPage() {
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );

  const { data: leads, error } = await supabase
    .from("leads")
    .select("id, status");

  if (error || !leads) {
    return <div style={{ padding: 20 }}>Erro ao carregar painel do ERP.</div>;
  }

  const total = leads.length;
  const novos = contarPorStatus(leads, "novo");
  const emContato = contarPorStatus(leads, "em_contato");
  const convertidos = contarPorStatus(leads, "convertido");
  const perdidos = contarPorStatus(leads, "perdido");

  return (
    <div style={{ padding: 20 }}>
      <h1>ERP ESFERA</h1>
      <p style={{ marginBottom: 20 }}>Painel inicial</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 16,
          marginBottom: 30,
        }}
      >
        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
          <strong>Total de leads</strong>
          <div style={{ fontSize: 28, marginTop: 10 }}>{total}</div>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
          <strong>Novos</strong>
          <div style={{ fontSize: 28, marginTop: 10, color: "orange" }}>{novos}</div>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
          <strong>Em atendimento</strong>
          <div style={{ fontSize: 28, marginTop: 10, color: "blue" }}>{emContato}</div>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
          <strong>Convertidos</strong>
          <div style={{ fontSize: 28, marginTop: 10, color: "green" }}>{convertidos}</div>
        </div>

        <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
          <strong>Perdidos</strong>
          <div style={{ fontSize: 28, marginTop: 10, color: "red" }}>{perdidos}</div>
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href="/erp/leads">Ver todos os leads</a>
        <a href="/erp/leads?status=novo">Leads novos</a>
        <a href="/erp/leads?status=em_contato">Em atendimento</a>
        <a href="/erp/leads?status=convertido">Convertidos</a>
        <a href="/erp/leads?status=perdido">Perdidos</a>
      </div>
    </div>
  );
}