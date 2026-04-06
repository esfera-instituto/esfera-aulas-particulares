import { ContactForm } from "@/components/forms/ContactForm";
import { Section } from "@/components/ui/Section";

interface ContatoPageProps {
  searchParams?: {
    nivel?: string;
    disciplina?: string;
    origem?: string;
  };
}

export default function ContatoPage({ searchParams }: ContatoPageProps) {
  return (
    <Section
      title="Contato"
      description="Preencha os dados para que a equipe do ESFERA organize o primeiro encaminhamento acadêmico."
    >
      <div className="mx-auto max-w-xl">
        <ContactForm
          initialNivel={searchParams?.nivel}
          initialDisciplina={searchParams?.disciplina}
          origemPagina={searchParams?.origem}
        />
      </div>
    </Section>
  );
}
