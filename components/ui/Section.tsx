import { ReactNode } from "react";
import { Container } from "./Container";

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export const Section = ({ title, description, children, className = "" }: SectionProps) => (
  <section className={`py-14 sm:py-16 ${className}`}>
    <Container>
      {(title || description) && (
        <div className="mb-8 max-w-3xl">
          {title && <h2 className="text-2xl font-semibold text-marinho sm:text-3xl">{title}</h2>}
          {description && <p className="mt-3 text-slate-600">{description}</p>}
        </div>
      )}
      {children}
    </Container>
  </section>
);
