export const materialStorageKey = 'LinguSpace-materials'

export const starterMaterials = [
  {
    id: 'starter-1',
    title: 'Sample Reading Passage',
    level: 'Beginner',
    category: 'Document',
    note: 'Replace this with your own PDF, worksheet, picture, audio, or video.',
    fileName: 'editable-sample.txt',
    fileType: 'text/plain',
    fileData: '',
  },
]

export const practicePrompts = [
  {
    title: 'Vocabulary Builder',
    skill: 'Reading',
    prompt: 'Choose five new words from one material and write one original sentence for each word.',
    steps: ['Find new words', 'Write meanings', 'Create sentences'],
  },
  {
    title: 'Listen and Shadow',
    skill: 'Listening',
    prompt: 'Play an audio material, repeat each sentence, then record or rehearse your best version.',
    steps: ['Listen once', 'Repeat slowly', 'Repeat naturally'],
  },
  {
    title: 'Picture Talk',
    skill: 'Speaking',
    prompt: 'Open an image material and describe what you see using at least eight English sentences.',
    steps: ['Name the objects', 'Describe actions', 'Share an opinion'],
  },
  {
    title: 'Quick Reflection',
    skill: 'Writing',
    prompt: 'After studying one material, write a short paragraph about what you learned.',
    steps: ['Summarize', 'Add examples', 'Check grammar'],
  },
]
