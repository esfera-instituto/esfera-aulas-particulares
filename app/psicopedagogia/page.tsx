import { CTABox } from "@/components/ui/CTABox";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const areas = [
  {
    icone: "📚",
    titulo: "Organização dos estudos",
    descricao:
      "Desenvolvimento de rotinas de estudo eficientes, gestão do tempo e planejamento acadêmico personalizado.",
  },
  {
    icone: "🧠",
    titulo: "Estratégias de aprendizagem",
    descricao:
      "Identificação do perfil de aprendizagem e aplicação de técnicas adequadas para cada estudante.",
  },
  {
    icone: "🎯",
    titulo: "Dificuldades de aprendizagem",
    descricao:
      "Suporte a estudantes com dislexia, TDAH, dificuldades de concentração e outras demandas específicas.",
  },
  {
    icone: "📈",
    titulo: "Desempenho escolar",
    descricao:
      "Acompanhamento do progresso acadêmico com foco em autonomia, motivação e melhora de resultados.",
  },
  {
    icone: "🏫",
    titulo: "Adaptação acadêmica",
    descricao:
      "Apoio em momentos de transição escolar, como entrada no ensino médio ou superior.",
  },
  {
    icone: "👨‍👩‍👧",
    titulo: "Orientação familiar",
    descricao:
      "Suporte e orientação para famílias sobre como acompanhar e apoiar o desenvolvimento do estudante.",
  },
];

const etapas = [
  {
    numero: "01",
    titulo: "Contato inicial",
    descricao:
      "Entre em contato com a equipe do ESFERA para um primeiro alinhamento sobre as necessidades do estudante.",
  },
  {
    numero: "02",
    titulo: "Avaliação do perfil",
    descricao:
      "Realizamos uma escuta ativa para entender o contexto escolar, dificuldades e objetivos acadêmicos.",
  },
  {
    numero: "03",
    titulo: "Plano de acompanhamento",
    descricao:
      "Elaboramos um plano individualizado com estratégias, frequência e metas claras para o estudante.",
  },
  {
    numero: "04",
    titulo: "Acompanhamento contínuo",
    descricao:
      "Sessões regulares com monitoramento do progresso e ajustes ao longo do processo.",
  },
];

export default function PsicopedagogiaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              Apoio especializado
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-marinho sm:text-4xl">
              Psicopedagogia
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              O ESFERA oferece acompanhamento psicopedagógico para estudantes
              que enfrentam dificuldades de aprendizagem, organização da rotina
              de estudos ou adaptação acadêmica. Nosso suporte contribui para o
              desenvolvimento de estratégias mais adequadas de estudo, maior
              autonomia e melhor aproveitamento escolar.
            </p>
          </div>
        </Container>
      </section>

      {/* Áreas de atuação */}
      <Section title="Áreas de atuação">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {areas.map((area) => (
            <div
              key={area.titulo}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="text-3xl">{area.icone}</span>
              <h3 className="font-semibold text-marinho">{area.titulo}</h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {area.descricao}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Como funciona */}
      <section className="bg-white py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-marinho">
            Como funciona o atendimento
          </h2>
          <p className="mt-2 text-slate-500">
            Um processo estruturado e personalizado para cada estudante.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {etapas.map((etapa) => (
              <div key={etapa.numero} className="flex flex-col gap-3">
                <span className="text-3xl font-bold text-blue-100">
                  {etapa.numero}
                </span>
                <h3 className="font-semibold text-marinho">{etapa.titulo}</h3>
                <p className="text-sm leading-relaxed text-slate-500">
                  {etapa.descricao}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Section>
        <CTABox
          title="Deseja conversar sobre apoio psicopedagógico?"
          description="A equipe do ESFERA pode orientar o encaminhamento inicial conforme a necessidade de cada aluno ou aluna."
          href="/contato?origem=/psicopedagogia"
          buttonLabel="Falar com a equipe"
        />
      </Section>
    </>
  );
}
