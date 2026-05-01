export type NivelEnsinoSlug =
  | "ensino-fundamental"
  | "ensino-medio"
  | "ensino-superior";

export type MaterialTipo = "resumo" | "lista";

export interface NivelEnsino {
  slug: NivelEnsinoSlug;
  nome: string;
  descricao: string;
  imagem: string;
}

export interface Disciplina {
  id: string;
  slug: string;
  nome: string;
  nivel: NivelEnsinoSlug;
  descricao: string;
}

export interface Material {
  id: string;
  titulo: string;
  nivel: NivelEnsinoSlug;
  disciplina: string;
  tipo: MaterialTipo;
  pdfUrl: string;
  capaUrl?: string;
}

export type Professor = {
  id: string;
  nome: string;
  area: string;
  descricao: string;
  imagem: string;
};
