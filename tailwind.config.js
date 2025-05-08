import daisyui from "daisyui";

export default {
  darkMode: "class", // Asegura que el modo oscuro se controle con una clase
  daisyui: {
    themes: [
      {
        dark: {
          primary: "var(--primary)",    // Usa la variable CSS para el color primario
        secondary: "var(--secondary)", // Usa la variable CSS para el color secundario
        third: "var(--third)",  
          // Agrega más colores si es necesario
        },
      },
    ],
  },
  theme: {
    extend: {
      colors: {
        primary: '#FF5C8D', // Rosa claro
        secondary: '#4F85B1', // Azul suave
        third: '#2D3748', // Gris oscuro
      },
    },
  },
  plugins: [daisyui],
};
