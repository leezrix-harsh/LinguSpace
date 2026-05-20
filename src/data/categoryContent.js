export const categorySlugs = {
  Grammar: 'grammar',
  Vocabulary: 'vocabulary',
  Listening: 'listening',
  Reading: 'reading',
  Writing: 'writing',
  Speaking: 'speaking',
  Exams: 'exams',
}

const angelicaPortrait = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80'

export const categoryTeachers = {
  Grammar: {
    name: 'Mrs. Angelica Lusy, M.Ed.',
    role: 'Grammar Specialist',
    image: angelicaPortrait,
    greeting: 'Hello, Students!',
    message:
      "I can't wait to guide you through the entire process of learning English. I'm so happy to be a part of your journey. Let me know if you run into any obstacles. I'm always here for you.",
  },
  Vocabulary: {
    name: 'Mrs. Angelica Lusy, M.Ed.',
    role: 'Vocabulary Specialist',
    image: angelicaPortrait,
    greeting: 'Hello, Students!',
    message:
      'Build useful words, phrases, and expressions step by step. Keep practicing with examples, and your English will become clearer every week.',
  },
  Listening: {
    name: 'Mrs. Angelica Lusy, M.Ed.',
    role: 'Listening Specialist',
    image: angelicaPortrait,
    greeting: 'Hello, Students!',
    message:
      "I can't wait to guide you through the entire process of learning to be a good listener in English. I'm so happy to be a part of your journey. Let me know if you run into any obstacles. I'm always here for you.",
  },
  Reading: {
    name: 'Mrs. Angelica Lusy, M.Ed.',
    role: 'Reading Specialist',
    image: angelicaPortrait,
    greeting: 'Hello, Students!',
    message:
      'Read carefully, notice new vocabulary, and connect ideas across each text. These lessons will help you become a stronger and more confident reader.',
  },
  Writing: {
    name: 'Mrs. Angelica Lusy, M.Ed.',
    role: 'Writing Specialist',
    image: angelicaPortrait,
    greeting: 'Hello, Students!',
    message:
      'Writing improves when you plan, draft, revise, and polish your ideas. Use each lesson to make your sentences clearer and your paragraphs stronger.',
  },
  Speaking: {
    name: 'Mrs. Angelica Lusy, M.Ed.',
    role: 'Speaking Specialist',
    image: angelicaPortrait,
    greeting: 'Hello, Students!',
    message:
      'Speaking is built through brave practice. These lessons will help you share ideas, answer questions, and sound more natural in English.',
  },
  Exams: {
    name: 'Mrs. Angelica Lusy, M.Ed.',
    role: 'Exam Preparation Specialist',
    image: angelicaPortrait,
    greeting: 'Hello, Students!',
    message:
      'Prepare calmly and consistently. These exam lessons help you review skills, understand question types, and practice with confidence.',
  },
}

export const categoryImages = {
  Grammar: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
  Vocabulary: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
  Listening: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  Reading: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=600&q=80',
  Writing: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80',
  Speaking: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
  Exams: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
}

export const levelLabels = [
  { cefr: 'A1', title: 'Elementary' },
  { cefr: 'A2', title: 'Pre-Intermediate' },
  { cefr: 'B1', title: 'Intermediate' },
  { cefr: 'B2', title: 'Upper Intermediate' },
  { cefr: 'C1', title: 'Pre-Advanced' },
  { cefr: 'C2', title: 'Advanced' },
]

export const lessonTopics = [
  {
    title: 'Giving the information about clothes',
    image: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Tell me about your family members.',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: "Let's talk about your food and drinks.",
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'How to introduce yourself?',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'What are your friends like?',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80',
  },
]

export const buildCategoryLevelCards = (category) =>
  levelLabels.map((level) => ({
    cefr: level.cefr,
    title: `${level.title} Lab`,
    description: `${level.cefr} ${category} Test`,
    image: categoryImages[category],
  }))

export const buildCategoryLevelPage = (category, levelCode) => ({
  title: `${levelCode} ${category} Test`,
  lessons: lessonTopics,
})
