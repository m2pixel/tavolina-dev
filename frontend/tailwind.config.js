module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        bgTableOn: "url('/public/bgTableOn.png')",
        bgTableOff: "url('/public/bgTableOff.png')",
      },
      fontFamily: {
        'space-grotesk': ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: '#EB5E28',
        secondary: '#02C39A',
        dark: '#240E47',
        darki: '#252422',
        tableOn: '#02C39A',
        tableOff: '#FF6B6B',
        layerBg: '#EDF2F4',
      },
    },
  },
  plugins: [],
}
