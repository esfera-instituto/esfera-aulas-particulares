import type { Metadata } from "next";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ESFERA | Aulas particulares e apoio acadêmico",
  description: "Site institucional do ESFERA Aulas Particulares",
  icons: {
  icon: [
    { url: "/favicon.ico" },
    { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" }
  ],
  apple: [
    { url: "/apple-touch-icon.png", sizes: "180x180" }
  ]
}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />

        <a
  href="https://wa.me/5511953618314?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20as%20aulas%20particulares%20do%20ESFERA."
  target="_blank"
  rel="noopener noreferrer"
  aria-label="Falar com o ESFERA pelo WhatsApp"
  className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition hover:scale-105 hover:bg-green-600"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="white"
    className="h-7 w-7"
  >
    <path d="M16.04 2C8.84 2 3 7.79 3 14.92c0 2.63.77 5.08 2.1 7.15L3 30l8.16-2.1c1.98 1.08 4.23 1.65 6.5 1.65 7.2 0 13.04-5.79 13.04-12.92C30.7 7.79 23.86 2 16.04 2zm0 23.47c-2.05 0-4.06-.56-5.8-1.62l-.41-.24-4.84 1.25 1.29-4.7-.27-.43a10.27 10.27 0 01-1.62-5.5c0-5.64 4.66-10.22 10.4-10.22 5.73 0 10.4 4.58 10.4 10.22 0 5.64-4.67 10.24-10.4 10.24zm5.69-7.78c-.31-.16-1.82-.9-2.1-1-.27-.1-.47-.16-.67.16s-.77 1-.94 1.2c-.17.2-.34.22-.63.06-.31-.16-1.3-.47-2.48-1.5-.92-.82-1.55-1.83-1.73-2.13-.18-.31-.02-.47.13-.63.13-.13.31-.34.47-.51.16-.17.22-.29.33-.49.1-.2.05-.37-.02-.53-.06-.16-.67-1.6-.92-2.2-.24-.58-.48-.5-.67-.51l-.57-.01c-.2 0-.53.07-.8.37-.27.29-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.16.2 2.1 3.2 5.1 4.48.71.3 1.27.48 1.7.61.71.22 1.36.19 1.87.12.57-.08 1.82-.74 2.08-1.46.26-.72.26-1.34.18-1.46-.07-.12-.27-.2-.57-.37z"/>
  </svg>
</a>
      </body>
    </html>
  );
}
