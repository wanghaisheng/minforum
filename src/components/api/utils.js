'use strict';
const CryptoJS = require('crypto-js');

const slug = () => {
  return (
    Math.random().toString(36).substring(2, 7) +
    Math.random().toString(36).substring(2, 7)
  );
};

const code = () => {
  let code = Math.random() * (1000000000 - 10000) + 10000;
  code = Math.round(code);
  return code;
};

const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const percentage = (current, total) => {
  let val = (current / total).toFixed(1);
  val = val * 100;
  return val;
};

const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

const parseCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value);
};

const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

const oneKFormat = (val) => {
  if (val >= 1000000000) {
    let text = val / 1000000000;
    text = text.toFixed(1);
    text = text + 'b';
    return text;
  } else if (val >= 1000000) {
    let text = val / 1000000;
    text = text.toFixed(1);
    text = text + 'm';
    return text;
  } else if (val >= 1000) {
    let text = val / 1000;
    text = text.toFixed(1);
    text = text + 'k';
    return text;
  } else {
    return val;
  }
};

const timeAgo = (date) => {
  let now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1)
    return interval + ' year' + (interval > 1 ? 's' : '') + ' ago';

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1)
    return interval + ' month' + (interval > 1 ? 's' : '') + ' ago';

  interval = Math.floor(seconds / 86400);
  if (interval >= 1)
    return interval + ' day' + (interval > 1 ? 's' : '') + ' ago';

  interval = Math.floor(seconds / 3600);
  if (interval >= 1)
    return interval + ' hour' + (interval > 1 ? 's' : '') + ' ago';

  interval = Math.floor(seconds / 60);
  if (interval >= 1)
    return interval + ' min' + (interval > 1 ? 's' : '') + ' ago';

  return 'Just now';
};

const timeAgoShort = (date) => {
  let now = new Date();
  const seconds = Math.floor((now - date) / 1000);

  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) return interval + ' y';

  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) return interval + ' m';

  interval = Math.floor(seconds / 86400);
  if (interval >= 1) return interval + ' d';

  interval = Math.floor(seconds / 3600);
  if (interval >= 1) return interval + ' hr';

  interval = Math.floor(seconds / 60);
  if (interval >= 1) return interval + ' min';

  return 'Just now';
};

const validateEmail = (email) => {
  let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const encrypt = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(
    data,
    process.env.NEXT_PUBLIC_APP_SECRET
  ).toString();
  return ciphertext;
};

const decrypt = (data) => {
  try {
    const bytes = CryptoJS.AES.decrypt(data, process.env.APP_SECRET);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
  } catch (error) {
    return null;
  }
};

const withAuth = async (req) => {
  let allowlist = process.env.NEXT_PUBLIC_CLIENT_ORIGINS;
  allowlist = allowlist.split(',');

  if (allowlist.indexOf(req.headers.host) !== -1) {
    const apikey = decrypt(req.headers.authorization);

    if (apikey !== process.env.NEXT_PUBLIC_API_KEY) {
      return { success: false, message: 'Invalid API key' };
    } else {
      return { success: true };
    }
  } else {
    return { success: false, message: 'Unauthorized access' };
  }
};

const getEXT = (file) => {
  file = file.split('.');
  let count = file.length;
  count = count - 1;
  return file[count];
};

const isImage = (type) => {
  if (
    type === 'jpg' ||
    type === 'JPG' ||
    type === 'jpeg' ||
    type === 'JPEG' ||
    type === 'png' ||
    type === 'PNG' ||
    type === 'gif'
  ) {
    return true;
  } else {
    return false;
  }
};

const isDoc = (type) => {
  if (
    type === 'pdf' ||
    type === 'xls' ||
    type === 'xlsx' ||
    type === 'ppt' ||
    type === 'pptx' ||
    type === 'doc' ||
    type === 'docx' ||
    type === 'csv' ||
    type === 'txt'
  ) {
    return true;
  } else {
    return false;
  }
};

const pluralize = (val) => {
  return val > 1 ? 's' : '';
};

const getInitials = (fullName) => {
  const nameParts = fullName?.trim()?.split(' ');
  if (nameParts) {
    let firstInitial = nameParts[0]?.charAt(0)?.toUpperCase();
    let lastInitial = nameParts[nameParts.length - 1]?.charAt(0)?.toUpperCase();
    lastInitial = lastInitial || '';

    return `${firstInitial}${lastInitial}`;
  } else {
    return '';
  }
};

const parseUsername = (text) => {
  const usernameRegex = /@(\w+)/g;

  const linkedText = text?.replace(usernameRegex, (_, username) => {
    const userLink = `<a class="inpost-username" href='/u/${username}'>@${username}</a>`;
    return userLink;
  });

  return linkedText;
};

function validateUsername(username) {
  // Define validation rules
  const minLength = 3; // Minimum username length
  const maxLength = 15; // Maximum username length
  const allowedChars = /^[a-zA-Z0-9_]+$/; // Only alphanumeric and underscore allowed

  // Check length
  if (username.length < minLength || username.length > maxLength) {
    return false; // Username is too short or too long
  }

  // Check allowed characters
  if (!allowedChars.test(username)) {
    return false; // Username contains invalid characters
  }

  // If all checks pass, the username is valid
  return true;
}

const enc = (plainText) => {
  var b64 = CryptoJS.AES.encrypt(plainText, process.env.APP_SECRET).toString();
  var e64 = CryptoJS.enc.Base64.parse(b64);
  var eHex = e64.toString(CryptoJS.enc.Hex);
  return eHex;
};

const dec = (cipherText) => {
  var reb64 = CryptoJS.enc.Hex.parse(cipherText);
  var bytes = reb64.toString(CryptoJS.enc.Base64);
  var decrypt = CryptoJS.AES.decrypt(bytes, process.env.NEXT_PUBLIC_APP_SECRET);
  var plain = decrypt.toString(CryptoJS.enc.Utf8);
  return plain;
};

module.exports = {
  slug,
  code,
  guid,
  percentage,
  asyncForEach,
  parseCurrency,
  formatNumber,
  oneKFormat,
  timeAgo,
  timeAgoShort,
  validateEmail,
  withAuth,
  getEXT,
  isDoc,
  isImage,
  pluralize,
  getInitials,
  parseUsername,
  validateUsername,
  encrypt,
  decrypt,
  enc,
  dec
};
