require('dotenv').config();
const { exit } = require('process');
const { slug } = require('./utils');
const { User, Discussion, Category } = require('./model');

const newCategories = [
  {
    authRequired: false,
    color: '#046aa7',
    description:
      'Official updates, news, and important information for the community',
    icon: { icon: 'megaphone', type: 'solid' },
    moderators: [],
    slug: 'announcement',
    status: true,
    title: 'Announcement'
  },
  {
    authRequired: false,
    color: '#0f67b1',
    description: 'Themes and MinForum customizations',
    icon: { icon: 'customize', type: 'solid' },
    moderators: [],
    slug: 'themes',
    status: true,
    title: 'Themes'
  },
  {
    authRequired: false,
    color: '#2c2133',
    description: 'Minforum plugins & extensions',
    icon: { icon: 'plug', type: 'solid' },
    moderators: [],
    slug: 'extensions',
    status: true,
    title: 'Extensions'
  },
  {
    authRequired: true,
    color: '#3e1dca',
    description: 'Suggestions, Ideas and Proposals.',
    icon: { icon: 'list-plus', type: 'regular' },
    moderators: [],
    slug: 'feature-requests',
    status: true,
    title: 'Feature Requests'
  },
  {
    authRequired: false,
    color: '#de1335',
    description: 'Communities and Forums using MinForum',
    icon: { icon: 'slideshow', type: 'solid' },
    moderators: [],
    slug: 'showcase',
    status: true,
    title: 'Showcase'
  },
  {
    authRequired: false,
    color: '#497309',
    description: 'Testing ',
    icon: { icon: 'test-tube', type: 'regular' },
    moderators: [],
    slug: 'testing',
    status: true,
    title: 'Testing'
  },
  {
    authRequired: true,
    color: '#4c4d19',
    description: 'Feedback on all MinForum features',
    icon: { icon: 'notepad', type: 'solid' },
    moderators: [],
    slug: 'feedbacks',
    status: true,
    title: 'Feedbacks'
  },
  {
    authRequired: true,
    color: '#1e841e',
    description: 'Get support for MinForum',
    icon: { icon: 'support', type: 'regular' },
    moderators: [],
    slug: 'support',
    status: true,
    title: 'Support'
  },
  {
    authRequired: true,
    color: '#8983a9',
    description: 'Contribution to MinForum',
    icon: { icon: 'code-alt', type: 'regular' },
    moderators: [],
    slug: 'development',
    status: true,
    title: 'Development'
  }
];

const categories = [
  'announcement',
  'themes',
  'extensions',
  'feature-requests',
  'showcase',
  'general',
  'feedbacks',
  'support',
  'development',
  'testing'
];

const sampleTitles = {
  announcement: [
    'New Feature Release',
    'Upcoming Maintenance',
    'Community Update'
  ],
  themes: ['Dark Mode Theme', 'Minimalist Theme', 'Retro Theme'],
  extensions: [
    'New Extension: Task Manager',
    'Extension Update: Calendar',
    'Extension Bug Fixes'
  ],
  'feature-requests': [
    'Request for Dark Mode',
    'Request for Offline Mode',
    'Request for Customizable Dashboard'
  ],
  showcase: [
    'My First Project',
    'Community Project Showcase',
    'Featured Project of the Week'
  ],
  general: [
    'Welcome to the Community',
    'Introduce Yourself',
    'General Discussion'
  ],
  feedbacks: [
    'Feedback on New Feature',
    'Feedback on Website Redesign',
    'Feedback on Mobile App'
  ],
  support: [
    'Help with Login Issues',
    'Support for Billing Questions',
    'Technical Support'
  ],
  development: [
    'Development Roadmap',
    'Contributing to the Project',
    'Development Updates'
  ],
  testing: ['Testing New Feature', 'Bug Report', 'Test Results']
};

const sampleContents = {
  announcement: [
    'We are excited to announce...',
    'Please be aware of the upcoming...',
    'Here is the latest update from our team...'
  ],
  themes: [
    'Introducing our new theme...',
    'Check out the latest theme updates...',
    "We've added a new theme to our collection..."
  ],
  extensions: [
    "We've just released a new extension...",
    'Our extension has been updated...',
    "We've fixed some bugs in our extension..."
  ],
  'feature-requests': [
    'I would love to see a feature for...',
    'It would be great if we could have...',
    'Can we get a feature for...'
  ],
  showcase: [
    "I'm proud to share my first project...",
    'Check out this amazing project from our community...',
    "This week's featured project is..."
  ],
  general: [
    'Welcome to our community!',
    'Tell us a bit about yourself...',
    'Feel free to discuss anything here...'
  ],
  feedbacks: [
    'I have some feedback on the new feature...',
    'I think the website redesign is...',
    "I've been using the mobile app and..."
  ],
  support: [
    "I'm having trouble logging in...",
    'I have a question about my bill...',
    'I need technical support for...'
  ],
  development: [
    'Here is our development roadmap...',
    'We welcome contributions to our project...',
    'Latest updates from our development team...'
  ],
  testing: [
    'We are testing a new feature...',
    'I found a bug in the latest release...',
    'Here are the results from our latest test...'
  ]
};

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

const generateCategories = () => {
  newCategories.forEach(async (item) => {
    await new Category(item).save();
  });
};

const generatePost = async (category) => {
  try {
    const users = await User.orderBy('createdAt').limit(1);
    const user = users[0];
    console.log(user);

    if (!user) {
      throw new Error('No admin user found');
    }

    const title = getRandomElement(sampleTitles[category]);
    const content = getRandomElement(sampleContents[category]);

    const body = {
      categoryId: category,
      content: `<p>${content}</p>`,
      slug: title.toLowerCase().replace(/ /g, '-') + '-' + slug(),
      edited: false,
      isPinned: false,
      premium: false,
      title: title,
      userId: user.id
    };

    const discussion = new Discussion(body);
    const savedDiscussion = await discussion.save();
    console.log(savedDiscussion);
  } catch (error) {
    console.error('Error generating post:', error);
  }
};

const generatePosts = async (categories, totalPosts) => {
  const postsPerCategory = Math.floor(totalPosts / categories.length);

  for (const category of categories) {
    for (let i = 0; i < postsPerCategory; i++) {
      await generatePost(category);
    }
  }

  // Add remaining posts to ensure totalPosts is met
  const remainingPosts = totalPosts % categories.length;
  for (let i = 0; i < remainingPosts; i++) {
    const randomCategory = getRandomElement(categories);
    await generatePost(randomCategory);
  }
};

const seedPost = async () => {
  const totalPosts = 100;
  generateCategories();
  await generatePosts(categories, totalPosts)
    .then(() => {
      console.log('All posts generated successfully');
      exit(0);
    })
    .catch((error) => {
      console.error('Error generating posts:', error);
      exit(0);
    });
};

seedPost();
