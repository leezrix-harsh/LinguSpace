import { useEffect, useRef, useState } from 'react'
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
  Trophy,
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
  categoryTeachers,
} from './data/categoryContent'
import {
  getCategoryLevelMaterials,
  getReadingMaterialBySlug,
  groupMaterialsBySection,
} from './data/materialLibrary'

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

const getReadingSlugFromHash = () => window.location.hash.replace('#reading-material-', '')

const categoryIcons = {
  Grammar: NotebookPen,
  Vocabulary: BookOpen,
  Listening: Headphones,
  Reading: BookOpen,
  Writing: PenTool,
  Speaking: MessageCircle,
  Exams: Trophy,
}

const studyMissions = {
  Grammar: ['Review the rule', 'Find the pattern', 'Write two examples'],
  Vocabulary: ['Watch or open the material', 'List new words', 'Use three words in sentences'],
  Listening: ['Listen once for meaning', 'Listen again for details', 'Repeat the useful phrases'],
  Reading: ['Skim the text', 'Scan for key details', 'Answer the comprehension check'],
  Writing: ['Study the model', 'Plan your response', 'Write and revise'],
  Speaking: ['Prepare ideas', 'Practice aloud', 'Record or present your answer'],
  Exams: ['Read the instructions', 'Time your attempt', 'Review your mistakes'],
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
  Exams: {
    question: 'What should you check before answering exam questions?',
    options: ['The instructions.', 'Only the page color.', 'Nothing at all.'],
    answer: 'The instructions.',
  },
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

function LessonCard({ cta = 'Get the lesson', description, Icon = Headphones, image, onClick, title }) {
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
      <button type="button" onClick={onClick}>{cta}</button>
    </article>
  )
}

function TeacherIntro({ category }) {
  const teacher = categoryTeachers[category]

  return (
    <section className="teacher-intro" aria-label={`${category} specialist introduction`}>
      <div className="teacher-profile">
        <img src={teacher.image} alt="" />
        <h2>{teacher.name}</h2>
        <p>{teacher.role}</p>
      </div>
      <div className="teacher-message">
        <h2>{teacher.greeting.split(',')[0]}, <span>Students!</span></h2>
        <p>{teacher.message}</p>
      </div>
    </section>
  )
}

function CategoryLabPage({ category, openCategoryLab, openCategoryLevel, openPage }) {
  const Icon = categoryIcons[category]

  return (
    <section className="lesson-page category-lab-page">
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="lesson-page-heading">
        <h1>Welcome to <span>{category} Lab!</span></h1>
      </header>
      <div className="lesson-card-grid">
        {buildCategoryLevelCards(category).map((level) => (
          <LessonCard
            key={level.cefr}
            cta="Get the lesson"
            description={level.description}
            Icon={Icon}
            image={level.image}
            title={level.title}
            onClick={() => openCategoryLevel(category, level.cefr)}
          />
        ))}
      </div>
      <TeacherIntro category={category} />
    </section>
  )
}

function MaterialTypeIcon({ type, size = 16 }) {
  if (type === 'Audio') return <Music size={size} aria-hidden="true" />
  if (type === 'Video') return <Video size={size} aria-hidden="true" />
  if (type === 'Image') return <Image size={size} aria-hidden="true" />
  return <FileText size={size} aria-hidden="true" />
}

function ReadingMaterialPage({ material, openCategoryLab, openCategoryLevel, openPage }) {
  const [answers, setAnswers] = useState({})
  const answeredCount = Object.keys(answers).length
  const correctCount = material.readingQuestions.filter((question, index) => answers[index] === question.answer).length

  return (
    <section className="lesson-page reading-material-page">
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="reading-detail-hero">
        <div>
          <button
            className="ghost-link"
            type="button"
            onClick={() => openCategoryLevel('Reading', material.level)}
          >
            <ChevronRight size={16} aria-hidden="true" />
            Back to Reading {material.level}
          </button>
          <span className="deck-label">{material.level} / {material.section} / {material.type}</span>
          <h1>{material.title}</h1>
          <p>Read the guided passage, open the original material, then answer the quick comprehension check.</p>
        </div>
        <img src={material.previewImage} alt="" />
      </header>

      <div className="reading-study-grid">
        <article className="reading-text-panel">
          <div className="section-heading compact">
            <h2>Guided Reading</h2>
            <p>Use this short version to understand the topic before opening the original file.</p>
          </div>
          {material.readingPassage.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </article>

        <article className="reading-object-panel">
          <div className="section-heading compact">
            <h2>Original Material</h2>
            <p>Preview the file here, or open it in a new tab.</p>
          </div>
          <div className="reading-object-frame">
            {material.type === 'Image' ? (
              <img src={material.href} alt="" />
            ) : material.type === 'Audio' ? (
              <audio src={material.href} controls />
            ) : material.type === 'Video' ? (
              <video src={material.href} controls />
            ) : (
              <object data={material.href} type="application/pdf" aria-label={material.title}>
                <a href={material.href} target="_blank" rel="noreferrer">Open original material</a>
              </object>
            )}
          </div>
          <div className="lesson-material-actions">
            <a href={material.href} target="_blank" rel="noreferrer">
              <ExternalLink size={15} aria-hidden="true" />
              Open Original
            </a>
            <a href={material.href} download={material.fileName}>
              <Download size={15} aria-hidden="true" />
              Download
            </a>
          </div>
        </article>
      </div>

      <section className="reading-question-panel" aria-labelledby="reading-questions-title">
        <div className="section-heading compact">
          <h2 id="reading-questions-title">Comprehension Check</h2>
          <p>{correctCount} correct from {answeredCount} answered.</p>
        </div>
        <div className="reading-question-list">
          {material.readingQuestions.map((question, index) => (
            <article className="reading-question-card" key={question.question}>
              <h3>{index + 1}. {question.question}</h3>
              <div className="quiz-options">
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
      </section>
    </section>
  )
}

function CategoryLevelPage({ category, levelCode, openCategoryLab, openPage, openReadingMaterial }) {
  const Icon = categoryIcons[category]
  const levelPage = buildCategoryLevelPage(category, levelCode)
  const levelMaterials = getCategoryLevelMaterials(category, levelCode)
  const sections = Object.entries(groupMaterialsBySection(levelMaterials))
  const [selectedMaterialId, setSelectedMaterialId] = useState(levelMaterials[0]?.id ?? '')
  const [completedMissionSteps, setCompletedMissionSteps] = useState([])
  const [quickCheckAnswer, setQuickCheckAnswer] = useState('')
  const [reflection, setReflection] = useState('')
  const selectedMaterial = levelMaterials.find((material) => material.id === selectedMaterialId) ?? levelMaterials[0]
  const quickCheck = quickChecks[category]
  const missionProgress = Math.round(((completedMissionSteps.length + Number(quickCheckAnswer === quickCheck.answer)) / 4) * 100)

  const toggleMissionStep = (step) => {
    setCompletedMissionSteps((steps) =>
      steps.includes(step) ? steps.filter((item) => item !== step) : [...steps, step],
    )
  }

  return (
    <section className="lesson-page category-level-page">
      <LessonNav openCategoryLab={openCategoryLab} openPage={openPage} />
      <header className="mission-hero">
        <div>
          <button className="ghost-link" type="button" onClick={() => openCategoryLab(category)}>
            <ChevronRight size={16} aria-hidden="true" />
            Back to {category}
          </button>
          <span className="deck-label">{levelCode} / {levelPage.title}</span>
          <h1>{category} Mission Control</h1>
          <p>
            Study one material, complete the mission checklist, answer a quick self-check, then write a short
            reflection before moving to the next section.
          </p>
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
              <p>Add files for {category} {levelCode} to activate this mission.</p>
            </div>
          )}
        </aside>

        <section className="material-player" aria-label="Selected learning material">
          {selectedMaterial ? (
            <>
              <div className="material-player-preview">
                <img src={selectedMaterial.previewImage} alt="" />
                <span className="material-type-badge">
                  <MaterialTypeIcon type={selectedMaterial.type} size={22} />
                  {selectedMaterial.type}
                </span>
                {selectedMaterial.type === 'Audio' ? (
                  <audio className="preview-media-control" src={selectedMaterial.href} controls />
                ) : selectedMaterial.type === 'Video' ? (
                  <video className="preview-media-control" src={selectedMaterial.href} controls />
                ) : null}
              </div>
              <div className="material-player-body">
                <span className="deck-label">{levelCode} / {category} / {selectedMaterial.section}</span>
                <h2>{selectedMaterial.title}</h2>
                <div className="lesson-material-actions">
                  {category === 'Reading' ? (
                    <button type="button" onClick={() => openReadingMaterial(selectedMaterial)}>
                      <ExternalLink size={15} aria-hidden="true" />
                      Open
                    </button>
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
              <p>Add files inside public/{category}/{levelCode}, then add their paths to src/data/materialLibrary.js.</p>
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

      <div className="lesson-material-library compact-library" aria-label="All downloadable materials">
        {levelMaterials.length > 0 ? (
          levelMaterials.map((material) => (
            <article className="lesson-material-card" key={material.id}>
              <div className="lesson-material-preview">
                <img src={material.previewImage} alt="" />
                <span className="material-type-badge">
                  <MaterialTypeIcon type={material.type} />
                  {material.type}
                </span>
              </div>
              <div className="lesson-material-body">
                <span className="deck-label">{levelCode} / {material.section} / {material.type}</span>
                <h3>{material.title}</h3>
                <div className="lesson-material-actions">
                  <button
                    type="button"
                    onClick={() => (category === 'Reading' ? openReadingMaterial(material) : setSelectedMaterialId(material.id))}
                  >
                    <Play size={15} aria-hidden="true" />
                    Study
                  </button>
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
            <p>Add files inside public/{category}/{levelCode}, then add their paths to src/data/materialLibrary.js.</p>
          </article>
        )}
      </div>
      <TeacherIntro category={category} />
    </section>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash)
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
  const appRef = useRef(null)
  const activeTopic = planetTopics[activeTopicIndex]
  const selectedPractice = practicePrompts[activePractice]
  const selectedReadingMaterial =
    currentPage === 'readingMaterial' ? getReadingMaterialBySlug(getReadingSlugFromHash()) : null

  useEffect(() => {
    const handleHashChange = () => {
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
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'auto' })
    })
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
    setCurrentPage(page)
  }

  const openCategoryLab = (category) => {
    window.history.pushState(null, '', `#${categorySlugs[category]}-lab`)
    setCurrentPage('categoryLab')
    setSelectedCategory(category)
  }

  const openCategoryLevel = (category, levelCode) => {
    window.history.pushState(null, '', `#${categorySlugs[category]}-${levelCode.toLowerCase()}`)
    setCurrentPage('categoryLevel')
    setSelectedCategory(category)
    setSelectedLevel(levelCode)
  }

  const openReadingMaterial = (material) => {
    window.history.pushState(null, '', `#reading-material-${material.slug}`)
    setCurrentPage('readingMaterial')
    setSelectedCategory('Reading')
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

  return (
    <main className="app-shell" ref={appRef}>
      <div className="space-backdrop" aria-hidden="true">
        <img src="/carina-nebula.png" alt="" />
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
              <a className="figma-logo" href="#home" aria-label="LinguSpace home">Linguspace</a>
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
              <h2 id="why-title">Why us?</h2>
              <div className="why-glass" />
            </section>

            <section className="mastery-section scroll-rise" id="mastery" aria-labelledby="mastery-title">
              <h2 id="mastery-title">What do you want to master first?</h2>
              <div className="mastery-grid">
                {masteryCards.map((card) => (
                  <article className="mastery-card" key={card.title}>
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
          </section>
        </>
      ) : currentPage === 'readingMaterial' && selectedReadingMaterial ? (
        <ReadingMaterialPage
          material={selectedReadingMaterial}
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
          openReadingMaterial={openReadingMaterial}
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
