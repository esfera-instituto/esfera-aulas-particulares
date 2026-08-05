"use client";

import { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

const links = [
  { href: "/", label: "Início" },
  { href: "/ensino-fundamental", label: "Ensino Fundamental" },
  { href: "/ensino-medio", label: "Ensino Médio" },
  { href: "/ensino-superior", label: "Ensino Superior" },
  { href: "/psicopedagogia", label: "Psicopedagogia" },
  { href: "/professores", label: "Equipe docente" },
  { href: "/quem-somos", label: "Quem somos" },
  { href: "/contato", label: "Contato" },
];

export const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);

  return (
    <header className="border-b border-slate-200 bg-white/95 backdrop-blur">
      <Container className="py-2">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setMenuAberto(false)}
          >
            <img
              src="/brand/esfera_logo_header.svg"
              alt="ESFERA"
              className="h-[60px]"
            />
          </Link>

          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-slate-300 text-slate-700 transition-colors hover:bg-slate-100 hover:text-marinho md:hidden"
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuAberto}
            onClick={() => setMenuAberto(!menuAberto)}
          >
            <span className="sr-only">
              {menuAberto ? "Fechar menu" : "Abrir menu"}
            </span>

            {menuAberto ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6"
              >
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </svg>
            )}
          </button>

          <nav className="hidden items-center gap-x-4 text-sm text-slate-600 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-marinho"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/investimento"
              className="rounded-lg bg-[#1566A0] px-4 py-2 text-white transition-colors hover:bg-[#1A7FBA]"
            >
              Investimento
            </Link>
            <Link
              href="/sala-do-aluno"
              className="rounded-lg bg-[#08364E] px-4 py-2 text-white transition-colors hover:bg-[#0a4a6a]"
            >
              Sala do(a) Aluno(a)
            </Link>
          </nav>
        </div>

        {menuAberto && (
          <nav className="mt-3 flex flex-col gap-1 border-t border-slate-200 pt-3 text-base text-slate-700 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 transition-colors hover:bg-slate-100 hover:text-marinho"
                onClick={() => setMenuAberto(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/investimento"
              className="rounded-md bg-[#1566A0] px-3 py-2.5 text-white transition-colors hover:bg-[#1A7FBA] mt-2 text-center"
              onClick={() => setMenuAberto(false)}
            >
              Investimento
            </Link>
            <Link
              href="/sala-do-aluno"
              className="rounded-md bg-[#08364E] px-3 py-2.5 text-white transition-colors hover:bg-[#0a4a6a] mt-2 text-center"
              onClick={() => setMenuAberto(false)}
            >
              Sala do(a) Aluno(a)
            </Link>
          </nav>
        )}
      </Container>
    </header>
  );
};
