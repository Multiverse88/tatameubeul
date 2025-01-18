export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ffffff',
        'secondary': '#f8f8f8',
        'accent': '#333333',
        'text': '#1a1a1a'
      },
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
      },
      height: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}