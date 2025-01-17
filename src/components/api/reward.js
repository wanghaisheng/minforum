const moment = require('moment');
const { r, User, Discussion, Notification } = require('./model');
const { asyncForEach } = require('./utils');

const rewardDevotee = async () => {
  const oneYearAgo = moment().subtract(1, 'year').utc().valueOf();

  let users = await User.filter((user) =>
    user('point').ge(100).and(user('timestamp').le(oneYearAgo))
  );

  asyncForEach(users, async (item) => {
    let badges = item.badges || [];
    badges = [...new set([...badges, 'devotee'])];
    await User.get(item.id).update({ badges });
    await new Notification({
      receiver: item.id,
      filterType: 'reward',
      type: 'admin',
      sender: 'admin',
      message: "You've been awarded the Devotee Badge!",
      action: `${item.username}`,
      read: false
    }).save();
  }).finally(() => {
    console.log('Rewarded devotee', users.length);
  });
};

const rewardVeteran = async () => {
  const threeYearAgo = moment().subtract(3, 'year').utc().valueOf();

  let users = await User.filter((user) =>
    user('point').ge(100).and(user('timestamp').le(threeYearAgo))
  );

  asyncForEach(users, async (item) => {
    let badges = item.badges || [];
    badges = [...new Set([...badges, 'veteran'])];

    await User.get(item.id).update({ badges });
    await new Notification({
      receiver: item.id,
      filterType: 'reward',
      type: 'admin',
      sender: 'admin',
      message: "You've been awarded the Veteran Badge!",
      action: `${item.username}`,
      read: false
    }).save();
  }).finally(() => {
    console.log('Rewarded veteran ', users.length);
  });
};

const rewardProlific = async () => {
  let users = await r.table('users').filter((user) => {
    return r
      .table('discussions')
      .getAll(user('id'), { index: 'userId' })
      .count()
      .ge(100);
  });

  asyncForEach(users, async (item) => {
    let badges = item.badges || [];
    badges = [...new Set([...badges, 'prolific-writer'])];

    await User.get(item.id).update({ badges });

    await new Notification({
      receiver: item.id,
      filterType: 'reward',
      type: 'admin',
      sender: 'admin',
      message: "You've been awarded the Prolific Writer Badge!",
      action: `${item.username}`,
      read: false
    }).save();
  }).finally(() => {
    console.log('Rewarded prolific writer ', users.length);
  });
};

const rewardWordsmith = async () => {
  let users = await r.table('users').filter((user) => {
    return r
      .table('discussions')
      .getAll(user('id'), { index: 'userId' })
      .count()
      .ge(1000);
  });

  asyncForEach(users, async (item) => {
    let badges = item.badges || [];
    badges = [...new Set([...badges, 'wordsmith'])];

    await User.get(item.id).update({ badges });
    await new Notification({
      receiver: item.id,
      filterType: 'reward',
      type: 'admin',
      sender: 'admin',
      message: "You've been awarded the Wordsmith Badge!",
      action: `${item.username}`,
      read: false
    }).save();
  }).finally(() => {
    console.log('Rewarded wordsmith ', users.length);
  });
};

const rewardFavorite = async () => {
  let users = await r
    .table('notifications')
    .filter((n) =>
      n('filterType')
        .match('like-post')
        .or(n('filterType').match('like-comment'))
        .or(n('filterType').match('like-reply'))
    )
    .group('receiver')
    .count()
    .ge(100);

  users = users.filter((item) => item.reduction === true);

  asyncForEach(users, async (item) => {
    let user = await User.get(item.group);
    let badges = user.badges;
    badges = [...new Set([...badges, 'favorite'])];

    await User.get(item.group).update({ badges });
    await new Notification({
      receiver: item.group,
      filterType: 'reward',
      type: 'admin',
      sender: 'admin',
      message:
        "You've been awarded the Favorite Badge for receiving 100+ likes on your posts!",
      action: `${user.username}`,
      read: false
    }).save();
  }).finally(() => {
    console.log('Rewarded favorite ', users.length);
  });
};

const rewardPeopleChoice = async () => {
  let users = await r
    .table('notifications')
    .filter((n) =>
      n('filterType')
        .match('like-post')
        .or(n('filterType').match('like-comment'))
        .or(n('filterType').match('like-reply'))
    )
    .group('receiver')
    .count()
    .ge(1000);

  users = users.filter((item) => item.reduction === true);

  asyncForEach(users, async (item) => {
    let user = await User.get(item.group);
    let badges = user.badges;
    badges = [...new Set([...badges, 'people-choice'])];

    await User.get(item.group).update({ badges });
    await new Notification({
      receiver: item.group,
      filterType: 'reward',
      type: 'admin',
      sender: 'admin',
      message:
        "You've been awarded the People's Choice Badge for receiving 100+ likes on your posts!",
      action: `${user.username}`,
      read: false
    }).save();
  }).finally(() => {
    console.log('Rewarded people choice ', users.length);
  });
};

const rewardGenius = async () => {
  let users = await r
    .table('notifications')
    .filter((n) =>
      n('filterType')
        .match('like-post')
        .or(n('filterType').match('like-comment'))
        .or(n('filterType').match('like-reply'))
    )
    .group('receiver')
    .count()
    .ge(1000);

  users = users.filter((item) => item.reduction === true);

  asyncForEach(users, async (item) => {
    let user = await User.get(item.group);
    let badges = user.badges;
    badges = [...new Set([...badges, 'genius'])];

    await User.get(item.group).update({ badges });
    await new Notification({
      receiver: item.group,
      filterType: 'reward',
      type: 'admin',
      sender: 'admin',
      message:
        "You've been awarded the Genius Badge for providing 100+ best answers!",
      action: `${user.username}`,
      read: false
    }).save();
  }).finally(() => {
    console.log('Rewarded people choice ', users.length);
  });
};

const rewardPolymath = async () => {
  let users = await r
    .table('notifications')
    .filter((n) =>
      n('filterType')
        .match('like-post')
        .or(n('filterType').match('like-comment'))
        .or(n('filterType').match('like-reply'))
    )
    .group('receiver')
    .count()
    .ge(1000);

  users = users.filter((item) => item.reduction === true);

  asyncForEach(users, async (item) => {
    let user = await User.get(item.group);
    let badges = user.badges;
    badges = [...new Set([...badges, 'polymath'])];

    await User.get(item.group).update({ badges });
    await new Notification({
      receiver: item.group,
      filterType: 'reward',
      type: 'admin',
      sender: 'admin',
      message:
        "You've been awarded the Polymath Badge for providing 1000+ best answers!",
      action: `${user.username}`,
      read: false
    }).save();
  }).finally(() => {
    console.log('Rewarded people choice ', users.length);
  });
};

module.exports = {
  rewardDevotee,
  rewardVeteran,
  rewardFavorite,
  rewardPeopleChoice,
  rewardProlific,
  rewardWordsmith,
  rewardGenius,
  rewardPolymath
};
