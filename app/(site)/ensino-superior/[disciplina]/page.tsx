import { notFound } from "next/navigation";
import { DisciplinePageTemplate } from "@/components/discipline/DisciplinePageTemplate";
import { disciplinas, getDisciplina } from "@/data/disciplinas";
import { niveisEnsino } from "@/data/niveis";

export function generateStaticParams() {
  return disciplinas
    .filter((disciplina) => disciplina.nivel === "ensino-superior")
    .map((disciplina) => ({ disciplina: disciplina.slug }));
}

export default function DisciplinaSuperiorPage({ params }: { params: { disciplina: string } }) {
  const nivel = niveisEnsino.find((item) => item.slug === "ensino-superior");
  const disciplina = getDisciplina("ensino-superior", params.disciplina);
  if (!nivel || !disciplina) return notFound();
  return <DisciplinePageTemplate nivel={nivel} disciplina={disciplina} />;
}
