require('dotenv').config();
const { exit } = require('process');
const { Category } = require('./model');

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

const generateCategories = () => {
  newCategories
    .forEach(async (item) => {
      await new Category(item).save();
      exit(0);
    })
    .catch((err) => {
      exit(0);
    });
};

generateCategories();
