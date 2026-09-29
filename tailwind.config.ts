import type { Config } from "tailwindcss";
export default { content:["./app/**/*.tsx","./components/**/*.tsx"],
 theme:{extend:{colors:{bg:"#090917",primary:"#854ce6",tp:"#f2f3f4",ts:"#b1b2b3"},
 fontFamily:{sans:["var(--font-sans)","Poppins","sans-serif"]}}}} satisfies Config;
