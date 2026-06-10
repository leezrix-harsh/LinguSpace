const normalizeTitle = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

const writingEntries = [
  {
    keywords: ['at school timetable'],
    content: {
      topic: 'At School Timetable',
      genre: 'Timetable',
      overview: 'Read Paula\'s school timetable, then practise word order, times, days, and simple true or false details.',
      textVersion: [
        'Study the model timetable carefully. Pay attention to school subjects, days of the week, times, and daily routines.',
        'Use complete sentences when you answer. Remember the order: person + verb + subject/activity + time + day.',
      ],
      comprehensionTasks: [
        {
          id: 'school-order',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'Sentence Building',
          type: 'sentence-building',
          instruction: 'Rearrange the words in each question to make a correct sentence about Paula\'s schedule. Do not change any of the words.',
          items: [
            'has / maths / 09:00 / Paula / at / Mondays / on',
            'is / 11:30 / 11:00 / morning / from / to / break / the',
            'on / she / geography / afternoon / Tuesday / has / the / in',
            'lunch / Paula / 13:30 / every / at / day / has',
          ],
        },
        {
          id: 'school-true-false',
          title: 'Comprehension Check 2',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'true-false',
          items: [
            'Paula studies music on Monday morning.',
            'Paula has lunch at 1.30 p.m.',
            'Paula studies science on Tuesday.',
            'Paula plays the guitar on Monday and Wednesday.',
            'Paula doesn\'t study languages on Wednesday.',
          ],
        },
      ],
    },
  },
  {
    keywords: ['introducing yourself'],
    content: {
      topic: 'Introducing Yourself by Email',
      genre: 'Email',
      overview: 'Read Katie\'s introductory email and check key personal details before writing your own short introduction.',
      textVersion: [
        'Katie introduces herself with basic personal information: age, city, country, languages, hobbies, and a pet.',
        'Use friendly, simple sentences and finish with a polite closing.',
      ],
      comprehensionTasks: [
        {
          id: 'intro-gap',
          title: 'Comprehension Check 1',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Gap Fill',
          type: 'gap-fill',
          items: [
            { before: 'Katie is', after: 'years old.' },
            { before: 'She comes from a city called Valletta, which is located in', after: '.' },
            { before: 'Besides English, Katie can also speak', after: '.' },
            { before: 'In her free time, Katie enjoys swimming, listening to music, and playing', after: '.' },
            { before: 'Max is the name of Katie\'s pet', after: '.' },
          ],
        },
        {
          id: 'intro-post',
          title: 'Comprehension Check 2',
          type: 'template-writing',
          instruction: 'Complete the introductory post with your own personal information.',
          templateLines: [
            'Subject: Hello from [Your Country]!',
            'Hi everyone! How are you?',
            'My name\'s ______ and I\'m ____ years old. I\'m from ______ in ______. I speak ______ and ______. I like ______ and ______. I\'ve got a ______.',
            'Do you want to be my friend? Please write to me!',
            'Best wishes,',
            '[Your Name]',
          ],
        },
      ],
    },
  },
  {
    keywords: ['applying for a job'],
    content: {
      topic: 'Applying a Job',
      genre: 'Job Email',
      overview: 'Put a simple job application email in order, then complete a more polished application with useful job vocabulary.',
      textVersion: [
        'A job application email needs a clear subject, a greeting, short information about your skills, a request, and a polite closing.',
      ],
      comprehensionTasks: [
        {
          id: 'job-order',
          title: 'Comprehension Check 1',
          modes: ['Ordering', 'Gap Fill'],
          activeMode: 'Ordering',
          type: 'ordering',
          instruction: 'Rearrange the sentences below into the correct sequence.',
          items: [
            'I can speak English, Spanish and a little German.',
            'Subject: Job Application - Sports Cafe',
            'Dear Hoburn University Sports Club,',
            'Best regards, Lenny Tyler',
            'Please send me information about the job at the sports cafe.',
            'To: jobs@uoh.edu.uk-sports',
            'I am friendly and I love working with people. I can cook well, especially pasta and pizza. I can use a computer very well.',
          ],
        },
        {
          id: 'job-gap',
          title: 'Comprehension Check 2',
          modes: ['Ordering', 'Gap Fill'],
          activeMode: 'Gap Fill',
          type: 'word-bank-gap',
          wordBank: ['waitress', 'friendly', 'take orders', 'handle complaints', 'cashier system'],
          text: [
            'To: jobs@uoh.edu.uk-sports',
            'Subject: Application for Waitress Position - [Your Name]',
            'Dear Hoburn University Sports Club Team,',
            'I am writing to express my interest in the (1) ______ position at your Sports Cafe.',
            'I love working with people and I consider myself a very (2) ______ and energetic person. I can (3) ______ and (4) ______ politely, which I believe will help me serve customers effectively.',
            'Furthermore, I am good at using computers, so learning how to operate the cafe\'s (5) ______ will be easy for me.',
            'Thank you for reading my email. I look forward to hearing from you.',
            'Best regards,',
            '[Your Name]',
          ],
        },
      ],
    },
  },
  {
    keywords: ['about my family'],
    content: {
      topic: 'About My Family',
      genre: 'Email',
      overview: 'Read Kelly\'s email about her family and complete details about jobs, appearance, hobbies, and family members.',
      textVersion: [
        'Kelly describes the people in her family. Notice words for jobs, appearance, age, hobbies, nationality, and eye colour.',
      ],
      comprehensionTasks: [
        {
          id: 'family-gap',
          title: 'Comprehension Check 1',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Gap Fill',
          type: 'gap-fill',
          items: [
            { before: 'Kelly\'s mother works as a', after: 'and speaks both English and Spanish.' },
            { before: 'While Kelly\'s mother is short and slim, her father David is tall and', after: '.' },
            { before: 'Kelly\'s sister, Shania, is 14 years old and loves to', after: 'all the time.' },
            { before: 'David is American and works in a', after: '.' },
            { before: 'Kelly and her sister Shania both have', after: 'eyes.' },
          ],
        },
        {
          id: 'family-email',
          title: 'Comprehension Check 2',
          type: 'short-answer',
          instruction: 'Write an email to Kelly to describe your family. Think about these questions.',
          items: [
            'Who do you live with?',
            'What do your parents look like?',
            'What do they do?',
            'Do you have a sister or brother? How old are they?',
            'Do you have a pet?',
          ],
        },
      ],
    },
  },
  {
    keywords: ['a chat'],
    content: {
      topic: 'A Chat',
      genre: 'Chat Message',
      overview: 'Read a short chat, answer direct questions, then write a short reply confirming a plan.',
      textVersion: [
        'Chat messages are short, friendly, and practical. Look for feelings, names, nicknames, places, reasons, and meeting times.',
      ],
      comprehensionTasks: [
        {
          id: 'chat-short',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'short-answer',
          instruction: 'Write short answers to the questions below.',
          items: [
            'How did one of the friends feel about the party?',
            'What was Jedd Summers doing at the party?',
            'What is Jedd\'s nickname, and how does the other friend know him?',
            'Why are the friends meeting at Lisa\'s house tomorrow?',
            'What time are they meeting tomorrow?',
          ],
        },
      ],
      writingTasks: [
        {
          id: 'chat-reply',
          title: 'Guided Writing Task',
          modes: ['Sentence Building', 'Grouping'],
          activeMode: 'Grouping',
          prompt: 'Imagine you forgot about a plan to study with your classmate tomorrow. Write a short text message reply of 20-40 words.',
          bullets: [
            'Apologize for forgetting the plan.',
            'Say yes or agree to meet tomorrow.',
            'Confirm the place and the time.',
            'You may use 2-3 chat abbreviations if they fit naturally.',
          ],
        },
      ],
    },
  },
  {
    keywords: ['recipe'],
    content: {
      topic: 'A Recipe',
      genre: 'Recipe',
      overview: 'Order the recipe method, then rewrite it as a short paragraph using sequence words.',
      textVersion: [
        'A recipe uses clear steps and sequence words. Notice preparation, frying, simmering, and serving.',
      ],
      comprehensionTasks: [
        {
          id: 'recipe-order',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'ordering',
          instruction: 'Read the recipe method carefully and number the steps from 1 to 5 in the correct order.',
          items: [
            'Cook the pasta in a large pot filled with boiling water.',
            'Chop the red onion, red peppers, and bacon into small pieces.',
            'Serve the hot pasta with your cooked sauce and enjoy your meal!',
            'Put some olive oil into a pan, heat it up, and fry the chopped ingredients.',
            'Mix in the oregano, garlic, tomatoes, and water, then let it cook for 20 minutes.',
          ],
        },
      ],
      writingTasks: [
        {
          id: 'recipe-paragraph',
          title: 'Guided Writing Task',
          prompt: 'Rewrite the correct sequence above into a short paragraph using the transition words First, Next, Then, After that, and Finally.',
          bullets: [
            'Preparation: Chop all your vegetables and meat into small pieces on a cutting board.',
            'Frying: Fry the onion, peppers, and bacon in hot olive oil.',
            'Simmering: Add the sauce ingredients and cook for 20 minutes while boiling your pasta.',
          ],
        },
      ],
    },
  },
  {
    keywords: ['social network'],
    content: {
      topic: 'Social Network Messages',
      genre: 'Profile',
      overview: 'Study two short social network profiles, then write a clear profile about yourself.',
      textVersion: [
        'A short social profile usually includes name, age, place, appearance, hobbies, and a friendly closing sentence.',
      ],
      comprehensionTasks: [
        {
          id: 'social-profile',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'profile-writing',
          instruction: 'Create your social network profile. Write 50-80 words and include the information below.',
          bullets: [
            'Your name',
            'Your age',
            'Where you are from',
            'Your physical appearance, especially hair and eyes',
            'Your hobbies or favourite activities',
            'A friendly closing sentence',
          ],
        },
      ],
      reflectionQuestions: [
        'What new information did you learn about Kenta and Megan?',
        'Why is it important to introduce yourself clearly when meeting new people online?',
      ],
    },
  },
  {
    keywords: ['a blog'],
    content: {
      topic: 'A Blog',
      genre: 'Blog',
      overview: 'Read a blog-style text, write a short personal answer, then complete a lively blog paragraph.',
      textVersion: [
        'A blog sounds friendly and conversational. It often uses short reactions, adjectives, and direct questions to the reader.',
      ],
      comprehensionTasks: [
        {
          id: 'blog-short',
          title: 'Comprehension Check 1',
          modes: ['Short Answer', 'True/False'],
          activeMode: 'Short Answer',
          type: 'short-answer',
          instruction: 'Describe a memorable school trip or excursion you have been on.',
          items: [
            'Where did you go?',
            'What did you do there?',
            'Why was it memorable?',
          ],
        },
        {
          id: 'blog-gap',
          title: 'Comprehension Check 2',
          modes: ['Ordering', 'Gap Fill'],
          activeMode: 'Gap Fill',
          type: 'word-bank-gap',
          wordBank: ['Fantastic', 'Can you believe?', 'Friendly', 'So scary', 'Amazing', 'Check them out', 'Something amazing happened', 'I can\'t wait'],
          text: [
            'I had an (1) ______ time on summer camp in Florida. Met loads of great people and have lots of stories to tell.',
            '(2) ______ I saw a shark in the sea? Yeah, I was surfing and having a (3) ______ time with my friends, then suddenly a shark came really close. I could see its teeth!',
            '(4) ______! We all screamed and luckily the shark swam away. I love Florida, the people are so cool and (5) ______ and the sun is always out.',
            'And, (6) ______. Top secret, but I met a really nice girl. We\'re going to keep in touch!',
            'Anyway, I had a great time. (7) ______ to go again next year. I\'ve put loads of new photos on Facebook so (8) ______ and leave a comment, too!',
          ],
        },
      ],
    },
  },
  {
    keywords: ['letter to a friend'],
    content: {
      topic: 'A Letter to a Friend',
      genre: 'Letter',
      overview: 'Group useful friendly letter phrases, then write a short reply letter with a clear opening and closing.',
      textVersion: [
        'Friendly letters use warm opening phrases and natural closing phrases. Sort the expressions before writing your reply.',
      ],
      comprehensionTasks: [
        {
          id: 'friend-letter-group',
          title: 'Comprehension Check 1',
          modes: ['Short Answer', 'True/False'],
          activeMode: 'True/False',
          type: 'grouping',
          instruction: 'Write the phrases in the correct group.',
          wordBank: [
            'How\'s everything going?',
            'Hope to hear from you soon',
            'It was great to hear from you the other day',
            'Say hello to your family and friend',
            'Take care',
            'Please write back soon.',
          ],
          groups: ['To begin a letter', 'To end a letter'],
        },
      ],
      writingTasks: [
        {
          id: 'friend-letter-reply',
          title: 'Writing Task',
          modes: ['Grouping', 'Writing'],
          activeMode: 'Writing',
          prompt: 'Write a short, friendly reply letter to Dani of around 60-80 words describing your own favourite day of the week.',
          bullets: ['The opening', 'The daytime activity', 'The reason why you like it', 'A friendly closing'],
        },
      ],
    },
  },
  {
    keywords: ['new friend'],
    content: {
      topic: 'An Email to a New Friend',
      genre: 'Email',
      overview: 'Put Sara\'s mixed-up email paragraphs in a logical order, then write a friendly reply.',
      textVersion: [
        'A friendly email normally opens with a greeting and personal introduction, then school, friends, hobbies, and a closing request.',
      ],
      comprehensionTasks: [
        {
          id: 'new-friend-order',
          title: 'Comprehension Check 1',
          modes: ['Short Answer', 'True/False'],
          activeMode: 'True/False',
          type: 'paragraph-order',
          instruction: 'The paragraphs from Sara\'s email are mixed up. Put A-D into the correct logical order.',
          items: [
            {
              label: 'A',
              text: 'My best friends are Jo and Steph and we\'re in the same class. Our teacher Mrs Jenkins is nice, but sometimes she gives us lots of homework. After school I often go to a cafe with my friends. The cafe has got Wi-Fi so we can chat online and then usually we go home to do our homework.',
            },
            {
              label: 'B',
              text: 'I live near my school so I walk to school every day. I like school and my favourite subjects are maths and ICT. I want to work with computers when I leave school. What about you? What subjects do you like at school? I enjoy playing hockey and I\'m in the school hockey team. Last week we won a match and I scored a goal!',
            },
            {
              label: 'C',
              text: 'Hi Marco. Nice to meet you! My name\'s Sara and I\'m fifteen. I live in London with my mum, my little brother Alfie and my dog, Cookie. We live in a small house in Greenwich. It\'s got three bedrooms and a small garden.',
            },
            {
              label: 'D',
              text: 'At the weekend I sometimes play in hockey matches and I often go roller-skating in the park. I\'m good at roller-skating because I can go very fast and sometimes I skate when I take my dog for a walk. Write soon and tell me all about yourself, your friends and your family. Best wishes, Sara',
            },
          ],
        },
      ],
      writingTasks: [
        {
          id: 'new-friend-reply',
          title: 'Guided Writing Task',
          modes: ['Sentence Building', 'Writing'],
          activeMode: 'Writing',
          prompt: 'Write a friendly reply email to Sara in about 60-80 words. Answer her questions and use the rules below.',
          bullets: ['Capital letters', 'Frequency adverbs', 'The linker because', 'A closing phrase'],
        },
      ],
    },
  },
  {
    keywords: ['opinion essay'],
    content: {
      topic: 'An Opinion Essay',
      genre: 'Opinion Essay',
      overview: 'Identify ideas from the essay and then plan your own clear opinion paragraph structure.',
      textVersion: [
        'An opinion essay gives a clear viewpoint and supports it with reasons and examples. Look for ideas about video games and sport.',
      ],
      comprehensionTasks: [
        {
          id: 'opinion-ideas',
          title: 'Comprehension Check 1',
          modes: ['Short Answer', 'True/False'],
          activeMode: 'True/False',
          type: 'checkbox',
          instruction: 'Which of these ideas are mentioned in the essay? Choose six ideas.',
          maxSelections: 6,
          items: [
            'There are a lot of different types of games.',
            'Video games are fun to play with your friends.',
            'Video games allow you to play many different sports.',
            'You can compete with people all over the world via the internet.',
            'Playing video games is the best way to stay physically fit and healthy.',
            'It\'s better to do exercise outside in the fresh air.',
            'You can play video games even when the weather is bad.',
            'Playing sport is more intense exercise than playing video games.',
          ],
        },
      ],
      writingTasks: [
        {
          id: 'opinion-essay-writing',
          title: 'Guided Writing Task',
          prompt: 'Write your essay in clear paragraphs.',
          bullets: [
            'Use phrases like First of all, In addition, and To sum up to start each paragraph.',
            'Express your own opinion using I think, In my opinion, or I believe.',
            'Mention other viewpoints with phrases like Some people think and say whether you agree or disagree with them.',
          ],
        },
      ],
    },
  },
  {
    keywords: ['cv'],
    content: {
      topic: 'CV',
      genre: 'CV',
      overview: 'Choose the information that belongs on a CV and reflect on part-time work experience.',
      textVersion: [
        'A CV is a formal document. It usually includes contact details, education, experience, skills, languages, and references.',
      ],
      comprehensionTasks: [
        {
          id: 'cv-points',
          title: 'Comprehension Check 1',
          modes: ['Short Answer', 'True/False'],
          activeMode: 'True/False',
          type: 'checkbox',
          instruction: 'Choose all the things that you write on a CV.',
          items: [
            'Date of birth',
            'Address',
            'Family',
            'Pets',
            'Education history',
            'Work experience',
            'Skills',
            'Languages spoken',
            'References',
            'Telephone number',
            'Email address',
            'Favourite food',
            'Friends',
          ],
        },
      ],
      reflectionQuestions: [
        'Have you ever had a part-time job? Do you think it is a good idea for students to do part-time work?',
        'What are the disadvantages and advantages of part-time work?',
      ],
    },
  },
  {
    keywords: ['x games'],
    content: {
      topic: 'The X Games',
      genre: 'Blog',
      overview: 'Read a blog about the X Games and choose the best options to complete the sentences.',
      textVersion: [
        'This blog describes a visit to the X Games. Notice holiday duration, ticket opinions, event names, measurements, and reasons.',
      ],
      comprehensionTasks: [
        {
          id: 'xgames-options',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'multiple-choice',
          instruction: 'Click the best option to complete these sentences.',
          items: [
            { before: 'They\'ve been on holiday for', options: ['five days', 'four months', 'a year'] },
            { before: 'They thought the tickets for the Barcelona X Games were', options: ['cheap', 'well priced', 'expensive'] },
            { before: 'They watched the final of the', options: ['BMX bike race', 'Moto X race', 'BMX jumping competition'] },
            { before: '15 metres refers to', options: ['the height of the winning jump', 'the distance between the two ramps', 'the size of the ramp'] },
            { before: 'Simon was able to meet some of the riders because', options: ['he is a blogger and he had a press pass', 'one rider was a friend of a friend', 'they bought special all-access tickets'] },
          ],
        },
      ],
      writingTasks: [
        {
          id: 'xgames-blog',
          title: 'Guided Writing Task',
          prompt: 'Write a blog post about something you really love.',
          bullets: [
            'Write like you talk. Blogs tend to have a conversational style.',
            'Learn to take good pictures and share them with your readers.',
            'Share your personal experiences and opinions.',
            'Be original and try to show your own personality and style.',
            'Only include your own work and never copy content without saying where it is from.',
          ],
        },
      ],
    },
  },
  {
    keywords: ['internet'],
    content: {
      topic: 'A For and Against Essay About the Internet',
      genre: 'For and Against Essay',
      overview: 'Practise logical paragraph cohesion by writing sentences that lead naturally into given arguments.',
      textVersion: [
        'In this task, read the second sentence first. It gives a specific point about internet use. Write one or two coherent sentences before it.',
        'Your sentences must set up the topic so the transition into the bold sentence makes complete sense.',
      ],
      comprehensionTasks: [
        {
          id: 'internet-cohesion',
          title: 'Instruction',
          type: 'instruction',
          instruction: 'Example: The internet is a great tool for learning new skills. Many students use websites to get better grades at school. On the other hand, many teenagers spend too many hours playing video games instead of studying.',
        },
      ],
      writingTasks: [
        {
          id: 'internet-guided',
          title: 'Guided Writing Task',
          type: 'guided-blanks',
          prompt: 'Write one or two sentences before each given sentence.',
          items: [
            {
              sentence: 'This often helps teenagers to widen their knowledge and improve their school grades.',
              clue: 'What online action happens before this? Think about what students do on Google or educational websites when they get homework.',
            },
            {
              sentence: 'This is also a wonderful way of keeping in touch with friends and family who live around the world.',
              clue: 'Before this sentence, mention a different way people chat or practise speaking English online with international friends.',
            },
          ],
        },
      ],
    },
  },
  {
    keywords: ['magazine article'],
    content: {
      topic: 'A Magazine Article',
      genre: 'Magazine Article',
      overview: 'Read a magazine article about bullying and choose the best options to complete the summary sentences.',
      textVersion: [
        'This article discusses bullying and school life. Notice the writer\'s opinion, examples, and who could help solve the problem.',
      ],
      comprehensionTasks: [
        {
          id: 'magazine-options',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'multiple-choice',
          instruction: 'Click the best option to complete these sentences.',
          items: [
            { before: 'The writer thinks a person\'s school life', options: ['is never really happy', 'is the happiest time in their life', 'can be made miserable by bullying'] },
            { before: 'Bullying is', options: ['common', 'rare', 'happening everywhere'], after: 'in the writer\'s experience.' },
            { before: 'The writer\'s friend was bullied', options: ['at school', 'online', 'at school and online'] },
            { before: 'The boy who was being bullied had a very', options: ['strange', 'funny', 'bad'], after: 'experience.' },
            { before: 'The writer thinks', options: ['students', 'teachers', 'parents'], after: 'could do more about this problem.' },
          ],
        },
      ],
      reflectionQuestions: [
        'How serious a problem is bullying where you live?',
        'What can be done to stop bullying in schools?',
      ],
    },
  },
  {
    keywords: ['formal email'],
    content: {
      topic: 'A More Formal Email',
      genre: 'Formal Email',
      overview: 'Check formal email style rules, then complete a request email with suitable formal phrases.',
      textVersion: [
        'A formal email uses polite expressions, complete forms, conventional greetings and closings, and all required content points.',
      ],
      comprehensionTasks: [
        {
          id: 'formal-true-false',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'true-false',
          instruction: 'Circle True or False for these sentences.',
          items: [
            'You should use polite expressions and more formal grammatical structures.',
            'You don\'t have to include all the points mentioned in the question.',
            'You can use contractions in a formal email.',
            'You should avoid using conventional expressions for starting and finishing the email.',
            'You should use this style for a person you don\'t know.',
          ],
        },
        {
          id: 'formal-gap',
          title: 'Comprehension Check 2',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'numbered-gap-paragraph',
          text: '1 ______ Mr Cotton, I am interested 2 ______ studying at your language school and I am writing 3 ______ request further information about your courses. Please could you tell me 4 ______ there are still places available on the summer courses? I 5 ______ also like to know how much a three-week course 6 ______. Finally, I would be 7 ______ if you could send me details of the accommodation that is available. I look 8 ______ to 9 ______ from you. Yours 10 ______, Amit Khan',
        },
      ],
    },
  },
  {
    keywords: ['skyfall'],
    content: {
      topic: 'Skyfall film review',
      genre: 'Film Review',
      overview: 'Check key facts from the Skyfall review, then complete advice about film review structure.',
      textVersion: [
        'A film review includes basic facts, a short plot summary, an opinion, and recommendations. It should not give away the ending.',
      ],
      comprehensionTasks: [
        {
          id: 'skyfall-options',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'multiple-choice',
          instruction: 'Click the best option to complete these sentences.',
          items: [
            { before: 'Skyfall is', options: ['a musical', 'an action film', 'a comedy'] },
            { before: 'The film', options: ['was produced', 'came out on DVD', 'came out in cinemas'], after: 'in 2012.' },
            { before: 'The main character is', options: ['Daniel Craig', 'James Bond', 'Raoul Silva'] },
            { before: '', options: ['James Bond', 'Javier Bardem', 'Raoul Silva'], after: 'is an ex-spy who wants revenge.' },
            { before: 'There are', options: ['scenes in', 'characters from', 'songs from'], after: 'Istanbul, Shanghai, Macau, London and Scotland.' },
          ],
        },
        {
          id: 'skyfall-structure',
          title: 'Comprehension Check 2',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'word-bank-gap',
          wordBank: ['aspects', 'plot', 'paragraph', 'recommendations', 'opinion', 'structure'],
          text: [
            'A film review should be well organised with a clear 1 ______. One way of doing this is to divide your review into four 2 ______.',
            'The first paragraph can be quite short and contain your brief overall 3 ______ of the film. You will explain this opinion in later paragraphs.',
            'Also give some basic facts like the names of the actors and the year of release.',
            'The second paragraph can be a summary of the 4 ______, but make sure you don\'t give away the ending.',
          ],
        },
      ],
    },
  },
  {
    keywords: ['school trip abroad'],
    content: {
      topic: 'A Report On a School Trip Abroad',
      genre: 'Report',
      overview: 'Complete key information from the report, then write your own report evaluating an educational trip.',
      textVersion: [
        'A report has a clear purpose, organised sections, factual detail, evaluation, and recommendations for the future.',
      ],
      comprehensionTasks: [
        {
          id: 'school-trip-gap',
          title: 'Comprehension Check 1',
          modes: ['Gap Fill', 'True/False'],
          activeMode: 'True/False',
          type: 'gap-fill',
          instruction: 'Complete the sentences with the correct word(s) from the report.',
          items: [
            { before: 'The purpose of the report is to assess the success of the trip and', after: 'it to future Year 12 students of Spanish.' },
            { before: 'The host families exceeded students\' expectations because they made them feel welcome and helped them experience Spanish culture, language, and', after: '.' },
            { before: 'As a result of the cultural activities, students were able to visit nearby towns of historical interest such as El Escorial, Segovia, and', after: '.' },
            { before: 'To improve future exchanges, the writer suggests that Spanish students should be invited to go on the', after: 'trips.' },
            { before: 'In conclusion, the writer has no hesitation in recommending the language exchange because it provided students with opportunities to use Spanish and gain a', after: 'perspective.' },
          ],
        },
      ],
      writingTasks: [
        {
          id: 'school-trip-report',
          title: 'Guided Writing Task',
          prompt: 'Write your own report about a school trip, study tour, or educational visit that you have participated in or can imagine.',
          bullets: [
            'Explain the situation and purpose of the report.',
            'Evaluate the success of the trip.',
            'Describe what students learned or experienced.',
            'Recommend whether the trip should be organised again.',
          ],
        },
      ],
    },
  },
  {
    keywords: ['leisure time'],
    content: {
      topic: 'An essay about leisure time and academic pressure',
      genre: 'Essay',
      overview: 'Complete the essay structure and practise C1-level transformations about solutions and causes.',
      textVersion: [
        'This essay discusses academic pressure and leisure time. Notice how the introduction, problem paragraphs, solutions, and conclusion are organised.',
      ],
      comprehensionTasks: [
        {
          id: 'leisure-structure',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'structure-fill',
          instruction: 'Complete the essay structure with the content points in each paragraph.',
          wordBank: [
            'Cause of the problem',
            'summary of the solutions',
            'overview of the essay',
            'paraphrase of the question',
            'solution',
            'summary of the problem and its causes',
          ],
          paragraphs: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Paragraph 4'],
        },
        {
          id: 'leisure-gap',
          title: 'Comprehension Check 2',
          modes: ['Gap Fill', 'True/False'],
          activeMode: 'True/False',
          type: 'gap-fill',
          instruction: 'Complete the second sentence so that it has the same meaning as the first. Write two or three words in each gap.',
          items: [
            { before: 'The council should build more cycle lanes to improve road safety. More cycle lanes', after: 'to improve road safety.' },
            { before: 'If we don\'t raise taxes, there won\'t be enough money for hospitals.', after: 'taxes, there won\'t be enough money for hospitals.' },
            { before: 'Building a new railway system is a possibility. We', after: 'a new railway system.' },
            { before: 'The government should provide theatres with subsidies. Theatres', after: 'by the government.' },
            { before: 'This is not an effective way to run a business. The business is not', after: '.' },
          ],
        },
      ],
    },
  },
  {
    keywords: ['invitation letter'],
    content: {
      topic: 'An Invitation Letter',
      genre: 'Invitation Letter',
      overview: 'Match invitation content points to paragraphs, then write an informal invitation to a friend.',
      textVersion: [
        'An invitation letter should open warmly, explain why you are writing, invite the reader, describe the event or visit, mention plans, and request a reply.',
      ],
      comprehensionTasks: [
        {
          id: 'invitation-match',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'paragraph-match',
          instruction: 'Match the content points with the paragraphs.',
          wordBank: [
            'Opening greeting and small talk',
            'First content point: invite him or her to a public event in your country',
            'Second content point: describe the public event',
            'Third content point: explain about other plans you have',
            'Request for reply',
          ],
          paragraphs: ['Paragraph 1', 'Paragraph 2', 'Paragraph 3', 'Paragraph 4', 'Paragraph 5'],
        },
      ],
      writingTasks: [
        {
          id: 'invitation-writing',
          title: 'Guided Writing Task',
          prompt: 'Read the invitation letter from Sophie to Malika. Then imagine that you would like to invite a friend from another city or country to visit your hometown. Write an informal invitation letter.',
          bullets: [
            'Ask how your friend is doing.',
            'Explain why you are writing.',
            'Invite your friend to visit your hometown or city.',
            'Describe interesting places, events, or activities they can enjoy.',
            'Explain why they would like the visit.',
            'Suggest what you could do together.',
            'End the letter in a friendly way.',
          ],
        },
      ],
    },
  },
  {
    keywords: ['describing a graph'],
    content: {
      topic: 'Describing a graph of trends over time',
      genre: 'Graph Report',
      overview: 'Practise C2 trend language, then write an academic report describing graph trends over time.',
      textVersion: [
        'Use precise trend language for increases, decreases, fluctuations, levelling off, sudden changes, and comparisons.',
      ],
      comprehensionTasks: [
        {
          id: 'graph-sentence-building',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'Writing'],
          activeMode: 'Writing',
          type: 'gap-fill',
          instruction: 'Complete the second sentence so that it has the same meaning as the first. Write two or three words.',
          items: [
            { before: 'Sales grew rapidly in the first quarter, then slowed down considerably. The', after: 'sales was rapid in the first quarter, then slowed down considerably.' },
            { before: 'There was a lot of fluctuation in their income between 2014 and 2016. Their income', after: 'between 2014 and 2016.' },
            { before: 'The popularity of the sport declined considerably over the following few years. There was a', after: 'in the popularity of the sport over the following few years.' },
            { before: 'Ownership of tablets surged dramatically between October and December. There was a', after: 'ownership of tablets between October and December.' },
            { before: 'There was a gradual increase in levels of interest after 2013. Levels of interest', after: 'after 2013.' },
            { before: 'Despite the levelling-off of sales in 2012, production was increased. Although sales', after: 'in 2012, production was increased.' },
            { before: 'There was a significant decline in profits in the second quarter. Profits', after: 'the second quarter.' },
            { before: 'The price suddenly surged at the end of 2016. The price', after: 'up at the end of 2016.' },
          ],
        },
      ],
      writingTasks: [
        {
          id: 'graph-report',
          title: 'Guided Writing Task',
          prompt: 'Study the graph showing technology usage in the UK between 2000 and 2015. Write a report for an academic audience summarising the main trends and comparisons.',
          bullets: [
            'Introduce the graph and its purpose.',
            'Provide an overview of the main trends.',
            'Compare the changes in different technologies over time.',
            'Highlight the most significant increases and any notable exceptions.',
            'Support your description with relevant data from the graph.',
          ],
        },
      ],
      reflectionQuestions: [
        'What percentage of people in your country use the internet?',
        'Is this changing? What new technology are people starting to adopt?',
      ],
    },
  },
]

const speakingEntries = [
  {
    keywords: ['talking about your family'],
    content: {
      topic: 'Talking About Your Family',
      overview: 'Practise family vocabulary, then record a short spoken answer about your family.',
      levelNote: 'Intermediate',
      tips: {
        dos: [
          'Do warm up your voice before recording.',
          'Do listen actively and breathe before speaking.',
          'Do use filler phrases if you need time to think.',
        ],
        donts: [
          'Don\'t memorize scripts word for word.',
          'Don\'t over-correct yourself repeatedly.',
          'Don\'t give one-word or very short answers.',
        ],
      },
      comprehensionTasks: [
        {
          id: 'family-speaking-groups',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'grouping',
          instruction: 'Put the words in the correct groups.',
          wordBank: ['Grandma', 'Uncle', 'Mum', 'Dad', 'Grandad', 'Half-brother', 'Aunt', 'Brother', 'Sister'],
          groups: ['Girls/women', 'Boy/men'],
        },
      ],
      speakingPrompt: 'What is your family like? Tell us by assigning your recording through the submission box below.',
    },
  },
  {
    keywords: ['different opinions'],
    content: {
      topic: 'Different Opinion',
      overview: 'Identify positive and negative opinions, then record your own opinion about a teacher.',
      levelNote: 'Advanced',
      tips: {
        dos: [
          'Do warm up your voice before recording.',
          'Do listen actively and breathe before speaking.',
          'Do use filler phrases if you need time to think.',
        ],
        donts: [
          'Don\'t memorize scripts word for word.',
          'Don\'t over-correct yourself repeatedly.',
          'Don\'t give one-word or very short answers.',
        ],
      },
      comprehensionTasks: [
        {
          id: 'different-opinion-pn',
          title: 'Comprehension Check 1',
          modes: ['Multiple Choice', 'Gap Fill'],
          activeMode: 'Gap Fill',
          type: 'positive-negative',
          instruction: 'Decide which statement is a positive opinion (P) and a negative opinion (N).',
          items: [
            'Oh, she\'s really good! I like Madame Martin.',
            'Just had French. It was awful.',
            'Yeah, Mr Greenwood is OK, but he gives so much homework!',
            'Mr Thomas. He\'s my favourite.',
            'Miss McCloud. She\'s a brilliant teacher and she\'s so nice.',
          ],
        },
      ],
      speakingPrompt: 'Who is your favorite teacher? Tell us your opinion and why you like them.',
    },
  },
  {
    keywords: ['pros and cons of mobile phones'],
    content: {
      topic: 'Pros and Cons of Mobile Phone',
      overview: 'Match key mobile-phone vocabulary to meanings, then record your opinion about phone use with friends.',
      levelNote: 'Advanced',
      tips: {
        dos: [
          'Do warm up your voice before recording.',
          'Do listen actively and breathe before speaking.',
          'Do use filler phrases if you need time to think.',
        ],
        donts: [
          'Don\'t memorize scripts word for word.',
          'Don\'t over-correct yourself repeatedly.',
          'Don\'t give one-word or very short answers.',
        ],
      },
      comprehensionTasks: [
        {
          id: 'mobile-vocab-match',
          title: 'Comprehension Check 1',
          modes: ['Sentence Building', 'True/False'],
          activeMode: 'True/False',
          type: 'matching',
          instruction: 'Match the content points with the words below.',
          wordBank: ['Freedom', 'To be distracted', 'Multitasking', 'Constantly', 'To ignore something', 'Weird'],
          items: [
            'doing many different things at the same time',
            'to decide not to listen or pay attention to something',
            'the state of not being limited or controlled by anything',
            'all the time; non-stop',
            'to be unable to focus because something is taking your attention away',
            'strange or unusual',
          ],
        },
      ],
      speakingPrompt: 'How much do you use your phone when you are with your friends? What do you think are the pros and cons of mobile phones? Tell us your opinion.',
    },
  },
]

const findEntry = (entries, title) => {
  const normalized = normalizeTitle(title)
  const matches = entries.filter((entry) =>
    entry.keywords.every((keyword) => normalized.includes(normalizeTitle(keyword))),
  )

  matches.sort(
    (first, second) =>
      second.keywords.join(' ').length - first.keywords.join(' ').length,
  )

  return matches[0]?.content ?? null
}

export const getWritingWorksheetContent = (title) => findEntry(writingEntries, title)

export const getSpeakingWorksheetContent = (title) => findEntry(speakingEntries, title)
