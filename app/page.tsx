import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Grid } from "@/components/ui/Grid";
import { Section } from "@/components/ui/Section";
import { CTABox } from "@/components/ui/CTABox";
import { niveisEnsino } from "@/data/niveis";
import { professores } from "@/data/professores";
import { getMateriaisDestaque } from "@/data/materiais";

export default function HomePage() {
  const materiaisDestaque = getMateriaisDestaque(6);
  const whatsappUrl =
    "https://wa.me/5511960338060?text=Olá!%20Gostaria%20de%20informações%20sobre%20as%20aulas%20particulares%20do%20ESFERA.";
  return (
    <>
      <section className="bg-white py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <h1 className="text-3xl font-semibold text-marinho sm:text-4xl">
              Aulas particulares personalizadas para Ensino Fundamental, Médio e
              Superior
            </h1>

            <p className="mt-4 text-slate-600">
              No ESFERA, cada estudante recebe acompanhamento acadêmico
              individualizado, com organização pedagógica por disciplina e
              flexibilidade para atender diferentes necessidades de
              aprendizagem.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/contato?origem=home-hero"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-marinho px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Falar com a equipe do ESFERA
              </Link>
            </div>
          </div>
          <div className="relative h-72 overflow-hidden rounded-2xl">
            <Image
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
              alt="Professor ou professora estudando junto com um(a) estudante"
              fill
              className="object-cover"
              priority
            />
          </div>
        </Container>
      </section>

      <Section title="Níveis de ensino">
        <Grid>
          {niveisEnsino.map((nivel) => (
            <article
              key={nivel.slug}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={nivel.imagem}
                alt={nivel.nome}
                className="h-44 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-marinho">
                  {nivel.nome}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {nivel.descricao}
                </p>

                <Link
                  href={`/${nivel.slug}`}
                  className="mt-4 inline-block text-sm font-medium text-marinho"
                >
                  Saiba mais
                </Link>
              </div>
            </article>
          ))}
        </Grid>
      </Section>

      <Section title="Como funciona o atendimento" className="bg-white">
        <Grid>
          <Card
            title="1. Solicitação de atendimento"
            description="A família ou o estudante entra em contato com o ESFERA e informa as necessidades acadêmicas, disciplina e nível de ensino."
          />

          <Card
            title="2. Análise do caso"
            description="A equipe analisa o perfil do estudante, identifica as necessidades pedagógicas e organiza o encaminhamento adequado."
          />

          <Card
            title="3. Início das aulas"
            description="As aulas começam com acompanhamento pedagógico e organização de materiais de apoio conforme o objetivo do estudante."
          />
        </Grid>
      </Section>

      <Section title="Diferenciais do ESFERA">
        <Grid>
          <Card
            title="Materiais de apoio gratuitos"
            description="O ESFERA disponibiliza resumos teóricos e listas de exercícios organizados por disciplina e nível de ensino."
          />

          <Card
            title="Flexibilidade de atendimento"
            description="As aulas podem ocorrer on-line, no espaço ESFERA ou no local do estudante, conforme a necessidade."
          />

          <Card
            title="Atuação em diferentes níveis de ensino"
            description="O ESFERA oferece acompanhamento para Ensino Fundamental, Médio e Superior, em diferentes disciplinas."
          />

          <Card
            title="Organização pedagógica dos conteúdos"
            description="Os conteúdos são organizados por disciplina e nível de ensino, facilitando o acesso a materiais e exercícios."
          />
        </Grid>
      </Section>

      <Section title="Psicopedagogia" className="bg-white">
        <div className="grid gap-8 lg:grid-cols-2 items-stretch">
          {/* Imagem */}
          <div className="h-full overflow-hidden rounded-2xl border border-slate-200">
            <img
              src="/psicopedagogia/psico.jpg"
              alt="Atendimento psicopedagógico individualizado"
              className="h-full w-full object-cover"
            />
          </div>

          {/* Conteúdo */}
          <div className="h-full rounded-2xl border border-slate-200 bg-white p-8 shadow-sm flex flex-col justify-between">
            <p className="text-slate-700 leading-7">
              O ESFERA oferece acompanhamento psicopedagógico para estudantes
              que enfrentam dificuldades de aprendizagem, organização da rotina
              de estudos ou adaptação acadêmica. Esse suporte contribui para o
              desenvolvimento de estratégias mais adequadas de estudo, maior
              autonomia e melhor aproveitamento escolar.
            </p>

            <ul className="mt-5 space-y-2 text-sm text-slate-600">
              <li>• Organização da rotina de estudos</li>
              <li>• Estratégias de aprendizagem</li>
              <li>• Acompanhamento individualizado</li>
            </ul>

            <Link
              href="/psicopedagogia"
              className="mt-6 inline-flex rounded-lg bg-marinho px-4 py-2 text-sm font-medium text-white"
            >
              Conhecer psicopedagogia
            </Link>
          </div>
        </div>
      </Section>

      <Section title="Equipe docente">
        <Grid>
          {professores.slice(0, 3).map((professor) => (
            <article
              key={professor.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
            >
              <img
                src={professor.imagem}
                alt={professor.nome}
                className="h-56 w-full object-cover object-top"
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

                <Link
                  href="/professores"
                  className="mt-4 inline-block text-sm font-medium text-marinho"
                >
                  Conhecer a equipe
                </Link>
              </div>
            </article>
          ))}
        </Grid>
      </Section>

      <Section title="Materiais de apoio gratuitos" className="bg-white">
        <Grid>
          {materiaisDestaque.map((material) => (
            <article
              key={material.id}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition"
            >
              <img
                src={material.capaUrl}
                alt={material.titulo}
                className="h-40 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-marinho">
                  {material.titulo}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  {material.tipo === "resumo"
                    ? "Resumo teórico"
                    : "Lista de exercícios"}
                </p>

                <a
                  href={material.pdfUrl}
                  target="_blank"
                  className="mt-4 inline-block text-sm font-medium text-marinho hover:underline"
                >
                  Abrir PDF
                </a>
              </div>
            </article>
          ))}
        </Grid>
        <p className="mt-6 text-sm text-slate-600">
          Os materiais estão disponíveis nas páginas de cada disciplina.
        </p>
      </Section>

      <Section>
        <CTABox
          title="Inicie seu plano de estudos"
          description="A equipe do ESFERA está disponível para orientar os próximos passos do atendimento."
          href="/contato?origem=home"
          buttonLabel="Falar com a equipe"
        />
      </Section>
    </>
  );
}
