import Link from "next/link";

interface CTABoxProps {
  title: string;
  description: string;
  href: string;
  buttonLabel: string;
}

export const CTABox = ({ title, description, href, buttonLabel }: CTABoxProps) => (
  <div className="rounded-2xl bg-marinho p-8 text-slate-50">
    <h3 className="text-2xl font-semibold">{title}</h3>
    <p className="mt-3 max-w-2xl text-slate-200">{description}</p>
    <Link
      href={href}
      className="mt-6 inline-flex rounded-lg bg-white px-4 py-2 text-sm font-medium text-marinho hover:bg-slate-100"
    >
      {buttonLabel}
    </Link>
  </div>
);
