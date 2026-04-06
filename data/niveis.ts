import { NivelEnsino } from "@/lib/types";

export const niveisEnsino: NivelEnsino[] = [
  {
    slug: "ensino-fundamental",
    nome: "Ensino Fundamental",
    descricao:
      "Acompanhamento próximo, organização dos estudos e desenvolvimento da base conceitual.",
    imagem: "/niveis/fundamental.jpg"
  },
  {
    slug: "ensino-medio",
    nome: "Ensino Médio",
    descricao:
      "Reforço e aprofundamento dos conteúdos, com foco em desempenho escolar e vestibulares.",
    imagem: "/niveis/medio.jpg"
  },
  {
    slug: "ensino-superior",
    nome: "Ensino Superior",
    descricao:
      "Aulas em disciplinas como cálculo, física, estatística e economia, com abordagem estruturada.",
    imagem: "/niveis/superior.png"
  }
];
