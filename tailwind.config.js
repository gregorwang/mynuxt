module.exports = {
  content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    screen: {
      'xs': '320px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      scale: {
        '200': '2',
      }, 
      colors: {
        dimgray: '#303030',
        lightblue: '#ADD8E6',
        'custom-yellow1': '#f8cf8d',
        'custom-yellow2': '#d87a16', // 自定义颜色
      },
      spacing: {
        '75': '18.75rem',
        '15': '3.75rem', // 自定义 spacing 类
      },
    },
  },
  darkMode: 'media', // 或者直接删除这一行
  plugins: [],
}
