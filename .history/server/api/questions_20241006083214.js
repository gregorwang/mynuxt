export default defineEventHandler((event) => {
    // 模拟一些问题数据
    return [
      {
        question: 'What is the capital of France?',
        options: ['Berlin', 'London', 'Paris', 'Madrid'],
        answer: 'Paris'
      },
      {
        question: 'Which language is primarily used for web development?',
        options: ['Python', 'JavaScript', 'C++', 'Java'],
        answer: 'JavaScript'
      },
      // 可以添加更多问题
    ]
  })
  