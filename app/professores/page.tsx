import { Grid } from "@/components/ui/Grid";
import { Section } from "@/components/ui/Section";
import { professores } from "@/data/professores";

export default function ProfessoresPage() {
  return (
    <Section
      title="Equipe docente"
      description="Equipe docente com atuação em diferentes disciplinas e níveis de ensino, em alinhamento com a proposta pedagógica do ESFERA."
    >
      <Grid>
        {professores.map((professor) => (
          <article
            key={professor.id}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
          >
            <img
              src={professor.imagem}
              alt={professor.nome}
              className="h-72 w-full object-cover"
            />

            <div className="p-5">
              <h3 className="text-lg font-semibold text-marinho">
                {professor.nome}
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500">
                {professor.area}
              </p>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                {professor.descricao}
              </p>
            </div>
          </article>
        ))}
      </Grid>
    </Section>
  );
}
