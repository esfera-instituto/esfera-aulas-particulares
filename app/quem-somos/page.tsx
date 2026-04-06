import { Section } from "@/components/ui/Section";

export default function QuemSomosPage() {
  return (
    <Section
      title="Quem somos"
      description="O ESFERA é um projeto educacional voltado para aulas particulares e apoio acadêmico, com atuação do ensino fundamental ao ensino superior."
    >
      <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6 text-slate-700">
        <p>
          Nossa proposta combina clareza didática, organização pedagógica por disciplina e materiais de apoio gratuitos para os alunos e as alunas.
        </p>
        <p>
          O atendimento é estruturado para oferecer flexibilidade de horários e continuidade no acompanhamento acadêmico.
        </p>
      </div>
    </Section>
  );
}
