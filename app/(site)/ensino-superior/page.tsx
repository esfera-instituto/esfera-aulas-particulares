import { LevelPageTemplate } from "@/components/sections/LevelPageTemplate";
import { niveisEnsino } from "@/data/niveis";

export default function EnsinoSuperiorPage() {
  const nivel = niveisEnsino.find((item) => item.slug === "ensino-superior");
  if (!nivel) return null;
  return <LevelPageTemplate nivel={nivel} />;
}
