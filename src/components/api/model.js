const config = {
  api: {
    host: process.env.DB_HOST,
    db: process.env.DB_NAME,
    port: process.env.DB_PORT
  }
};

const validator = require('validator');
const thinky = require('thinky')(config.api);

const r = thinky.r;
const type = thinky.type;

const User = thinky.createModel('users', {
  slug: type.string(),
  name: type.string().required(),
  username: type.string().required(),
  email: type.string().required(validator.isEmail),
  phone: type.string(),
  password: type.string(),
  photo: type.string(),
  country: type.string(),
  state: type.string(),
  city: type.string(),
  zipCode: type.string(),
  point: type.number().default(0),
  role: type.string().enum(['member', 'moderator', 'admin']).default('member'),
  status: type
    .string()
    .enum(['pending', 'active', 'banned', 'suspended'])
    .default('pending'),
  suspendDuration: type.date(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const ActiveUser = thinky.createModel('active-users', {
  active: type.number().default(0)
});

const Category = thinky.createModel('categories', {
  slug: type.string(),
  title: type.string(),
  description: type.string(),
  color: type.string(),
  moderators: type.array().default([]),
  authRequired: type.boolean().default(false),
  status: type.boolean().default(true),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Discussion = thinky.createModel('discussions', {
  slug: type.string(),
  title: type.string(),
  content: type.string(),
  status: type.string().enum(['active', 'banned']).default('active'),
  view: type.number().default(0),
  userId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Comment = thinky.createModel('comments', {
  slug: type.string(),
  content: type.string(),
  status: type.string().enum(['answer', 'flag', 'normal']).default('normal'),
  userId: type.string(),
  discussionId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Reply = thinky.createModel('replies', {
  slug: type.string(),
  content: type.string(),
  status: type.string().enum(['answer', 'flag', 'normal']).default('normal'),
  commentId: type.string(),
  userId: type.string(),
  discussionId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const LikeDiscussion = thinky.createModel('post-likes', {
  discussionId: type.string(),
  userId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const LikeComment = thinky.createModel('comment-likes', {
  postId: type.string(),
  discussionId: type.string(),
  userId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const LikeReply = thinky.createModel('reply-likes', {
  postId: type.string(),
  discussionId: type.string(),
  userId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Chat = thinky.createModel('messages', {
  channel: type.string(),
  content: type.string(),
  sender: type.string(),
  receiver: type.string(),
  type: type.string().enum(['text', 'image']),
  timestamp: type.number(),
  read: type.boolean().default(false),
  deleted: type.boolean().default(false),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Block = thinky.createModel('blocks', {
  userId: type.string(),
  profileId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Report = thinky.createModel('reports', {
  type: type.string(),
  discussionId: type.string(),
  userId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Notification = thinky.createModel('notifications', {
  slug: type.string(),
  name: type.string(),
  sender: type.string(),
  receiver: type.string(),
  action: type.string(),
  type: type.string().enum(['admin', 'post', 'user']),
  read: type.boolean().default(false),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Upload = thinky.createModel('uploads', {
  slug: type.string(),
  relative: type.string().enum(['logo', 'user', 'discussion']),
  file: type.string(),
  filetype: type.string().enum(['image', 'document']),
  userId: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Settings = thinky.createModel('settings', {
  meta: type.object(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Pageview = thinky.createModel('pageviews', {
  browser: type.string(),
  device: type.string(),
  url: type.string(),
  referrer: type.string(),
  type: type.string().enum(['view', 'click']).default('view'),
  ipAddress: type.string(),
  city: type.string(),
  country: type.string(),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

const Theme = thinky.createModel('themes', {
  title: type.string(),
  slug: type.string(),
  code: type.string(),
  active: type.boolean().default(false),
  createdAt: type.date().default(r.now),
  updatedAt: type.date().default(r.now)
});

//Associations
LikeDiscussion.belongsTo(User, 'profile', 'userId', 'id');
LikeComment.belongsTo(User, 'profile', 'userId', 'id');
LikeReply.belongsTo(User, 'profile', 'userId', 'id');

Discussion.belongsTo(User, 'profile', 'userId', 'id');
Discussion.hasOne(Category, 'category', 'categoryId', 'id');
Discussion.hasMany(LikeDiscussion, 'likes', 'discussionId', 'id');

Comment.belongsTo(User, 'author', 'userId', 'id');
Comment.hasMany(Reply, 'replies', 'commentId', 'id');
Comment.hasMany(LikeComment, 'likes', 'postId', 'id');

Reply.belongsTo(User, 'author', 'userId', 'id');
Reply.hasMany(LikeReply, 'likes', 'postId', 'id');

Report.hasOne(Discussion, 'post', 'discussionId', 'id');

User.ensureIndex('slug');
User.ensureIndex('name');
User.ensureIndex('email');
User.ensureIndex('phone');
User.ensureIndex('country');
User.ensureIndex('state');
User.ensureIndex('city');
User.ensureIndex('status');
User.ensureIndex('photo');
User.ensureIndex('role');
User.ensureIndex('createdAt');
User.ensureIndex('updatedAt');

Category.ensureIndex('slug');
Category.ensureIndex('title');
Category.ensureIndex('description');
Category.ensureIndex('authRequired');
Category.ensureIndex('moderatorId');
Category.ensureIndex('status');
Category.ensureIndex('createdAt');
Category.ensureIndex('updatedAt');

Discussion.ensureIndex('slug');
Discussion.ensureIndex('title');
Discussion.ensureIndex('content');
Discussion.ensureIndex('status');
Discussion.ensureIndex('view');
Discussion.ensureIndex('userId');
Discussion.ensureIndex('createdAt');
Discussion.ensureIndex('updatedAt');

Comment.ensureIndex('discussionId');
Comment.ensureIndex('slug');
Comment.ensureIndex('content');
Comment.ensureIndex('type');
Comment.ensureIndex('status');
Comment.ensureIndex('replyId');
Comment.ensureIndex('userId');
Comment.ensureIndex('createdAt');
Comment.ensureIndex('updatedAt');

LikeDiscussion.ensureIndex('discussionId');
LikeDiscussion.ensureIndex('userId');
LikeDiscussion.ensureIndex('createdAt');
LikeDiscussion.ensureIndex('updatedAt');

LikeComment.ensureIndex('postId');
LikeComment.ensureIndex('userId');
LikeComment.ensureIndex('createdAt');
LikeComment.ensureIndex('updatedAt');

LikeReply.ensureIndex('postId');
LikeReply.ensureIndex('userId');
LikeReply.ensureIndex('createdAt');
LikeReply.ensureIndex('updatedAt');

Chat.ensureIndex('sender');
Chat.ensureIndex('receiver');
Chat.ensureIndex('channel');
Chat.ensureIndex('timestamp');
Chat.ensureIndex('read');
Chat.ensureIndex('deleted');
Chat.ensureIndex('createdAt');
Chat.ensureIndex('updatedAt');

Block.ensureIndex('userId');
Block.ensureIndex('createdAt');
Block.ensureIndex('updatedAt');

Report.ensureIndex('type');
Report.ensureIndex('discussionId');
Report.ensureIndex('userId');
Report.ensureIndex('createdAt');
Report.ensureIndex('updatedAt');

Notification.ensureIndex('slug');
Notification.ensureIndex('message');
Notification.ensureIndex('sender');
Notification.ensureIndex('receiver');
Notification.ensureIndex('read');
Notification.ensureIndex('type');
Notification.ensureIndex('action');
Notification.ensureIndex('createdAt');
Notification.ensureIndex('updatedAt');

Settings.ensureIndex('meta');
Settings.ensureIndex('createdAt');
Settings.ensureIndex('updatedAt');

Upload.ensureIndex('slug');
Upload.ensureIndex('relative');
Upload.ensureIndex('file');
Upload.ensureIndex('fileType');
Upload.ensureIndex('UserId');
Upload.ensureIndex('createdAt');
Upload.ensureIndex('updatedAt');

Pageview.ensureIndex('url');
Pageview.ensureIndex('agent');
Pageview.ensureIndex('referrer');
Pageview.ensureIndex('ipAddress');
Pageview.ensureIndex('type');
Pageview.ensureIndex('createdAt');
Pageview.ensureIndex('updatedAt');

Theme.ensureIndex('title');
Theme.ensureIndex('slug');
Theme.ensureIndex('active');
Theme.ensureIndex('createdAt');
Theme.ensureIndex('updatedAt');

const initModel = () => {
  thinky.dbReady().then(async (data) => {
    if (data?.dbs_created !== 1) {
      r.dbCreate(config.api.db);

      //Check if default theme exist. If no, create it.
      let theme = await Theme.filter({ slug: 'weiss' });

      theme.length === 0 &&
        new Theme({
          title: 'Weiss',
          slug: 'weiss',
          active: true,
          code: `{
  palette: {
    accents_1: '#fafafa',
    accents_2: '#eaeaea',
    accents_3: '#999',
    accents_4: '#888',
    accents_5: '#666',
    accents_6: '#444',
    accents_7: '#333',
    accents_8: '#111',
    background: '#fff',
    foreground: '#000',
    selection: '#79ffe1',
    secondary: '#666',
    code: '#f81ce5',
    border: '#eaeaea',
    error: '#e00',
    errorLight: '#ff1a1a',
    errorLighter: '#f7d4d6',
    errorDark: '#c50000',
    success: '#0070f3',
    successLight: '#3291ff',
    successLighter: '#d3e5ff',
    successDark: '#0761d1',
    warning: '#f5a623',
    warningLight: '#f7b955',
    warningLighter: '#ffefcf',
    warningDark: '#ab570a',
    cyan: '#50e3c2',
    cyanLighter: '#aaffec',
    cyanLight: '#79ffe1',
    cyanDark: '#29bc9b',
    violet: '#7928ca',
    violetLighter: '#e3d7fc',
    violetLight: '#8a63d2',
    violetDark: '#4c2889',
    purple: '#f81ce5',
    alert: '#ff0080',
    magenta: '#eb367f',
    link: '#000'
  },
  expressiveness: {
    linkStyle: 'none',
    linkHoverStyle: 'none',
    dropdownBoxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.02)',
    scrollerStart: 'rgba(255, 255, 255, 1)',
    scrollerEnd: 'rgba(255, 255, 255, 0)',
    shadowSmall: '0 5px 10px rgba(0, 0, 0, 0.12)',
    shadowMedium: '0 8px 30px rgba(0, 0, 0, 0.12)',
    shadowLarge: '0 30px 60px rgba(0, 0, 0, 0.12)',
    portalOpacity: 0.25
  },
  font: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
}`
        }).save();
    }
  });
};

initModel();

module.exports = {
  r,
  User,
  Category,
  Discussion,
  Comment,
  Reply,
  LikeDiscussion,
  LikeComment,
  LikeReply,
  Chat,
  Block,
  Report,
  Notification,
  Upload,
  Settings,
  Pageview,
  Theme,
  ActiveUser
};
