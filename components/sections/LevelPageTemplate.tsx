import { CTABox } from "@/components/ui/CTABox";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Section } from "@/components/ui/Section";
import { getDisciplinasByNivel } from "@/data/disciplinas";
import { getMateriaisDestaque } from "@/data/materiais";
import { NivelEnsino } from "@/lib/types";

export const LevelPageTemplate = ({ nivel }: { nivel: NivelEnsino }) => {
  const disciplinas = getDisciplinasByNivel(nivel.slug);
  const materiais = getMateriaisDestaque(3).filter((m) => m.nivel === nivel.slug);

  return (
    <>
      <section className="bg-white py-16">
        <Container>
          <h1 className="text-3xl font-semibold text-marinho sm:text-4xl">{nivel.nome}</h1>
          <p className="mt-4 max-w-3xl text-slate-600">{nivel.descricao}</p>
        </Container>
      </section>

      <Section title="Disciplinas disponíveis">
        <Grid>
          {disciplinas.map((disciplina) => (
            <Card
              key={disciplina.id}
              title={disciplina.nome}
              description={disciplina.descricao}
              href={`/${nivel.slug}/${disciplina.slug}`}
              actionLabel="Ver disciplina"
            />
          ))}
        </Grid>
      </Section>

      <Section title="Prévia de materiais" className="bg-white">
        <Grid>
          {materiais.map((material) => (
            <Card
              key={material.id}
              title={material.titulo}
              meta={material.tipo === "resumo" ? "Resumo teórico" : "Lista de exercícios"}
              href={material.pdfUrl}
              actionLabel="Abrir PDF"
            />
          ))}
        </Grid>
      </Section>

      <Section>
        <CTABox
          title="Quer iniciar as aulas deste nível?"
          description="A equipe do ESFERA ajuda a organizar um plano pedagógico com disciplina, frequência e objetivos acadêmicos."
          href={`/contato?nivel=${nivel.slug}&origem=/${nivel.slug}`}
          buttonLabel="Falar com a equipe"
        />
      </Section>
    </>
  );
};
