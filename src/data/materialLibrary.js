import {
  getSpeakingWorksheetContent,
  getWritingWorksheetContent,
} from './worksheetContent.js'

export const materialFilePaths = [
  'Grammar/1. Beginner/1. Pronouns/download (52).jpg',
  'Grammar/1. Beginner/1. Simple Past Tense/Past Simple tense.jpg',
  'Grammar/1. Beginner/2. To Be/download (53).jpg',
  'Grammar/1. Beginner/2. To Be/to be (Past tense).jpg',
  'Grammar/1. Beginner/3. Simple Present Tense/Present Simple tense.jpg',
  'Grammar/2. Intermediate/1. Past Perfect Tense/Past Perfect Tense in English - English Study Here.jpg',
  'Grammar/2. Intermediate/1. Present Perfect Tense/download (54).jpg',
  'Grammar/2. Intermediate/2. Past Continuous Tense/İngilizce zamanlar.jpg',
  'Grammar/3. Advance/1. Advanced Linkers & Conjunction/download (57).jpg',
  'Grammar/3. Advance/2. Wish-If Only/Wish and If Only_ Usage, Forms, and Examples.jpg',
  'Vocabulary/A1/1. office/Office Vocabulary A1.mp4',
  'Vocabulary/A1/2. personal objects/2. body_parts_-_exercises_0.pdf',
  'Vocabulary/A1/2. personal objects/download (31).jpg',
  'Vocabulary/A1/2. personal objects/Personal Objects Vocabulary A1.mp4',
  'Vocabulary/A1/3. adjectives/Adjectives Vocabulary A1.mp4',
  'Vocabulary/A1/4. sport/Sports Vocabulary A1.mp4',
  'Vocabulary/A1/5. job/Jobs Vocabulary A1.mp4',
  'Vocabulary/A2/1. body parts/Body Vocabulary A1-A2.mp4',
  'Vocabulary/A2/2. pain & illness/Pains and Illnesses Vocabulary A1-A2.mp4',
  'Vocabulary/A2/3. routine/Routine Verbs A1-A2.mp4',
  'Vocabulary/A2/4. greetings/Greetings Vocabulary A1-A2.mp4',
  'Vocabulary/A2/5. countries & nationalities/Countries and Nationalities Vocabulary A1-A2.mp4',
  'Vocabulary/B1/fast_phrasal_comic_-_annabel.pdf',
  'Vocabulary/B1/fast_phrasal_comic_-_family_0.pdf',
  'Vocabulary/B1/fast_phrasal_comic_-_shopping.pdf',
  'Vocabulary/B1/fast_phrasal_comic_-_the_beach.pdf',
  'Vocabulary/B1/fast_phrasals_comic_-_best_mates.pdf',
  'Vocabulary/B2/fast_phrasal_comic_-the_job.pdf',
  'Vocabulary/B2/fast_phrasal_comic_-_the_payback.pdf',
  'Vocabulary/B2/fast_phrasal_comic_-_the_project.pdf',
  'Vocabulary/B2/fast_phrasal_comic_-_the_trials.pdf',
  'Vocabulary/B2/fast_phrasals_comic_-_the_party.pdf',
  'Vocabulary/C1/video vocab c1 (1).mp4',
  'Vocabulary/C1/vocab c1 (2).mp4',
  'Vocabulary/C2/Climate Change Debate _ Kriti Joshi _ Opposition.mp4',
  'Listening/A1 - Elementary/1. A1-AUDIO 1/A1  Clothes  3-minute Podcast with Cathoven  English Listening Practice for Beginners - Cathoven A.I..mp3',
  'Listening/A1 - Elementary/2. A1-AUDIO 2/A1 - Family Members  3-Minute Podcast with Cathoven  Beginner English Listening Practice - Cathoven A.I..mp3',
  'Listening/A1 - Elementary/3. A1-AUDIO 3/A1 - Foods & Drinks  3-Minute Podcast with Cathoven  Beginner Level English Listening Practice - Cathoven A.I..mp3',
  'Listening/A1 - Elementary/4. A1-AUDIO 4/A1 - How to Introduce Yourself - Dialog  3-Minute Podcast with Cathoven English Listening Practice - Cathoven A.I..mp3',
  'Listening/A1 - Elementary/5. A1-AUDIO 5/A1_describing_people.mp3',
  'Listening/A2 - Pre-Intermediate/A2 - How to Order Food via Phone Call  3-Minute Podcast with Cathoven  English Listening Practice.mp3',
  'Listening/A2 - Pre-Intermediate/A2 Level 3-Minute Podcast with Cathoven - My Morning Routine - Beginner English Listening Practice.mp3',
  'Listening/A2 - Pre-Intermediate/A2_giving_directions.mp3',
  'Listening/A2 - Pre-Intermediate/A2_going_to-the_cinema.mp3',
  'Listening/A2 - Pre-Intermediate/A2_shopping_for_clothes.mp3',
  'Listening/B1 - Intermediate/B1  A Cozy Christmas Story  3-Minute Podcast with Cathoven  English Listening Practice.mp3',
  'Listening/B1 - Intermediate/B1  New Year Resolutions for 2025  3-Minute Podcast with Cathoven  English Listening Practice.mp3',
  'Listening/B1 - Intermediate/B1  Take on - Take off - Take in - Take up - Phrasal Verbs Definitions and Examples.mp3',
  'Listening/B1 - Intermediate/B1 - Traveling to Japan  3-Minute Podcast with Cathoven  English Listening Practice.mp3',
  'Listening/B1 - Intermediate/B1 Level 3-Minute Podcast with Cathoven - History of Olympic Games - English Listening Practice.mp3',
  'Listening/B2 - Upper Intermediate/A Halloween Story  - Learn English with Stories  3-Minute Podcast with Cathoven.mp3',
  'Listening/B2 - Upper Intermediate/B2  What is Climate Change_  3-Minute Podcast with Cathoven  English Listening Practice.mp3',
  'Listening/B2 - Upper Intermediate/B2 - Idiom_ Let the Cat Out of the Bag  3-Minute Podcast with Cathoven  English Listening Practice.mp3',
  'Listening/B2 - Upper Intermediate/B2 Level - 3-Minute Podcast with Cathoven - Understanding U.S. Presidential Elections - Listening.mp3',
  'Listening/B2 - Upper Intermediate/B2 Level - 3-Minute Podcast with Cathoven - What is monkeypox (mpox)_ - English Listening Practice.mp3',
  'Listening/C1 - Pre-Advanced/C1  Pride and Prejudice A Short Summary  3-Minute Podcast with Cathoven  Advanced English.mp3',
  'Listening/C1 - Pre-Advanced/C1  Pride and Prejudice A Short Summary _.mp3',
  'Listening/C1 - Pre-Advanced/C1  Summary of A Christmas Carol by Charles Dickens  3-Minute Podcast with Cathoven  Advanced.mp3',
  'Listening/C1 - Pre-Advanced/C1 - Graffiti and Street Art  3-Minute Podcast with Cathoven  Fast English Listening Practice.mp3',
  'Listening/C1 - Pre-Advanced/C1 - Hobbies & Health - 3-Minute Podcast with Cathoven - Advanced English Listening Practice.mp3',
  'Listening/C1 - Pre-Advanced/C1_wars_silver_lining.mp3',
  'Listening/C2 - Advanced/C2 - Beware the Power of Prediction  Carissa Véliz  TED.mp3',
  'Listening/C2 - Advanced/C2 - How to sound smart in your TEDx Talk  Will Stephen  TEDxNewYork.mp3',
  'Reading/A1/1. The Lost Dog.png',
  'Reading/A1/2. a_thank-you_email_-_email_3.pdf',
  'Reading/A1/3. at_the_restaurant_-_menu_2.pdf',
  'Reading/A1/4. at_the_swimming_pool_-_notice.pdf',
  'Reading/A1/5. can_you_cook_-_article.pdf',
  'Reading/A2/1. 7_tips_for_a_tidy_desk_-_tips.pdf',
  'Reading/A2/2. a_restaurant_menu_-_menu_0.pdf',
  'Reading/A2/3. a_train_timetable_-_timetable_and_ticket_1.pdf',
  'Reading/A2/4. films_and_entertainment_-_article_1.pdf',
  'Reading/A2/5. finding_a_job_-_adverts_0.pdf',
  'Reading/B1/1. adventure_travel_-_holiday_brochure_1.pdf',
  'Reading/B1/2. food_and_restaurants_-_article_1.pdf',
  'Reading/B1/3. foreign_exchange_emails_-_emails_0.pdf',
  'Reading/B1/4. an_olympic_blog_-_blog_1.pdf',
  'Reading/B1/5. skills_for_the_21st-century_workplace_-_article_0.pdf',
  'Reading/B2/1. are_zoos_a_good_thing_-_article_0.pdf',
  'Reading/B2/2. leaving_home_-_article_0.pdf',
  'Reading/B2/3. fomo_-_text_0.pdf',
  'Reading/B2/4. video_games_are_good_for_you_-_article_0.pdf',
  'Reading/B2/5. the_end_of_life_on_earth_-_article_0.pdf',
  'Reading/C1/1. are_we_losing_the_art_of_conversation_-_text_0.pdf',
  'Reading/C1/2. how_to_be_happy_-_text.pdf',
  'Reading/C1/3. robots_friend_or_foe_-_text.pdf',
  'Reading/C1/4. do_you_have_the_right_mindset_-_text.pdf',
  'Reading/C1/5. me_and_my_brain_-_text.pdf',
  'Reading/C2/1. The man and the river-Audio Book.mp3',
  'Reading/C2/2. what_do_you_know_about_spiders_-_text_0.pdf',
  'Writing/A1/1. about_my_family_-_email_3.pdf',
  'Writing/A1/2. applying_for_a_job_-_adverts_and_email_4.pdf',
  'Writing/A1/3. introducing_yourself_by_email_-_email_1.pdf',
  'Writing/A1/4. my_favourite_meal_-_text_2.pdf',
  'Writing/A1/5. at_school_-_timetable_5.pdf',
  'Writing/A2/1. film_review_-_text_1.pdf',
  'Writing/A2/2. a_postcard_from_new_york_-_postcard_1.pdf',
  'Writing/A2/3. a_chat_-_text.pdf',
  'Writing/A2/4. a_recipe_-_text_3.pdf',
  'Writing/A2/5. social_network_-_messages_0.pdf',
  'Writing/B1/1. a_blog_-_blog_2.pdf',
  'Writing/B1/2. a_letter_to_a_friend_-_letter.pdf',
  'Writing/B1/3. an_email_to_a_new_friend_-_email.pdf',
  'Writing/B1/4. an_opinion_essay_-_essay.pdf',
  'Writing/B1/5. a_cv_-_cv_1.pdf',
  'Writing/B2/1. a_blog_-_the_x_games_-_blog_0.pdf',
  'Writing/B2/2. a_for_and_against_essay_about_the_internet_-_essay.pdf',
  'Writing/B2/3. a_magazine_article_-_article.pdf',
  'Writing/B2/4. a_more_formal_email_-_email.pdf',
  'Writing/B2/5. skyfall_film_review_-_review_0.pdf',
  'Writing/C1/1. an_opinion_essay_about_fast_food_-_essay.pdf',
  'Writing/C1/2. a_for_and_against_essay_about_online_communication_-_essay.pdf',
  'Writing/C1/3. a_report_on_a_school_trip_abroad_-_report.pdf',
  'Writing/C1/4. an_essay_about_leisure_time_and_academic_pressure_-_essay.pdf',
  'Writing/C1/5. an_invitation_letter_-_letter.pdf',
  'Writing/C2/1. describing_a_graph_of_trends_over_time_-_essay.pdf',
  'Speaking/A1/Speaking skills practice_ Meeting people (Beginner A1).mp4',
  'Speaking/A2/Speaking skills practice_ Talking about your family (Elementary - A2).mp4',
  'Speaking/B1/Speaking skills practice_ Different opinions (Intermediate B1).mp4',
  'Speaking/B2/Speaking skills practice_ Pros and cons of mobile phones (Upper Intermediate B2) (2).mp4',
  'Speaking/C1 gk usah/videoplayback (1).mp4',
]

const fileTypeLabels = {
  mp3: 'Audio',
  mp4: 'Video',
  pdf: 'PDF',
  jpg: 'Image',
  jpeg: 'Image',
  png: 'Image',
}

const previewImageFallbacks = {
  Grammar: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
  Vocabulary: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=900&q=80',
  Listening: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  Reading: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=900&q=80',
  Writing: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80',
  Speaking: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80',
}

const previewImageRules = [
  {
    keywords: ['linguspace a2 grammar', 'a2 grammar exercises', 'grammar exercises'],
    image: '/exercise-assets/a2-grammar-exercises.png',
  },
  {
    keywords: ['lost dog', 'dog'],
    image: '/exercise-assets/the-lost-dog.png',
  },
  {
    keywords: ['thank-you email', 'thank you email', 'thank you letter', 'thank-you', 'thank you'],
    image: '/exercise-assets/thank-you-letter.png',
  },
  {
    keywords: ['restaurant', 'menu'],
    image: '/exercise-assets/restaurant-menu.png',
  },
  {
    keywords: ['halloween story'],
    image: '/exercise-assets/clothes.png',
  },
  {
    keywords: ['cozy christmas story'],
    image: '/exercise-assets/clothes.png',
  },
  {
    keywords: ['cat out of the bag'],
    image: '/exercise-assets/tell-us-about-your-family.png',
  },
  {
    keywords: ['take on', 'take off', 'take in', 'take up'],
    image: '/exercise-assets/tell-us-about-your-family.png',
  },
  {
    keywords: ['new year resolutions', 'new year resolution'],
    image: '/exercise-assets/lets-talk-about-food-and-drinks.png',
  },
  {
    keywords: ['climate change'],
    image: '/exercise-assets/lets-talk-about-food-and-drinks.png',
  },
  {
    keywords: ['traveling to japan'],
    image: '/exercise-assets/how-to-introduce-yourself.png',
  },
  {
    keywords: ['presidential elections'],
    image: '/exercise-assets/how-to-introduce-yourself.png',
  },
  {
    keywords: ['monkeypox', 'mpox'],
    image: '/exercise-assets/what-are-your-friends-like.png',
  },
  {
    keywords: ['olympic games'],
    image: '/exercise-assets/what-are-your-friends-like.png',
  },
  {
    keywords: ['food and drinks', 'foods & drinks', 'food & drinks', 'foods drinks', 'food drinks', 'order food', 'meal', 'recipe'],
    image: '/exercise-assets/lets-talk-about-food-and-drinks.png',
  },
  {
    keywords: ['swimming'],
    image: '/exercise-assets/at-the-swimming-pool.png',
  },
  {
    keywords: ['cook', 'cooking'],
    image: '/exercise-assets/can-you-cook.png',
  },
  {
    keywords: ['tidy desk', 'office'],
    image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['train', 'timetable', 'directions'],
    image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['film', 'cinema', 'skyfall', 'entertainment'],
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['job', 'cv', 'workplace', 'formal'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['travel', 'japan', 'postcard', 'school trip'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['family'],
    image: '/exercise-assets/tell-us-about-your-family.png',
  },
  {
    keywords: ['clothes', 'shopping'],
    image: '/exercise-assets/clothes.png',
  },
  {
    keywords: ['friends', 'new friend', 'letter to a friend'],
    image: '/exercise-assets/what-are-your-friends-like.png',
  },
  {
    keywords: ['introduce', 'introducing yourself', 'how to introduce yourself'],
    image: '/exercise-assets/how-to-introduce-yourself.png',
  },
  {
    keywords: ['chat'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['conversation', 'communication'],
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['people'],
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['wars silver lining', 'silver lining', 'war and silver lining'],
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['sport', 'olympic', 'x games'],
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['christmas', 'new year'],
    image: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['climate', 'earth', 'life on earth'],
    image: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['election', 'presidential'],
    image: 'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['graffiti', 'street art'],
    image: '/Background Listening.png',
  },
  {
    keywords: ['hobbies', 'health', 'pain', 'illness', 'body'],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['pride and prejudice', 'christmas carol', 'river', 'spiders', 'book'],
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['robot'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['brain', 'mindset'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['happy', 'leisure'],
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['video games'],
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['social network'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['countries', 'nationalities'],
    image: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['greetings'],
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=900&q=80',
  },
  {
    keywords: ['personal objects'],
    image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
  },
]

const titleFromPath = (path) => {
  const fileName = path.split('/').at(-1) ?? path
  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+\.\s*/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const slugFromPath = (path) =>
  path
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const labelFromSegment = (segment = '') =>
  segment
    .replace(/^\d+\.\s*/, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const getMaterialTitle = (rawTitle, { category, level, section }) => {
  const isGenericFileName = /^(download|videoplayback)(\s*\(\d+\))?$/i.test(rawTitle)

  if (!isGenericFileName) return rawTitle
  if (section && section !== 'Core Practice') return section

  return `${level} ${category} Practice`
}

const getPreviewImage = (category, title, section) => {
  const searchable = `${title} ${section}`.toLowerCase()
  return (
    previewImageRules.find((rule) => rule.keywords.some((keyword) => searchable.includes(keyword)))?.image ??
    previewImageFallbacks[category] ??
    previewImageFallbacks.Reading
  )
}

const getLevelFromFolder = (folder = '') => {
  const directLevel = folder.match(/^(A1|A2|B1|B2|C1|C2)\b/i)?.[1]?.toUpperCase()
  if (directLevel) return directLevel

  const normalized = folder.toLowerCase()
  if (normalized.includes('pre-intermediate')) return 'A2'
  if (normalized.includes('upper intermediate')) return 'B2'
  if (normalized.includes('pre-advanced')) return 'C1'
  if (normalized.includes('beginner') || normalized.includes('elementary')) return 'A1'
  if (normalized.includes('intermediate')) return 'B1'
  if (normalized.includes('advance')) return 'C1'

  return ''
}

const getExerciseTitle = (title) => {
  const cleanTitle = title
    .replace(/\bnotice\b/gi, '')
    .replace(/\barticle\b/gi, '')
    .replace(/\bemail\s*\d*\b/gi, 'email')
    .replace(/\bmenu\s*\d*\b/gi, 'menu')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase())

  if (/thank/i.test(cleanTitle)) return 'A Thank You Email'
  if (/restaurant|menu/i.test(cleanTitle)) return 'Menu At The Restaurant'

  return cleanTitle
}

const getExercisePanelImage = (title) => {
  const topic = title.toLowerCase()
  if (topic.includes('linguspace a2 grammar') || topic.includes('a2 grammar exercises')) return '/exercise-assets/a2-grammar-exercises.png'
  if (topic.includes('advanced linkers') || topic.includes('conjunction')) return '/exercise-assets/grammar-c1-advanced-linkers-worksheet.png'
  if (topic.includes('wish') || topic.includes('if only')) return '/exercise-assets/grammar-c1-wish-if-only-worksheet.png'
  if (topic.includes('past continuous')) return '/exercise-assets/grammar-b1-past-continuous-worksheet.png'
  if (topic.includes('present perfect')) return '/exercise-assets/grammar-b1-present-perfect-worksheet.png'
  if (topic.includes('past perfect')) return '/exercise-assets/grammar-b1-past-perfect-worksheet.png'
  if (topic.includes('simple present') || topic.includes('present simple')) return '/exercise-assets/grammar-a1-simple-present-worksheet.png'
  if (topic.includes('simple past') || topic.includes('past simple')) return '/exercise-assets/grammar-a1-simple-past-worksheet.png'
  if (topic.includes('to be') && topic.includes('past')) return '/exercise-assets/grammar-a1-to-be-past-worksheet.png'
  if (topic.includes('to be')) return '/exercise-assets/grammar-a1-to-be-worksheet.png'
  if (topic.includes('pronoun')) return '/exercise-assets/grammar-a1-pronouns-worksheet.png'
  if (topic.includes('lost dog')) return '/exercise-assets/exercise-rect-dog.png'
  if (topic.includes('thank') || topic.includes('email')) return '/exercise-assets/exercise-rect-thank-you-email.png'
  if (topic.includes('restaurant') || topic.includes('menu')) return '/exercise-assets/exercise-rect-menu.png'
  if (topic.includes('swimming')) return '/exercise-assets/exercise-rect-pool.png'
  if (topic.includes('cook')) return '/exercise-assets/exercise-rect-cook.png'
  return ''
}

const getGrammarWorksheet = (title, level, section) => {
  const topicSource = `${title} ${section}`.toLowerCase()
  const topic = getExerciseTitle(title)
  const tensePanel = topicSource.includes('past') || topicSource.includes('present') || topicSource.includes('tense')
  const base = {
    topic,
    overview: `Study the ${topic.toLowerCase()} material, then practise the rule in short, accurate sentences.`,
    ruleFocus: tensePanel
      ? ['Find the time clue.', 'Choose the correct verb form.', 'Check negatives and questions.']
      : ['Find the subject.', 'Choose the correct grammar form.', 'Check the sentence meaning.'],
    textVersion: [
      `Grammar focus: ${topic}`,
      `Level: ${level}`,
      'Read the rule, notice the pattern, and complete the practice tasks carefully.',
    ],
  }

  if (topicSource.includes('linguspace a2 grammar exercises') || topicSource.includes('a2 grammar exercises')) {
    return {
      ...base,
      topic: 'LinguSpace A2 Grammar Exercises',
      overview: 'Practise A2 grammar for routines, actions now, past stories, experiences, plans, advice, and clear comparisons.',
      ruleFocus: [
        'Use present simple for routines and present continuous for now or fixed plans.',
        'Use past simple for finished events and past continuous for background actions.',
        'Use present perfect for experience, then past simple for finished details.',
        'Use going to, present continuous, will, should, must, and comparatives to connect ideas clearly.',
      ],
      textVersion: [
        'A2 grammar connects short sentences into simple everyday messages.',
        'First, choose the time meaning: routine, now, finished past, experience, or future plan.',
        'Then, choose the grammar form and add a short reason, detail, or example.',
      ],
      comprehensionTasks: [
        {
          id: 'a2-present-choice',
          title: 'Grammar Check 1',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Multiple Choice',
          type: 'multiple-choice',
          instruction: 'Choose the best A2 form for routines, current actions, and arrangements.',
          items: [
            { before: 'Nina usually', options: ['walks', 'is walking', 'walked'], after: 'to class.' },
            { before: 'Today she', options: ['takes', 'is taking', 'took'], after: 'the bus because it is raining.' },
            { before: 'We', options: ['meet', 'are meeting', 'met'], after: 'our teacher after school tomorrow.' },
            { before: 'My brother', options: ['plays', 'is playing', 'played'], after: 'football every Friday.' },
          ],
        },
        {
          id: 'a2-past-perfect-gap',
          title: 'Grammar Check 2',
          modes: ['Gap Fill', 'Sentence Building'],
          activeMode: 'Gap Fill',
          type: 'gap-fill',
          instruction: 'Complete each sentence with a suitable past or present perfect form.',
          items: [
            { before: 'I', after: 'dinner when my cousin arrived. (make)' },
            { before: 'We', after: 'the museum at three o clock. (leave)' },
            { before: 'The children', after: 'when the lights went out. (study)' },
            { before: 'I have', after: 'three different online courses. (try)' },
            { before: 'Last month, I', after: 'a short design class. (join)' },
          ],
        },
        {
          id: 'a2-meaning-match',
          title: 'Grammar Check 3',
          modes: ['Matching', 'Short Answer'],
          activeMode: 'Matching',
          type: 'matching',
          instruction: 'Match each sentence with the grammar meaning.',
          wordBank: ['intention', 'arrangement', 'offer', 'advice', 'comparison'],
          items: [
            'I am going to study tonight.',
            'We are having lunch at 12:30.',
            'I will carry those books for you.',
            'You should check the timetable.',
            'This bag is heavier than that one.',
          ],
        },
      ],
    }
  }

  if (topicSource.includes('pronoun')) {
    return {
      ...base,
      overview: 'Review subject and object pronouns, then choose the pronoun that keeps each sentence clear.',
      ruleFocus: ['I, you, he, she, it, we, they are subject pronouns.', 'Me, you, him, her, it, us, them are object pronouns.', 'A pronoun replaces a noun.'],
      textVersion: ['Subject pronouns do the action: She reads.', 'Object pronouns receive the action: I help her.', 'Use a pronoun when the noun is already clear.'],
      comprehensionTasks: [
        {
          id: 'pronouns-choice',
          title: 'Grammar Check 1',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Multiple Choice',
          type: 'multiple-choice',
          instruction: 'Choose the correct pronoun to complete each sentence.',
          items: [
            { before: 'Maria is my friend.', options: ['She', 'He', 'They'], after: 'is kind.' },
            { before: 'Tom and I are students.', options: ['We', 'They', 'Us'], after: 'study English.' },
            { before: 'This is my book. Please give it to', options: ['I', 'me', 'they'], after: '.' },
            { before: 'The dogs are hungry. Feed', options: ['they', 'them', 'we'], after: 'now.' },
          ],
        },
        {
          id: 'pronouns-gap',
          title: 'Grammar Check 2',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Gap Fill',
          type: 'gap-fill',
          instruction: 'Complete each sentence with a suitable pronoun.',
          items: [
            { before: 'Anna is twelve.', after: 'is in class A.' },
            { before: 'My brother and I like football.', after: 'play every Sunday.' },
            { before: 'This is Jack. Do you know', after: '?' },
            { before: 'I have a pencil. Please use', after: '.' },
            { before: 'The children are here. The teacher helps', after: '.' },
          ],
        },
      ],
    }
  }

  if (topicSource.includes('simple present') || topicSource.includes('present simple')) {
    return {
      ...base,
      overview: 'Practise present simple for habits, facts, and routines.',
      ruleFocus: ['Use the base verb with I/you/we/they.', 'Add -s or -es with he/she/it.', 'Use do/does for questions and negatives.'],
      textVersion: ['I play tennis every week.', 'She plays tennis every week.', 'They do not play on Monday. Does he play after school?'],
      comprehensionTasks: [
        {
          id: 'present-choice',
          title: 'Grammar Check 1',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Multiple Choice',
          type: 'multiple-choice',
          instruction: 'Choose the correct present simple verb.',
          items: [
            { before: 'She', options: ['go', 'goes', 'going'], after: 'to school at seven.' },
            { before: 'They', options: ['watch', 'watches', 'watching'], after: 'TV after dinner.' },
            { before: 'My father', options: ['work', 'works', 'working'], after: 'in a hospital.' },
            { before: 'We', options: ['does not', 'do not', 'not does'], after: 'eat meat.' },
          ],
        },
        {
          id: 'present-build',
          title: 'Grammar Check 2',
          modes: ['Sentence Building', 'Gap Fill'],
          activeMode: 'Sentence Building',
          type: 'sentence-building',
          instruction: 'Write each present simple sentence in the correct order.',
          items: [
            'plays / every / football / Tom / Saturday',
            'do / breakfast / not / at / eat / We / school',
            'your / Does / sister / English / speak',
            'usually / They / homework / do / evening / in / the',
          ],
        },
      ],
    }
  }

  if (topicSource.includes('past')) {
    return {
      ...base,
      overview: topicSource.includes('perfect') ? 'Practise past perfect for actions before another past action.' : 'Practise past forms for finished actions and past states.',
      ruleFocus: topicSource.includes('perfect')
        ? ['Use had + past participle.', 'Use it for the earlier past action.', 'Check the order of events.']
        : ['Use was/were for past states.', 'Use verb + -ed for many regular past actions.', 'Use did not / did for negatives and questions.'],
      textVersion: topicSource.includes('perfect')
        ? ['When I arrived, the lesson had started.', 'She had finished her homework before dinner.', 'Had they visited the museum before?']
        : ['I was at home yesterday.', 'She played tennis last week.', 'They did not watch TV last night.'],
      comprehensionTasks: [
        {
          id: 'past-choice',
          title: 'Grammar Check 1',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Multiple Choice',
          type: 'multiple-choice',
          instruction: 'Choose the correct past form.',
          items: [
            { before: 'Yesterday, I', options: ['am', 'was', 'were'], after: 'at school.' },
            { before: 'They', options: ['play', 'played', 'plays'], after: 'football last Sunday.' },
            { before: 'She', options: ['did not go', 'does not went', 'not went'], after: 'to the party.' },
            { before: topicSource.includes('perfect') ? 'He' : 'We', options: topicSource.includes('perfect') ? ['had finished', 'has finish', 'finished had'] : ['was', 'were', 'are'], after: topicSource.includes('perfect') ? 'before lunch.' : 'happy yesterday.' },
          ],
        },
        {
          id: 'past-gap',
          title: 'Grammar Check 2',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Gap Fill',
          type: 'gap-fill',
          instruction: 'Complete each sentence with a correct past form.',
          items: [
            { before: 'Last night, I', after: 'my room.' },
            { before: 'My friends', after: 'at the park yesterday.' },
            { before: 'She did not', after: 'the answer.' },
            { before: 'Were you', after: 'on Monday?' },
            { before: 'The class', after: 'before the bell rang.' },
          ],
        },
      ],
    }
  }

  if (topicSource.includes('to be')) {
    return {
      ...base,
      overview: 'Practise am, is, are, was, and were in short grammar sentences.',
      ruleFocus: ['Use am with I.', 'Use is/was with he, she, it.', 'Use are/were with you, we, they.'],
      textVersion: ['I am a student.', 'She is happy today.', 'They were at home yesterday.'],
      comprehensionTasks: [
        {
          id: 'to-be-choice',
          title: 'Grammar Check 1',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Multiple Choice',
          type: 'multiple-choice',
          instruction: 'Choose the correct form of be.',
          items: [
            { before: 'I', options: ['am', 'is', 'are'], after: 'ready.' },
            { before: 'She', options: ['am', 'is', 'are'], after: 'my teacher.' },
            { before: 'They', options: ['was', 'were', 'is'], after: 'late yesterday.' },
            { before: 'It', options: ['am', 'are', 'was'], after: 'cold last night.' },
          ],
        },
        {
          id: 'to-be-gap',
          title: 'Grammar Check 2',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Gap Fill',
          type: 'gap-fill',
          instruction: 'Complete each sentence with am, is, are, was, or were.',
          items: [
            { before: 'I', after: 'from Indonesia.' },
            { before: 'My books', after: 'on the table.' },
            { before: 'He', after: 'not at school yesterday.' },
            { before: 'You', after: 'very kind.' },
            { before: 'We', after: 'tired after the lesson.' },
          ],
        },
      ],
    }
  }

  return {
    ...base,
    comprehensionTasks: [
      {
        id: 'grammar-rule-check',
        title: 'Grammar Check 1',
        modes: ['Multiple Choice', 'Gap Fill'],
        activeMode: 'Multiple Choice',
        type: 'multiple-choice',
        instruction: 'Choose the option that best completes each grammar sentence.',
        items: [
          { before: 'A grammar rule helps us', options: ['write clearly', 'ignore meaning', 'skip practice'], after: '.' },
          { before: 'Before answering, students should', options: ['read the example', 'close the material', 'guess only'], after: '.' },
          { before: 'A good sentence has', options: ['clear word order', 'random words', 'no verb'], after: '.' },
        ],
      },
    ],
  }
}

const listeningTopicProfiles = [
  {
    keywords: ['cat out of the bag'],
    topic: 'Let The Cat Out of the Bag',
    section: 'Idioms',
    overview: 'This listening explains an idiom people use when someone reveals a secret by accident.',
    focusWords: ['secret', 'reveal', 'accidentally', 'idiom', 'context'],
    trueFalse: [
      ['The idiom "let the cat out of the bag" means to intentionally share a secret.', 'False'],
      ['The phrase is believed to have originated from a dishonest market trick involving pigs and cats.', 'True'],
      ['Accidentally mentioning a surprise party to the guest of honor is an example of this idiom.', 'True'],
      ['In a business setting, letting the cat out of the bag can cause financial losses.', 'True'],
      ['The idiom is used to remind people to be careless about what they share.', 'False'],
    ],
    questions: [
      ['What did dishonest sellers in old markets put in the bag instead of a piglet?', ['A dog', 'A cat', 'A rabbit'], 'A cat'],
      ['When is the idiom "let the cat out of the bag" used today?', ['When someone buys a new pet', 'When someone accidentally reveals information', 'When a party is a huge success'], 'When someone accidentally reveals information'],
      ['According to the text, what happens to a surprise party if someone slips up and mentions it?', ['The party gets canceled.', 'It becomes more fun.', 'The element of surprise is ruined.'], 'The element of surprise is ruined.'],
      ['What is the best follow-up practice?', ['Make your own sentence', 'Skip the phrase', 'Listen without notes'], 'Make your own sentence'],
    ],
  },
  {
    keywords: ['presidential election', 'elections'],
    topic: 'Understanding U.S. Presidential Elections',
    section: 'Civics',
    overview: 'This listening introduces election vocabulary and explains how people choose a president.',
    focusWords: ['candidate', 'vote', 'campaign', 'election', 'president'],
    trueFalse: [
      ['Primary elections and caucuses are held to choose delegates for each party.', 'True'],
      ['Election Day takes place on the first Monday of October.', 'False'],
      ['The president is officially elected by the Electoral College, not the popular vote alone.', 'True'],
      ['Every state has the exact same number of electoral votes, regardless of population.', 'False'],
      ['Laws governing campaign finance are designed to ensure transparency and fairness.', 'True'],
    ],
    questions: [
      ['What is the purpose of the political party conventions mentioned in the text?', ['To cast the final electoral votes', 'To select the party\'s final presidential nominee', 'To count the local popular votes'], 'To select the party\'s final presidential nominee'],
      ['When do voters cast their ballots for the general Election Day?', ['The first Tuesday after the first Monday in November', 'The first Monday of January', 'Any weekend in September'], 'The first Tuesday after the first Monday in November'],
      ['How many total electoral votes exist in the U.S. Electoral College system?', ['100', '270', '538'], '538'],
      ['What should you listen for in an explanation?', ['Steps and key terms', 'Only background music', 'Random names'], 'Steps and key terms'],
    ],
  },
  {
    keywords: ['monkeypox', 'mpox'],
    topic: 'What Is Monkeypox (mpox)?',
    section: 'Health',
    overview: 'This listening gives basic health information about mpox and the vocabulary used to describe illness.',
    focusWords: ['virus', 'symptom', 'health', 'spread', 'prevent'],
    trueFalse: [
      ['Monkeypox belongs to the same family of viruses as smallpox.', 'True'],
      ['The monkeypox virus can only infect monkeys and cannot infect humans.', 'False'],
      ['A skin rash is usually one of the very first initial symptoms to appear.', 'False'],
      ['There is currently no specific cure for the monkeypox virus.', 'True'],
      ['Vaccines developed for smallpox can offer some protection against monkeypox.', 'True'],
    ],
    questions: [
      ['Where did the ancient Olympic Games begin?', ['Rome', 'France', 'Greece'], 'Greece'],
      ['Which Greek god were the ancient games held to honor?', ['Apollo', 'Poseidon', 'Zeus'], 'Zeus'],
      ['In what year were the modern Olympic Games revived in Athens?', ['1776', '1896', '1920'], '1896'],
      ['What listening skill is useful here?', ['Listening for facts', 'Only guessing', 'Ignoring details'], 'Listening for facts'],
    ],
  },
  {
    keywords: ['clothes', 'shopping for clothes'],
    topic: 'Clothes',
    section: 'Everyday Life',
    overview: 'This listening practices clothing words and simple descriptions of what people wear.',
    focusWords: ['shirt', 'jacket', 'dress', 'shoes', 'wear'],
  },
  {
    keywords: ['family members', 'family'],
    topic: 'Family Members',
    section: 'People',
    overview: 'This listening introduces family vocabulary and simple relationships between people.',
    focusWords: ['mother', 'father', 'sister', 'brother', 'parents'],
  },
  {
    keywords: ['foods & drinks', 'food', 'order food'],
    topic: 'Food and Drinks',
    section: 'Daily Needs',
    overview: 'This listening helps students recognize food, drinks, ordering phrases, and polite requests.',
    focusWords: ['meal', 'drink', 'order', 'menu', 'please'],
  },
  {
    keywords: ['introduce yourself', 'introducing yourself'],
    topic: 'Introduce Yourself',
    section: 'Speaking Basics',
    overview: 'This listening models how people give names, greetings, and simple personal information.',
    focusWords: ['hello', 'name', 'nice to meet you', 'from', 'student'],
  },
  {
    keywords: ['describing people'],
    topic: 'Describing People',
    section: 'People',
    overview: 'This listening practices descriptions of appearance, personality, and useful adjectives.',
    focusWords: ['tall', 'friendly', 'hair', 'kind', 'looks like'],
  },
  {
    keywords: ['morning routine'],
    topic: 'My Morning Routine',
    section: 'Daily Routines',
    overview: 'This listening follows a simple morning routine and common verbs for daily habits.',
    focusWords: ['wake up', 'breakfast', 'brush', 'go to school', 'usually'],
  },
  {
    keywords: ['giving directions', 'directions'],
    topic: 'Giving Directions',
    section: 'Places',
    overview: 'This listening practices route language, places, and instructions for moving around a town.',
    focusWords: ['turn left', 'turn right', 'straight', 'corner', 'near'],
  },
  {
    keywords: ['cinema'],
    topic: 'Going to the Cinema',
    section: 'Entertainment',
    overview: 'This listening uses movie, ticket, time, and plan-making language.',
    focusWords: ['movie', 'ticket', 'showtime', 'seat', 'plan'],
  },
  {
    keywords: ['cozy christmas story', 'christmas'],
    topic: 'A Cozy Christmas Story',
    section: 'Stories',
    overview: 'This listening tells a seasonal story and asks students to follow characters, events, and mood.',
    focusWords: ['winter', 'gift', 'family', 'warm', 'story'],
    trueFalse: [
      ['Anna was drinking hot tea while watching the snow fall outside her window.', 'True'],
      ['The story takes place on the night before Christmas (Christmas Eve).', 'True'],
      ['The house smelled like cinnamon and vanilla because of the treats Anna made.', 'True'],
      ['Anna\'s family arrived exactly at midnight to start the celebration.', 'False'],
      ['The family members exchanged gifts as soon as they walked through the front door.', 'False'],
    ],
    questions: [
      ['When did John place his pizza order?', ['Monday morning', 'Friday evening', 'Saturday afternoon'], 'Friday evening'],
      ['What extra ingredient did John request right at the beginning of his order?', ['Extra sauce', 'Stuffed crust', 'Extra cheese'], 'Extra cheese'],
      ['How long will it take for the pizzas to be ready?', ['10 minutes', '20 minutes', '30 minutes'], '30 minutes'],
      ['What feeling does the Christmas story create?', ['Warm and peaceful', 'Angry and rushed', 'Confusing and cold'], 'Warm and peaceful'],
    ],
  },
  {
    keywords: ['new year resolutions'],
    topic: 'New Year Resolution',
    section: 'Goals',
    overview: 'This listening explains goals people set for a new year and the language of plans.',
    focusWords: ['goal', 'resolution', 'habit', 'improve', 'plan'],
    trueFalse: [
      ['The speaker plans to exercise every single day of the week.', 'False'],
      ['One of the reasons the speaker wants to cook more is to save money on expensive meals.', 'True'],
      ['The speaker intends to read a total of 12 books throughout the year.', 'True'],
      ['The speaker wants to focus solely on reading mystery and horror books.', 'False'],
      ['The speaker plans to organize family and friend gatherings once every three months.', 'True'],
    ],
    questions: [
      ['What specific action will the speaker take to help them stay motivated with their workouts?', ['Hire a personal trainer', 'Join a gym', 'Buy an exercise bike for home'], 'Join a gym'],
      ['How often does the speaker plan to try a new recipe?', ['Every day', 'Twice a week', 'Once a week'], 'Once a week'],
      ['What dietary change does the speaker explicitly mention wanting to make?', ['Cutting out all sugar', 'Introducing more vegetables', 'Drinking more water'], 'Introducing more vegetables'],
      ['What is a resolution?', ['A goal or promise for improvement', 'A weather report', 'A school holiday'], 'A goal or promise for improvement'],
    ],
  },
  {
    keywords: ['take on', 'take off', 'take in', 'take up', 'phrasal verbs'],
    topic: 'Take In - Take Off - Take On - Take Up',
    section: 'Grammar in Use',
    overview: 'This listening explains common phrasal verbs and how their meanings change with particles.',
    focusWords: ['take on', 'take off', 'take in', 'take up', 'meaning'],
    trueFalse: [
      ['The phrasal verb take off can be used to describe an airplane leaving the ground, a business becoming successful quickly, or removing clothes.', 'True'],
      ['If you make a piece of clothing smaller so that it fits you better, you are taking it off.', 'False'],
      ['The phrase take in can mean to let someone stay at your house for a temporary period of time.', 'True'],
      ['When you accept more work or a new responsibility at your job, you are taking it up.', 'False'],
      ['Take on can be used when you are getting ready to confront a strong opponent in a game or match.', 'True'],
    ],
    questions: [
      ['Which phrasal verb means to start a new hobby or activity, such as painting?', ['Take off', 'Take in', 'Take up'], 'Take up'],
      ['During a lecture, if students are trying to understand and absorb the information, they are trying to ____ it ____.', ['take / off', 'take / in', 'take / on'], 'take / in'],
      ['According to the text, what happens to you when you take on new challenges?', ['You feel highly stressed and quit.', 'You occupy too much space and time.', 'You grow and learn more about yourself.'], 'You grow and learn more about yourself.'],
      ['Which particle completes "take ___" for an airplane leaving the ground?', ['off', 'in', 'on'], 'off'],
    ],
  },
  {
    keywords: ['traveling to japan', 'japan'],
    topic: 'Traveling to Japan',
    section: 'Travel',
    overview: 'This listening uses travel vocabulary, plans, places, and useful expressions for a trip.',
    focusWords: ['travel', 'station', 'hotel', 'culture', 'visit'],
    trueFalse: [
      ['The text states that temples and shrines in Japan are usually noisy and crowded.', 'False'],
      ['According to the text, sushi, ramen, and tempura are popular Japanese dishes.', 'True'],
      ['Every region in Japan serves the exact same food with no local differences.', 'False'],
      ['It is a Japanese custom to remove your shoes when entering someone\'s home.', 'True'],
      ['Bowing is described as a common way to say goodbye to someone at the train station.', 'False'],
    ],
    questions: [
      ['Which Japanese city is explicitly mentioned as being famous for its modern buildings and technology?', ['Kyoto', 'Osaka', 'Tokyo'], 'Tokyo'],
      ['What tool does the text remind travelers to use when eating Japanese food?', ['A fork and knife', 'Chopsticks', 'A traditional spoon'], 'Chopsticks'],
      ['What makes traveling around Japan particularly easy and efficient according to the text?', ['Renting a modern car', 'Clean and efficient trains', 'Domestic airplanes'], 'Clean and efficient trains'],
      ['What should travelers respect in Japan?', ['Local customs', 'Only hotel rules', 'No public signs'], 'Local customs'],
    ],
  },
  {
    keywords: ['olympic games', 'olympic'],
    topic: 'History of the Olympic Games',
    section: 'History',
    overview: 'This listening explains a historical topic and asks students to notice dates, events, and reasons.',
    focusWords: ['athlete', 'competition', 'history', 'medal', 'event'],
    trueFalse: [
      ['The first recorded ancient Olympic Games took place in 776 BC.', 'True'],
      ['Ancient Olympic winners received gold medals as prizes.', 'False'],
      ['Pierre de Coubertin helped revive the modern Olympic Games.', 'True'],
      ['The first modern Olympics included over 50 participating countries.', 'False'],
      ['The five interlocking rings represent the unity of five continents.', 'True'],
    ],
    questions: [
      ['Where did the ancient Olympic Games begin?', ['Rome', 'France', 'Greece'], 'Greece'],
      ['Which Greek god were the ancient games held to honor?', ['Apollo', 'Poseidon', 'Zeus'], 'Zeus'],
      ['In what year were the modern Olympic Games revived in Athens?', ['1776', '1896', '1920'], '1896'],
      ['What do the five Olympic rings represent?', ['The unity of five continents', 'Five sports only', 'Five ancient cities'], 'The unity of five continents'],
    ],
  },
  {
    keywords: ['halloween'],
    topic: 'A Halloween Story',
    section: 'Stories',
    overview: 'This listening builds narrative comprehension through setting, characters, suspense, and events.',
    focusWords: ['costume', 'night', 'scary', 'door', 'story'],
    trueFalse: [
      ['Anna and her friends explored the old house on Christmas Eve.', 'False'],
      ['The friends went upstairs because they heard a loud noise.', 'True'],
      ['James was the one who pulled the dirty sheet off the big mirror.', 'True'],
      ['The ghosts attacked the friends as soon as they saw them.', 'False'],
      ['The friends decided to steal the old box of letters and photos.', 'False'],
    ],
    questions: [
      ['Why did the friends decide to go inside the old house?', ['To hide from the rain', 'To find out if it was haunted', 'To play hide-and-seek'], 'To find out if it was haunted'],
      ['What did they see hanging from the ceiling when they turned on their flashlights?', ['Ghost costumes', 'Cobwebs', 'Old lights'], 'Cobwebs'],
      ['What started to appear in the mirror behind James?', ['A scary monster', 'Strange foggy figures', 'A message written in blood'], 'Strange foggy figures'],
      ['What kind of mood does the story create?', ['Suspenseful', 'Scientific', 'Relaxed'], 'Suspenseful'],
    ],
  },
  {
    keywords: ['climate change', 'climate'],
    topic: 'What Is Climate Change?',
    section: 'Environment',
    overview: 'This listening explains environmental change and asks students to notice causes and effects.',
    focusWords: ['climate', 'temperature', 'planet', 'energy', 'effect'],
    trueFalse: [
      ['Climate change is completely unnatural and has never occurred in Earth\'s history.', 'False'],
      ['Burning fossil fuels traps heat in the atmosphere by releasing greenhouse gases.', 'True'],
      ['Melting polar ice caps cause sea levels to rise, which threatens coastal communities.', 'True'],
      ['Extreme weather events like hurricanes are becoming less frequent due to climate change.', 'False'],
      ['Solar and wind power are examples of renewable energy sources that can help reduce emissions.', 'True'],
    ],
    questions: [
      ['What primary effect of burning coal and oil causes global temperatures to rise?', ['It blocks sunlight from reaching Earth.', 'It releases greenhouse gases that trap heat.', 'It creates artificial wind patterns.'], 'It releases greenhouse gases that trap heat.'],
      ['Which of the following is a risk mentioned for coastal communities?', ['Increased risk of floods', 'Severe volcanic eruptions', 'Shortage of saltwater'], 'Increased risk of floods'],
      ['How does climate change impact biodiversity according to the text?', ['It helps all animal populations grow rapidly.', 'It makes it easier for plants to find habitats.', 'Many species struggle to adapt to shifting conditions.'], 'Many species struggle to adapt to shifting conditions.'],
      ['Which energy sources can help reduce emissions?', ['Solar and wind power', 'Coal and oil', 'Only gasoline'], 'Solar and wind power'],
    ],
  },
  {
    keywords: ['pride and prejudice'],
    topic: 'Pride and Prejudice',
    section: 'Literature',
    overview: 'This listening summarizes a classic story and focuses on characters, relationships, and themes.',
    focusWords: ['novel', 'character', 'marriage', 'society', 'pride'],
  },
  {
    keywords: ['christmas carol'],
    topic: 'A Christmas Carol',
    section: 'Literature',
    overview: 'This listening summarizes a classic story about change, kindness, and reflection.',
    focusWords: ['ghost', 'past', 'future', 'kindness', 'change'],
  },
  {
    keywords: ['graffiti', 'street art'],
    topic: 'Graffiti and Street Art',
    section: 'Culture',
    overview: 'This listening explores public art and different opinions about creativity in cities.',
    focusWords: ['artist', 'wall', 'public', 'culture', 'opinion'],
  },
  {
    keywords: ['hobbies & health', 'hobbies', 'health'],
    topic: 'Hobbies and Health',
    section: 'Lifestyle',
    overview: 'This listening connects free-time activities with physical and mental health.',
    focusWords: ['hobby', 'exercise', 'stress', 'healthy', 'routine'],
  },
  {
    keywords: ['wars silver lining', 'silver lining'],
    topic: 'War Silver Lining',
    section: 'Ideas',
    overview: 'This advanced listening asks students to follow complex arguments and implied meaning.',
    focusWords: ['conflict', 'consequence', 'hope', 'argument', 'perspective'],
  },
  {
    keywords: ['power of prediction', 'prediction'],
    topic: 'Beware the Power of Prediction',
    section: 'TED Ideas',
    overview: 'This listening explores predictions, decisions, and how expectations can shape behavior.',
    focusWords: ['prediction', 'evidence', 'decision', 'risk', 'future'],
  },
  {
    keywords: ['sound smart', 'tedx'],
    topic: 'How to Sound Smart in Your TEDx Talk',
    section: 'Presentation Skills',
    overview: 'This listening uses presentation language, humor, and delivery techniques.',
    focusWords: ['speaker', 'audience', 'gesture', 'pause', 'confidence'],
  },
]

const getListeningProfile = (title, section) => {
  const searchable = `${title} ${section}`.toLowerCase()
  const matched = listeningTopicProfiles.find((profile) =>
    profile.keywords.some((keyword) => searchable.includes(keyword)),
  )

  if (matched) return matched

  const topic = getExerciseTitle(title)
  return {
    topic,
    section: 'Listening Skills',
    overview: `This listening practice is about ${topic.toLowerCase()}. Students listen for the main idea, useful details, and important vocabulary.`,
    focusWords: ['main idea', 'detail', 'speaker', 'topic', 'example'],
  }
}

const getListeningWorksheet = (title, level, section) => {
  const profile = getListeningProfile(title, section)
  const topic = profile.topic
  const trueFalse = profile.trueFalse ?? [
    [`The audio is mainly about ${topic.toLowerCase()}.`, 'True'],
    ['Students should listen for the general meaning first.', 'True'],
    ['It is better to stop listening after one difficult word.', 'False'],
    ['Listening again can help students catch details.', 'True'],
    ['Students should ignore important examples from the speaker.', 'False'],
  ]
  const questions = profile.questions ?? [
    [`What is the main topic of the audio?`, [topic, 'A different school subject', 'A random list of words'], topic],
    ['What should students do the first time they listen?', ['Understand the main idea', 'Write every word immediately', 'Ignore the title'], 'Understand the main idea'],
    ['Which detail should students listen for?', ['Names, times, places, or reasons', 'Only background sounds', 'The file name only'], 'Names, times, places, or reasons'],
    ['What is a good final practice step?', ['Repeat useful phrases aloud', 'Close the lesson', 'Skip the questions'], 'Repeat useful phrases aloud'],
  ]

  return {
    topic,
    sectionTitle: profile.section,
    overview: profile.overview,
    focusWords: profile.focusWords,
    listeningSteps: ['Listen for gist', 'Listen for details', 'Repeat useful phrases'],
    trueFalseQuestions: trueFalse.map(([question, answer]) => ({ question, answer })),
    multipleChoiceQuestions: questions.map(([question, options, answer]) => ({ question, options, answer })),
    challengePrompts: [
      `Write one sentence summarizing ${topic.toLowerCase()}.`,
      'Write three useful words you heard and one example sentence for each.',
      level === 'C1' || level === 'C2'
        ? 'Explain the speaker\'s opinion and one piece of support.'
        : 'Practice saying two useful phrases from the audio.',
    ],
  }
}

const getReadingPassage = (title, level) => {
  const topic = title.toLowerCase()

  if (topic.includes('lost dog')) {
    return [
      'Sherry',
      '3 years old, male',
      'Help us find our dog. Lost in Central Park near Blue Lake Cafe on Monday 10th June at 4 p.m.',
      '€500 Reward for safe return',
      '012 6554 7862',
    ]
  }

  if (topic.includes('restaurant') || topic.includes('menu')) {
    return [
      'MENU',
      'Main Courses',
      'Cheese burger £4.39',
      'Double cheese burger £4.99',
      'Chicken curry with rice £3.99',
      'Macaroni cheese £4.19',
      'Seafood salad £4.49',
      'Egg salad (V) £3.99',
      'Fish and mushroom pie £4.69',
      'Pizzas: chicken pizza, meat pizza, mushroom pizza (V)',
      'Ice cream: vanilla, chocolate, strawberry',
      'Fruit: apple £0.60, orange £0.60',
    ]
  }

  if (topic.includes('thank') || topic.includes('email')) {
    return [
      'Hi Susan. Thank you very much for the birthday present. I really need a new computer game, so it is perfect. You\'re very kind. How are you? Good luck in your exams. I hope you pass with good marks. Speak soon.',
    ]
  }

  if (topic.includes('swimming')) {
    return [
      'The notice is for the Florida Hotel Swimming Pool. The pool opens at 08:00 from Monday to Saturday and opens at 09:00 on Sunday.',
      'On Wednesday, the swimming pool closes at 22:00. Visitors must not run near the pool because the floor can be wet and dangerous.',
      'Children can swim only with an adult. Visitors cannot eat or drink in the pool, and everyone must respect the rules at all times.',
    ]
  }

  if (topic.includes('cook') || topic.includes('food')) {
    return [
      'Tom cooks dinner for all his family from Monday to Friday. He usually cooks between 5.30 and 6.30 after school.',
      'Tom likes simple and healthy food. Yesterday, he made vegetable soup with carrots, potatoes, onions, and eggs.',
      'Cooking helps Tom learn about food and healthy meals. His family enjoys his dinner, and Tom feels proud when everyone likes the food.',
    ]
  }

  if (topic.includes('desk')) {
    return [
      'A tidy desk can help students study better. When books, pens, and papers are organized, it is easier to find what you need and focus on your work.',
      'Good tips may include throwing away rubbish, using folders, keeping only useful items on the desk, and cleaning for a few minutes every day.',
      'The text encourages readers to create a study space that feels calm, comfortable, and ready for learning.',
    ]
  }

  if (topic.includes('train') || topic.includes('timetable')) {
    return [
      'A train timetable gives travel information such as departure times, arrival times, platforms, and ticket details. It helps passengers plan their journey.',
      'To read a timetable, students should find the correct station first. Then they can compare times and choose the best train.',
      'This kind of reading requires careful scanning because one small number can change the meaning.',
    ]
  }

  if (topic.includes('film') || topic.includes('entertainment')) {
    return [
      'A film or entertainment article gives information about stories, actors, opinions, and recommendations. It may describe why a film is exciting, funny, or emotional.',
      'Readers should separate facts from opinions. A fact gives information, while an opinion tells what someone thinks or feels.',
      'This material helps students talk about entertainment and explain their preferences clearly.',
    ]
  }

  if (topic.includes('job') || topic.includes('cv') || topic.includes('workplace')) {
    return [
      'Texts about jobs and CVs often describe skills, experience, education, and personal qualities. They help readers understand what employers are looking for.',
      'Students should identify important details such as job title, requirements, contact information, and deadlines.',
      'The material teaches readers how language can be used professionally when applying for work or describing abilities.',
    ]
  }

  if (topic.includes('travel') || topic.includes('leaving home') || topic.includes('trip')) {
    return [
      'Travel texts describe places, plans, activities, and experiences. They may include useful details about transport, accommodation, prices, and attractions.',
      'Readers should notice descriptive language and practical information. Both help them understand whether a place sounds suitable for a visitor.',
      'This material helps students build confidence when reading brochures, blogs, and travel articles.',
    ]
  }

  if (topic.includes('zoo') || topic.includes('earth') || topic.includes('climate')) {
    return [
      'Environmental texts often present a problem and explain different points of view. They may discuss animals, nature, climate, or the future of life on Earth.',
      'Readers should look for reasons, examples, and consequences. These details help them understand the writer’s argument.',
      'The material encourages students to think critically and support their opinions with evidence.',
    ]
  }

  if (topic.includes('conversation') || topic.includes('communication') || topic.includes('fomo')) {
    return [
      'Texts about communication explore how people connect, speak, listen, and use technology. They often compare face-to-face interaction with online communication.',
      'Readers should identify the writer’s opinion and the examples used to support it. They can also notice words that show contrast, such as however and although.',
      'This material helps students reflect on their own communication habits and social choices.',
    ]
  }

  if (topic.includes('robot') || topic.includes('brain') || topic.includes('mindset') || topic.includes('happy')) {
    return [
      'This text explores ideas about people, technology, thinking, and wellbeing. It asks readers to consider how choices and attitudes affect daily life.',
      'Advanced readers should notice tone, implied meaning, and the connection between paragraphs. These features help reveal the writer’s deeper message.',
      'The material supports critical reading by asking students to interpret ideas, not only find simple facts.',
    ]
  }

  if (topic.includes('spider')) {
    return [
      'A text about spiders gives information about an animal that many people misunderstand. It may describe where spiders live, what they eat, and why they are useful.',
      'Readers should identify facts, descriptions, and surprising details. Scientific texts often include information that changes common opinions.',
      'The material helps students read carefully and learn new vocabulary about nature.',
    ]
  }

  return [
    `This ${level} reading material is about ${title.toLowerCase()}. It introduces a topic, gives useful details, and helps students practice reading for meaning.`,
    'Students should first skim the text to understand the main idea. After that, they can scan for names, numbers, reasons, examples, and important vocabulary.',
    'The goal is to understand both the general message and the supporting details, then explain the material in clear English.',
  ]
}

const getReadingQuestions = (title) => {
  const topic = title.toLowerCase()

  if (topic.includes('lost dog')) {
    return [
      {
        question: 'What is the name of the lost dog?',
        options: ['Blue lake', 'Sherry', 'Berry'],
        answer: 'Sherry',
      },
      {
        question: 'How old is the dog?',
        options: ['500 years old', '4 years old', '3 years old'],
        answer: '3 years old',
      },
      {
        question: 'Where was the dog last seen?',
        options: ['In a pet shop', 'Near Blue Lake Cafe in Central Park', 'At a swimming pool'],
        answer: 'Near Blue Lake Cafe in Central Park',
      },
    ]
  }

  if (topic.includes('thank') || topic.includes('email')) {
    return [
      {
        question: 'Who writes the email?',
        options: ['Susan', 'Tom', 'Alex'],
        answer: 'Tom',
      },
      {
        question: 'Why does Tom write the email?',
        options: ['To ask for a computer game', 'To say thank you for a birthday present', 'To invite Susan to a party'],
        answer: 'To say thank you for a birthday present',
      },
      {
        question: 'What is the present?',
        options: ['A new book', 'A laptop', 'A computer game'],
        answer: 'A computer game',
      },
    ]
  }

  if (topic.includes('restaurant') || topic.includes('menu')) {
    return [
      {
        question: 'How much is a cheese burger?',
        options: ['£3.99', '£4.19', '£4.39'],
        answer: '£4.39',
      },
      {
        question: 'Which pizza is vegetarian?',
        options: ['Chicken pizza', 'Meat pizza', 'Mushroom pizza'],
        answer: 'Mushroom pizza',
      },
      {
        question: 'What flavors of ice cream can you order?',
        options: ['Vanilla, chocolate, strawberry', 'Banana, apple, orange', 'Fruit, mushroom, cheese'],
        answer: 'Vanilla, chocolate, strawberry',
      },
    ]
  }

  if (topic.includes('swimming')) {
    return [
      {
        question: 'What time does the swimming pool close on Wednesday?',
        options: ['17:00', '22:00', '08:00'],
        answer: '22:00',
      },
      {
        question: 'What time does the swimming pool open on Sunday?',
        options: ['08:00', '17:00', '09:00'],
        answer: '09:00',
      },
      {
        question: 'Can you run near the pool?',
        options: ['Yes, at all times.', 'No running.', 'Only with an adult.'],
        answer: 'No running.',
      },
    ]
  }

  if (topic.includes('cook')) {
    return [
      {
        question: 'Who does Tom cook dinner for?',
        options: ['Only his friends', 'His teachers at school', 'All his family'],
        answer: 'All his family',
      },
      {
        question: 'When does Tom cook dinner?',
        options: ['On Saturdays and Sundays', 'From Monday to Friday, between 5.30 and 6.30', 'Every morning before school'],
        answer: 'From Monday to Friday, between 5.30 and 6.30',
      },
      {
        question: 'What did Tom make yesterday?',
        options: ['Pizza', 'Vegetable soup', 'Egg and chips'],
        answer: 'Vegetable soup',
      },
    ]
  }

  const mainIdea = topic.includes('lost dog')
    ? 'What happened to Sherry?'
    : topic.includes('restaurant') || topic.includes('menu')
      ? 'What information can readers find in the menu?'
      : topic.includes('email') || topic.includes('thank')
        ? 'Why does someone write a thank-you email?'
        : `What is the main idea of "${title}"?`

  return [
    {
      question: mainIdea,
      options: [
        topic.includes('lost dog') ? 'She was lost and then found safely.' : 'It gives useful information about the topic.',
        'It only lists random words.',
        'It is mainly about a computer error.',
      ],
      answer: topic.includes('lost dog') ? 'She was lost and then found safely.' : 'It gives useful information about the topic.',
    },
    {
      question: 'What should students do before answering detailed questions?',
      options: ['Skim for the main idea first.', 'Close the material immediately.', 'Ignore the title.'],
      answer: 'Skim for the main idea first.',
    },
    {
      question: 'Which skill is most useful for finding names, numbers, times, or specific facts?',
      options: ['Scanning', 'Guessing without reading', 'Skipping every heading'],
      answer: 'Scanning',
    },
  ]
}

const getGapFillQuestions = (title) => {
  const topic = title.toLowerCase()

  if (topic.includes('lost dog')) {
    return [
      { before: 'The flyer is trying to find a lost dog named', after: '.', answer: 'Sherry' },
      { before: 'Sherry is a 3-year-old', after: 'dog.', answer: 'male' },
      { before: 'The dog went missing on Monday,', after: '10th.', answer: 'June' },
      { before: 'Sherry was lost at', after: 'p.m.', answer: '4' },
      { before: 'If you see the dog, you can call the', after: 'at the bottom of the paper.', answer: 'number' },
    ]
  }

  if (topic.includes('thank') || topic.includes('email')) {
    return [
      { before: 'Tom sends the email to', after: '.', answer: 'Susan' },
      { before: 'The present is for Tom\'s', after: '.', answer: 'birthday' },
      { before: 'Tom thinks the computer game is', after: '.', answer: 'perfect' },
      { before: 'Tom hopes Susan passes her', after: 'with good marks.', answer: 'exams' },
      { before: 'At the end of the email, Tom writes', after: 'soon.', answer: 'Speak' },
    ]
  }

  if (topic.includes('restaurant') || topic.includes('menu')) {
    return [
      { before: 'A double cheese burger costs', after: '.', answer: '£4.99' },
      { before: 'The chicken curry comes with', after: '.', answer: 'rice' },
      { before: 'There are', after: 'types of pizza on the menu.', answer: 'three' },
      { before: 'An apple and an orange cost the same price, which is', after: '.', answer: '£0.60' },
      { before: 'The symbol (V) on the menu means the food is', after: '.', answer: 'vegetarian' },
    ]
  }

  if (topic.includes('swimming')) {
    return [
      { before: 'The notice is for the Florida Hotel', after: 'Pool.', answer: 'Swimming' },
      { before: 'On Sunday, the pool closes at', after: '.', answer: '17:00' },
      { before: 'No diving and no', after: 'are allowed at the pool.', answer: 'running' },
      { before: 'You cannot eat or', after: 'in the pool.', answer: 'drink' },
      { before: 'You must respect the', after: 'at all times.', answer: 'rules' },
    ]
  }

  if (topic.includes('cook')) {
    return [
      { before: 'Tom cooks dinner for all his', after: '.', answer: 'family' },
      { before: 'Tom cooks between 5.30 and', after: 'after school.', answer: '6.30' },
      { before: 'Yesterday, Tom made vegetable', after: '.', answer: 'soup' },
      { before: 'Tom puts carrots, potatoes, onions, and', after: 'in the meal.', answer: 'eggs' },
      { before: 'Cooking helps Tom learn about healthy', after: '.', answer: 'meals' },
    ]
  }

  return [
    { before: 'This material is about', after: '.', answer: getExerciseTitle(title) },
    { before: 'Students should read the title and find the main', after: '.', answer: 'idea' },
    { before: 'Readers scan for names, numbers, times, and important', after: '.', answer: 'facts' },
    { before: 'The text gives useful information for English', after: '.', answer: 'practice' },
    { before: 'After reading, students answer questions to check', after: '.', answer: 'understanding' },
  ]
}

const vocabularyStopWords = new Set([
  'vocabulary',
  'english',
  'beginner',
  'level',
  'a1',
  'a2',
  'and',
  'the',
  'with',
  'for',
])

const getVocabularyFocusWords = (title, section) => {
  const topicWords = `${section} ${title}`
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2 && !vocabularyStopWords.has(word))

  const uniqueWords = [...new Set(topicWords)]

  return uniqueWords.length > 0
    ? uniqueWords.slice(0, 6)
    : ['word', 'meaning', 'example', 'pronunciation', 'sentence', 'review']
}

const getVocabularyWorksheet = (title, level, section) => {
  const topic = getExerciseTitle(section === 'Core Practice' ? title : section)
  const focusWords = getVocabularyFocusWords(title, section)

  return {
    topic,
    overview: `Practice useful ${topic.toLowerCase()} vocabulary, check the meaning, then use the words in your own sentences.`,
    focusWords,
    practiceSteps: ['Watch or open the material', 'Say each word aloud', 'Write an example sentence'],
    matchQuestions: focusWords.slice(0, 4).map((word) => ({
      word,
      options: [
        `A word connected to ${topic.toLowerCase()}.`,
        'A sentence punctuation mark.',
        'A number used for page order.',
      ],
      answer: `A word connected to ${topic.toLowerCase()}.`,
    })),
    sentencePrompts: focusWords.slice(0, 3).map((word) => `Write one clear sentence using "${word}".`),
  }
}

const getWritingGenre = (title) => {
  const topic = title.toLowerCase()
  if (topic.includes('email')) return 'Email'
  if (topic.includes('letter')) return 'Letter'
  if (topic.includes('essay')) return 'Essay'
  if (topic.includes('report')) return 'Report'
  if (topic.includes('review')) return 'Review'
  if (topic.includes('blog')) return 'Blog'
  if (topic.includes('article')) return 'Article'
  if (topic.includes('cv')) return 'CV'
  if (topic.includes('postcard')) return 'Postcard'
  if (topic.includes('recipe')) return 'Recipe'
  if (topic.includes('chat') || topic.includes('messages')) return 'Messages'
  return 'Writing'
}

const getWritingWorksheet = (title, level, section) => {
  const genre = getWritingGenre(title)
  const topic = getExerciseTitle(title)
  const advancedLevel = level === 'C1' || level === 'C2'
  const customWorksheet = getWritingWorksheetContent(title)

  return {
    genre,
    topic,
    overview: `Study the model ${genre.toLowerCase()}, plan your ideas, then write a clear ${level} response with the right structure and tone.`,
    planningQuestions: [
      `What is the purpose of this ${genre.toLowerCase()}?`,
      'Who is the reader or audience?',
      'What three ideas will you include?',
    ],
    successCriteria: [
      `Use a clear ${genre.toLowerCase()} structure.`,
      advancedLevel ? 'Use precise linking language.' : 'Use simple linking words.',
      'Check spelling, grammar, and punctuation.',
      'Revise one sentence to make it stronger.',
    ],
    draftPrompt: advancedLevel
      ? `Write a polished ${genre.toLowerCase()} about ${topic.toLowerCase()} with developed support.`
      : `Write a short ${genre.toLowerCase()} about ${topic.toLowerCase()} using clear sentences.`,
    modelFocus: section,
    ...(customWorksheet ?? {}),
  }
}

const getSpeakingWorksheet = (title, level, section) => {
  const topic = getExerciseTitle(title)
  const customWorksheet = getSpeakingWorksheetContent(title)

  return {
    topic,
    overview: `Watch the ${level} speaking model, complete the comprehension task, then record a short spoken response.`,
    levelNote: level === 'A2' ? 'Intermediate' : level === 'B2' ? 'Advanced' : 'Developing',
    tips: {
      dos: [
        'Do warm up your voice before recording.',
        'Do answer with complete ideas.',
        'Do give a reason or example.',
      ],
      donts: [
        'Don\'t memorize a script word for word.',
        'Don\'t stop after one-word answers.',
        'Don\'t worry about tiny mistakes while speaking.',
      ],
    },
    comprehensionTasks: [
      {
        id: 'speaking-default-reflection',
        title: 'Comprehension Check 1',
        type: 'short-answer',
        instruction: 'Watch the video and write short notes before you record your answer.',
        items: [
          'What is the main topic of the speaking practice?',
          'What useful phrase could you use in your answer?',
          'What reason or example can you add?',
        ],
      },
    ],
    speakingPrompt: 'Record a short answer about the topic. Try to speak clearly and give at least one reason.',
    modelFocus: section,
    ...(customWorksheet ?? {}),
  }
}

export const materialsByCategoryLevel = materialFilePaths.reduce((library, path) => {
  const pathParts = path.split('/')
  const [category, levelFolder] = pathParts
  const level = getLevelFromFolder(levelFolder)
  const extension = path.split('.').at(-1)?.toLowerCase() ?? 'file'
  const type = fileTypeLabels[extension] ?? extension.toUpperCase()
  const href = `/${path}`
  const section = pathParts.length > 3 ? labelFromSegment(pathParts.at(-2)) : 'Core Practice'
  const title = getMaterialTitle(titleFromPath(path), { category, level, section })

  if (!category || !level) return library

  return {
    ...library,
    [category]: {
      ...(library[category] ?? {}),
      [level]: [
        ...(library[category]?.[level] ?? []),
        {
          id: path,
          slug: slugFromPath(path),
          title,
          category,
          level,
          section,
          type,
          href,
          fileName: path.split('/').at(-1) ?? 'material',
          previewImage: category === 'Reading' ? getPreviewImage(category, title, section) : type === 'Image' ? href : getPreviewImage(category, title, section),
          exerciseTitle: getExerciseTitle(title),
          exercisePanelImage: getExercisePanelImage(title),
          grammarWorksheet: category === 'Grammar' ? getGrammarWorksheet(title, level, section) : null,
          listeningWorksheet: category === 'Listening' ? getListeningWorksheet(title, level, section) : null,
          vocabularyWorksheet: category === 'Vocabulary' ? getVocabularyWorksheet(title, level, section) : null,
          writingWorksheet: category === 'Writing' ? getWritingWorksheet(title, level, section) : null,
          speakingWorksheet: category === 'Speaking' ? getSpeakingWorksheet(title, level, section) : null,
          readingPassage: category === 'Reading' ? getReadingPassage(title, level) : [],
          readingQuestions: category === 'Reading' ? getReadingQuestions(title) : [],
          gapFillQuestions: category === 'Reading' ? getGapFillQuestions(title) : [],
        },
      ],
    },
  }
}, {})

export const getCategoryLevelMaterials = (category, level) =>
  materialsByCategoryLevel[category]?.[level] ?? []

export const readingMaterials = Object.values(materialsByCategoryLevel.Reading ?? {}).flat()
export const grammarMaterials = Object.values(materialsByCategoryLevel.Grammar ?? {}).flat()
export const listeningMaterials = Object.values(materialsByCategoryLevel.Listening ?? {}).flat()
export const vocabularyMaterials = Object.values(materialsByCategoryLevel.Vocabulary ?? {}).flat()
export const writingMaterials = Object.values(materialsByCategoryLevel.Writing ?? {}).flat()
export const speakingMaterials = Object.values(materialsByCategoryLevel.Speaking ?? {}).flat()

export const getReadingMaterialBySlug = (slug) =>
  readingMaterials.find((material) => material.slug === slug)

export const getGrammarMaterialBySlug = (slug) =>
  grammarMaterials.find((material) => material.slug === slug)

export const getListeningMaterialBySlug = (slug) =>
  listeningMaterials.find((material) => material.slug === slug)

export const getVocabularyMaterialBySlug = (slug) =>
  vocabularyMaterials.find((material) => material.slug === slug)

export const getWritingMaterialBySlug = (slug) =>
  writingMaterials.find((material) => material.slug === slug)

export const getSpeakingMaterialBySlug = (slug) =>
  speakingMaterials.find((material) => material.slug === slug)

export const groupMaterialsBySection = (materials) =>
  materials.reduce((sections, material) => {
    const section = material.section || 'Core Practice'
    return {
      ...sections,
      [section]: [...(sections[section] ?? []), material],
    }
  }, {})
