export const categorySlugs = {
  Grammar: 'grammar',
  Vocabulary: 'vocabulary',
  Listening: 'listening',
  Reading: 'reading',
  Writing: 'writing',
  Speaking: 'speaking',
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
}

export const categoryImages = {
  Grammar: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=600&q=80',
  Vocabulary: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=600&q=80',
  Listening: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=600&q=80',
  Reading: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80',
  Writing: 'https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=600&q=80',
  Speaking: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80',
}

export const levelLabels = [
  { cefr: 'A1', title: 'Elementary' },
  { cefr: 'A2', title: 'Pre-Intermediate' },
  { cefr: 'B1', title: 'Intermediate' },
  { cefr: 'B2', title: 'Upper Intermediate' },
  { cefr: 'C1', title: 'Pre-Advanced' },
  { cefr: 'C2', title: 'Advanced' },
]

export const grammarLevelLabels = [
  {
    cefr: 'A1',
    title: 'Beginner',
    description: '1. Beginner Grammar Materials',
    folder: 'Grammar/1. Beginner',
    focus: 'Pronouns, To Be, Simple Past, and Simple Present',
  },
  {
    cefr: 'B1',
    title: 'Intermediate',
    description: '2. Intermediate Grammar Materials',
    folder: 'Grammar/2. Intermediate',
    focus: 'Present Perfect, Past Perfect, and Past Continuous',
  },
  {
    cefr: 'C1',
    title: 'Advance',
    description: '3. Advance Grammar Materials',
    folder: 'Grammar/3. Advance',
    focus: 'Advanced Linkers, Conjunctions, Wish, and If Only',
  },
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

export const buildCategoryLevelCards = (category) => {
  const labels = category === 'Grammar' ? grammarLevelLabels : levelLabels

  return labels.map((level) => ({
    cefr: level.cefr,
    title: category === 'Grammar' ? `${level.title} Grammar` : `${level.title} Lab`,
    description: level.description ?? `${level.cefr} ${category} Test`,
    meta: level.focus,
    folder: level.folder,
    image: categoryImages[category],
  }))
}

const getCategoryLevelDescription = (category, levelCode) =>
  category === 'Grammar'
    ? grammarLevelLabels.find((level) => level.cefr === levelCode)?.description
    : null

export const buildCategoryLevelPage = (category, levelCode) => ({
  title: getCategoryLevelDescription(category, levelCode) ?? `${levelCode} ${category} Test`,
  displayLevel: category === 'Grammar'
    ? grammarLevelLabels.find((level) => level.cefr === levelCode)?.title
    : levelCode,
  folder: category === 'Grammar'
    ? grammarLevelLabels.find((level) => level.cefr === levelCode)?.folder
    : `${category}/${levelCode}`,
  focus: category === 'Grammar'
    ? grammarLevelLabels.find((level) => level.cefr === levelCode)?.focus
    : null,
  lessons: lessonTopics,
})
