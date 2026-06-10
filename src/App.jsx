import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  BookOpen,
  CheckCircle,
  ChevronRight,
  CircleHelp,
  Download,
  ExternalLink,
  FileText,
  Headphones,
  Image,
  MessageCircle,
  Music,
  NotebookPen,
  PenTool,
  Play,
  Plus,
  Rocket,
  Star,
  Trash2,
  Upload,
  UserRound,
  Video,
} from 'lucide-react'
import './App.css'
import { levels } from './data/levels'
import { masteryCards, navigationItems, planetTopics } from './data/homeContent'
import { materialStorageKey, practicePrompts, starterMaterials } from './data/materialsContent'
import {
  buildCategoryLevelCards,
  buildCategoryLevelPage,
  categorySlugs,
} from './data/categoryContent'
import {
  getCategoryLevelMaterials,
  getGrammarMaterialBySlug,
  getListeningMaterialBySlug,
  getReadingMaterialBySlug,
  getSpeakingMaterialBySlug,
  getVocabularyMaterialBySlug,
  getWritingMaterialBySlug,
  groupMaterialsBySection,
  readingMaterials,
} from './data/materialLibrary'
import { hasSupabaseConfig, supabase } from './lib/supabaseClient'

gsap.registerPlugin(ScrollTrigger)

const getFileKind = (fileType = '') => {
  if (fileType.startsWith('image/')) return 'image'
  if (fileType.startsWith('audio/')) return 'audio'
  if (fileType.startsWith('video/')) return 'video'
  return 'document'
}

const getMaterialIcon = (fileType) => {
  const kind = getFileKind(fileType)
  if (kind === 'image') return Image
  if (kind === 'audio') return Music
  if (kind === 'video') return Video
  return FileText
}

const toCssUrl = (url = '') => (url ? `url("${url.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}")` : 'none')

const scrollToPageTop = () => {
  const root = window.document.documentElement
  const previousScrollBehavior = root.style.scrollBehavior

  root.style.scrollBehavior = 'auto'
  window.document.activeElement?.blur?.()
  window.scrollTo(0, 0)
  root.style.scrollBehavior = previousScrollBehavior
}

const readSavedMaterials = () => {
  try {
    const saved = window.localStorage.getItem(materialStorageKey)
    return saved ? JSON.parse(saved) : starterMaterials
  } catch {
    return starterMaterials
  }
}

const getPageFromHash = () => {
  const hash = window.location.hash.replace('#', '')
  const labSlugs = Object.values(categorySlugs).map((slug) => `${slug}-lab`)

  if (hash === 'materials-page') return 'materials'
  if (hash.startsWith('reading-material-')) return 'readingMaterial'
  if (hash.startsWith('grammar-worksheet-')) return 'grammarWorksheet'
  if (hash.startsWith('listening-worksheet-')) return 'listeningWorksheet'
  if (hash.startsWith('vocabulary-worksheet-')) return 'vocabularyWorksheet'
  if (hash.startsWith('writing-worksheet-')) return 'writingWorksheet'
  if (hash.startsWith('speaking-worksheet-')) return 'speakingWorksheet'
  if (labSlugs.includes(hash)) return 'categoryLab'
  if (getCategoryFromHash()) return 'categoryLevel'

  return 'home'
}

const getCategoryFromHash = () => {
  const hash = window.location.hash.replace('#', '')
  return Object.entries(categorySlugs).find(([, slug]) => hash === `${slug}-lab` || hash.startsWith(`${slug}-`))?.[0]
}

const getLevelFromHash = () => {
  const hash = window.location.hash.replace('#', '')
  const levelCode = hash.split('-').at(-1)?.toUpperCase()

  return ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].includes(levelCode) ? levelCode : 'A1'
}

const categoryIcons = {
  Grammar: NotebookPen,
  Vocabulary: BookOpen,
  Listening: Headphones,
  Reading: BookOpen,
  Writing: PenTool,
  Speaking: MessageCircle,
}

const studyMissions = {
  Grammar: ['Review the rule', 'Find the pattern', 'Write two examples'],
  Vocabulary: ['Watch or open the material', 'List new words', 'Use three words in sentences'],
  Listening: ['Listen once for meaning', 'Listen again for details', 'Repeat the useful phrases'],
  Reading: ['Skim the text', 'Scan for key details', 'Answer the comprehension check'],
  Writing: ['Study the model', 'Plan your response', 'Write and revise'],
  Speaking: ['Prepare ideas', 'Practice aloud', 'Record or present your answer'],
}

const quickChecks = {
  Grammar: {
    question: 'What should you do after learning a grammar rule?',
    options: ['Use it in your own sentence.', 'Forget the example.', 'Skip practice.'],
    answer: 'Use it in your own sentence.',
  },
  Vocabulary: {
    question: 'What is the best way to remember new vocabulary?',
    options: ['Use it in context.', 'Only read it once.', 'Avoid examples.'],
    answer: 'Use it in context.',
  },
  Listening: {
    question: 'What helps you understand audio more clearly?',
    options: ['Listen more than once.', 'Stop after one difficult word.', 'Ignore the topic.'],
    answer: 'Listen more than once.',
  },
  Reading: {
    question: 'Which reading skill helps you find names, numbers, and times?',
    options: ['Scanning', 'Guessing only', 'Closing the text'],
    answer: 'Scanning',
  },
  Writing: {
    question: 'What should you do before writing a full answer?',
    options: ['Plan your ideas.', 'Write with no structure.', 'Avoid revising.'],
    answer: 'Plan your ideas.',
  },
  Speaking: {
    question: 'What makes speaking practice stronger?',
    options: ['Practicing aloud.', 'Only reading silently.', 'Never repeating.'],
    answer: 'Practicing aloud.',
  },
}

const pageBackgrounds = {
  home: '/Background Homepage.png',
  Grammar: '/Background Grammar.png',
  Listening: '/Background Listening.png',
  Reading: '/Background Reading.png',
}

const reviewStorageKey = 'linguspace-student-reviews'

const starterReviews = [
  {
    id: 'starter-1',
    student: 'Alya',
    rating: 5,
    comment: 'The lessons feel easy to follow, and I like choosing the space that matches what I want to practice.',
  },
  {
    id: 'starter-2',
    student: 'Bima',
    rating: 4,
    comment: 'The platform makes reading and listening practice more interesting because the material looks clear.',
  },
  {
    id: 'starter-3',
    student: 'Citra',
    rating: 5,
    comment: 'I feel more motivated to learn English because the homepage looks fun and the levels are simple to find.',
  },
]

const readSavedReviews = () => {
  try {
    const saved = window.localStorage.getItem(reviewStorageKey)
    return saved ? JSON.parse(saved) : starterReviews
  } catch {
    return starterReviews
  }
}

const getAverageRating = (reviews) => {
  if (reviews.length === 0) return 0
  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  return total / reviews.length
}

const mapReviewRow = (review) => ({
  id: review.id,
  student: review.student_name || 'Student',
  rating: Number(review.rating) || 0,
  comment: review.comment,
})

const getBackgroundImage = (currentPage, selectedCategory) => {
  if (currentPage === 'home') return pageBackgrounds.home
  if (currentPage === 'materials') return pageBackgrounds.home
  if (currentPage === 'readingMaterial') return pageBackgrounds.Reading
  return pageBackgrounds[selectedCategory] ?? pageBackgrounds.home
}

function RatingStars({ label, onSelect, rating }) {
  return (
    <div className="rating-stars" role={onSelect ? 'radiogroup' : 'img'} aria-label={label}>
      {[1, 2, 3, 4, 5].map((value) => {
        const isActive = value <= rating

        return onSelect ? (
          <button
            className={isActive ? 'is-active' : ''}
            type="button"
            role="radio"
            aria-checked={rating === value}
            aria-label={`${value} star${value > 1 ? 's' : ''}`}
            onClick={() => onSelect(value)}
            key={value}
          >
            <Star size={19} fill="currentColor" aria-hidden="true" />
          </button>
        ) : (
          <Star
            className={isActive ? 'is-active' : ''}
            size={18}
            fill="currentColor"
            aria-hidden="true"
            key={value}
          />
        )
      })}
    </div>
  )
}

function StudentReviewSection({
  addReview,
  averageRating,
  isLoading,
  isSubmitting,
  reviewDraft,
  reviewError,
  reviewNotice,
  reviews,
  setReviewDraft,
}) {
  const reviewSectionRef = useRef(null)

  useEffect(() => {
    if (isLoading || reviews.length === 0) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.review-card',
        { y: 26, autoAlpha: 0, scale: 0.96 },
        {
          y: 0,
          autoAlpha: 1,
          scale: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
        },
      )
    }, reviewSectionRef)

    return () => ctx.revert()
  }, [isLoading, reviews.length])

  return (
    <section className="student-review-section scroll-rise" aria-labelledby="student-review-title" ref={reviewSectionRef}>
      <div className="review-heading">
        <div>
          <span className="deck-label">Student voice</span>
          <h2 id="student-review-title">How does LinguSpace feel?</h2>
        </div>
        <div className="review-score" aria-label={`Average rating ${averageRating.toFixed(1)} from ${reviews.length} reviews`}>
          <strong>{averageRating.toFixed(1)}</strong>
          <RatingStars label="Average student rating" rating={Math.round(averageRating)} />
          <span>{reviews.length} reviews</span>
        </div>
      </div>

      <div className="review-workspace">
        <form className="review-form" onSubmit={addReview}>
          <label>
            Your name
            <input
              type="text"
              value={reviewDraft.student}
              maxLength={32}
              placeholder="Student name"
              onChange={(event) => setReviewDraft((draft) => ({ ...draft, student: event.target.value }))}
            />
          </label>
          <div className="review-rating-field">
            <span>Your rating</span>
            <RatingStars
              label="Choose your rating"
              rating={reviewDraft.rating}
              onSelect={(rating) => setReviewDraft((draft) => ({ ...draft, rating }))}
            />
          </div>
          <label>
            Your comment
            <textarea
              value={reviewDraft.comment}
              maxLength={220}
              placeholder="Write what you feel after seeing or trying the platform."
              onChange={(event) => setReviewDraft((draft) => ({ ...draft, comment: event.target.value }))}
              required
            />
          </label>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sharing...' : 'Share review'}
          </button>
          {reviewError ? <p className="review-message is-error">{reviewError}</p> : null}
          {reviewNotice ? <p className="review-message">{reviewNotice}</p> : null}
        </form>

        <div className="review-orbit-field" aria-label="Student reviews">
          {isLoading ? (
            <article className="review-card">
              <strong>Loading reviews...</strong>
              <p>Fetching student comments from the database.</p>
            </article>
          ) : reviews.length === 0 ? (
            <article className="review-card">
              <strong>No reviews yet</strong>
              <p>Student comments will appear here as soon as they are shared.</p>
            </article>
          ) : (
            reviews.map((review, index) => (
              <article
                className="review-card"
                style={{ '--float-delay': `${(index % 6) * -0.7}s` }}
                key={review.id}
              >
                <div className="review-card-top">
                  <strong>{review.student}</strong>
                  <RatingStars label={`${review.student} rating`} rating={review.rating} />
                </div>
                <p>{review.comment}</p>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

function LessonNav({ openCategoryLab, openPage }) {
  return (
    <nav className="lesson-page-nav reveal" aria-label="Lesson navigation">
      <a className="lesson-logo" href="#home" onClick={() => openPage('home')}>
        <span>LinguSpace</span>
      </a>
      <div className="lesson-nav-links">
        {navigationItems.map((item) => (
          <a
            href={item === 'Home' ? '#home' : `#${categorySlugs[item]}-lab`}
            key={item}
            onClick={(event) => {
              event.preventDefault()
              if (item === 'Home') openPage('home')
              else openCategoryLab(item)
            }}
          >
            {item}
          </a>
        ))}
      </div>
      <span className="lesson-user" aria-label="Account">
        <UserRound size={14} />
      </span>
    </nav>
  )
}

function LessonCard({ cta = 'Get the lesson', description, folder, Icon = Headphones, image, meta, onClick, title }) {
  return (
    <article className="lesson-card">
      <div className="lesson-card-media">
        <img src={image} alt="" />
        <span className="lesson-card-icon" aria-hidden="true">
          <Icon size={15} />
        </span>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
      {meta ? <small className="lesson-card-meta">{meta}</small> : null}
      {folder ? <span className="lesson-card-folder">{folder}</span> : null}
      <button type="button" onClick={onClick}>{cta}</button>
    </article>
  )
}

function CategoryLabPage({ category, openCategoryLab, openCategoryLevel, openPage }) {
  const Icon = categoryIcons[category]

  return (
    <section className={`lesson-page category-lab-page category-${category.toLowerCase()}`}>
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="lesson-page-heading">
        <h1>Welcome to <span>{category} Lab!</span></h1>
        {category === 'Grammar' ? (
          <p>Grammar follows the three material folders: Beginner, Intermediate, and Advance.</p>
        ) : null}
      </header>
      <div className="lesson-card-grid">
        {buildCategoryLevelCards(category).map((level) => (
          <LessonCard
            key={level.cefr}
            cta={category === 'Grammar' ? 'Open folder' : 'Get the lesson'}
            description={level.description}
            folder={level.folder}
            Icon={Icon}
            image={level.image}
            meta={level.meta}
            title={level.title}
            onClick={() => openCategoryLevel(category, level.cefr)}
          />
        ))}
      </div>
    </section>
  )
}

function MaterialTypeIcon({ type, size = 16 }) {
  if (type === 'Audio') return <Music size={size} aria-hidden="true" />
  if (type === 'Video') return <Video size={size} aria-hidden="true" />
  if (type === 'Image') return <Image size={size} aria-hidden="true" />
  return <FileText size={size} aria-hidden="true" />
}

const getQuickInformationMaterials = (levelCode, excludedMaterialId = '') => {
  const levelOrder = levels.map((level) => level.cefr)
  const currentLevelIndex = levelOrder.indexOf(levelCode)
  const preferredLevel = levelOrder[currentLevelIndex + 1] ?? levelCode
  const preferredMaterials = readingMaterials.filter((item) => item.level === preferredLevel && item.id !== excludedMaterialId)
  const fallbackMaterials = readingMaterials.filter((item) => item.level === levelCode && item.id !== excludedMaterialId)

  return (preferredMaterials.length > 0 ? preferredMaterials : fallbackMaterials).slice(0, 5)
}

function QuickInformationSection({ materials, openReadingMaterial }) {
  if (materials.length === 0) return null

  return (
    <section className="quick-information-section" aria-labelledby="quick-information-title">
      <h2 id="quick-information-title">Quick Information</h2>
      <div className="quick-information-grid">
        {materials.map((quickMaterial) => {
          const quickLevelName = levels.find((level) => level.cefr === quickMaterial.level)?.name ?? quickMaterial.level
          return (
            <article className="quick-information-card" key={quickMaterial.id}>
              <div className="quick-information-preview">
                <img src={quickMaterial.previewImage} alt="" />
                <BookOpen size={30} aria-hidden="true" />
                <span>{quickMaterial.level}</span>
              </div>
              <div className="quick-information-body">
                <p>{quickLevelName} Space</p>
                <h3>{quickMaterial.exerciseTitle || quickMaterial.title}</h3>
                <button type="button" onClick={() => openReadingMaterial(quickMaterial)}>
                  Get the lesson
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

function ReadingMaterialPage({ material, openCategoryLab, openCategoryLevel, openPage }) {
  const [answers, setAnswers] = useState({})
  const [gapAnswers, setGapAnswers] = useState({})
  const [studentName, setStudentName] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')
  const [submissionError, setSubmissionError] = useState('')
  const [isSubmittingReading, setIsSubmittingReading] = useState(false)
  const answeredCount = Object.keys(answers).length
  const gapAnsweredCount = Object.values(gapAnswers).filter((answer) => answer.trim()).length
  const correctCount = material.readingQuestions.filter((question, index) => answers[index] === question.answer).length
  const levelName = levels.find((level) => level.cefr === material.level)?.name ?? material.level
  const testLabel = `${levelName} Orbit - ${material.level} Reading Test`
  const exerciseTitle = material.exerciseTitle || material.title

  const submitReadingAnswers = async () => {
    setSubmissionError('')
    setSubmissionStatus('')

    if (answeredCount === 0 && gapAnsweredCount === 0) {
      setSubmissionError('Please answer at least one question before submitting.')
      return
    }

    if (!hasSupabaseConfig || !supabase) {
      const savedSubmission = {
        studentName: studentName.trim() || 'Student',
        materialId: material.id,
        materialTitle: exerciseTitle,
        level: material.level,
        multipleChoiceAnswers: answers,
        gapFillAnswers: gapAnswers,
        multipleChoiceScore: correctCount,
        multipleChoiceTotal: material.readingQuestions.length,
        submittedAt: new Date().toISOString(),
      }

      window.localStorage.setItem(`linguspace-reading-submission-${material.slug}`, JSON.stringify(savedSubmission))
      setSubmissionStatus('Your reading worksheet was saved in this browser.')
      return
    }

    setIsSubmittingReading(true)

    const { error } = await supabase
      .from('reading_submissions')
      .insert({
        student_name: studentName.trim() || 'Student',
        material_id: material.id,
        material_title: exerciseTitle,
        level: material.level,
        multiple_choice_answers: answers,
        gap_fill_answers: gapAnswers,
        multiple_choice_score: correctCount,
        multiple_choice_total: material.readingQuestions.length,
      })

    setIsSubmittingReading(false)

    if (error) {
      setSubmissionError('Could not submit your answers. Please try again.')
      return
    }

    setSubmissionStatus('Your reading answers were submitted successfully.')
  }

  return (
    <section
      className="lesson-page reading-material-page figma-reading-page figma-listening-page category-reading"
      style={{ '--exercise-panel-image': toCssUrl(material.exercisePanelImage) }}
    >
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="figma-listening-hero figma-reading-hero">
        <div className="figma-listening-hero-copy">
          <button
            className="ghost-link"
            type="button"
            onClick={() => openCategoryLevel('Reading', material.level)}
          >
            <ChevronRight size={16} aria-hidden="true" />
            Back to Reading {material.level}
          </button>
          <span>{testLabel}</span>
          <h1>{exerciseTitle}</h1>
          <p>Read the text carefully then do the tasks correctly.</p>
        </div>
        <img className="figma-listening-hero-image" src={material.previewImage} alt="" />
      </header>

      <div className="figma-listening-study-row figma-reading-study-row">
        <article className="figma-section-panel figma-reading-text-panel">
          <h2>Text Version</h2>
          <div className={`figma-reading-text-body ${material.slug.includes('restaurant') ? 'is-menu-text' : ''}`}>
            {material.readingPassage.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <article className="figma-audio-card figma-reading-object-card">
          <img src={material.previewImage} alt="" />
          <div className="figma-audio-card-body">
            <span>{testLabel}</span>
            <h2>{exerciseTitle}</h2>
            <div className="figma-audio-actions">
              <a href={material.href} target="_blank" rel="noreferrer">
                <ExternalLink size={15} aria-hidden="true" />
                Open
              </a>
              <a href={material.href} download={material.fileName}>
                <Download size={15} aria-hidden="true" />
                Download
              </a>
            </div>
          </div>
        </article>
      </div>

      <section className="figma-comprehension-panel figma-reading-comprehension-panel" aria-labelledby="reading-questions-title">
        <h2 id="reading-questions-title">Comprehension Check 1</h2>
        <div className="figma-check-tabs" aria-label="Comprehension check 1 type">
          <span className="is-active">Multiple Choice</span>
          <span>Gap Fill</span>
        </div>
        <p>{correctCount} correct from {answeredCount} answered</p>
        <div className="figma-answer-grid is-three-column">
          {material.readingQuestions.map((question, index) => (
            <article className="figma-answer-card" key={question.question}>
              <h3>{question.question}</h3>
              <div className="figma-option-list">
                {question.options.map((option) => (
                  <button
                    className={answers[index] === option ? 'is-selected' : ''}
                    type="button"
                    onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
                    key={option}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {answers[index] ? (
                <strong className={answers[index] === question.answer ? 'quiz-result is-correct' : 'quiz-result'}>
                  {answers[index] === question.answer ? 'Correct' : 'Review the text and try again'}
                </strong>
              ) : null}
            </article>
          ))}
        </div>
        <div className="figma-check-actions is-worksheet-actions">
          <button type="button" onClick={() => setAnswers({})}>Check Point</button>
        </div>
      </section>

      <section className="figma-comprehension-panel figma-reading-comprehension-panel" aria-labelledby="reading-gap-title">
        <h2 id="reading-gap-title">Comprehension Check 2</h2>
        <div className="figma-check-tabs" aria-label="Comprehension check 2 type">
          <span>Multiple Choice</span>
          <span className="is-active">Gap Fill</span>
        </div>
        <div className="figma-reading-gap-list">
          {material.gapFillQuestions.map((item, index) => (
            <label key={`${item.before}-${item.after}`}>
              <span>{index + 1}. {item.before}</span>
              <input
                aria-label={`Gap fill ${index + 1}`}
                value={gapAnswers[index] ?? ''}
                onChange={(event) => setGapAnswers((current) => ({ ...current, [index]: event.target.value }))}
              />
              <span>{item.after}</span>
            </label>
          ))}
        </div>
        <div className="reading-submit-panel figma-reading-submit-panel">
          <label>
            Student name
            <input
              value={studentName}
              maxLength={80}
              placeholder="Write your name"
              onChange={(event) => setStudentName(event.target.value)}
            />
          </label>
          <span>{gapAnsweredCount} gap answers completed</span>
          <button
            type="button"
            disabled={isSubmittingReading}
            onClick={submitReadingAnswers}
          >
            {isSubmittingReading ? 'Submitting...' : 'Check Point'}
          </button>
          {submissionStatus ? <p className="submission-message">{submissionStatus}</p> : null}
          {submissionError ? <p className="submission-message is-error">{submissionError}</p> : null}
        </div>
      </section>

    </section>
  )
}

function ListeningWorksheetPage({ material, openCategoryLab, openCategoryLevel, openListeningWorksheet, openPage }) {
  const [trueFalseAnswers, setTrueFalseAnswers] = useState({})
  const [choiceAnswers, setChoiceAnswers] = useState({})
  const [showTrueFalseAnswers, setShowTrueFalseAnswers] = useState(false)
  const [showChoiceAnswers, setShowChoiceAnswers] = useState(false)
  const [listeningSubmissionStatus, setListeningSubmissionStatus] = useState('')
  const [listeningSubmissionError, setListeningSubmissionError] = useState('')
  const levelName = levels.find((level) => level.cefr === material.level)?.name ?? material.level
  const worksheet = material.listeningWorksheet
  const exerciseTitle = worksheet.topic || material.exerciseTitle || material.title
  const sectionItems = getCategoryLevelMaterials('Listening', material.level)
  const getListeningSectionLabel = (item) =>
    item.listeningWorksheet?.topic || item.exerciseTitle || item.title
  const trueFalseCorrect = worksheet.trueFalseQuestions.filter((question, index) => trueFalseAnswers[index] === question.answer).length
  const trueFalseAnswered = Object.keys(trueFalseAnswers).length
  const choiceCorrect = worksheet.multipleChoiceQuestions.filter((question, index) => choiceAnswers[index] === question.answer).length
  const choiceAnswered = Object.keys(choiceAnswers).length
  const checkTwoQuestions = worksheet.multipleChoiceQuestions.slice(0, 3)

  const submitListeningWorksheet = () => {
    setListeningSubmissionError('')
    setListeningSubmissionStatus('')

    if (trueFalseAnswered === 0 && choiceAnswered === 0) {
      setListeningSubmissionError('Please answer at least one question before submitting.')
      return
    }

    const savedSubmission = {
      studentName: 'Student',
      materialId: material.id,
      materialTitle: exerciseTitle,
      level: material.level,
      trueFalseAnswers,
      multipleChoiceAnswers: choiceAnswers,
      trueFalseScore: trueFalseCorrect,
      trueFalseTotal: worksheet.trueFalseQuestions.length,
      multipleChoiceScore: choiceCorrect,
      multipleChoiceTotal: worksheet.multipleChoiceQuestions.length,
      submittedAt: new Date().toISOString(),
    }

    window.localStorage.setItem(`linguspace-listening-submission-${material.slug}`, JSON.stringify(savedSubmission))
    setListeningSubmissionStatus('Your listening worksheet was saved in this browser.')
  }

  const renderTrueFalseLine = (question, index) => (
    <article className="figma-true-false-line" key={question.question}>
      <h3>{index + 1}. {question.question}</h3>
      <div className="figma-true-false-options">
        {['True', 'False'].map((option) => (
          <button
            className={trueFalseAnswers[index] === option ? 'is-selected' : ''}
            type="button"
            onClick={() => setTrueFalseAnswers((current) => ({ ...current, [index]: option }))}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
      {showTrueFalseAnswers ? <strong>Answer: {question.answer}</strong> : null}
    </article>
  )

  const renderChoiceCard = (question, index, answers, setAnswers, showAnswers = false) => (
    <article className="figma-answer-card" key={`${question.question}-${index}`}>
      <h3>{index + 1}. {question.question}</h3>
      <div className="figma-option-list">
        {question.options.map((option) => (
          <button
            className={answers[index] === option ? 'is-selected' : ''}
            type="button"
            onClick={() => setAnswers((current) => ({ ...current, [index]: option }))}
            key={option}
          >
            {option}
          </button>
        ))}
      </div>
      {showAnswers ? <strong>{question.answer}</strong> : null}
    </article>
  )

  return (
    <section
      className="lesson-page listening-worksheet-page figma-listening-page category-listening"
      style={{ '--exercise-panel-image': toCssUrl(material.previewImage) }}
    >
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="figma-listening-hero">
        <div className="figma-listening-hero-copy">
          <button
            className="ghost-link"
            type="button"
            onClick={() => openCategoryLevel('Listening', material.level)}
          >
            <ChevronRight size={16} aria-hidden="true" />
            Back to Listening {material.level}
          </button>
          <span>{levelName} Orbit - {material.level} Listening Test</span>
          <h1>{exerciseTitle}</h1>
          <p>Listen carefully to the audio then do the task correctly.</p>
        </div>
        <img className="figma-listening-hero-image" src={material.previewImage} alt="" />
      </header>

      <div className="figma-listening-study-row">
        <aside className="figma-section-panel" aria-label="Listening sections">
          <div className="figma-panel-title">
            <Headphones size={18} aria-hidden="true" />
            <h2>Section</h2>
          </div>
          <div className="figma-section-list">
            {sectionItems.map((item) => (
              <button
                className={material.id === item.id ? 'is-active' : ''}
                type="button"
                aria-current={material.id === item.id ? 'page' : undefined}
                onClick={() => {
                  if (material.id !== item.id) {
                    openListeningWorksheet(item, { preserveScroll: true })
                  }
                }}
                key={item.id}
              >
                {getListeningSectionLabel(item)}
              </button>
            ))}
          </div>
        </aside>

        <article className="figma-audio-card">
          <img src={material.previewImage} alt="" />
          <div className="figma-audio-card-body">
            <span>{levelName} Orbit - {material.level} Listening Test</span>
            <h2>{exerciseTitle}</h2>
            <audio src={material.href} controls />
            <div className="figma-audio-actions">
              <a href={material.href} target="_blank" rel="noreferrer">
                <ExternalLink size={15} aria-hidden="true" />
                Open
              </a>
              <a href={material.href} download={material.fileName}>
                <Download size={15} aria-hidden="true" />
                Download
              </a>
            </div>
          </div>
        </article>
      </div>

      <section className="figma-comprehension-panel" aria-labelledby="listening-check-one-title">
        <h2 id="listening-check-one-title">Comprehension Check 1</h2>
        <div className="figma-check-tabs" aria-label="Comprehension check 1 type">
          <span className="is-active">True/False</span>
          <span>Multiple Choice</span>
        </div>
        <div className="figma-true-false-sheet" aria-label="True or false worksheet">
          <div className="figma-true-false-column">
            {worksheet.trueFalseQuestions.slice(0, 3).map((question, index) =>
              renderTrueFalseLine(question, index),
            )}
          </div>
          <span className="figma-worksheet-divider" aria-hidden="true" />
          <div className="figma-true-false-column">
            {worksheet.trueFalseQuestions.slice(3, 5).map((question, index) =>
              renderTrueFalseLine(question, index + 3),
            )}
          </div>
        </div>
        <div className="figma-check-actions is-worksheet-actions">
          <button type="button" onClick={() => setShowTrueFalseAnswers(false)}>Check Point</button>
          <button type="button" onClick={() => setShowTrueFalseAnswers(true)}>Answer Key</button>
          <span>{trueFalseCorrect} correct from {trueFalseAnswered} answered</span>
        </div>
      </section>

      <section className="figma-comprehension-panel" aria-labelledby="listening-check-two-title">
        <h2 id="listening-check-two-title">Comprehension Check 2</h2>
        <div className="figma-check-tabs" aria-label="Comprehension check 2 type">
          <span>True/False</span>
          <span className="is-active">Multiple Choice</span>
        </div>
        <p>{choiceCorrect} correct from {choiceAnswered} answered</p>
        <div className="figma-answer-grid is-three-column">
          {checkTwoQuestions.map((question, index) =>
            renderChoiceCard(question, index, choiceAnswers, setChoiceAnswers, showChoiceAnswers),
          )}
        </div>
        <div className="figma-check-actions is-worksheet-actions">
          <button type="button" onClick={() => setShowChoiceAnswers(false)}>Check Point</button>
          <button type="button" onClick={() => setShowChoiceAnswers(true)}>Answer Key</button>
          <button type="button" onClick={submitListeningWorksheet}>Submit Worksheet</button>
        </div>
        {listeningSubmissionStatus ? <p className="submission-message">{listeningSubmissionStatus}</p> : null}
        {listeningSubmissionError ? <p className="submission-message is-error">{listeningSubmissionError}</p> : null}
      </section>
    </section>
  )
}

function VocabularyWorksheetPage({ material, openCategoryLab, openCategoryLevel, openPage }) {
  const worksheet = material.vocabularyWorksheet
  const [matchAnswers, setMatchAnswers] = useState({})
  const [activeFocusWord, setActiveFocusWord] = useState(worksheet.focusWords[0] ?? '')
  const [completedVocabularySteps, setCompletedVocabularySteps] = useState([])
  const [sentenceAnswers, setSentenceAnswers] = useState({})
  const [studentName, setStudentName] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')
  const [submissionError, setSubmissionError] = useState('')
  const levelName = levels.find((level) => level.cefr === material.level)?.name ?? material.level
  const matchCorrect = worksheet.matchQuestions.filter((question, index) => matchAnswers[index] === question.answer).length
  const matchAnswered = Object.keys(matchAnswers).length
  const sentenceCount = Object.values(sentenceAnswers).filter((answer) => answer.trim()).length
  const vocabularyProgress = Math.round(
    ((matchAnswered + sentenceCount + completedVocabularySteps.length) /
      (worksheet.matchQuestions.length + worksheet.sentencePrompts.length + worksheet.practiceSteps.length)) *
      100,
  )

  const toggleVocabularyStep = (step) => {
    setCompletedVocabularySteps((steps) =>
      steps.includes(step) ? steps.filter((item) => item !== step) : [...steps, step],
    )
  }

  const submitVocabularyWorksheet = () => {
    setSubmissionError('')
    setSubmissionStatus('')

    if (matchAnswered === 0 && sentenceCount === 0) {
      setSubmissionError('Please answer at least one vocabulary task before submitting.')
      return
    }

    window.localStorage.setItem(
      `linguspace-vocabulary-submission-${material.slug}`,
      JSON.stringify({
        studentName: studentName.trim() || 'Student',
        materialId: material.id,
        materialTitle: worksheet.topic,
        level: material.level,
        matchAnswers,
        sentenceAnswers,
        matchScore: matchCorrect,
        matchTotal: worksheet.matchQuestions.length,
        submittedAt: new Date().toISOString(),
      }),
    )
    setSubmissionStatus('Your vocabulary worksheet was saved in this browser.')
  }

  return (
    <section
      className="lesson-page vocabulary-worksheet-page category-vocabulary"
      style={{ '--exercise-panel-image': toCssUrl(material.previewImage) }}
    >
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="reading-detail-hero worksheet-hero">
        <div>
          <button
            className="ghost-link"
            type="button"
            onClick={() => openCategoryLevel('Vocabulary', material.level)}
          >
            <ChevronRight size={16} aria-hidden="true" />
            Back to Vocabulary {material.level}
          </button>
          <span className="deck-label">{levelName} Orbit - {material.level} Vocabulary Worksheet</span>
          <h1>{worksheet.topic}</h1>
          <p>{worksheet.overview}</p>
        </div>
        <aside className="mission-progress-card worksheet-progress-card" aria-label="Vocabulary worksheet progress">
          <strong>{vocabularyProgress}%</strong>
          <span>worksheet progress</span>
          <div className="mission-progress-track">
            <span style={{ width: `${vocabularyProgress}%` }} />
          </div>
        </aside>
      </header>

      <div className="vocabulary-worksheet-grid worksheet-study-grid">
        <article className="listening-section-panel vocabulary-focus-panel">
          <div className="mission-panel-heading">
            <BookOpen size={18} aria-hidden="true" />
            <h2>Focus Words</h2>
          </div>
          <div className="listening-focus-list" aria-label="Vocabulary focus words">
            {worksheet.focusWords.map((word) => (
              <button
                className={activeFocusWord === word ? 'is-active' : ''}
                type="button"
                aria-pressed={activeFocusWord === word}
                onClick={() => setActiveFocusWord(word)}
                key={word}
              >
                {word}
              </button>
            ))}
          </div>
          <div className="listening-step-list" aria-label="Vocabulary study steps">
            {worksheet.practiceSteps.map((step) => (
              <button
                className={completedVocabularySteps.includes(step) ? 'is-done' : ''}
                type="button"
                aria-pressed={completedVocabularySteps.includes(step)}
                onClick={() => toggleVocabularyStep(step)}
                key={step}
              >
                {step}
              </button>
            ))}
          </div>
        </article>

        <article className="reading-object-panel vocabulary-object-panel">
          <img src={material.previewImage} alt="" />
          <div className="reading-object-card-body">
            <span className="deck-label">{material.level} / {material.section}</span>
            <h2>{material.exerciseTitle}</h2>
            {material.type === 'Video' ? <video src={material.href} controls /> : null}
            <div className="lesson-material-actions">
              <a href={material.href} target="_blank" rel="noreferrer">
                <ExternalLink size={15} aria-hidden="true" />
                Open material
              </a>
              <a href={material.href} download={material.fileName}>
                <Download size={15} aria-hidden="true" />
                Download
              </a>
            </div>
          </div>
        </article>
      </div>

      <section className="reading-question-panel vocabulary-check-panel" aria-labelledby="vocabulary-check-title">
        <h2 id="vocabulary-check-title">Vocabulary Checkpoint</h2>
        <p>{matchCorrect} correct from {matchAnswered} answered</p>
        <div className="reading-question-list vocabulary-match-list">
          {worksheet.matchQuestions.map((question, index) => (
            <article className="reading-question-card" key={question.word}>
              <h3>{question.word}</h3>
              <div className="quiz-options">
                {question.options.map((option) => (
                  <button
                    className={matchAnswers[index] === option ? 'is-selected' : ''}
                    type="button"
                    onClick={() => setMatchAnswers((current) => ({ ...current, [index]: option }))}
                    key={option}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {matchAnswers[index] ? (
                <strong className={matchAnswers[index] === question.answer ? 'quiz-result is-correct' : 'quiz-result'}>
                  {matchAnswers[index] === question.answer ? 'Correct' : 'Review the material and try again'}
                </strong>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="listening-challenge-panel vocabulary-sentence-panel" aria-labelledby="vocabulary-sentence-title">
        <div>
          <h2 id="vocabulary-sentence-title">Sentence Builder</h2>
          <p>Use the new words in your own clear examples.</p>
        </div>
        <div className="vocabulary-sentence-grid">
          {worksheet.sentencePrompts.map((prompt, index) => (
            <label className="worksheet-essay-box" key={prompt}>
              {prompt}
              <textarea
                value={sentenceAnswers[index] ?? ''}
                placeholder="Write your sentence here."
                onChange={(event) => setSentenceAnswers((current) => ({ ...current, [index]: event.target.value }))}
              />
            </label>
          ))}
        </div>
        <div className="reading-submit-panel listening-submit-panel">
          <label>
            Student name
            <input
              value={studentName}
              maxLength={80}
              placeholder="Write your name"
              onChange={(event) => setStudentName(event.target.value)}
            />
          </label>
          <button className="checkpoint-button" type="button" onClick={submitVocabularyWorksheet}>
            Submit Worksheet
          </button>
          {submissionStatus ? <p className="submission-message">{submissionStatus}</p> : null}
          {submissionError ? <p className="submission-message is-error">{submissionError}</p> : null}
        </div>
      </section>
    </section>
  )
}

const hasWorksheetValue = (value) => {
  if (Array.isArray(value)) return value.length > 0
  if (value && typeof value === 'object') return Object.values(value).some(hasWorksheetValue)
  return typeof value === 'string' ? value.trim().length > 0 : Boolean(value)
}

const getGapCount = (text) => {
  const source = Array.isArray(text) ? text.join(' ') : text
  return source.match(/\(\d+\)|\b\d+\s+_+/g)?.length ?? 0
}

function WorksheetModeBar({ modes = [], activeMode }) {
  if (modes.length === 0) return null

  return (
    <div className="exercise-tabs worksheet-task-tabs worksheet-mode-bar" aria-label="Task format">
      {modes.map((mode) => (
        <span className={mode === activeMode ? 'is-active' : ''} key={mode}>
          {mode}
        </span>
      ))}
    </div>
  )
}

function WordBank({ words = [] }) {
  if (words.length === 0) return null

  return (
    <div className="worksheet-word-bank" aria-label="Word bank">
      {words.map((word) => (
        <span key={word}>{word}</span>
      ))}
    </div>
  )
}

function ComprehensionTask({ answers, onAnswer, task }) {
  const [checkpointMessage, setCheckpointMessage] = useState('')
  const taskAnswers = answers[task.id] ?? {}
  const setItemAnswer = (key, value) => onAnswer(task.id, key, value)

  const toggleSelection = (key, option, maxSelections) => {
    const current = taskAnswers[key] ?? []
    const next = current.includes(option)
      ? current.filter((item) => item !== option)
      : maxSelections && current.length >= maxSelections
        ? current
        : [...current, option]

    setItemAnswer(key, next)
  }

  const renderGapInputs = (count) => (
    <div className="worksheet-gap-grid">
      {Array.from({ length: count }, (_, index) => (
        <label key={`${task.id}-gap-${index + 1}`}>
          {index + 1}
          <input
            value={taskAnswers[`gap-${index + 1}`] ?? ''}
            onChange={(event) => setItemAnswer(`gap-${index + 1}`, event.target.value)}
          />
        </label>
      ))}
    </div>
  )

  const renderTaskBody = () => {
    if (task.type === 'instruction') {
      return <p className="worksheet-instruction-block">{task.instruction}</p>
    }

    if (task.type === 'sentence-building') {
      return (
        <div className="worksheet-line-list is-two-column">
          {task.items.map((item, index) => (
            <label className="worksheet-sentence-builder" key={`${task.id}-${item}`}>
              <span>{index + 1}. {item}</span>
              <input
                value={taskAnswers[index] ?? ''}
                placeholder="Write the correct sentence"
                onChange={(event) => setItemAnswer(index, event.target.value)}
              />
            </label>
          ))}
        </div>
      )
    }

    if (task.type === 'gap-fill') {
      return (
        <div className="gap-fill-list worksheet-gap-list">
          {task.items.map((item, index) => (
            <label key={`${task.id}-${index}`}>
              <span>{index + 1}. {item.before}</span>
              <input
                aria-label={`Gap ${index + 1}`}
                value={taskAnswers[index] ?? ''}
                onChange={(event) => setItemAnswer(index, event.target.value)}
              />
              <span>{item.after}</span>
            </label>
          ))}
        </div>
      )
    }

    if (task.type === 'true-false') {
      return (
        <div className="worksheet-true-false-list">
          {task.items.map((item, index) => (
            <article className="worksheet-choice-line" key={`${task.id}-${item}`}>
              <p>{index + 1}. {item}</p>
              <div className="true-false-actions">
                {['True', 'False'].map((option) => (
                  <button
                    className={taskAnswers[index] === option ? 'is-selected' : ''}
                    type="button"
                    onClick={() => setItemAnswer(index, option)}
                    key={option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )
    }

    if (task.type === 'positive-negative') {
      return (
        <div className="worksheet-positive-negative">
          {task.items.map((item, index) => (
            <article className="worksheet-choice-line" key={`${task.id}-${item}`}>
              <p>{item}</p>
              <div className="true-false-actions">
                {['P', 'N'].map((option) => (
                  <button
                    className={taskAnswers[index] === option ? 'is-selected' : ''}
                    type="button"
                    onClick={() => setItemAnswer(index, option)}
                    key={option}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )
    }

    if (task.type === 'multiple-choice') {
      return (
        <div className="worksheet-option-sentences">
          {task.items.map((item, index) => (
            <article className="worksheet-inline-choice" key={`${task.id}-${index}`}>
              <span>{index + 1}. {item.before}</span>
              <div className="figma-option-row">
                {item.options.map((option) => (
                  <button
                    className={taskAnswers[index] === option ? 'is-selected' : ''}
                    type="button"
                    onClick={() => setItemAnswer(index, option)}
                    key={option}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {item.after ? <span>{item.after}</span> : null}
            </article>
          ))}
        </div>
      )
    }

    if (task.type === 'checkbox') {
      const selected = taskAnswers.selected ?? []

      return (
        <>
          {task.maxSelections ? (
            <p className="worksheet-selection-count">{selected.length} of {task.maxSelections} selected</p>
          ) : null}
          <div className="worksheet-checkbox-grid">
            {task.items.map((item) => (
              <button
                className={selected.includes(item) ? 'is-selected' : ''}
                type="button"
                onClick={() => toggleSelection('selected', item, task.maxSelections)}
                key={item}
              >
                {item}
              </button>
            ))}
          </div>
        </>
      )
    }

    if (task.type === 'ordering' || task.type === 'paragraph-order') {
      return (
        <div className="worksheet-order-list">
          {task.items.map((item, index) => {
            const label = typeof item === 'string' ? item : `${item.label}. ${item.text}`

            return (
              <label key={`${task.id}-${index}`}>
                <select
                  value={taskAnswers[index] ?? ''}
                  onChange={(event) => setItemAnswer(index, event.target.value)}
                >
                  <option value="">Order</option>
                  {task.items.map((_, optionIndex) => (
                    <option value={optionIndex + 1} key={optionIndex + 1}>{optionIndex + 1}</option>
                  ))}
                </select>
                <span>{label}</span>
              </label>
            )
          })}
        </div>
      )
    }

    if (task.type === 'grouping') {
      return (
        <>
          <WordBank words={task.wordBank} />
          <div className="worksheet-group-grid">
            {task.groups.map((group) => (
              <label className="worksheet-group-box" key={group}>
                <span>{group}</span>
                <textarea
                  value={taskAnswers[group] ?? ''}
                  placeholder="Write the matching words or phrases here."
                  onChange={(event) => setItemAnswer(group, event.target.value)}
                />
              </label>
            ))}
          </div>
        </>
      )
    }

    if (task.type === 'matching' || task.type === 'paragraph-match') {
      const rows = task.type === 'matching' ? task.items : task.paragraphs

      return (
        <>
          <WordBank words={task.wordBank} />
          <div className="worksheet-match-list">
            {rows.map((row, index) => (
              <label key={`${task.id}-${row}`}>
                <span>{typeof row === 'string' ? row : row.label}</span>
                <select
                  value={taskAnswers[index] ?? ''}
                  onChange={(event) => setItemAnswer(index, event.target.value)}
                >
                  <option value="">Choose</option>
                  {task.wordBank.map((word) => (
                    <option value={word} key={word}>{word}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>
        </>
      )
    }

    if (task.type === 'structure-fill') {
      return (
        <>
          <WordBank words={task.wordBank} />
          <div className="worksheet-match-list">
            {task.paragraphs.map((paragraph, index) => (
              <div className="worksheet-structure-row" key={paragraph}>
                <span>{index + 1}. {paragraph}</span>
                {[0, 1].map((slot) => (
                  <select
                    value={taskAnswers[`${index}-${slot}`] ?? ''}
                    onChange={(event) => setItemAnswer(`${index}-${slot}`, event.target.value)}
                    key={slot}
                  >
                    <option value="">Choose point</option>
                    {task.wordBank.map((word) => (
                      <option value={word} key={word}>{word}</option>
                    ))}
                  </select>
                ))}
              </div>
            ))}
          </div>
        </>
      )
    }

    if (task.type === 'word-bank-gap') {
      const textLines = Array.isArray(task.text) ? task.text : [task.text]

      return (
        <>
          <WordBank words={task.wordBank} />
          <div className="worksheet-paragraph-text">
            {textLines.map((line) => <p key={line}>{line}</p>)}
          </div>
          {renderGapInputs(getGapCount(task.text))}
        </>
      )
    }

    if (task.type === 'numbered-gap-paragraph') {
      return (
        <>
          <p className="worksheet-paragraph-text">{task.text}</p>
          {renderGapInputs(getGapCount(task.text))}
        </>
      )
    }

    if (task.type === 'template-writing' || task.type === 'profile-writing') {
      return (
        <div className="worksheet-template-task">
          {task.templateLines ? (
            <div className="worksheet-template-card">
              {task.templateLines.map((line) => <p key={line}>{line}</p>)}
            </div>
          ) : null}
          {task.bullets ? (
            <ul>
              {task.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          ) : null}
          <textarea
            value={taskAnswers.response ?? ''}
            placeholder="Write your answer here."
            onChange={(event) => setItemAnswer('response', event.target.value)}
          />
        </div>
      )
    }

    return (
      <div className="writing-plan-list">
        {(task.items ?? []).map((item, index) => (
          <label className="worksheet-essay-box" key={`${task.id}-${item}`}>
            {index + 1}. {item}
            <textarea
              value={taskAnswers[index] ?? ''}
              placeholder="Write your answer here."
              onChange={(event) => setItemAnswer(index, event.target.value)}
            />
          </label>
        ))}
      </div>
    )
  }

  return (
    <section className="reading-question-panel worksheet-task-panel" aria-labelledby={`${task.id}-title`}>
      <h2 id={`${task.id}-title`}>{task.title}</h2>
      <WorksheetModeBar modes={task.modes} activeMode={task.activeMode} />
      {task.instruction && task.type !== 'instruction' ? <p>{task.instruction}</p> : null}
      {renderTaskBody()}
      <button
        className="checkpoint-button secondary-checkpoint-button"
        type="button"
        onClick={() => setCheckpointMessage('Checkpoint saved. You can keep editing this task.')}
      >
        Check Point
      </button>
      {checkpointMessage ? <p className="submission-message">{checkpointMessage}</p> : null}
    </section>
  )
}

function WritingPromptPanel({ onChange, task, value }) {
  const [draftMessage, setDraftMessage] = useState('')

  return (
    <section className="reading-question-panel worksheet-writing-panel" aria-labelledby={`${task.id}-title`}>
      <h2 id={`${task.id}-title`}>{task.title}</h2>
      <WorksheetModeBar modes={task.modes} activeMode={task.activeMode} />
      <div className="worksheet-writing-layout">
        <div>
          <p>{task.prompt}</p>
          {task.bullets ? (
            <ul>
              {task.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          ) : null}
          {task.items ? (
            <div className="worksheet-guided-lines">
              {task.items.map((item, index) => (
                <label key={`${task.id}-${index}`}>
                  <span>{index + 1}. {item.sentence}</span>
                  {item.clue ? <small>Clue: {item.clue}</small> : null}
                  <textarea
                    value={value?.[index] ?? ''}
                    placeholder="Write the sentence(s) that come before it."
                    onChange={(event) => onChange(task.id, index, event.target.value)}
                  />
                </label>
              ))}
            </div>
          ) : null}
        </div>
        {!task.items ? (
          <textarea
            value={value?.response ?? ''}
            placeholder="Write your paragraph here"
            onChange={(event) => onChange(task.id, 'response', event.target.value)}
          />
        ) : null}
      </div>
      <button
        className="checkpoint-button secondary-checkpoint-button"
        type="button"
        onClick={() => setDraftMessage('Draft saved in this worksheet. Use Submit Your Work when you are ready.')}
      >
        Submit
      </button>
      {draftMessage ? <p className="submission-message">{draftMessage}</p> : null}
    </section>
  )
}

function ReflectionPanel({ answers, onAnswer, questions = [] }) {
  if (questions.length === 0) return null

  return (
    <section className="reading-question-panel worksheet-reflection-panel" aria-labelledby="worksheet-reflection-title">
      <h2 id="worksheet-reflection-title">Questions to Think About!</h2>
      <div className="worksheet-guided-lines">
        {questions.map((question, index) => (
          <label key={question}>
            <span>{question}</span>
            <textarea
              value={answers[index] ?? ''}
              placeholder="Write your answer here."
              onChange={(event) => onAnswer(index, event.target.value)}
            />
          </label>
        ))}
      </div>
    </section>
  )
}

function GrammarWorksheetPage({ material, openCategoryLab, openCategoryLevel, openPage }) {
  const worksheet = material.grammarWorksheet
  const [taskAnswers, setTaskAnswers] = useState({})
  const [studentName, setStudentName] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')
  const levelName = levels.find((level) => level.cefr === material.level)?.name ?? material.level
  const answeredGroups = Object.values(taskAnswers).filter(hasWorksheetValue).length
  const taskTotal = Math.max(1, worksheet.comprehensionTasks.length)
  const progress = Math.min(100, Math.round((answeredGroups / taskTotal) * 100))

  const setTaskAnswer = (taskId, key, value) => {
    setTaskAnswers((current) => ({
      ...current,
      [taskId]: {
        ...(current[taskId] ?? {}),
        [key]: value,
      },
    }))
  }

  const submitGrammarWorksheet = () => {
    const savedSubmission = {
      studentName: studentName.trim() || 'Student',
      materialId: material.id,
      materialTitle: worksheet.topic,
      level: material.level,
      taskAnswers,
      submittedAt: new Date().toISOString(),
    }

    window.localStorage.setItem(`linguspace-grammar-submission-${material.slug}`, JSON.stringify(savedSubmission))
    setSubmissionStatus('Your grammar worksheet was saved in this browser.')
  }

  return (
    <section
      className="lesson-page grammar-worksheet-page category-grammar"
      style={{ '--exercise-panel-image': toCssUrl(material.exercisePanelImage) }}
    >
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="reading-detail-hero worksheet-hero figma-writing-hero grammar-worksheet-hero">
        <div>
          <button
            className="ghost-link"
            type="button"
            onClick={() => openCategoryLevel('Grammar', material.level)}
          >
            <ChevronRight size={16} aria-hidden="true" />
            Back to Grammar {material.level}
          </button>
          <span className="deck-label">{levelName} Orbit - {material.level} Grammar Worksheet</span>
          <h1>{worksheet.topic}</h1>
          <p>{worksheet.overview}</p>
        </div>
        <aside className="worksheet-hero-preview">
          <img src={material.previewImage} alt="" />
          <div>
            <strong>{progress}%</strong>
            <span>worksheet progress</span>
          </div>
        </aside>
      </header>

      <div className="reading-study-grid worksheet-study-grid grammar-study-grid">
        <article className="reading-text-panel writing-text-version grammar-rule-panel">
          <h2>Rule Version</h2>
          {worksheet.textVersion.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </article>

        <article className="reading-object-panel grammar-focus-panel">
          <img src={material.previewImage} alt="" />
          <div className="reading-object-card-body">
            <span className="deck-label">{material.section}</span>
            <h2>{worksheet.topic}</h2>
            <ul className="grammar-focus-list">
              {worksheet.ruleFocus.map((rule) => (
                <li key={rule}>{rule}</li>
              ))}
            </ul>
            <div className="lesson-material-actions">
              <a href={material.href} target="_blank" rel="noreferrer">
                <ExternalLink size={15} aria-hidden="true" />
                Material
              </a>
              <a href={material.href} download={material.fileName}>
                <Download size={15} aria-hidden="true" />
                Download
              </a>
            </div>
          </div>
        </article>
      </div>

      {worksheet.comprehensionTasks.map((task) => (
        <ComprehensionTask
          answers={taskAnswers}
          onAnswer={setTaskAnswer}
          task={task}
          key={task.id}
        />
      ))}

      <section className="reading-question-panel worksheet-submit-card" aria-labelledby="grammar-submit-title">
        <h2 id="grammar-submit-title">Submit Grammar Practice</h2>
        <div className="reading-submit-panel figma-reading-submit-panel">
          <label>
            Student name
            <input
              value={studentName}
              maxLength={80}
              placeholder="Write your name"
              onChange={(event) => setStudentName(event.target.value)}
            />
          </label>
          <span>{answeredGroups} of {taskTotal} task groups started</span>
          <button type="button" onClick={submitGrammarWorksheet}>Submit Worksheet</button>
          {submissionStatus ? <p className="submission-message">{submissionStatus}</p> : null}
        </div>
      </section>
    </section>
  )
}

function WritingWorksheetPage({ material, openCategoryLab, openCategoryLevel, openPage }) {
  const worksheet = material.writingWorksheet
  const [comprehensionAnswers, setComprehensionAnswers] = useState({})
  const [writingAnswers, setWritingAnswers] = useState({})
  const [reflectionAnswers, setReflectionAnswers] = useState({})
  const [studentName, setStudentName] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')
  const [submissionError, setSubmissionError] = useState('')
  const levelName = levels.find((level) => level.cefr === material.level)?.name ?? material.level
  const testLabel = `${levelName} Orbit - ${material.level} Writing Test`
  const textVersion = worksheet.textVersion ?? [
    `Open and study the model ${worksheet.genre.toLowerCase()} before completing the tasks.`,
    worksheet.overview,
  ]
  const comprehensionTasks = worksheet.comprehensionTasks?.length
    ? worksheet.comprehensionTasks
    : [
      {
        id: 'writing-plan-check',
        title: 'Comprehension Check 1',
        type: 'short-answer',
        instruction: 'Answer these planning questions before writing.',
        items: worksheet.planningQuestions,
      },
    ]
  const writingTasks = worksheet.writingTasks?.length
    ? worksheet.writingTasks
    : [
      {
        id: 'writing-draft-task',
        title: 'Guided Writing Task',
        prompt: worksheet.draftPrompt,
        bullets: worksheet.successCriteria,
      },
    ]
  const completedTaskGroups = [
    ...Object.values(comprehensionAnswers),
    ...Object.values(writingAnswers),
    ...Object.values(reflectionAnswers),
  ].filter(hasWorksheetValue).length
  const totalTaskGroups = Math.max(
    1,
    comprehensionTasks.length + writingTasks.length + (worksheet.reflectionQuestions?.length ?? 0),
  )
  const writingProgress = Math.min(100, Math.round((completedTaskGroups / totalTaskGroups) * 100))

  const setComprehensionAnswer = (taskId, key, value) => {
    setComprehensionAnswers((current) => ({
      ...current,
      [taskId]: {
        ...(current[taskId] ?? {}),
        [key]: value,
      },
    }))
  }

  const setWritingAnswer = (taskId, key, value) => {
    setWritingAnswers((current) => ({
      ...current,
      [taskId]: {
        ...(current[taskId] ?? {}),
        [key]: value,
      },
    }))
  }

  const submitWritingWorksheet = () => {
    setSubmissionError('')
    setSubmissionStatus('')

    if (completedTaskGroups === 0) {
      setSubmissionError('Please answer at least one task before submitting.')
      return
    }

    window.localStorage.setItem(
      `linguspace-writing-submission-${material.slug}`,
      JSON.stringify({
        studentName: studentName.trim() || 'Student',
        materialId: material.id,
        materialTitle: worksheet.topic,
        level: material.level,
        comprehensionAnswers,
        writingAnswers,
        reflectionAnswers,
        submittedAt: new Date().toISOString(),
      }),
    )
    setSubmissionStatus('Your writing worksheet was saved in this browser.')
  }

  return (
    <section
      className="lesson-page writing-worksheet-page category-writing"
      style={{ '--exercise-panel-image': toCssUrl(material.previewImage) }}
    >
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="reading-detail-hero worksheet-hero figma-writing-hero">
        <div>
          <button
            className="ghost-link"
            type="button"
            onClick={() => openCategoryLevel('Writing', material.level)}
          >
            <ChevronRight size={16} aria-hidden="true" />
            Back to Writing {material.level}
          </button>
          <span className="deck-label">{testLabel}</span>
          <h1>{worksheet.topic}</h1>
          <p>Read the text carefully then do the tasks correctly.</p>
        </div>
        <aside className="worksheet-hero-preview">
          <img src={material.previewImage} alt="" />
          <div>
            <strong>{writingProgress}%</strong>
            <span>worksheet progress</span>
          </div>
        </aside>
      </header>

      <div className="reading-study-grid worksheet-study-grid writing-study-grid">
        <article className="reading-text-panel writing-text-version">
          <h2>Text Version</h2>
          {textVersion.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <article className="reading-object-panel writing-model-panel">
          <img src={material.previewImage} alt="" />
          <div className="reading-object-card-body">
            <span className="deck-label">{testLabel}</span>
            <h2>{worksheet.topic}</h2>
            <div className="lesson-material-actions">
              <a href={material.href} target="_blank" rel="noreferrer">
                <ExternalLink size={15} aria-hidden="true" />
                Open
              </a>
              <a href={material.href} download={material.fileName}>
                <Download size={15} aria-hidden="true" />
                Download
              </a>
            </div>
          </div>
        </article>
      </div>

      {comprehensionTasks.map((task) => (
        <ComprehensionTask
          answers={comprehensionAnswers}
          onAnswer={setComprehensionAnswer}
          task={task}
          key={task.id}
        />
      ))}

      {writingTasks.map((task) => (
        <WritingPromptPanel
          value={writingAnswers[task.id] ?? {}}
          onChange={setWritingAnswer}
          task={task}
          key={task.id}
        />
      ))}

      <ReflectionPanel
        answers={reflectionAnswers}
        questions={worksheet.reflectionQuestions}
        onAnswer={(key, value) => setReflectionAnswers((current) => ({ ...current, [key]: value }))}
      />

      <section className="reading-question-panel worksheet-submit-card" aria-labelledby="writing-submit-title">
        <h2 id="writing-submit-title">Submit Your Work</h2>
        <div className="reading-submit-panel">
          <label>
            Student name
            <input
              value={studentName}
              maxLength={80}
              placeholder="Write your name"
              onChange={(event) => setStudentName(event.target.value)}
            />
          </label>
          <button className="checkpoint-button" type="button" onClick={submitWritingWorksheet}>
            Submit Worksheet
          </button>
          {submissionStatus ? <p className="submission-message">{submissionStatus}</p> : null}
          {submissionError ? <p className="submission-message is-error">{submissionError}</p> : null}
        </div>
      </section>
    </section>
  )
}

function SpeakingWorksheetPage({ material, openCategoryLab, openCategoryLevel, openPage }) {
  const worksheet = material.speakingWorksheet
  const [taskAnswers, setTaskAnswers] = useState({})
  const [studentName, setStudentName] = useState('')
  const [recordingName, setRecordingName] = useState('')
  const [speakingNotes, setSpeakingNotes] = useState('')
  const [submissionStatus, setSubmissionStatus] = useState('')
  const [submissionError, setSubmissionError] = useState('')
  const levelName = levels.find((level) => level.cefr === material.level)?.name ?? material.level
  const testLabel = `${levelName} Orbit - ${material.level} Speaking Test`
  const completedTaskGroups = Object.values(taskAnswers).filter(hasWorksheetValue).length
  const speakingProgress = Math.min(
    100,
    Math.round(((completedTaskGroups + Number(Boolean(recordingName)) + Number(Boolean(speakingNotes.trim()))) /
      Math.max(1, worksheet.comprehensionTasks.length + 2)) * 100),
  )

  const setTaskAnswer = (taskId, key, value) => {
    setTaskAnswers((current) => ({
      ...current,
      [taskId]: {
        ...(current[taskId] ?? {}),
        [key]: value,
      },
    }))
  }

  const submitSpeakingWorksheet = () => {
    setSubmissionError('')
    setSubmissionStatus('')

    if (completedTaskGroups === 0 && !recordingName && !speakingNotes.trim()) {
      setSubmissionError('Please complete the comprehension task or add a recording before submitting.')
      return
    }

    window.localStorage.setItem(
      `linguspace-speaking-submission-${material.slug}`,
      JSON.stringify({
        studentName: studentName.trim() || 'Student',
        materialId: material.id,
        materialTitle: worksheet.topic,
        level: material.level,
        taskAnswers,
        recordingName,
        speakingNotes: speakingNotes.trim(),
        submittedAt: new Date().toISOString(),
      }),
    )
    setSubmissionStatus('Your speaking worksheet was saved in this browser.')
  }

  return (
    <section
      className="lesson-page speaking-worksheet-page category-speaking"
      style={{ '--exercise-panel-image': toCssUrl(material.previewImage) }}
    >
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="reading-detail-hero worksheet-hero figma-writing-hero">
        <div>
          <button
            className="ghost-link"
            type="button"
            onClick={() => openCategoryLevel('Speaking', material.level)}
          >
            <ChevronRight size={16} aria-hidden="true" />
            Back to Speaking {material.level}
          </button>
          <span className="deck-label">{testLabel}</span>
          <h1>{worksheet.topic}</h1>
          <p>Watch the video carefully, complete the task, then record your answer.</p>
        </div>
        <aside className="worksheet-hero-preview">
          <img src={material.previewImage} alt="" />
          <div>
            <strong>{speakingProgress}%</strong>
            <span>worksheet progress</span>
          </div>
        </aside>
      </header>

      <div className="reading-study-grid worksheet-study-grid speaking-study-grid">
        <article className="speaking-tips-panel">
          <h2>DO's & DONT's</h2>
          <div className="speaking-tips-columns">
            <div>
              {worksheet.tips.dos.map((tip) => (
                <p key={tip}>{tip}</p>
              ))}
            </div>
            <div>
              {worksheet.tips.donts.map((tip) => (
                <p key={tip}>{tip}</p>
              ))}
            </div>
          </div>
        </article>

        <article className="reading-object-panel speaking-video-panel">
          <video src={material.href} poster={material.previewImage} controls />
          <div className="reading-object-card-body">
            <span className="deck-label">{testLabel}</span>
            <h2>{worksheet.topic}</h2>
            <div className="lesson-material-actions">
              <a href={material.href} target="_blank" rel="noreferrer">
                <ExternalLink size={15} aria-hidden="true" />
                Open
              </a>
              <a href={material.href} download={material.fileName}>
                <Download size={15} aria-hidden="true" />
                Download
              </a>
            </div>
          </div>
        </article>
      </div>

      {worksheet.comprehensionTasks.map((task) => (
        <ComprehensionTask
          answers={taskAnswers}
          onAnswer={setTaskAnswer}
          task={task}
          key={task.id}
        />
      ))}

      <div className="speaking-submit-grid">
        <article className="reading-question-panel speaking-record-card">
          <h2>Practice Recording</h2>
          <p>Watch the end of the video about speaking practice with native speakers, and record your voice here.</p>
          <div className="microphone-orb" aria-hidden="true">
            <MessageCircle size={70} />
          </div>
          <span>Your level: {worksheet.levelNote}</span>
        </article>

        <section className="reading-question-panel speaking-upload-card" aria-labelledby="speaking-submit-title">
          <h2 id="speaking-submit-title">Submit Your Recording</h2>
          <p>{worksheet.speakingPrompt}</p>
          <label className="file-drop speaking-file-drop">
            <Upload size={22} aria-hidden="true" />
            <span>{recordingName || 'Drag your recording here'}</span>
            <input
              type="file"
              accept="audio/*,video/*"
              onChange={(event) => setRecordingName(event.target.files?.[0]?.name ?? '')}
            />
          </label>
          <label className="worksheet-essay-box">
            Speaking notes
            <textarea
              value={speakingNotes}
              placeholder="Write a few notes before or after recording."
              onChange={(event) => setSpeakingNotes(event.target.value)}
            />
          </label>
          <div className="reading-submit-panel">
            <label>
              Student name
              <input
                value={studentName}
                maxLength={80}
                placeholder="Write your name"
                onChange={(event) => setStudentName(event.target.value)}
              />
            </label>
            <button className="checkpoint-button" type="button" onClick={submitSpeakingWorksheet}>
              Submit
            </button>
            {submissionStatus ? <p className="submission-message">{submissionStatus}</p> : null}
            {submissionError ? <p className="submission-message is-error">{submissionError}</p> : null}
          </div>
        </section>
      </div>
    </section>
  )
}

function CategoryLevelPage({
  category,
  levelCode,
  openCategoryLab,
  openPage,
  openReadingMaterial,
  openGrammarWorksheet,
  openListeningWorksheet,
  openSpeakingWorksheet,
  openVocabularyWorksheet,
  openWritingWorksheet,
}) {
  const Icon = categoryIcons[category]
  const levelPage = buildCategoryLevelPage(category, levelCode)
  const levelMaterials = getCategoryLevelMaterials(category, levelCode)
  const sections = Object.entries(groupMaterialsBySection(levelMaterials))
  const displayLevel = levelPage.displayLevel ?? levelCode
  const materialFolder = `public/${levelPage.folder ?? `${category}/${levelCode}`}`
  const levelLabel = category === 'Grammar' ? displayLevel : levelCode
  const grammarWorksheetMaterials =
    category === 'Grammar' ? levelMaterials.filter((material) => material.grammarWorksheet) : []
  const missionIntro = category === 'Grammar'
    ? `Study the ${displayLevel.toLowerCase()} grammar material from ${materialFolder}, open the source when needed, then practise with the worksheet.`
    : 'Study one material, complete the mission checklist, answer a quick self-check, then write a short reflection before moving to the next section.'
  const [selectedMaterialId, setSelectedMaterialId] = useState(levelMaterials[0]?.id ?? '')
  const [completedMissionSteps, setCompletedMissionSteps] = useState([])
  const [quickCheckAnswer, setQuickCheckAnswer] = useState('')
  const [reflection, setReflection] = useState('')
  const selectedMaterial = levelMaterials.find((material) => material.id === selectedMaterialId) ?? levelMaterials[0]
  const quickCheck = quickChecks[category]
  const missionProgress = Math.round(((completedMissionSteps.length + Number(quickCheckAnswer === quickCheck.answer)) / 4) * 100)
  const quickInformationMaterials =
    category === 'Reading' ? getQuickInformationMaterials(levelCode, selectedMaterial?.id) : []

  const toggleMissionStep = (step) => {
    setCompletedMissionSteps((steps) =>
      steps.includes(step) ? steps.filter((item) => item !== step) : [...steps, step],
    )
  }

  return (
    <section className={`lesson-page category-level-page category-${category.toLowerCase()}`}>
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="mission-hero">
        <div>
          <button className="ghost-link" type="button" onClick={() => openCategoryLab(category)}>
            <ChevronRight size={16} aria-hidden="true" />
            Back to {category}
          </button>
          <span className="deck-label">{levelLabel} / {levelPage.title}</span>
          <h1>{category} Mission Control</h1>
          <p>{missionIntro}</p>
          {levelPage.focus ? <p className="mission-focus-line">{levelPage.focus}</p> : null}
        </div>
        <aside className="mission-progress-card" aria-label="Mission progress">
          <strong>{missionProgress}%</strong>
          <span>mission progress</span>
          <div className="mission-progress-track">
            <span style={{ width: `${missionProgress}%` }} />
          </div>
        </aside>
      </header>

      <div className="mission-workbench">
        <aside className="mission-sidebar" aria-label={`${category} material sections`}>
          <div className="mission-sidebar-heading">
            <BookOpen size={18} aria-hidden="true" />
            <h2>Sections</h2>
          </div>
          {sections.length > 0 ? (
            sections.map(([section, materials]) => (
              <div className="section-cluster" key={section}>
                <span className="deck-label">{section}</span>
                {materials.map((material) => (
                  <button
                    className={selectedMaterial?.id === material.id ? 'is-active' : ''}
                    type="button"
                    onClick={() => setSelectedMaterialId(material.id)}
                    key={material.id}
                  >
                    <span>{material.title}</span>
                    <small>{material.type}</small>
                  </button>
                ))}
              </div>
            ))
          ) : (
            <div className="section-cluster empty">
              <span className="deck-label">No materials yet</span>
              <p>Add files inside {materialFolder}, then add their paths to src/data/materialLibrary.js.</p>
            </div>
          )}
        </aside>

        <section className="material-player" aria-label="Selected learning material">
          {selectedMaterial ? (
            <>
              <div className="material-player-preview">
                {selectedMaterial.type === 'Video' ? (
                  <video
                    className="material-preview-video"
                    src={selectedMaterial.href}
                    poster={selectedMaterial.previewImage}
                    controls
                  />
                ) : (
                  <img
                    className={selectedMaterial.type === 'Image' ? 'is-document-image' : ''}
                    src={selectedMaterial.previewImage}
                    alt=""
                  />
                )}
                <span className="material-type-badge">
                  <MaterialTypeIcon type={selectedMaterial.type} size={22} />
                  {selectedMaterial.type}
                </span>
                {selectedMaterial.type === 'Audio' ? (
                  <audio className="preview-media-control" src={selectedMaterial.href} controls />
                ) : null}
              </div>
              <div className="material-player-body">
                <span className="deck-label">{levelLabel} / {category} / {selectedMaterial.section}</span>
                <h2>{selectedMaterial.title}</h2>
                <div className="lesson-material-actions">
                  {category === 'Reading' ? (
                    <button type="button" onClick={() => openReadingMaterial(selectedMaterial)}>
                      <ExternalLink size={15} aria-hidden="true" />
                      Open
                    </button>
                  ) : category === 'Grammar' ? (
                    <>
                      <a href={selectedMaterial.href} target="_blank" rel="noreferrer">
                        <ExternalLink size={15} aria-hidden="true" />
                        Open material
                      </a>
                      <button type="button" onClick={() => openGrammarWorksheet(selectedMaterial)}>
                        <NotebookPen size={15} aria-hidden="true" />
                        Practice
                      </button>
                    </>
                  ) : category === 'Listening' ? (
                    <>
                      <button type="button" onClick={() => openListeningWorksheet(selectedMaterial)}>
                        <NotebookPen size={15} aria-hidden="true" />
                        Worksheet
                      </button>
                      <a href={selectedMaterial.href} target="_blank" rel="noreferrer">
                        <ExternalLink size={15} aria-hidden="true" />
                        Audio
                      </a>
                    </>
                  ) : category === 'Vocabulary' ? (
                    <>
                      <button type="button" onClick={() => openVocabularyWorksheet(selectedMaterial)}>
                        <NotebookPen size={15} aria-hidden="true" />
                        Worksheet
                      </button>
                      <a href={selectedMaterial.href} target="_blank" rel="noreferrer">
                        <ExternalLink size={15} aria-hidden="true" />
                        Material
                      </a>
                    </>
                  ) : category === 'Writing' ? (
                    <>
                      <button type="button" onClick={() => openWritingWorksheet(selectedMaterial)}>
                        <NotebookPen size={15} aria-hidden="true" />
                        Worksheet
                      </button>
                      <a href={selectedMaterial.href} target="_blank" rel="noreferrer">
                        <ExternalLink size={15} aria-hidden="true" />
                        Model
                      </a>
                    </>
                  ) : category === 'Speaking' ? (
                    <>
                      <button type="button" onClick={() => openSpeakingWorksheet(selectedMaterial)}>
                        <NotebookPen size={15} aria-hidden="true" />
                        Worksheet
                      </button>
                      <a href={selectedMaterial.href} target="_blank" rel="noreferrer">
                        <ExternalLink size={15} aria-hidden="true" />
                        Video
                      </a>
                    </>
                  ) : (
                    <a href={selectedMaterial.href} target="_blank" rel="noreferrer">
                      <ExternalLink size={15} aria-hidden="true" />
                      Open
                    </a>
                  )}
                  <a href={selectedMaterial.href} download={selectedMaterial.fileName}>
                    <Download size={15} aria-hidden="true" />
                    Download
                  </a>
                </div>
              </div>
            </>
          ) : (
            <article className="lesson-empty-materials">
              <Icon size={32} aria-hidden="true" />
              <h2>No materials yet</h2>
              <p>Add files inside {materialFolder}, then add their paths to src/data/materialLibrary.js.</p>
            </article>
          )}
        </section>

        <section className="mission-panel-grid" aria-label="Learning and testing activities">
          <article className="mission-checklist-panel">
            <div className="mission-panel-heading">
              <CheckCircle size={18} aria-hidden="true" />
              <h2>Study Mission</h2>
            </div>
            <div className="mission-checklist">
              {studyMissions[category].map((step) => {
                const isDone = completedMissionSteps.includes(step)
                return (
                  <button
                    className={isDone ? 'is-done' : ''}
                    type="button"
                    onClick={() => toggleMissionStep(step)}
                    key={step}
                  >
                    {isDone ? <CheckCircle size={18} aria-hidden="true" /> : <span className="mission-dot" />}
                    <span>{step}</span>
                  </button>
                )
              })}
            </div>
          </article>

          <article className="mission-quiz-panel">
            <div className="mission-panel-heading">
              <CircleHelp size={18} aria-hidden="true" />
              <h2>Quick Check</h2>
            </div>
            <p>{quickCheck.question}</p>
            <div className="quiz-options">
              {quickCheck.options.map((option) => (
                <button
                  className={quickCheckAnswer === option ? 'is-selected' : ''}
                  type="button"
                  onClick={() => setQuickCheckAnswer(option)}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </div>
            {quickCheckAnswer ? (
              <strong className={quickCheckAnswer === quickCheck.answer ? 'quiz-result is-correct' : 'quiz-result'}>
                {quickCheckAnswer === quickCheck.answer ? 'Correct. You are ready to continue.' : 'Try again after reviewing the material.'}
              </strong>
            ) : null}
          </article>

          <article className="mission-reflection-panel">
            <div className="mission-panel-heading">
              <PenTool size={18} aria-hidden="true" />
              <h2>Reflection</h2>
            </div>
            <textarea
              placeholder="Write what you learned, what was difficult, and what you will practice next."
              value={reflection}
              onChange={(event) => setReflection(event.target.value)}
            />
          </article>
        </section>
      </div>

      {category === 'Grammar' ? (
        <section className="grammar-worksheet-library" aria-labelledby="grammar-worksheet-library-title">
          <div className="grammar-worksheet-heading">
            <div>
              <span className="deck-label">{levelLabel} / Worksheet Section</span>
              <h2 id="grammar-worksheet-library-title">Grammar Worksheets</h2>
            </div>
            <p>{grammarWorksheetMaterials.length} worksheet{grammarWorksheetMaterials.length === 1 ? '' : 's'} ready</p>
          </div>
          {grammarWorksheetMaterials.length > 0 ? (
            <div className="grammar-worksheet-grid">
              {grammarWorksheetMaterials.map((material) => (
                <article className="grammar-worksheet-card" key={`worksheet-${material.id}`}>
                  <img src={material.exercisePanelImage || material.previewImage} alt="" />
                  <div>
                    <span className="deck-label">{levelLabel} / {material.section}</span>
                    <h3>{material.grammarWorksheet.topic}</h3>
                    <p>{material.grammarWorksheet.overview}</p>
                    <button type="button" onClick={() => openGrammarWorksheet(material)}>
                      <NotebookPen size={15} aria-hidden="true" />
                      Practice worksheet
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <article className="lesson-empty-materials">
              <Icon size={32} aria-hidden="true" />
              <h2>No worksheets yet</h2>
              <p>Add Grammar materials inside {materialFolder}, then add their paths to src/data/materialLibrary.js.</p>
            </article>
          )}
        </section>
      ) : null}

      {category === 'Reading' ? (
        <QuickInformationSection
          materials={quickInformationMaterials}
          openReadingMaterial={openReadingMaterial}
        />
      ) : null}

      {category !== 'Reading' ? (
        <div className="lesson-material-library compact-library" aria-label="All downloadable materials">
          {levelMaterials.length > 0 ? (
            levelMaterials.map((material) => (
              <article className="lesson-material-card" key={material.id}>
                <div className="lesson-material-preview">
                  <img
                    className={material.type === 'Image' ? 'is-document-image' : ''}
                    src={material.previewImage}
                    alt=""
                  />
                  <span className="material-type-badge">
                    <MaterialTypeIcon type={material.type} />
                    {material.type}
                  </span>
                </div>
                <div className="lesson-material-body">
                  <span className="deck-label">{levelLabel} / {material.section} / {material.type}</span>
                  <h3>{material.title}</h3>
                  <div className="lesson-material-actions">
                    <button
                      type="button"
                      onClick={() => setSelectedMaterialId(material.id)}
                    >
                      <Play size={15} aria-hidden="true" />
                      Study
                    </button>
                    {category === 'Listening' ? (
                      <button
                        type="button"
                        onClick={() => openListeningWorksheet(material)}
                      >
                        <NotebookPen size={15} aria-hidden="true" />
                        Worksheet
                      </button>
                    ) : category === 'Grammar' ? (
                      <a href={material.href} target="_blank" rel="noreferrer">
                        <ExternalLink size={15} aria-hidden="true" />
                        Open
                      </a>
                    ) : category === 'Vocabulary' ? (
                      <button
                        type="button"
                        onClick={() => openVocabularyWorksheet(material)}
                      >
                        <NotebookPen size={15} aria-hidden="true" />
                        Worksheet
                      </button>
                    ) : category === 'Writing' ? (
                      <button
                        type="button"
                        onClick={() => openWritingWorksheet(material)}
                      >
                        <NotebookPen size={15} aria-hidden="true" />
                        Worksheet
                      </button>
                    ) : category === 'Speaking' ? (
                      <button
                        type="button"
                        onClick={() => openSpeakingWorksheet(material)}
                      >
                        <NotebookPen size={15} aria-hidden="true" />
                        Worksheet
                      </button>
                    ) : null}
                    <a href={material.href} download={material.fileName}>
                      <Download size={15} aria-hidden="true" />
                      Download
                    </a>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <article className="lesson-empty-materials">
              <Icon size={32} aria-hidden="true" />
              <h2>No materials yet</h2>
              <p>Add files inside {materialFolder}, then add their paths to src/data/materialLibrary.js.</p>
            </article>
          )}
        </div>
      ) : null}
    </section>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash)
  const [routeHash, setRouteHash] = useState(() => window.location.hash)
  const [selectedCategory, setSelectedCategory] = useState(() => getCategoryFromHash() ?? 'Listening')
  const [selectedLevel, setSelectedLevel] = useState(getLevelFromHash)
  const [activeTopicIndex, setActiveTopicIndex] = useState(0)
  const [materials, setMaterials] = useState(readSavedMaterials)
  const [materialDraft, setMaterialDraft] = useState({
    title: '',
    level: levels[0].name,
    category: 'Document',
    note: '',
    fileName: '',
    fileType: '',
    fileData: '',
  })
  const [activePractice, setActivePractice] = useState(0)
  const [practiceResponse, setPracticeResponse] = useState('')
  const [completedSteps, setCompletedSteps] = useState([])
  const [reviews, setReviews] = useState(() => (hasSupabaseConfig ? starterReviews : readSavedReviews()))
  const [reviewDraft, setReviewDraft] = useState({
    student: '',
    rating: 5,
    comment: '',
  })
  const [reviewsLoading, setReviewsLoading] = useState(hasSupabaseConfig)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [reviewNotice, setReviewNotice] = useState('')
  const appRef = useRef(null)
  const activeTopic = planetTopics[activeTopicIndex]
  const selectedPractice = practicePrompts[activePractice]
  const averageRating = getAverageRating(reviews)
  const selectedReadingMaterial =
    currentPage === 'readingMaterial' ? getReadingMaterialBySlug(routeHash.replace('#reading-material-', '')) : null
  const selectedGrammarMaterial =
    currentPage === 'grammarWorksheet' ? getGrammarMaterialBySlug(routeHash.replace('#grammar-worksheet-', '')) : null
  const selectedListeningMaterial =
    currentPage === 'listeningWorksheet' ? getListeningMaterialBySlug(routeHash.replace('#listening-worksheet-', '')) : null
  const selectedVocabularyMaterial =
    currentPage === 'vocabularyWorksheet' ? getVocabularyMaterialBySlug(routeHash.replace('#vocabulary-worksheet-', '')) : null
  const selectedWritingMaterial =
    currentPage === 'writingWorksheet' ? getWritingMaterialBySlug(routeHash.replace('#writing-worksheet-', '')) : null
  const selectedSpeakingMaterial =
    currentPage === 'speakingWorksheet' ? getSpeakingMaterialBySlug(routeHash.replace('#speaking-worksheet-', '')) : null
  const pageBackgroundImage = getBackgroundImage(currentPage, selectedCategory)

  useEffect(() => {
    const handleHashChange = () => {
      setRouteHash(window.location.hash)
      setCurrentPage(getPageFromHash())
      setSelectedCategory(getCategoryFromHash() ?? 'Listening')
      setSelectedLevel(getLevelFromHash())
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(materialStorageKey, JSON.stringify(materials))
  }, [materials])

  useEffect(() => {
    if (!hasSupabaseConfig) {
      window.localStorage.setItem(reviewStorageKey, JSON.stringify(reviews))
    }
  }, [reviews])

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) return undefined

    let isMounted = true

    const fetchReviews = async () => {
      setReviewsLoading(true)
      setReviewError('')

      const { data, error } = await supabase
        .from('student_reviews')
        .select('id, student_name, rating, comment, created_at')
        .order('created_at', { ascending: false })

      if (!isMounted) return

      if (error) {
        setReviewError('Reviews database is not ready yet. Please create the student_reviews table in Supabase.')
      } else {
        setReviews(data.map(mapReviewRow))
      }

      setReviewsLoading(false)
    }

    fetchReviews()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!hasSupabaseConfig || !supabase) return undefined

    const channel = supabase
      .channel('student-reviews-live')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'student_reviews' },
        ({ new: review }) => {
          const liveReview = mapReviewRow(review)

          setReviews((currentReviews) => {
            if (currentReviews.some((currentReview) => currentReview.id === liveReview.id)) {
              return currentReviews
            }

            return [liveReview, ...currentReviews]
          })
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  useLayoutEffect(() => {
    scrollToPageTop()
    const scrollTimers = [0, 100].map((delay) => window.setTimeout(scrollToPageTop, delay))

    return () => scrollTimers.forEach((timer) => window.clearTimeout(timer))
  }, [currentPage, selectedCategory, selectedLevel])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (!reduceMotion) {
        gsap.from('.reveal', {
          y: 28,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.08,
        })

        if (appRef.current?.querySelector('.planet-image')) {
          gsap.to('.planet-image', {
            rotate: 360,
            duration: 32,
            ease: 'none',
            repeat: -1,
          })
        }

        if (appRef.current?.querySelector('.starfield')) {
          gsap.to('.starfield', {
            backgroundPosition: '880px 420px',
            duration: 34,
            ease: 'none',
            repeat: -1,
          })
        }

        gsap.utils.toArray('.scroll-rise').forEach((element) => {
          gsap.from(element, {
            y: 36,
            autoAlpha: 0,
            duration: 0.75,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 82%',
            },
          })
        })
      }
    }, appRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const topicTimer = window.setInterval(() => {
      setActiveTopicIndex((index) => (index + 1) % planetTopics.length)
    }, 2400)

    return () => window.clearInterval(topicTimer)
  }, [])

  const openPage = (page) => {
    const pageHash = {
      home: 'home',
      materials: 'materials-page',
    }

    window.history.pushState(null, '', `#${pageHash[page] ?? 'home'}`)
    setRouteHash(window.location.hash)
    scrollToPageTop()
    setCurrentPage(page)
  }

  const openCategoryLab = (category) => {
    window.history.pushState(null, '', `#${categorySlugs[category]}-lab`)
    setRouteHash(window.location.hash)
    scrollToPageTop()
    setCurrentPage('categoryLab')
    setSelectedCategory(category)
  }

  const openCategoryLevel = (category, levelCode) => {
    window.history.pushState(null, '', `#${categorySlugs[category]}-${levelCode.toLowerCase()}`)
    setRouteHash(window.location.hash)
    scrollToPageTop()
    setCurrentPage('categoryLevel')
    setSelectedCategory(category)
    setSelectedLevel(levelCode)
  }

  const openReadingMaterial = (material) => {
    window.history.pushState(null, '', `#reading-material-${material.slug}`)
    setRouteHash(window.location.hash)
    scrollToPageTop()
    setCurrentPage('readingMaterial')
    setSelectedCategory('Reading')
    setSelectedLevel(material.level)
  }

  const openGrammarWorksheet = (material) => {
    window.history.pushState(null, '', `#grammar-worksheet-${material.slug}`)
    setRouteHash(window.location.hash)
    scrollToPageTop()
    setCurrentPage('grammarWorksheet')
    setSelectedCategory('Grammar')
    setSelectedLevel(material.level)
  }

  const openListeningWorksheet = (material, options = {}) => {
    window.history.pushState(null, '', `#listening-worksheet-${material.slug}`)
    setRouteHash(window.location.hash)
    if (!options.preserveScroll) {
      scrollToPageTop()
    }
    setCurrentPage('listeningWorksheet')
    setSelectedCategory('Listening')
    setSelectedLevel(material.level)
  }

  const openVocabularyWorksheet = (material) => {
    window.history.pushState(null, '', `#vocabulary-worksheet-${material.slug}`)
    setRouteHash(window.location.hash)
    scrollToPageTop()
    setCurrentPage('vocabularyWorksheet')
    setSelectedCategory('Vocabulary')
    setSelectedLevel(material.level)
  }

  const openWritingWorksheet = (material) => {
    window.history.pushState(null, '', `#writing-worksheet-${material.slug}`)
    setRouteHash(window.location.hash)
    scrollToPageTop()
    setCurrentPage('writingWorksheet')
    setSelectedCategory('Writing')
    setSelectedLevel(material.level)
  }

  const openSpeakingWorksheet = (material) => {
    window.history.pushState(null, '', `#speaking-worksheet-${material.slug}`)
    setRouteHash(window.location.hash)
    scrollToPageTop()
    setCurrentPage('speakingWorksheet')
    setSelectedCategory('Speaking')
    setSelectedLevel(material.level)
  }

  const handleMaterialChange = (event) => {
    const { name, value } = event.target
    setMaterialDraft((draft) => ({ ...draft, [name]: value }))
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      setMaterialDraft((draft) => ({
        ...draft,
        fileName: file.name,
        fileType: file.type || 'application/octet-stream',
        fileData: reader.result,
      }))
    }
    reader.readAsDataURL(file)
  }

  const addMaterial = (event) => {
    event.preventDefault()
    const cleanTitle = materialDraft.title.trim()

    if (!cleanTitle) return

    setMaterials((currentMaterials) => [
      {
        id: crypto.randomUUID(),
        title: cleanTitle,
        level: materialDraft.level,
        category: materialDraft.category,
        note: materialDraft.note.trim(),
        fileName: materialDraft.fileName,
        fileType: materialDraft.fileType,
        fileData: materialDraft.fileData,
      },
      ...currentMaterials,
    ])
    setMaterialDraft({
      title: '',
      level: levels[0].name,
      category: 'Document',
      note: '',
      fileName: '',
      fileType: '',
      fileData: '',
    })
    event.currentTarget.reset()
  }

  const removeMaterial = (materialId) => {
    setMaterials((currentMaterials) => currentMaterials.filter((material) => material.id !== materialId))
  }

  const choosePractice = (index) => {
    setActivePractice(index)
    setPracticeResponse('')
    setCompletedSteps([])
  }

  const toggleStep = (step) => {
    setCompletedSteps((steps) =>
      steps.includes(step) ? steps.filter((item) => item !== step) : [...steps, step],
    )
  }

  const addReview = async (event) => {
    event.preventDefault()
    const cleanComment = reviewDraft.comment.trim()
    const cleanStudent = reviewDraft.student.trim()

    if (!cleanComment) return

    setReviewError('')
    setReviewNotice('')

    if (hasSupabaseConfig && supabase) {
      setReviewSubmitting(true)

      const { data, error } = await supabase
        .from('student_reviews')
        .insert({
          student_name: cleanStudent || 'Student',
          rating: reviewDraft.rating,
          comment: cleanComment,
          is_approved: true,
        })
        .select('id, student_name, rating, comment, created_at')
        .single()

      setReviewSubmitting(false)

      if (error) {
        setReviewError('Could not save the review yet. Please check the Supabase table and policies.')
        return
      }

      if (data) {
        const submittedReview = mapReviewRow(data)

        setReviews((currentReviews) => {
          if (currentReviews.some((currentReview) => currentReview.id === submittedReview.id)) {
            return currentReviews
          }

          return [submittedReview, ...currentReviews]
        })
      }

      setReviewNotice('Thank you. Your review is now live.')

      setReviewDraft({
        student: '',
        rating: 5,
        comment: '',
      })
      return
    }

    setReviews((currentReviews) => [
      {
        id: crypto.randomUUID(),
        student: cleanStudent || 'Student',
        rating: reviewDraft.rating,
        comment: cleanComment,
      },
      ...currentReviews,
    ])
    setReviewDraft({
      student: '',
      rating: 5,
      comment: '',
    })
  }

  return (
    <main className="app-shell" ref={appRef}>
      <div className="space-backdrop" aria-hidden="true">
        <img src={pageBackgroundImage} alt="" />
        <div className="starfield" />
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
      </div>

      {currentPage === 'materials' ? (
        <header className="topbar reveal">
          <a className="brand" href="#home" aria-label="LinguSpace home" onClick={() => openPage('home')}>
            <span className="brand-mark">
              <Rocket size={18} aria-hidden="true" />
            </span>
            <span>LinguSpace</span>
          </a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a href="#home" onClick={() => openPage('home')}>Home</a>
            <a href="#materials-page" onClick={() => openPage('materials')}>Materials</a>
          </nav>
          <a className="nav-action" href="#materials-form">
            <Play size={16} aria-hidden="true" />
            Add
          </a>
        </header>
      ) : null}

      {currentPage === 'home' ? (
        <>
          <section className="figma-home" id="home">
            <nav className="figma-nav reveal" aria-label="Lesson navigation">
              <a className="figma-logo" href="#home" aria-label="LinguSpace home">LinguSpace</a>
              <div className="figma-nav-links">
                {navigationItems.map((item) => (
                  <a
                    href={item === 'Home' ? '#home' : `#${categorySlugs[item]}-lab`}
                    key={item}
                    onClick={(event) => {
                      event.preventDefault()
                      if (item === 'Home') openPage('home')
                      else openCategoryLab(item)
                    }}
                  >
                    {item}
                  </a>
                ))}
              </div>
              <span className="figma-user" aria-hidden="true">
                <UserRound size={14} />
              </span>
            </nav>

            <section className="figma-hero-card reveal" aria-labelledby="home-title">
              <div className="figma-hero-copy">
                <p className="figma-hero-brand">Linguspace</p>
                <p className="figma-eyebrow">Welcome to Self Access Language Learning</p>
                <h1 id="home-title">Feel the joy of learning English with us.</h1>
                <p>
                  You can choose to improve your skills from the beginning, starting with grammar,
                  vocabulary, listening, reading, writing, and speaking. We also provide practice
                  exercises that will help you see the results of your hard work. Good luck!
                </p>
              </div>
              <aside className="control-deck figma-planet-card" aria-label="Animated learning topic planet">
                <div className="deck-header">
                  <div>
                    <span className="deck-label">Now orbiting</span>
                    <h2>{activeTopic.label}</h2>
                  </div>
                </div>

                <div className="planet-stage" aria-label={`${activeTopic.label} planet preview`}>
                  <div
                    className="planet-core"
                    style={{ '--level-color': activeTopic.color }}
                  >
                    <img className="planet-image" src="/planet-hd.png" alt="" aria-hidden="true" />
                  </div>
                  <div className="planet-label-orbit" aria-hidden="true">
                    <span className="planet-label">
                      {activeTopic.label}
                    </span>
                  </div>
                </div>
              </aside>
            </section>

            <section className="why-panel scroll-rise" aria-labelledby="why-title">
              <h2 id="why-title">What can you explore?</h2>
              <div className="why-glass">
                <p>
                  Welcome to Linguspace. Here you can explore everything about English from
                  beginner to advanced levels. Explore this amazing space based on your heart's
                  desire by choosing the right orbit. We offer a variety of Spaces below:
                </p>
                <div className="explore-pills" aria-label="Explore categories">
                  {navigationItems
                    .filter((item) => item !== 'Home')
                    .map((item) => (
                      <a
                        href={`#${categorySlugs[item]}-lab`}
                        key={item}
                        onClick={(event) => {
                          event.preventDefault()
                          openCategoryLab(item)
                        }}
                      >
                        {item}
                      </a>
                    ))}
                </div>
              </div>
            </section>

            <section className="mastery-section scroll-rise" id="mastery" aria-labelledby="mastery-title">
              <h2 id="mastery-title">What do you want to master first?</h2>
              <div className="mastery-grid">
                {masteryCards.map((card) => (
                  <article className={`mastery-card category-${card.category.toLowerCase()}`} key={card.title}>
                    <img src={card.image} alt="" />
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <a
                      href={`#${categorySlugs[card.category]}-lab`}
                      onClick={(event) => {
                        event.preventDefault()
                        openCategoryLab(card.category)
                      }}
                    >
                      Get the lesson
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <StudentReviewSection
              addReview={addReview}
              averageRating={averageRating}
              isLoading={reviewsLoading}
              isSubmitting={reviewSubmitting}
              reviewDraft={reviewDraft}
              reviewError={reviewError}
              reviewNotice={reviewNotice}
              reviews={reviews}
              setReviewDraft={setReviewDraft}
            />
          </section>
        </>
      ) : currentPage === 'readingMaterial' && selectedReadingMaterial ? (
        <ReadingMaterialPage
          key={selectedReadingMaterial.id}
          material={selectedReadingMaterial}
          openCategoryLab={openCategoryLab}
          openCategoryLevel={openCategoryLevel}
          openPage={openPage}
        />
      ) : currentPage === 'grammarWorksheet' && selectedGrammarMaterial ? (
        <GrammarWorksheetPage
          key={selectedGrammarMaterial.id}
          material={selectedGrammarMaterial}
          openCategoryLab={openCategoryLab}
          openCategoryLevel={openCategoryLevel}
          openPage={openPage}
        />
      ) : currentPage === 'listeningWorksheet' && selectedListeningMaterial ? (
        <ListeningWorksheetPage
          key={selectedListeningMaterial.id}
          material={selectedListeningMaterial}
          openCategoryLab={openCategoryLab}
          openGrammarWorksheet={openGrammarWorksheet}
          openCategoryLevel={openCategoryLevel}
          openListeningWorksheet={openListeningWorksheet}
          openPage={openPage}
        />
      ) : currentPage === 'vocabularyWorksheet' && selectedVocabularyMaterial ? (
        <VocabularyWorksheetPage
          key={selectedVocabularyMaterial.id}
          material={selectedVocabularyMaterial}
          openCategoryLab={openCategoryLab}
          openCategoryLevel={openCategoryLevel}
          openPage={openPage}
        />
      ) : currentPage === 'writingWorksheet' && selectedWritingMaterial ? (
        <WritingWorksheetPage
          key={selectedWritingMaterial.id}
          material={selectedWritingMaterial}
          openCategoryLab={openCategoryLab}
          openCategoryLevel={openCategoryLevel}
          openPage={openPage}
        />
      ) : currentPage === 'speakingWorksheet' && selectedSpeakingMaterial ? (
        <SpeakingWorksheetPage
          key={selectedSpeakingMaterial.id}
          material={selectedSpeakingMaterial}
          openCategoryLab={openCategoryLab}
          openCategoryLevel={openCategoryLevel}
          openPage={openPage}
        />
      ) : currentPage === 'categoryLab' ? (
        <CategoryLabPage
          category={selectedCategory}
          openCategoryLab={openCategoryLab}
          openCategoryLevel={openCategoryLevel}
          openPage={openPage}
        />
      ) : currentPage === 'categoryLevel' ? (
        <CategoryLevelPage
          category={selectedCategory}
          levelCode={selectedLevel}
          openCategoryLab={openCategoryLab}
          openGrammarWorksheet={openGrammarWorksheet}
          openListeningWorksheet={openListeningWorksheet}
          openReadingMaterial={openReadingMaterial}
          openSpeakingWorksheet={openSpeakingWorksheet}
          openVocabularyWorksheet={openVocabularyWorksheet}
          openWritingWorksheet={openWritingWorksheet}
          openPage={openPage}
        />
      ) : (
        <>
          <section className="materials-hero page-panel" aria-labelledby="materials-page-title">
            <div>
              <button className="ghost-link" type="button" onClick={() => openPage('home')}>
                <ChevronRight size={16} aria-hidden="true" />
                Back to main page
              </button>
              <h1 id="materials-page-title">Student Materials</h1>
              <p>
                Build a student library with your own pictures, documents, audio files, videos, and quick notes.
                Everything you add here is saved in this browser.
              </p>
            </div>
            <div className="materials-count" aria-label="Saved materials count">
              <strong>{materials.length}</strong>
              <span>materials ready</span>
            </div>
          </section>

          <section className="materials-workspace" aria-label="Materials workspace">
            <form className="material-form page-panel" id="materials-form" onSubmit={addMaterial}>
              <div className="section-heading compact">
                <h2>Add Your Material</h2>
                <p>Upload a file or add a note so students can open it from the library.</p>
              </div>
              <label>
                Title
                <input
                  name="title"
                  type="text"
                  placeholder="Example: Unit 1 listening practice"
                  value={materialDraft.title}
                  onChange={handleMaterialChange}
                  required
                />
              </label>
              <div className="form-row">
                <label>
                  Level
                  <select name="level" value={materialDraft.level} onChange={handleMaterialChange}>
                    {levels.map((level) => (
                      <option key={level.name} value={level.name}>{level.name}</option>
                    ))}
                  </select>
                </label>
                <label>
                  Type
                  <select name="category" value={materialDraft.category} onChange={handleMaterialChange}>
                    <option>Document</option>
                    <option>Picture</option>
                    <option>Audio</option>
                    <option>Video</option>
                    <option>Link or note</option>
                  </select>
                </label>
              </div>
              <label>
                Notes for students
                <textarea
                  name="note"
                  placeholder="Write instructions, page numbers, questions, or reminders."
                  value={materialDraft.note}
                  onChange={handleMaterialChange}
                />
              </label>
              <label className="file-drop">
                <Upload size={22} aria-hidden="true" />
                <span>{materialDraft.fileName || 'Choose picture, document, audio, or video'}</span>
                <input type="file" onChange={handleFileChange} />
              </label>
              <button className="primary-button form-submit" type="submit">
                <Plus size={17} aria-hidden="true" />
                Add Material
              </button>
            </form>

            <section className="practice-lab page-panel" aria-labelledby="practice-title">
              <div className="section-heading compact">
                <h2 id="practice-title">Practice Lab</h2>
                <p>Students can use this Practice Lab to practice their skills.</p>
              </div>
              <div className="practice-selector" role="tablist" aria-label="Practice activities">
                {practicePrompts.map((practice, index) => (
                  <button
                    key={practice.title}
                    className={activePractice === index ? 'is-active' : ''}
                    type="button"
                    role="tab"
                    aria-selected={activePractice === index}
                    onClick={() => choosePractice(index)}
                  >
                    {practice.skill}
                  </button>
                ))}
              </div>
              <article className="student-practice-card">
                <span className="deck-label">{selectedPractice.skill} Practice</span>
                <h3>{selectedPractice.title}</h3>
                <p>{selectedPractice.prompt}</p>
                <div className="practice-steps">
                  {selectedPractice.steps.map((step) => (
                    <label key={step} className={completedSteps.includes(step) ? 'is-done' : ''}>
                      <input
                        type="checkbox"
                        checked={completedSteps.includes(step)}
                        onChange={() => toggleStep(step)}
                      />
                      <span>{step}</span>
                    </label>
                  ))}
                </div>
                <textarea
                  className="student-response"
                  placeholder="Students can write their answer here."
                  value={practiceResponse}
                  onChange={(event) => setPracticeResponse(event.target.value)}
                />
              </article>
            </section>
          </section>

          <section className="student-library" aria-labelledby="library-title">
            <div className="section-heading">
              <h2 id="library-title">Student Library</h2>
              <p>Students can preview image, play audio or video, and download documents from here.</p>
            </div>
            <div className="library-grid">
              {materials.map((material) => {
                const Icon = getMaterialIcon(material.fileType)
                const fileKind = getFileKind(material.fileType)
                return (
                  <article className="library-card" key={material.id}>
                    <div className="library-preview">
                      {fileKind === 'image' && material.fileData ? (
                        <img src={material.fileData} alt="" />
                      ) : fileKind === 'audio' && material.fileData ? (
                        <audio src={material.fileData} controls />
                      ) : fileKind === 'video' && material.fileData ? (
                        <video src={material.fileData} controls />
                      ) : (
                        <Icon size={32} aria-hidden="true" />
                      )}
                    </div>
                    <div className="library-card-body">
                      <span className="deck-label">{material.level} / {material.category}</span>
                      <h3>{material.title}</h3>
                      {material.note ? <p>{material.note}</p> : null}
                      <div className="library-actions">
                        {material.fileData ? (
                          <a href={material.fileData} download={material.fileName || material.title}>
                            <Download size={15} aria-hidden="true" />
                            Download
                          </a>
                        ) : null}
                        <button type="button" onClick={() => removeMaterial(material.id)}>
                          <Trash2 size={15} aria-hidden="true" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>
        </>
      )}
    </main>
  )
}

export default App
