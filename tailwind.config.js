/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: { extend: {} },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [{
      bazar: {
        primary: "#15803d", "primary-content": "#ffffff",
        secondary: "#b45309", accent: "#0f766e", neutral: "#1c1917",
        "base-100": "#ffffff", "base-200": "#f6f5f0", "base-300": "#e7e5de",
        info: "#0369a1", success: "#15803d", warning: "#d97706", error: "#dc2626",
      },
    }],
  },
};
