import { notFound } from "next/navigation";
import { DisciplinePageTemplate } from "@/components/discipline/DisciplinePageTemplate";
import { disciplinas, getDisciplina } from "@/data/disciplinas";
import { niveisEnsino } from "@/data/niveis";

export function generateStaticParams() {
  return disciplinas
    .filter((disciplina) => disciplina.nivel === "ensino-medio")
    .map((disciplina) => ({ disciplina: disciplina.slug }));
}

export default function DisciplinaMedioPage({ params }: { params: { disciplina: string } }) {
  const nivel = niveisEnsino.find((item) => item.slug === "ensino-medio");
  const disciplina = getDisciplina("ensino-medio", params.disciplina);
  if (!nivel || !disciplina) return notFound();
  return <DisciplinePageTemplate nivel={nivel} disciplina={disciplina} />;
}
