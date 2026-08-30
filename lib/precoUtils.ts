export const VALOR_HORA: Record<string, Record<string, number>> = {
  online: { fundamental_1: 170, fundamental_2: 170, medio: 170, superior: 200 },
  espaco_esfera: { fundamental_1: 200, fundamental_2: 200, medio: 200, superior: 220 },
  domicilio: { fundamental_1: 220, fundamental_2: 220, medio: 220, superior: 250 },
};

export function descontoGrupoPercentual(quantidadeAlunos: number) {
  if (quantidadeAlunos <= 1) return 0;
  if (quantidadeAlunos === 2) return 0.05;
  if (quantidadeAlunos === 3) return 0.1;
  return 0.15;
}

export type AulaPreco = {
  local: string | null;
  nivel: string;
  duracao_minutos_real: number | null;
  duracao_minutos: number;
  quantidade_alunos: number;
};

export function valorClienteAula(aula: AulaPreco) {
  const valorHora = VALOR_HORA[aula.local || "online"]?.[aula.nivel] || 0;
  const minutos = aula.duracao_minutos_real ?? aula.duracao_minutos;
  const fatorGrupo = 1 - descontoGrupoPercentual(aula.quantidade_alunos);
  return (minutos / 60) * valorHora * fatorGrupo;
}