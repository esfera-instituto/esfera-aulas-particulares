import { Material, MaterialTipo, NivelEnsinoSlug } from "@/lib/types";

const basePdf = "https://example.com/materiais";

export const materiais: Material[] = [
  { id: "potenciacao_radiciacao", titulo: "Potenciação/Radiciação", nivel: "ensino-fundamental", disciplina: "matematica", tipo: "resumo", pdfUrl: `${basePdf}/potenciacao-radiciacao.pdf` },
  { id: "angulos", titulo: "Ângulos", nivel: "ensino-fundamental", disciplina: "matematica", tipo: "resumo", pdfUrl: `${basePdf}/angulos.pdf` },
  { id: "tecnicas_integracao", titulo: "Técnicas de integração", nivel: "ensino-superior", disciplina: "calculo", tipo: "resumo", pdfUrl: `${basePdf}/tecnicas-primitivacao.pdf` },
  { id: "probabilidade", titulo: "Probabilidade", nivel: "ensino-medio", disciplina: "matematica", tipo: "lista", pdfUrl: `${basePdf}/probabilidade.pdf` },
  { id: "logaritmo", titulo: "Logaritmo", nivel: "ensino-medio", disciplina: "matematica", tipo: "lista", pdfUrl: `${basePdf}/logaritmo.pdf` },
  { id: "sequencias", titulo: "Sequências", nivel: "ensino-medio", disciplina: "matematica", tipo: "lista", pdfUrl: `${basePdf}/sequencias.pdf` },

  { id: "m7", titulo: "Função Afim", nivel: "ensino-medio", disciplina: "matematica", tipo: "resumo", pdfUrl: `${basePdf}/...` },
  { id: "m8", titulo: "Polinômios", nivel: "ensino-medio", disciplina: "matematica", tipo: "lista", pdfUrl: `${basePdf}/...` },
  { id: "m9", titulo: "Derivadas: conceitos e aplicações", nivel: "ensino-superior", disciplina: "calculo", tipo: "resumo", pdfUrl: `${basePdf}/...` },
  { id: "m10", titulo: "Lista de derivadas", nivel: "ensino-superior", disciplina: "calculo", tipo: "lista", pdfUrl: `${basePdf}/...` },
  { id: "m11", titulo: "Matrizes e sistemas lineares", nivel: "ensino-superior", disciplina: "algebra-linear", tipo: "resumo", pdfUrl: `${basePdf}/...` },
  { id: "m12", titulo: "Lista de espaços vetoriais", nivel: "ensino-superior", disciplina: "algebra-linear", tipo: "lista", pdfUrl: `${basePdf}/...` }
];

export const getMateriaisByFiltro = (
  nivel: NivelEnsinoSlug,
  disciplina: string,
  tipo?: MaterialTipo
) =>
  materiais.filter(
    (material) =>
      material.nivel === nivel &&
      material.disciplina === disciplina &&
      (!tipo || material.tipo === tipo)
  );

export const getMateriaisDestaque = (limite = 6) => materiais.slice(0, limite);
