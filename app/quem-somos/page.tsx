import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTABox } from "@/components/ui/CTABox";

const valores = [
  {
    icone: "🎯",
    cor: "bg-blue-50",
    corBorda: "border-blue-200",
    titulo: "Clareza didática",
    descricao:
      "Explicar bem é uma habilidade que se desenvolve com prática e dedicação. Nosso compromisso é tornar o conteúdo acessível para cada estudante.",
  },
  {
    icone: "📐",
    cor: "bg-amber-50",
    corBorda: "border-amber-200",
    titulo: "Organização pedagógica",
    descricao:
      "Cada atendimento é estruturado com disciplina, sequência lógica e materiais de apoio pensados para o perfil do estudante.",
  },
  {
    icone: "🤝",
    cor: "bg-emerald-50",
    corBorda: "border-emerald-200",
    titulo: "Acompanhamento próximo",
    descricao:
      "Acreditamos que a relação entre professor e aluno faz toda a diferença. Acompanhamos cada etapa do desenvolvimento acadêmico.",
  },
  {
    icone: "🏆",
    cor: "bg-purple-50",
    corBorda: "border-purple-200",
    titulo: "Resultados concretos",
    descricao:
      "Nossa trajetória é marcada por aprovações em medicina, engenharia, direito e outras carreiras nas principais universidades do país.",
  },
];

const aprovacoes = [
  "Medicina — FMUSP (Pinheiros)",
  "Medicina — Unicamp",
  "Medicina — Unifesp",
  "Engenharia — Poli USP",
  "Engenharia — ITA",
  "Direito — USP Largo São Francisco",
];

const formacoes = [
  { titulo: "Doutores", icone: "🎓" },
  { titulo: "Mestres", icone: "📜" },
  { titulo: "Doutorandos", icone: "🔬" },
  { titulo: "Mestrandos", icone: "📚" },
];

export default function QuemSomosPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white py-16">
        <Container>
          <div className="max-w-2xl">
            <span className="inline-block rounded-full bg-blue-50 px-4 py-1 text-sm font-medium text-blue-700">
              Nossa história
            </span>
            <h1 className="mt-4 text-3xl font-semibold text-marinho sm:text-4xl">
              Quem somos
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-slate-600">
              O ESFERA Aulas Particulares nasceu de uma trajetória de mais de
              vinte anos dedicados ao ensino. Do plantão de dúvidas na graduação
              às salas de grandes cursinhos do estado de São Paulo.
            </p>
          </div>
        </Container>
      </section>

      {/* História */}
      <Section title="Uma trajetória construída desde 2004">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Texto narrativo */}
          <div className="space-y-5 text-slate-600 leading-relaxed">
            <p>
              Em 2004, ainda no primeiro semestre da graduação em Física no
              Instituto Federal de São Paulo, o{" "}
              <strong className="text-marinho">Professor Alex</strong> começou a
              dar aulas particulares e plantões de dúvidas em cursinhos
              pré-vestibular. Já no segundo semestre, foi monitor de Cálculo na
              faculdade, o que marcou o início de uma carreira inteiramente
              dedicada ao ensino.
            </p>
            <p>
              A trajetória foi se desenvolvendo de forma gradual e consistente.
              Do plantão de dúvidas a professor de matemática em grandes
              cursinhos do estado de São Paulo, acumulando experiência em
              instituições reconhecidas pelo rigor e pela qualidade do ensino
              preparatório. Nesse caminho, também continuou sua formação
              acadêmica, cursando Matemática na Unicamp e na USP.
            </p>
            <p>
              Ao longo de mais de vinte anos, fez parte da preparação de
              centenas de estudantes que conquistaram aprovações em algumas das
              carreiras e universidades mais concorridas do Brasil.
            </p>
            <p>
              Há dois anos, decidiu consolidar essa experiência em um projeto
              próprio: o{" "}
              <strong className="text-marinho">
                ESFERA Aulas Particulares
              </strong>
              . A proposta foi reunir professores altamente qualificados de
              todas as disciplinas — colegas conhecidos ao longo dessa
              trajetória e novos professores, alguns deles ex-alunos que hoje
              ensinam com a mesma dedicação que os formou.
            </p>
          </div>

          {/* Cards laterais */}
          <div className="flex flex-col gap-5">
            <div className="rounded-xl border-2 border-blue-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-xl mb-4">
                🎓
              </div>
              <h3 className="font-semibold text-marinho mb-2">
                Mais de 20 anos de sala de aula
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                Uma trajetória iniciada em 2004, passando por monitoria
                universitária, aulas particulares e aulas em grandes cursinhos
                preparatórios do estado de São Paulo.
              </p>
            </div>

            <div className="rounded-xl border-2 border-emerald-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50 text-xl mb-4">
                🏆
              </div>
              <h3 className="font-semibold text-marinho mb-2">
                Aprovações em carreiras de alta concorrência
              </h3>
              <ul className="mt-3 space-y-2">
                {aprovacoes.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Equipe */}
      <section className="bg-white py-16">
        <Container>
          <h2 className="text-2xl font-semibold text-marinho">
            Uma equipe de alto nível acadêmico
          </h2>
          <p className="mt-3 max-w-2xl text-slate-500 leading-relaxed">
            Os professores do ESFERA foram reunidos ao longo de anos de carreira
            — colegas de trajetória e ex-alunos que hoje ensinam com a mesma
            dedicação que os formou. A equipe é formada por profissionais com
            sólida formação acadêmica, cobrindo todas as disciplinas do Ensino
            Fundamental ao Superior.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {formacoes.map((f) => (
              <div
                key={f.titulo}
                className="flex flex-col items-center gap-3 rounded-xl border-2 border-marinho bg-marinho p-6 text-center shadow-sm"
              >
                <span className="text-3xl">{f.icone}</span>
                <span className="font-semibold text-white">{f.titulo}</span>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500">
            Nossa equipe é multidisciplinar e está em constante atualização
            acadêmica, garantindo um ensino rigoroso e atual em todas as áreas.
          </p>
        </Container>
      </section>

      {/* Valores */}
      <Section title="O que nos orienta">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valores.map((v) => (
            <div
              key={v.titulo}
              className={`flex flex-col gap-3 rounded-xl border-2 bg-white p-5 shadow-sm ${v.corBorda}`}
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl ${v.cor}`}
              >
                {v.icone}
              </div>
              <h3 className="font-semibold text-marinho">{v.titulo}</h3>
              <p className="text-sm leading-relaxed text-slate-500">
                {v.descricao}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section className="bg-white">
        <CTABox
          title="Conheça nossa equipe e inicie seu atendimento"
          description="O ESFERA reúne professores experientes em todas as disciplinas, prontos para acompanhar o seu desenvolvimento acadêmico."
          href="/contato?origem=quem-somos"
          buttonLabel="Falar com a equipe"
        />
      </Section>
    </>
  );
}
