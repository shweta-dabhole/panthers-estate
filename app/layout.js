import { Geist, Geist_Mono, Montserrat, Poppins, Roboto, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Panther's Estate - Creative Portfolio",
  description: "Showcasing high-end digital design, photography, and premium architectural spaces.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${poppins.variable} ${roboto.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <Script
        id="popstate-interceptor"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            // NUCLEAR POPSTATE INTERCEPTOR
            window.addEventListener("popstate", function(e) {
              e.stopImmediatePropagation();
              window.location.reload();
            }, true);
            // GLOBAL DOM HEALER (BFCache Fix)
            window.addEventListener("pageshow", function(e) {
              setTimeout(function() {
                document.querySelectorAll('video').forEach(function(v) {
                  if (v.paused) v.play().catch(function(err) { console.log('Autoplay prevented', err); });
                });
                var preLoader = document.querySelector('.pre-loader');
                if (preLoader) preLoader.style.display = 'none';
                var taxiTransition = document.querySelector('.taxi-transition');
                if (taxiTransition) taxiTransition.style.display = 'none';
                document.body.style.pointerEvents = 'auto';
              }, 100);
            });
          `,
        }}
      />
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
