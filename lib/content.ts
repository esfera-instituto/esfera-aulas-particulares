import { NivelEnsinoSlug } from "@/lib/types";

export const nivelLabels: Record<NivelEnsinoSlug, string> = {
  "ensino-fundamental": "Ensino Fundamental",
  "ensino-medio": "Ensino Médio",
  "ensino-superior": "Ensino Superior"
};

export const nivelBasePaths: Record<NivelEnsinoSlug, string> = {
  "ensino-fundamental": "/ensino-fundamental",
  "ensino-medio": "/ensino-medio",
  "ensino-superior": "/ensino-superior"
};
