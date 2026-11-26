import { CTABox } from "@/components/ui/CTABox";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const especialidades = [
  {
    badge: "Vínculo & Estratégias de Estudo",
    titulo: "Psicopedagogia Clínica",
    descricao:
      "Indicada quando a demanda predominante envolve a relação do estudante com o aprender — abordando bloqueios emocionais, lacunas metodológicas, hábitos de estudo, organização acadêmica e construção da autonomia intelectual.",
  },
  {
    badge: "Funções Executivas & Neurocognição",
    titulo: "Neuropsicopedagogia Clínica",
    descricao:
      "Indicada quando a queixa envolve rastreio e estimulação das funções executivas — atenção sustentada, memória operacional, planejamento, controle inibitório e flexibilidade cognitiva (suporte a TDAH, dislexia, discalculia e TEA).",
  },
];

const areas = [
  {
    icone: "🧠",
    titulo: "Funções executivas e foco",
    descricao:
      "Estimulação cognitiva para atenção, memória de trabalho, planejamento e início/conclusão de tarefas.",
  },
  {
    icone: "📚",
    titulo: "Organização e rotina de estudos",
    descricao:
      "Estruturação de cronogramas realistas, métodos ativos de estudo e autonomia para provas e trabalhos.",
  },
  {
    icone: "🎯",
    titulo: "Transtornos e dificuldades específicas",
    descricao:
      "Acompanhamento especializado para estudantes com TDAH, dislexia, discalculia ou defasagens de aprendizagem.",
  },
  {
    icone: "🤝",
    titulo: "Integração com aulas particulares",
    descricao:
      "Com autorização da família, o especialista orienta diretamente os professores do ESFERA sobre o manejo pedagógico ideal para o aluno.",
  },
  {
    icone: "🏫",
    titulo: "Observação e alinhamento escolar",
    descricao:
      "Mediante autorização da família e do colégio, o especialista realiza visita de observação em sala de aula e reuniões técnicas com a coordenação.",
  },
  {
    icone: "👨‍👩‍👧",
    titulo: "Orientação parental",
    descricao:
      "Devolutivas estruturadas e acompanhamento contínuo para que a família saiba como apoiar o estudante no dia a dia.",
  },
];

const etapas = [
  {
    numero: "01",
    titulo: "Anamnese com os pais",
    descricao:
      "Primeiro encontro de 50 minutos com os pais (no Espaço ESFERA, em domicílio ou on-line) conduzido pelo especialista titular para escuta do histórico escolar.",
  },
  {
    numero: "02",
    titulo: "Avaliação clínica e escolar",
    descricao:
      "Sessões individuais de 50 minutos com protocolos cognitivos e provas operatórias, com possibilidade de visita de observação no colégio do aluno.",
  },
  {
    numero: "03",
    titulo: "Devolutiva e Parecer Técnico",
    descricao:
      "Apresentação dos achados aos pais com entrega de Parecer Técnico escrito e recomendações práticas para família, escola e professores.",
  },
  {
    numero: "04",
    titulo: "Intervenção semanal",
    descricao:
      "Plano terapêutico-educacional personalizado com sessões semanais de 50 minutos para consolidação das habilidades e autonomia.",
  },
];

export default function PsicopedagogiaPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16">
        <Container>
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              Atendimento Clínico · Espaço ESFERA, Domicílio ou On-line
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-marinho sm:text-4xl">
              Psicopedagogia e Neuropsicopedagogia
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              O ESFERA oferece acompanhamento clínico especializado para
              estudantes que enfrentam dificuldades de aprendizagem, desafios
              de atenção e funções executivas ou necessidade de estruturar sua
              autonomia nos estudos. Os atendimentos acontecem em sala dedicada
              no{" "}
              <strong className="font-semibold text-marinho">
                Espaço ESFERA (Alameda Casa Branca, 393)
              </strong>
              , em domicílio ou on-line, sempre conduzidos pelo especialista
              titular.
            </p>
          </div>

          {/* Diferenciação Clínica */}
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {especialidades.map((esp) => (
              <div
                key={esp.titulo}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 p-6"
              >
                <span className="inline-block rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-blue-700 shadow-sm">
                  {esp.badge}
                </span>
                <h2 className="mt-3 text-xl font-semibold text-marinho">
                  {esp.titulo}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {esp.descricao}
                </p>
              </div>
            ))}
          </div>

          {/* Esclarecimento sobre condução individualizada */}
          <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50/50 p-4 text-sm leading-relaxed text-slate-600">
            <strong className="font-semibold text-marinho">
              Atendimento conduzido por especialista titular:
            </strong>{" "}
            Antes da primeira sessão, nossa equipe alinha com a família o
            perfil da demanda para direcionar o estudante diretamente ao
            especialista mais indicado (Psicopedagogo{" "}
            <em>ou</em> Neuropsicopedagogo), que conduz integralmente a
            anamnese, a avaliação e o acompanhamento. Caso haja indicação
            clínica de olhar complementar na outra frente, é possível solicitar
            uma interconsulta pontual.
          </div>
        </Container>
      </section>

      {/* Áreas de atuação */}
      <Section title="Frentes de atuação">
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
            Etapas do atendimento clínico
          </h2>
          <p className="mt-2 text-slate-500">
            Um percurso estruturado em encontros de 50 minutos, da escuta
            inicial à intervenção contínua.
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

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm leading-relaxed text-slate-600">
            <h3 className="font-semibold text-marinho">
              Diretrizes do atendimento clínico
            </h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-2">
              <li>
                <strong>Formatos flexíveis:</strong> As sessões ocorrem no
                Espaço ESFERA (com acervo técnico dedicado), em domicílio ou
                on-line, conforme a etapa e a necessidade do aluno.
              </li>
              <li>
                <strong>Visita escolar autorizada:</strong> Quando indicada na
                avaliação, a observação em sala de aula no colégio é realizada
                somente com autorização expressa dos pais e da escola.
              </li>
              <li>
                <strong>Remarcações:</strong> Cancelamentos ou reagendamentos
                devem ser solicitados com pelo menos 24h de antecedência.
              </li>
              <li>
                <strong>Parecer e sigilo:</strong> O Parecer Técnico orienta
                família, escola e professores (sem substituir laudo médico CID),
                preservando o sigilo do prontuário clínico.
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-slate-200/80">
              <a
                href="/investimento?aba=clinico"
                className="text-sm font-semibold text-marinho hover:underline"
              >
                Consultar formatos e investimento do atendimento clínico →
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <Section>
        <CTABox
          title="Deseja agendar uma conversa inicial ou avaliação?"
          description="Nossa equipe orienta o melhor encaminhamento entre Psicopedagogia e Neuropsicopedagogia conforme o perfil do estudante."
          href="/contato?origem=/psicopedagogia-neuropsicopedagogia"
          buttonLabel="Falar com a equipe do ESFERA"
        />
      </Section>
    </>
  );
}