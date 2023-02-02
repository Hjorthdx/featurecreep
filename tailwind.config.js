/** @type {import('tailwindcss').Config} */

// Why not use this for the background images of the different dune leaders?
// Because:
/*
in Tailwind you can't use dynamic class naming like bg-${color}.

This because when Tailwind compiles its CSS, it looks up over all of your code and checks if a class name matches.

If you want dynamic name classes you should write all the class name.

But for your specific use case, I would not use the JIT of Tailwind and instead use the style attribute and dynamically change the backgroundColor value.
https://stackoverflow.com/questions/72481680/tailwinds-background-color-is-not-being-applied-when-added-dynamically
*/

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'Earl-Memnon-Thorvald': "url('/Earl Memnon Thorvald.png')",
        'Countess-Ariana-Thorvald': "url('/Countess Ariana Thorvald.png')",
        'Paul-Atreides': "url('/Paul Atreides.png')",
        'Duke-Leto-Atreides': "url('/Duke Leto Atreides.png')",
        'Glossu-The-Beast-Rabban': "url('/Glossu The Beast Rabban.png')",
        'Baron-Vladimir-Harkonnen': "url('/Baron Vladimir Harkonnen.png')",
        'Count-Ilban-Richese': "url('/Count Ilban Richese.png')",
        'Helena-Richese': "url('/Helena Richese.png')",
        'Princess-Yuna-Moritani': "url('/Princess Yuna Moritani.png')",
        'Viscount-Hundro-Moritani': "url('/Viscount Hundro Moritani.png')",
        'Ilesa-Ecaz': "url('/Ilesa Ecaz.png')",
        'Archduke-Armand-Ecaz': "url('/Archduke Armand Ecaz.png')",
        'Tessia-Vernius': "url('/Tessia Vernius.png')",
        'Prince-Rhombur-Vernius': "url('/Prince Rhombur Vernius.png')",
      }
    },
  },
  plugins: [],
};
