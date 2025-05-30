/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      // Here we can configure default fonts on the project. We can use this in the className of each component.
      fontFamily: {
        main: ["Montserrat"],
        alata: ["Montserrat"],
        //arial: ["Arial"],
        // sans: ["Arial", "Inter", "sans-serif"],
      },
      // Here we can configure the colors of the project. We can use this in the className of each component.
      colors: {
        "main-colory": "#6E3CD2",
        "secondary-color": "#C0185D",
        "black-color": "#000000",
        "background-color": "#F5F5F5",
        "header-color": "#FAFAFA",
        "title-color": "#6E3CD2",
        "subtitle-color": "#002751",
        "subtitle-color-qa": "#8117b9",
        "paragraph-color": "#FBFBFB",
        "paragraph-light-color": "#8f8f8f",
        "instruction-color": "#FFCB31",
        "instruction-color-background": "#E7FD601F",
        "secondary-color-background": "#C0185D33",
        "correct-feedback": "#4CAF50",
        "incorrect-feedback": "#F44336",
        "acordion": "#ffffff",
        "introduccion": "#64748b",
        "button-figma": "#102044",
        "response-figma": "#808693",
        "button-figma": "#102044"
      },
      // Here we can configure the sizes of the project. We can use this in the className of each component.
      fontSize: {
        "title-size": "25px",
        "momento-size": "40px",
        "momento-size-mobile": "30px",
        'subtitle-size': '25px',
        "p-size": "16px",
        'instructions-size': '14px',
        'button-size': '16px',
      },
      boxShadow: {
        border: "0 0 0 2px white, 0 0 0 3.5px #6e3cd2",
      },
    },
  },
  plugins: [],
};
