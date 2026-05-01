import Link from "next/link";
import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
  className?: string;
  href?: string;
  title?: string;
  meta?: string;
  description?: string;
  image?: string;
  actionLabel?: string;
};

export const Card = ({
  children,
  className = "",
  href,
  title,
  meta,
  description,
  image,
  actionLabel,
}: CardProps) => {
  const classes =
    "group rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md " +
    className;

  const content = (
    <>
      {image && (
        <img
          src={image}
          alt={title ?? ""}
          className="mb-4 h-40 w-full rounded-lg object-cover"
        />
      )}

      {title && <h3 className="text-lg font-semibold text-marinho">{title}</h3>}

      {meta && (
        <p className="mt-1 text-sm font-medium text-slate-500">{meta}</p>
      )}

      {description && (
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      )}

      {children}

      {href && actionLabel && (
        <span className="mt-4 inline-block text-sm font-medium text-marinho">
          {actionLabel}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return <div className={classes}>{content}</div>;
};
