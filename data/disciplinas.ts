import { Disciplina, NivelEnsinoSlug } from "@/lib/types";

export const disciplinas: Disciplina[] = [
  { id: "ef-mat", slug: "matematica", nome: "Matemática", nivel: "ensino-fundamental", descricao: "Conceitos fundamentais e resolução orientada de exercícios." },
  { id: "ef-port", slug: "lingua-portuguesa", nome: "Língua Portuguesa", nivel: "ensino-fundamental", descricao: "Leitura, interpretação e produção textual com base escolar." },
  { id: "ef-cien", slug: "ciencias", nome: "Ciências", nivel: "ensino-fundamental", descricao: "Conteúdos de ciências naturais com apoio teórico e aplicado." },
  { id: "ef-hist", slug: "historia", nome: "História", nivel: "ensino-fundamental", descricao: "Estudo orientado dos processos históricos e contexto social." },
  { id: "ef-geo", slug: "geografia", nome: "Geografia", nivel: "ensino-fundamental", descricao: "Geografia física e humana com foco em organização conceitual." },
  { id: "ef-ing", slug: "lingua-inglesa", nome: "Língua Inglesa", nivel: "ensino-fundamental", descricao: "Vocabulário, gramática e compreensão textual adaptados ao nível." },
  { id: "em-mat", slug: "matematica", nome: "Matemática", nivel: "ensino-medio", descricao: "Álgebra, funções e geometria com prática estruturada." },
  { id: "em-fis", slug: "fisica", nome: "Física", nivel: "ensino-medio", descricao: "Mecânica, eletricidade e demais tópicos do currículo escolar." },
  { id: "em-qui", slug: "quimica", nome: "Química", nivel: "ensino-medio", descricao: "Fundamentos de química geral, orgânica e físico-química." },
  { id: "em-bio", slug: "biologia", nome: "Biologia", nivel: "ensino-medio", descricao: "Conteúdos biológicos com apoio para provas e vestibulares." },
  { id: "em-port", slug: "lingua-portuguesa", nome: "Língua Portuguesa", nivel: "ensino-medio", descricao: "Gramática, redação e interpretação de textos em nível médio." },
  { id: "em-ing", slug: "lingua-inglesa", nome: "Língua Inglesa", nivel: "ensino-medio", descricao: "Leitura e estrutura gramatical para escola e exames." },
  { id: "em-hist", slug: "historia", nome: "História", nivel: "ensino-medio", descricao: "Análise histórica com foco no currículo do ensino médio." },
  { id: "em-geo", slug: "geografia", nome: "Geografia", nivel: "ensino-medio", descricao: "Geografia política, econômica e ambiental de forma organizada." },
  { id: "em-fil", slug: "filosofia", nome: "Filosofia", nivel: "ensino-medio", descricao: "Introdução a autores e conceitos centrais da filosofia." },
  { id: "es-mate", slug: "matematica-elementar", nome: "Matemática Elementar", nivel: "ensino-superior", descricao: "Revisão estruturada de pré-requisitos matemáticos." },
  { id: "es-cal", slug: "calculo", nome: "Cálculo", nivel: "ensino-superior", descricao: "Limites, derivadas e integrais com foco em aplicação." },
  { id: "es-vga", slug: "vetores-e-geometria-analitica", nome: "Vetores e Geometria Analítica", nivel: "ensino-superior", descricao: "Representações vetoriais e geometria no espaço." },
  { id: "es-al", slug: "algebra-linear", nome: "Álgebra Linear", nivel: "ensino-superior", descricao: "Matrizes, sistemas lineares e transformações." },
  { id: "es-prog", slug: "programacao", nome: "Programação", nivel: "ensino-superior", descricao: "Fundamentos de lógica e desenvolvimento para disciplinas iniciais." },
  { id: "es-ol", slug: "otimizacao-linear", nome: "Otimização Linear", nivel: "ensino-superior", descricao: "Modelagem e solução de problemas lineares." },
  { id: "es-onl", slug: "otimizacao-nao-linear", nome: "Otimização não Linear", nivel: "ensino-superior", descricao: "Técnicas para problemas com restrições não lineares." },
  { id: "es-mf", slug: "matematica-financeira", nome: "Matemática Financeira", nivel: "ensino-superior", descricao: "Juros, séries e equivalência de capitais." },
  { id: "es-est", slug: "estatistica", nome: "Estatística", nivel: "ensino-superior", descricao: "Probabilidade, inferência e análise de dados." },
  { id: "es-ed", slug: "equacoes-diferenciais", nome: "Equações Diferenciais", nivel: "ensino-superior", descricao: "Modelos dinâmicos e métodos de resolução." },
  { id: "es-con", slug: "contabilidade", nome: "Contabilidade", nivel: "ensino-superior", descricao: "Princípios contábeis e demonstrações financeiras." },
  { id: "es-mic", slug: "microeconomia", nome: "Microeconomia", nivel: "ensino-superior", descricao: "Teoria do consumidor, firma e mercados." },
  { id: "es-mac", slug: "macroeconomia", nome: "Macroeconomia", nivel: "ensino-superior", descricao: "Renda, inflação e políticas macroeconômicas." },
  { id: "es-eco", slug: "econometria", nome: "Econometria", nivel: "ensino-superior", descricao: "Modelagem econométrica e interpretação de resultados." }
];

export const getDisciplinasByNivel = (nivel: NivelEnsinoSlug) =>
  disciplinas.filter((disciplina) => disciplina.nivel === nivel);

export const getDisciplina = (nivel: NivelEnsinoSlug, slug: string) =>
  disciplinas.find((disciplina) => disciplina.nivel === nivel && disciplina.slug === slug);
