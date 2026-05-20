# LinguSpace MSALL

LinguSpace MSALL is a React + Vite learning-materials website for Self Access Language Learning. It includes category labs, CEFR level pages, downloadable lesson materials, reading-study pages, mission checklists, quizzes, and a browser-saved student materials page.

## Features

- Home page with skill navigation
- Grammar, Vocabulary, Listening, Reading, Writing, Speaking, and Exams labs
- CEFR level pages from A1 to C2
- Downloadable materials from the `public/` folder
- Reading detail pages with guided passages and comprehension checks
- Student Materials page with local browser storage

## Project Files

Important folders and files for GitHub:

- `src/` - React source code and data files
- `public/` - images, PDFs, audio, video, and learning materials
- `index.html` - Vite entry HTML
- `package.json` and `package-lock.json` - dependencies and scripts
- `vite.config.js` - Vite configuration
- `eslint.config.js` - lint configuration
- `.gitignore` - keeps generated/dependency files out of Git

Generated folders such as `node_modules/` and `dist/` should not be uploaded.

## Setup

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Check code quality:

```bash
npm run lint
```

## Materials

The material library is defined in `src/data/materialLibrary.js`. The actual files live in `public/`, using matching paths such as:

```text
public/Reading/A1/1. The Lost Dog.png
public/Listening/A1 - Elementary/1. A1-AUDIO 1/...
public/Vocabulary/A1/1. office/Office Vocabulary A1.mp4
```

When adding new materials, place the file inside `public/` and add its path to `materialFilePaths` in `src/data/materialLibrary.js`.
