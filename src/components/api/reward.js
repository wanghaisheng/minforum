const moment = require('moment');
const { r, User, Comment, Notification } = require('./model');
const { asyncForEach } = require('./utils');

const rewardDevotee = async () => {
  const oneYearAgo = moment().subtract(1, 'year').utc().valueOf();

  let users = await User.filter((user) =>
    user('point')
      .ge(100)
      .and(user('timestamp').le(oneYearAgo))
      .and(user('badges').contains('prolific-writer').not())
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
    user('point')
      .ge(100)
      .and(user('timestamp').le(threeYearAgo))
      .and(user('badges').contains('prolific-writer').not())
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
  try {
    let users = await r
      .table('users')
      .filter((user) => user('badges').contains('prolific-writer').not())
      .filter((user) =>
        r
          .table('discussions')
          .getAll(user('id'), { index: 'userId' })
          .count()
          .ge(100)
      );

    await asyncForEach(users, async (item) => {
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
    });

    console.log('Rewarded prolific writer ', users.length);
  } catch (error) {
    console.error('Error rewarding prolific writers:', error);
  }
};

const rewardWordsmith = async () => {
  try {
    let users = await r
      .table('users')
      .filter((user) => user('badges').contains('wordsmith').not())
      .filter((user) =>
        r
          .table('discussions')
          .getAll(user('id'), { index: 'userId' })
          .count()
          .ge(1000)
      );

    await asyncForEach(users, async (item) => {
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
    });

    console.log('Rewarded wordsmith ', users.length);
  } catch (error) {
    console.error('Error rewarding wordsmith:', error);
  }
};

const rewardFavorite = async () => {
  try {
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
      .ungroup()
      .filter((group) => group('reduction').ge(100))
      .map((group) => group('group'));

    users = await r
      .table('users')
      .getAll(r.args(users))
      .filter((user) => user('badges').contains('favorite').not());

    await asyncForEach(users, async (user) => {
      let badges = user.badges || [];
      badges = [...new Set([...badges, 'favorite'])];

      await User.get(user.id).update({ badges });

      await new Notification({
        receiver: user.id,
        filterType: 'reward',
        type: 'admin',
        sender: 'admin',
        message:
          "You've been awarded the Favorite Badge for receiving 100+ likes on your posts!",
        action: `${user.username}`,
        read: false
      }).save();
    });

    console.log('Rewarded favorite ', users.length);
  } catch (error) {
    console.error('Error rewarding favorite users:', error);
  }
};

const rewardPeopleChoice = async () => {
  try {
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
      .ungroup()
      .filter((group) => group('reduction').ge(1000))
      .map((group) => group('group'));

    users = await r
      .table('users')
      .getAll(r.args(users))
      .filter((user) => user('badges').contains('people-choice').not());

    await asyncForEach(users, async (user) => {
      let badges = user.badges || [];
      badges = [...new Set([...badges, 'people-choice'])];

      await User.get(user.id).update({ badges });

      await new Notification({
        receiver: user.id,
        filterType: 'reward',
        type: 'admin',
        sender: 'admin',
        message:
          "You've been awarded the People's Choice Badge for receiving 100+ likes on your posts!",
        action: `${user.username}`,
        read: false
      }).save();
    });

    console.log('Rewarded people-choice ', users.length);
  } catch (error) {
    console.error('Error rewarding people-choice users:', error);
  }
};

const rewardGenius = async () => {
  try {
    let answers = await r
      .table('discussions')
      .group('bestAnswer')
      .count()
      .ungroup()
      .filter((group) => group('reduction').ge(100))
      .map((group) => group('group'));

    await asyncForEach(answers, async (bestAnswerId) => {
      let comment = await Comment.get(bestAnswerId);
      if (!comment) return; // Skip if comment is not found

      let user = await User.get(comment.userId);
      if (!user) return; // Skip if user is not found

      let badges = user.badges || [];
      badges = [...new Set([...badges, 'genius'])];

      await User.get(comment.userId).update({ badges });

      await new Notification({
        receiver: comment.userId,
        filterType: 'reward',
        type: 'admin',
        sender: 'admin',
        message:
          "You've been awarded the Genius Badge for providing 100+ best answers!",
        action: `${user.username}`,
        read: false
      }).save();
    });

    console.log('Rewarded genius ', answers.length);
  } catch (error) {
    console.error('Error rewarding genius users:', error);
  }
};

const rewardPolymath = async () => {
  try {
    let answers = await r
      .table('discussions')
      .group('bestAnswer')
      .count()
      .ungroup()
      .filter((group) => group('reduction').ge(1000))
      .map((group) => group('group'));

    await asyncForEach(answers, async (bestAnswerId) => {
      let comment = await Comment.get(bestAnswerId);
      if (!comment) return; // Skip if comment is not found

      let user = await User.get(comment.userId);
      if (!user) return; // Skip if user is not found

      let badges = user.badges || [];
      badges = [...new Set([...badges, 'polymath'])];

      await User.get(comment.userId).update({ badges });

      await new Notification({
        receiver: comment.userId,
        filterType: 'reward',
        type: 'admin',
        sender: 'admin',
        message:
          "You've been awarded the Polymath Badge for providing 1000+ best answers!",
        action: `${user.username}`,
        read: false
      }).save();
    });

    console.log('Rewarded polymath ', answers.length);
  } catch (error) {
    console.error('Error rewarding polymath users:', error);
  }
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
