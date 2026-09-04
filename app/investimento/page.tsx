"use client";

import { useState } from "react";

const NIVEIS = [
  { value: "fundamental_1", label: "Ensino Fundamental I" },
  { value: "fundamental_2", label: "Ensino Fundamental II" },
  { value: "medio", label: "Ensino Médio" },
  { value: "superior", label: "Ensino Superior" },
];

const MODALIDADES = [
  { value: "online", label: "On-line" },
  { value: "espaco_esfera", label: "Espaço ESFERA" },
  { value: "domicilio", label: "Domicílio" },
];

const VALOR_HORA: Record<string, Record<string, number>> = {
  online: { fundamental_1: 170, fundamental_2: 170, medio: 170, superior: 200 },
  espaco_esfera: {
    fundamental_1: 200,
    fundamental_2: 200,
    medio: 200,
    superior: 220,
  },
  domicilio: {
    fundamental_1: 220,
    fundamental_2: 220,
    medio: 220,
    superior: 250,
  },
};

const TAMANHOS_PACOTE = [
  { horas: 6, desconto: 3, validade: 45 },
  { horas: 10, desconto: 5, validade: 60 },
  { horas: 20, desconto: 10, validade: 180 },
];

const OPCOES_QUANTIDADE = [
  { valor: 1, label: "1 aluno(a) — individual" },
  { valor: 2, label: "2 alunos" },
  { valor: 3, label: "3 alunos" },
  { valor: 4, label: "4 ou mais alunos" },
];

const descontosGrupo = [
  { qtd: "2 alunos", desconto: "5%" },
  { qtd: "3 alunos", desconto: "10%" },
  { qtd: "4 ou mais alunos", desconto: "15%" },
];

// Desconto de aula avulsa quando em grupo (aplicado ao preço da hora)
function descontoGrupoAvulsa(quantidadeAlunos: number) {
  if (quantidadeAlunos <= 1) return 0;
  if (quantidadeAlunos === 2) return 5;
  if (quantidadeAlunos === 3) return 10;
  return 15;
}

// Desconto de pacote quando comprado em grupo — substitui o desconto por tamanho
function descontoGrupoPacote(quantidadeAlunos: number) {
  if (quantidadeAlunos <= 1) return 0;
  if (quantidadeAlunos === 2) return 25;
  if (quantidadeAlunos === 3) return 30;
  return 35;
}

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function InvestimentoPage() {
  const [nivel, setNivel] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [quantidadeAlunos, setQuantidadeAlunos] = useState(1);

  const valorHora =
    nivel && modalidade ? VALOR_HORA[modalidade]?.[nivel] || 0 : 0;

  const emGrupo = quantidadeAlunos > 1;
  const descontoAvulsaAtual = descontoGrupoAvulsa(quantidadeAlunos);
  const descontoPacoteAtual = descontoGrupoPacote(quantidadeAlunos);
  const valorHoraAvulsaComGrupo = valorHora * (1 - descontoAvulsaAtual / 100);

  const selectClass =
    "w-full rounded-lg bg-white/10 border border-white/20 px-3 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/50";

  return (
    <div className="min-h-screen bg-[#08364E] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="h-20 w-20"
          >
            <defs>
              <radialGradient
                id="esferaGrad"
                cx="38%"
                cy="33%"
                r="70%"
                fx="36%"
                fy="30%"
              >
                <stop offset="0%" stopColor="#2A8FC0" />
                <stop offset="30%" stopColor="#1566A0" />
                <stop offset="60%" stopColor="#0A4A7A" />
                <stop offset="85%" stopColor="#083A60" />
                <stop offset="100%" stopColor="#051E3A" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#esferaGrad)" />
          </svg>
          <p className="mt-3 text-lg font-semibold tracking-widest text-white uppercase">
            ESFERA
          </p>
          <p className="mt-3 text-center text-white/70 text-sm leading-relaxed">
            Invista no seu aprendizado
          </p>
        </div>

        <div className="rounded-2xl px-5 py-4 bg-white/10 border border-white/10 mb-6">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Simule o seu investimento
          </p>
          <div className="flex flex-col gap-3 mb-4">
            <select
              value={nivel}
              onChange={(e) => setNivel(e.target.value)}
              className={selectClass}
            >
              <option value="" className="text-gray-800">
                Selecione o nível de ensino
              </option>
              {NIVEIS.map((n) => (
                <option key={n.value} value={n.value} className="text-gray-800">
                  {n.label}
                </option>
              ))}
            </select>
            <select
              value={modalidade}
              onChange={(e) => setModalidade(e.target.value)}
              className={selectClass}
            >
              <option value="" className="text-gray-800">
                Selecione a modalidade
              </option>
              {MODALIDADES.map((m) => (
                <option key={m.value} value={m.value} className="text-gray-800">
                  {m.label}
                </option>
              ))}
            </select>
            <select
              value={quantidadeAlunos}
              onChange={(e) => setQuantidadeAlunos(Number(e.target.value))}
              className={selectClass}
            >
              {OPCOES_QUANTIDADE.map((o) => (
                <option key={o.valor} value={o.valor} className="text-gray-800">
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {valorHora > 0 && (
            <div className="flex flex-col gap-2">
              <div className="text-left rounded-xl px-4 py-3 border bg-white/5 border-white/10">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-white">
                    Aula pontual{emGrupo ? " (grupo)" : ""}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {formatarMoeda(valorHoraAvulsaComGrupo)}/h
                  </span>
                </div>
                {emGrupo && (
                  <p className="text-xs text-white/40 mt-0.5">
                    -{descontoAvulsaAtual}% por aula em grupo (por aluno)
                  </p>
                )}
              </div>

              {!emGrupo &&
                TAMANHOS_PACOTE.map((p) => {
                  const valorHoraEfetivo = valorHora * (1 - p.desconto / 100);
                  return (
                    <div
                      key={p.horas}
                      className="text-left rounded-xl px-4 py-3 border bg-white/5 border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">
                          Pacote de {p.horas}h
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {formatarMoeda(valorHoraEfetivo)}/h
                        </span>
                      </div>
                      <p className="text-xs text-white/40 mt-0.5">
                        -{p.desconto}% · total{" "}
                        {formatarMoeda(valorHoraEfetivo * p.horas)} · validade{" "}
                        {p.validade} dias
                      </p>
                    </div>
                  );
                })}

              {emGrupo &&
                TAMANHOS_PACOTE.map((p) => {
                  const valorHoraEfetivo = valorHora * (1 - descontoPacoteAtual / 100);
                  return (
                    <div
                      key={p.horas}
                      className="text-left rounded-xl px-4 py-3 border bg-white/5 border-white/10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-white">
                          Pacote de {p.horas}h (grupo)
                        </span>
                        <span className="text-sm font-semibold text-white">
                          {formatarMoeda(valorHoraEfetivo)}/h
                        </span>
                      </div>
                      <p className="text-xs text-white/40 mt-0.5">
                        -{descontoPacoteAtual}% por aluno · total (por aluno){" "}
                        {formatarMoeda(valorHoraEfetivo * p.horas)} · validade{" "}
                        {p.validade} dias
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>

        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Desconto para aulas pontuais em grupo
          </p>
          <div className="flex flex-col gap-2">
            {descontosGrupo.map((d) => (
              <div
                key={d.qtd}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-white/70">{d.qtd}</span>
                <span className="text-white font-medium">-{d.desconto}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Desconto para pacotes em grupo
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">2 alunos</span>
              <span className="text-white font-medium">-25%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">3 alunos</span>
              <span className="text-white font-medium">-30%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/70">4 ou mais alunos</span>
              <span className="text-white font-medium">-35%</span>
            </div>
          </div>
          <p className="text-xs text-white/40 mt-3 leading-relaxed">
            Cada aluno do grupo tem seu próprio pacote de horas, comprados juntos.
          </p>
        </div>

        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Regras dos descontos
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            Os descontos de pacote, aulas em grupo e condições
            promocionais não são cumulativos. Quando houver mais de uma condição
            aplicável, prevalecerá o maior desconto.
          </p>
        </div>

        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-8">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Formas de pagamento
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            PIX, boleto, cartão de débito ou crédito (parcelamento em até 3x sem
            juros para valores a partir de R$ 1.500,00). Pacotes são pagos
            antecipadamente. Todos os pagamentos são feitos diretamente ao
            ESFERA — nunca ao professor ou à professora.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          © ESFERA Aulas Particulares · Alameda Casa Branca, 393 · Jardim
          Paulista, São Paulo · CNPJ 65.277.896/0001-04
        </p>
      </div>
    </div>
  );
}