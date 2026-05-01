import Link from "next/link";
import { Disciplina } from "@/lib/types";

const disciplinaConfig: Record<
  string,
  { cor: string; corTexto: string; corBorda: string; icone: string }
> = {
  matematica: {
    cor: "bg-blue-50",
    corTexto: "text-blue-700",
    corBorda: "border-blue-200 hover:border-blue-400",
    icone: "∑",
  },
  fisica: {
    cor: "bg-orange-50",
    corTexto: "text-orange-700",
    corBorda: "border-orange-200 hover:border-orange-400",
    icone: "⚡",
  },
  quimica: {
    cor: "bg-green-50",
    corTexto: "text-green-700",
    corBorda: "border-green-200 hover:border-green-400",
    icone: "⚗",
  },
  biologia: {
    cor: "bg-emerald-50",
    corTexto: "text-emerald-700",
    corBorda: "border-emerald-200 hover:border-emerald-400",
    icone: "🧬",
  },
  "lingua-portuguesa": {
    cor: "bg-rose-50",
    corTexto: "text-rose-700",
    corBorda: "border-rose-200 hover:border-rose-400",
    icone: "A",
  },
  "lingua-inglesa": {
    cor: "bg-sky-50",
    corTexto: "text-sky-700",
    corBorda: "border-sky-200 hover:border-sky-400",
    icone: "En",
  },
  historia: {
    cor: "bg-amber-50",
    corTexto: "text-amber-700",
    corBorda: "border-amber-200 hover:border-amber-400",
    icone: "📜",
  },
  geografia: {
    cor: "bg-teal-50",
    corTexto: "text-teal-700",
    corBorda: "border-teal-200 hover:border-teal-400",
    icone: "🌎",
  },
  ciencias: {
    cor: "bg-cyan-50",
    corTexto: "text-cyan-700",
    corBorda: "border-cyan-200 hover:border-cyan-400",
    icone: "🔬",
  },
  filosofia: {
    cor: "bg-purple-50",
    corTexto: "text-purple-700",
    corBorda: "border-purple-200 hover:border-purple-400",
    icone: "φ",
  },
  calculo: {
    cor: "bg-blue-50",
    corTexto: "text-blue-700",
    corBorda: "border-blue-200 hover:border-blue-400",
    icone: "∫",
  },
  "algebra-linear": {
    cor: "bg-indigo-50",
    corTexto: "text-indigo-700",
    corBorda: "border-indigo-200 hover:border-indigo-400",
    icone: "M",
  },
  "vetores-e-geometria-analitica": {
    cor: "bg-violet-50",
    corTexto: "text-violet-700",
    corBorda: "border-violet-200 hover:border-violet-400",
    icone: "→",
  },
  estatistica: {
    cor: "bg-pink-50",
    corTexto: "text-pink-700",
    corBorda: "border-pink-200 hover:border-pink-400",
    icone: "σ",
  },
  programacao: {
    cor: "bg-slate-50",
    corTexto: "text-slate-700",
    corBorda: "border-slate-200 hover:border-slate-400",
    icone: "</>",
  },
  "matematica-elementar": {
    cor: "bg-blue-50",
    corTexto: "text-blue-700",
    corBorda: "border-blue-200 hover:border-blue-400",
    icone: "π",
  },
  "otimizacao-linear": {
    cor: "bg-lime-50",
    corTexto: "text-lime-700",
    corBorda: "border-lime-200 hover:border-lime-400",
    icone: "↗",
  },
  "otimizacao-nao-linear": {
    cor: "bg-yellow-50",
    corTexto: "text-yellow-700",
    corBorda: "border-yellow-200 hover:border-yellow-400",
    icone: "∿",
  },
  "matematica-financeira": {
    cor: "bg-green-50",
    corTexto: "text-green-700",
    corBorda: "border-green-200 hover:border-green-400",
    icone: "$",
  },
  "equacoes-diferenciais": {
    cor: "bg-orange-50",
    corTexto: "text-orange-700",
    corBorda: "border-orange-200 hover:border-orange-400",
    icone: "δ",
  },
  contabilidade: {
    cor: "bg-stone-50",
    corTexto: "text-stone-700",
    corBorda: "border-stone-200 hover:border-stone-400",
    icone: "₿",
  },
  microeconomia: {
    cor: "bg-emerald-50",
    corTexto: "text-emerald-700",
    corBorda: "border-emerald-200 hover:border-emerald-400",
    icone: "μ",
  },
  macroeconomia: {
    cor: "bg-teal-50",
    corTexto: "text-teal-700",
    corBorda: "border-teal-200 hover:border-teal-400",
    icone: "M",
  },
  econometria: {
    cor: "bg-cyan-50",
    corTexto: "text-cyan-700",
    corBorda: "border-cyan-200 hover:border-cyan-400",
    icone: "β",
  },
};

const defaultConfig = {
  cor: "bg-slate-50",
  corTexto: "text-slate-700",
  corBorda: "border-slate-200 hover:border-slate-400",
  icone: "★",
};

type Props = {
  disciplina: Disciplina;
  nivelSlug: string;
};

export const DisciplinaCard = ({ disciplina, nivelSlug }: Props) => {
  const config = disciplinaConfig[disciplina.slug] ?? defaultConfig;

  return (
    <Link
      href={`/${nivelSlug}/${disciplina.slug}`}
      className={`group flex flex-col gap-4 rounded-xl border-2 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md ${config.corBorda}`}
    >
      {/* Ícone */}
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-lg text-xl font-bold ${config.cor} ${config.corTexto}`}
      >
        {config.icone}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col">
        <h3 className="text-base font-semibold text-marinho">
          {disciplina.nome}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">
          {disciplina.descricao}
        </p>
      </div>

      {/* Link */}
      <span
        className={`text-sm font-medium ${config.corTexto} flex items-center gap-1`}
      >
        Ver disciplina
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
        >
          <path
            fillRule="evenodd"
            d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </Link>
  );
};
