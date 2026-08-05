import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESFERA | Valores para Professores",
  description: "Tabela de valores para professores(as) da ESFERA.",
};

const TARIFAS: Record<string, Record<string, number>> = {
  online: { fundamental_1: 60, fundamental_2: 65, medio: 70, superior: 85 },
  presencial: { fundamental_1: 70, fundamental_2: 75, medio: 85, superior: 90 },
};

const NIVEIS = [
  { value: "fundamental_1", label: "Ensino Fundamental I" },
  { value: "fundamental_2", label: "Ensino Fundamental II" },
  { value: "medio", label: "Ensino Médio" },
  { value: "superior", label: "Ensino Superior" },
];

const VALOR_DESLOCAMENTO = 15;
const VALOR_INTERNET = 15;

const bonusGrupo = [
  { qtd: "2 alunos", bonus: "+10%" },
  { qtd: "3 alunos", bonus: "+15%" },
  { qtd: "4 ou mais alunos", bonus: "+20%" },
];

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ValoresProfessorPage() {
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
            Valores para professores(as)
          </p>
        </div>

        {/* Tabela por nível */}
        <div className="flex flex-col gap-3 mb-6">
          {NIVEIS.map((n) => (
            <div
              key={n.value}
              className="rounded-2xl px-5 py-4 bg-white/10 border border-white/10"
            >
              <p className="text-sm font-medium text-white mb-3">{n.label}</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">On-line</span>
                  <span className="text-white font-medium">
                    {formatarMoeda(TARIFAS.online[n.value])}
                    <span className="text-white/40 font-normal">/hora</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">
                    Presencial (Espaço ESFERA ou domicílio)
                  </span>
                  <span className="text-white font-medium">
                    {formatarMoeda(TARIFAS.presencial[n.value])}
                    <span className="text-white/40 font-normal">/hora</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bônus por grupo */}
        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Bônus por aula em grupo
          </p>
          <div className="flex flex-col gap-2">
            {bonusGrupo.map((b) => (
              <div
                key={b.qtd}
                className="flex items-center justify-between text-sm"
              >
                <span className="text-white/70">{b.qtd}</span>
                <span className="text-white font-medium">{b.bonus}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Auxílios */}
        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Auxílios adicionais
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/70">
                Auxílio deslocamento (por sessão presencial)
              </span>
              <span className="text-white font-medium">
                {formatarMoeda(VALOR_DESLOCAMENTO)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">
                Auxílio internet (aulas on-line)
              </span>
              <span className="text-white font-medium">
                {formatarMoeda(VALOR_INTERNET)}
                <span className="text-white/40 font-normal">/hora</span>
              </span>
            </div>
          </div>
          <p className="text-xs text-white/40 leading-relaxed mt-3">
            O auxílio deslocamento é calculado por sessão do dia — aulas
            presenciais seguidas, com menos de 4h de intervalo entre elas,
            contam como uma única sessão.
          </p>
        </div>

        {/* Ciclo de pagamento */}
        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-8">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Ciclo de pagamento
          </p>
          <div className="flex flex-col gap-2 text-sm text-white/70 leading-relaxed">
            <p>Aulas do dia 1 ao dia 15 → pagas até o dia 20.</p>
            <p>
              Aulas do dia 16 ao último dia do mês → pagas até o dia 5 do mês
              seguinte.
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          © ESFERA Aulas Particulares · Alameda Casa Branca, 393 · Jardim
          Paulista, São Paulo · CNPJ 65.277.896/0001-04
        </p>
      </div>
    </div>
  );
}
