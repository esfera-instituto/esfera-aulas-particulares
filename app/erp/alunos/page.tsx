import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type Aluno = {
  id: string;
  created_at: string;
  nome: string;
  whatsapp: string;
  nivel_ensino: string | null;
  instituicao: string | null;
  status: string | null;
  email: string | null;
};

function formatarData(data: string) {
  return new Date(data).toLocaleString("pt-BR");
}

export default async function AlunosPage() {
  const supabase = createClient(
    process.env.SUPABASE_URL as string,
    process.env.SUPABASE_SERVICE_ROLE_KEY as string
  );

  const { data: alunos, error } = await supabase
    .from("alunos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div>Erro ao carregar alunos</div>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>ERP ESFERA - Alunos</h1>

      <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>WhatsApp</th>
            <th>Nível</th>
            <th>Instituição</th>
            <th>Status</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {alunos?.map((aluno: Aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.email ?? "-"}</td>
              <td>{aluno.whatsapp}</td>
              <td>{aluno.nivel_ensino ?? "-"}</td>
              <td>{aluno.instituicao ?? "-"}</td>
              <td>{aluno.status ?? "-"}</td>
              <td>{formatarData(aluno.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}