import { LevelPageTemplate } from "@/components/sections/LevelPageTemplate";
import { niveisEnsino } from "@/data/niveis";

export default function EnsinoFundamentalPage() {
  const nivel = niveisEnsino.find((item) => item.slug === "ensino-fundamental");
  if (!nivel) return null;
  return <LevelPageTemplate nivel={nivel} />;
}
