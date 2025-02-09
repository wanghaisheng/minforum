require('dotenv').config();
const { exit } = require('process');
const { Discussion } = require('./model');

const updater = async () => {
  await Discussion.then((data) => {
    data.forEach(async (item) => {
      await Discussion.get(item.id).update({
        ...item,
        timestamp: new Date(item.createdAt).getTime()
      });
    });
  });
};

updater().then(() => {
  console.log('Successfully updated!');

  exit(1);
});
