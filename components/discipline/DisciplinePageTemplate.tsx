import { CTABox } from "@/components/ui/CTABox";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Section } from "@/components/ui/Section";
import { getMateriaisByFiltro } from "@/data/materiais";
import { Disciplina, NivelEnsino } from "@/lib/types";

interface DisciplinePageTemplateProps {
  nivel: NivelEnsino;
  disciplina: Disciplina;
}

export const DisciplinePageTemplate = ({ nivel, disciplina }: DisciplinePageTemplateProps) => {
  const resumos = getMateriaisByFiltro(nivel.slug, disciplina.slug, "resumo");
  const listas = getMateriaisByFiltro(nivel.slug, disciplina.slug, "lista");

  return (
    <>
      <section className="bg-white py-16">
        <Container>
          <h1 className="max-w-3xl text-3xl font-semibold text-marinho sm:text-4xl">
            Aulas particulares de {disciplina.nome} para {nivel.nome}
          </h1>
          <p className="mt-4 max-w-3xl text-slate-600">
            O ESFERA organiza o conteúdo por objetivos acadêmicos, com apoio para o aluno ou a aluna compreender conceitos e avançar com autonomia.
          </p>
        </Container>
      </section>

      <Section title="Resumos teóricos" description="Materiais de apoio gratuitos vinculados à disciplina.">
        <Grid>
          {resumos.map((material) => (
            <Card key={material.id} title={material.titulo} meta="Resumo teórico" href={material.pdfUrl} actionLabel="Abrir PDF" />
          ))}
        </Grid>
      </Section>

      <Section title="Listas de exercícios" className="bg-white">
        <Grid>
          {listas.map((material) => (
            <Card key={material.id} title={material.titulo} meta="Lista de exercícios" href={material.pdfUrl} actionLabel="Abrir PDF" />
          ))}
        </Grid>
      </Section>

      <Section>
        <CTABox
          title="Deseja iniciar o acompanhamento?"
          description="Converse com a equipe do ESFERA para definir formato de atendimento, ritmo e disciplina prioritária."
          href={`/contato?nivel=${nivel.slug}&disciplina=${disciplina.slug}&origem=/${nivel.slug}/${disciplina.slug}`}
          buttonLabel="Falar com a equipe do ESFERA"
        />
      </Section>
    </>
  );
};
