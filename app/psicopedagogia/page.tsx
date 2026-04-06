import { CTABox } from "@/components/ui/CTABox";
import { Section } from "@/components/ui/Section";

export default function PsicopedagogiaPage() {
  return (
    <Section
      title="Psicopedagogia"
      description="Atendimento institucional para apoiar o desenvolvimento de estratégias de aprendizagem, organização de estudos e rotina acadêmica."
    >
      <CTABox
        title="Deseja conversar sobre apoio psicopedagógico?"
        description="A equipe do ESFERA pode orientar o encaminhamento inicial conforme a necessidade de cada aluno ou aluna."
        href="/contato?origem=/psicopedagogia"
        buttonLabel="Falar com a equipe"
      />
    </Section>
  );
}
