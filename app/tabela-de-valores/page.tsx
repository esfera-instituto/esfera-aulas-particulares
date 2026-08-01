import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ESFERA Aulas Particulares | Tabela de Valores",
  description:
    "Valores das aulas particulares ESFERA para Ensino Fundamental, Médio e Superior.",
  openGraph: {
    title: "ESFERA Aulas Particulares | Tabela de Valores",
    description:
      "Valores das aulas particulares ESFERA para Ensino Fundamental, Médio e Superior.",
    url: "https://esferaaulasparticulares.com.br/tabela-de-valores",
    type: "website",
  },
};

const niveis = [
  {
    label: "Ensino Fundamental I",
    online: 150,
    espacoEsfera: 170,
    domicilio: 200,
  },
  {
    label: "Ensino Fundamental II",
    online: 160,
    espacoEsfera: 180,
    domicilio: 210,
  },
  { label: "Ensino Médio", online: 170, espacoEsfera: 200, domicilio: 220 },
  { label: "Ensino Superior", online: 200, espacoEsfera: 220, domicilio: 250 },
];

const descontosGrupo = [
  { qtd: "2 alunos", desconto: "5%" },
  { qtd: "3 alunos", desconto: "10%" },
  { qtd: "4 ou mais alunos", desconto: "15%" },
];

function formatarMoeda(valor: number) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export default function ValoresPage() {
  return (
    <div className="min-h-screen bg-[#08364E] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo — esfera com gradiente inline */}
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
              <radialGradient id="reflexoGrad" cx="62%" cy="72%" r="40%">
                <stop offset="0%" stopColor="#1A7FBA" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#1A7FBA" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#esferaGrad)" />
            <circle cx="50" cy="50" r="48" fill="url(#reflexoGrad)" />
            <circle
              cx="50"
              cy="50"
              r="48"
              fill="none"
              stroke="#3A9FD0"
              strokeWidth="0.5"
              opacity="0.2"
            />
          </svg>

          <p className="mt-3 text-lg font-semibold tracking-widest text-white uppercase">
            ESFERA
          </p>
          <p className="mt-3 text-center text-white/70 text-sm leading-relaxed">
            Valores das aulas particulares
          </p>
        </div>

        {/* Tabela por nível */}
        <div className="flex flex-col gap-3 mb-6">
          {niveis.map((n) => (
            <div
              key={n.label}
              className="rounded-2xl px-5 py-4 bg-white/10 border border-white/10"
            >
              <p className="text-sm font-medium text-white mb-3">{n.label}</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">On-line</span>
                  <span className="text-white font-medium">
                    {formatarMoeda(n.online)}
                    <span className="text-white/40 font-normal">/hora</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Espaço ESFERA</span>
                  <span className="text-white font-medium">
                    {formatarMoeda(n.espacoEsfera)}
                    <span className="text-white/40 font-normal">/hora</span>
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white/60">Domicílio</span>
                  <span className="text-white font-medium">
                    {formatarMoeda(n.domicilio)}
                    <span className="text-white/40 font-normal">/hora</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desconto de grupo */}
        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-8">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Desconto para aulas em grupo
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

        {/* Política de desconto */}
        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Política de desconto
          </p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-white/70">
                Acompanhamento (aulas regulares no período letivo)
              </span>
              <span className="text-white font-medium">-5%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Aulas pontuais</span>
              <span className="text-white/50 font-medium">sem desconto</span>
            </div>
          </div>
        </div>

        {/* Duração da aula */}
        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-4">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Duração da aula
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            Você define o horário de início — sem duração fixa pré-definida.
            Pela nossa experiência, aulas de cerca de{" "}
            <span className="text-white font-medium">2 horas</span> costumam
            render o melhor aproveitamento: tempo suficiente pra rever a teoria
            com calma e ainda praticar bastante, sem pressa.
          </p>
        </div>

        {/* Formas de pagamento */}
        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-8">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Formas de pagamento
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            PIX, boleto, cartão de débito ou cartão de crédito. Para valores a
            partir de R$ 1.500,00 no cartão de crédito, parcelamento em até 3x
            sem juros.
          </p>
          <p className="text-sm text-white/70 leading-relaxed">
            Para aulas em domicílio, quando a cobrança for realizada, será por
            meio de link de pagamento ou QR Code.
          </p>
          <p className="text-xs text-white/40 leading-relaxed mt-3">
            Todos os pagamentos são feitos diretamente ao ESFERA — nunca ao
            professor.
          </p>
        </div>

        {/* Prazo de cobrança */}
        <div className="rounded-2xl px-5 py-4 bg-white/5 border border-white/10 mb-8">
          <p className="text-xs font-medium text-white/60 uppercase tracking-wide mb-3">
            Quando a cobrança é enviada
          </p>
          <div className="flex flex-col gap-3 text-sm text-white/70 leading-relaxed">
            <p>
              <span className="text-white font-medium">Aulas pontuais:</span>{" "}
              cobrança enviada no dia seguinte à aula.
            </p>
            <p>
              <span className="text-white font-medium">Acompanhamento:</span> as
              aulas são cobradas quinzenalmente — aulas do dia 1 ao dia 15 são
              cobradas no dia 16, e aulas do dia 16 ao último dia do mês são
              cobradas no dia 1 do mês seguinte.
            </p>
          </div>
        </div>

        {/* Rodapé */}
        <p className="mt-8 text-center text-xs text-white/30">
          © ESFERA Aulas Particulares · Alameda Casa Branca, 393 · Jardim
          Paulista, São Paulo · CNPJ 65.277.896/0001-04
        </p>
      </div>
    </div>
  );
}
