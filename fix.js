const fs = require('fs');
const layout = [
  'import { Header } from "@/components/layout/Header";',
  'import { Footer } from "@/components/layout/Footer";',
  'import { ReactNode } from "react";',
  '',
  'export default function SiteLayout({ children }: { children: ReactNode }) {',
  '  const numero = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";',
  '  const mensagem = encodeURIComponent("Ola, vim pelo site do ESFERA e gostaria de mais informacoes.");',
  '  const linkWhatsApp = "https://wa.me/" + numero + "?text=" + mensagem;',
  '  return (',
  '    <>',
  '      <Header />',
  '      <main>{children}</main>',
  '      <Footer />',
  '      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">',
  '        <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 shadow-lg transition hover:bg-green-600">',
  '          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="white" className="h-7 w-7"><path d="M16 .396C7.164.396 0 7.56 0 16.396c0 2.89.756 5.604 2.07 7.97L.396 32l7.82-1.63a15.93 15.93 0 007.784 2.02h.006c8.835 0 16-7.164 16-16S24.835.396 16 .396zm0 29.2a13.1 13.1 0 01-6.674-1.82l-.48-.284-4.64.967.987-4.526-.313-.465A13.1 13.1 0 012.9 16.396C2.9 9.36 8.964 3.296 16 3.296s13.1 6.064 13.1 13.1-6.064 13.1-13.1 13.1zm7.36-9.7c-.4-.2-2.36-1.164-2.726-1.296-.366-.133-.633-.2-.9.2-.266.4-1.033 1.296-1.266 1.56-.233.266-.466.3-.866.1-.4-.2-1.69-.623-3.22-1.987-1.19-1.06-1.993-2.366-2.226-2.766-.233-.4-.025-.616.175-.816.18-.18.4-.466.6-.7.2-.233.266-.4.4-.666.133-.266.066-.5-.033-.7-.1-.2-.9-2.166-1.233-2.966-.325-.78-.655-.674-.9-.686l-.766-.014c-.266 0-.7.1-1.066.5-.366.4-1.4 1.366-1.4 3.333 0 1.966 1.433 3.866 1.633 4.133.2.266 2.82 4.3 6.833 6.033.955.412 1.7.658 2.28.842.958.304 1.83.26 2.52.158.77-.114 2.36-.966 2.693-1.9.333-.933.333-1.733.233-1.9-.1-.166-.366-.266-.766-.466z" /></svg>',
  '        </a>',
  '        <a href="https://instagram.com/esferaaulasparticulares" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 shadow-lg transition hover:opacity-90">',
  '          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>',
  '        </a>',
  '        <a href="https://youtube.com/@esferaaulasparticulares" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 shadow-lg transition hover:bg-red-700">',
  '          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="h-7 w-7"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>',
  '        </a>',
  '      </div>',
  '    </>',
  '  );',
  '}'
].join('\n');
fs.writeFileSync('app/(site)/layout.tsx', layout, { encoding: 'utf8' });
console.log('ok');