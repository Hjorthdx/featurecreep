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
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        // Dropdowns
        slideDownAndFade: {
          from: { opacity: 0, transform: 'translateY(-2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideLeftAndFade: {
          from: { opacity: 0, transform: 'translateX(2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        slideUpAndFade: {
          from: { opacity: 0, transform: 'translateY(2px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideRightAndFade: {
          from: { opacity: 0, transform: 'translateX(-2px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        // Popups
        overlayShow: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        contentShow: {
          from: { opacity: 0, transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
        },
      },
      animation: {
        // Dropdowns
        slideDownAndFade: 'slideDownAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideLeftAndFade: 'slideLeftAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideUpAndFade: 'slideUpAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        slideRightAndFade: 'slideRightAndFade 400ms cubic-bezier(0.16, 1, 0.3, 1)',
        // Popups
        overlayShow: 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        contentShow: 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      },
      // Dune
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
  plugins: [require("windy-radix-palette"), plugin(function (helpers) {
    // variants that help styling Radix-UI components
    dataStateVariant('open', helpers)
    dataStateVariant('closed', helpers)
    dataStateVariant('on', helpers)
    dataStateVariant('checked', helpers)
    dataStateVariant('unchecked', helpers)
    dataStateVariant('valid', helpers)
    dataStateVariant('invalid', helpers)
  })],
};

function dataStateVariant(state, {
  addVariant, // for registering custom variants
  e           // for manually escaping strings meant to be used in class names
}) {

  addVariant(`data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`data-state-${state}${separator}${className}`)}[data-state='${state}']`
    })
  })

  addVariant(`group-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.group[data-state='${state}'] .${e(
        `group-data-state-${state}${separator}${className}`,
      )}`
    })
  })

  addVariant(`peer-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.peer[data-state='${state}'] ~ .${e(
        `peer-data-state-${state}${separator}${className}`,
      )}`
    })
  })
}

/*
function dataStateVariant(state, {
  addVariant, // for registering custom variants
  e           // for manually escaping strings meant to be used in class names
}) {

  addVariant(`data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.${e(`data-state-${state}${separator}${className}`)}[data-state='${state}']`
    })
  })

  addVariant(`group-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.group[data-state='${state}'] .${e(
        `group-data-state-${state}${separator}${className}`,
      )}`
    })
  })

  addVariant(`peer-data-state-${state}`, ({ modifySelectors, separator }) => {
    modifySelectors(({ className }) => {
      return `.peer[data-state='${state}'] ~ .${e(
        `peer-data-state-${state}${separator}${className}`,
      )}`
    })
  })
}
*/