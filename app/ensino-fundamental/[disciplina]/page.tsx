import { notFound } from "next/navigation";
import { DisciplinePageTemplate } from "@/components/discipline/DisciplinePageTemplate";
import { disciplinas, getDisciplina } from "@/data/disciplinas";
import { niveisEnsino } from "@/data/niveis";

export function generateStaticParams() {
  return disciplinas
    .filter((disciplina) => disciplina.nivel === "ensino-fundamental")
    .map((disciplina) => ({ disciplina: disciplina.slug }));
}

export default function DisciplinaFundamentalPage({ params }: { params: { disciplina: string } }) {
  const nivel = niveisEnsino.find((item) => item.slug === "ensino-fundamental");
  const disciplina = getDisciplina("ensino-fundamental", params.disciplina);
  if (!nivel || !disciplina) return notFound();
  return <DisciplinePageTemplate nivel={nivel} disciplina={disciplina} />;
}
