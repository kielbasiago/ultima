import { Montserrat, Open_Sans, Roboto, Roboto_Mono } from "@next/font/google";
import localFont from "@next/font/local";

export const montserrat = Montserrat();
export const roboto = Roboto({ weight: ["500", "700", "400"] });
export const robotoMono = Roboto_Mono({ weight: ["500"] });
export const ff3Header = localFont({ src: "./runiccondensed.ttf" });
export const openSans = Open_Sans({ weight: ["300", "400", "500"] });
