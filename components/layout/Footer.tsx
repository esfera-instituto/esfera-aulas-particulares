import Link from "next/link";
import { Container } from "@/components/ui/Container";

export const Footer = () => (
  <footer className="mt-16 border-t border-slate-200 bg-white py-10">
    <Container className="grid gap-8 md:grid-cols-3">
      <div>
        <p className="text-lg font-semibold text-marinho">ESFERA</p>
        <p className="mt-2 text-sm text-slate-600">
          Aulas particulares e apoio acadêmico com organização pedagógica por nível de ensino e disciplina.
        </p>
      </div>
      <div>
        <p className="font-medium text-marinho">Navegação</p>
        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li><Link href="/ensino-fundamental">Ensino Fundamental</Link></li>
          <li><Link href="/ensino-medio">Ensino Médio</Link></li>
          <li><Link href="/ensino-superior">Ensino Superior</Link></li>
          <li><Link href="/psicopedagogia">Psicopedagogia</Link></li>
          <li><Link href="/equipe-docente">Equipe docente</Link></li>
          <li><Link href="/quem-somos">Quem somos</Link></li>
          <li><Link href="/contato">Contato</Link></li>
        </ul>
      </div>
      <div>
        <p className="font-medium text-marinho">Contato</p>

<p className="mt-3 text-sm text-slate-600">
  WhatsApp: (11) 95361-8314
</p>

<p className="text-sm text-slate-600">
  E-mail: esferaaulasparticulares@gmail.com
</p>

<p className="text-sm text-slate-600">
  Alameda Casa Branca, 393<br/>
  Jardim Paulista – São Paulo – SP
</p>
      </div>
    </Container>
  </footer>
);
