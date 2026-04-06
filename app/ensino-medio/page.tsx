import { LevelPageTemplate } from "@/components/sections/LevelPageTemplate";
import { niveisEnsino } from "@/data/niveis";

export default function EnsinoMedioPage() {
  const nivel = niveisEnsino.find((item) => item.slug === "ensino-medio");
  if (!nivel) return null;
  return <LevelPageTemplate nivel={nivel} />;
}
