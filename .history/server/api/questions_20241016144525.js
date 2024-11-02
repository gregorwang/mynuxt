export default defineEventHandler((event) => {
  // 模拟一些问题数据，包含音频路径和图片路径
  return [
    {
      question: 'What is the capital of France?',
      options: ['Berlin', 'London', 'Paris', 'Madrid'],
      answer: 'Paris',
      audio: '/audio/paris.mp3'  // 本地音频文件路径
    },
    {
      question: 'Which language is primarily used for web development?',
      options: ['Python', 'JavaScript', 'C++', 'Java'],
      answer: 'JavaScript',
      audio: '/audio/paris.mp3'  // 本地音频文件路径
    },
    // 可以添加更多问题
  ]
})

