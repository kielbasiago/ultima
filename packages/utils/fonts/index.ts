import { Montserrat, Open_Sans, Roboto, Roboto_Mono } from "@next/font/google";
import localFont from "@next/font/local";

export const montserrat = Montserrat({
  variable: "--font-montserrat",
});
export const roboto = Roboto({
  weight: ["500", "700", "400"],
  variable: "--font-roboto",
});
export const robotoMono = Roboto_Mono({
  weight: ["500"],
  variable: "--font-mono",
});
export const ff3Header = localFont({
  src: "./runiccondensed.ttf",
  preload: true,
  variable: "--font-runic",
});
export const ff3Pixel = localFont({
  src: "./final_fantasy_36_font.ttf",
  variable: "--font-ff3",
});
export const openSans = Open_Sans({
  weight: ["300", "400", "500"],
  variable: "--font-open",
});
