module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dk-gray': '#1A1A1B'
      },
      width: {
        '90vw': '90vw',
      },
      height: {
        'c487': 'clamp(400px, 80vh, 700px)',
      },
      maxWidth: {
        'roman': '600px',
      },
      maxHeight: {
        'roman': '600px',
      },
      backgroundImage: {
        'custom-black': 'linear-gradient(to top left, #1d1d1d 0%, #000 100%)',
      },
    },
  },
  plugins: [],
}
