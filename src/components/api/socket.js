const { Chat } = require('./model');

const socketChat = async (body) => {
  let chat = new Chat(body);
  return await chat.save().then(async (data) => {
    if (data.id) {
      return { success: true, data };
    } else {
      return {
        success: false,
        message: 'Failed. Please try again later.'
      };
    }
  });
};

module.exports = socketChat;
