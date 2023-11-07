/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      screens: {
        // When the screen is at least 500px in both width and height
        "sm-xy": {
          raw: "(min-height: 500px) and (min-width: 500px)",
        },
      },
    },
  },
  plugins: [],
};
