# Min Forum

Minimalistic and Modern Discussion Software

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/b434e4594827418681e9fbe21566b45e)](https://www.codacy.com/gh/minforum/minforum/dashboard?utm_source=github.com&utm_medium=referral&utm_content=minforum/minforum&utm_campaign=Badge_Grade)
![git workflow](https://github.com/minforum/minforum/actions/workflows/main.yml/badge.svg?branch=main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

### Prerequisite

- [NodeJS 18 LTS upward](https://github.com/nvm-sh/nvm/blob/master/README.md)
- [RethinkDB 2.4 upward](https://rethinkdb.com/docs/install/)
- [Nginx latest version]()

![image5](./public/screenshots/5.png)
![image1](./public/screenshots/1.png)
![image1-1](./public/screenshots/1-1.png)
![image1-2](./public/screenshots/1-2.png)
![image2](./public//screenshots/2.png)
![image3](./public//screenshots/3.png)
![image6](./public//screenshots/6.png)

### Installation

```
sh <(curl https://raw.githubusercontent.com/minforum/minforum/main/install/setup.sh)
```

### Development

**Install mkcert and generate certificate for localhost**
<br />
Note: Social login with facebook and google required SSL

```
npm i -g mkcert
```

```
yarn dev
```

### Production

```
yarn production
```

### Roadmap

- &#x2611; User system (member, moderator and admin)
- &#x2611; Communities or categories
- &#x2611; Discussions, comments and replies with revision note and date.
- &#x2611; Direct messaging with controls to block or accept messages from users
- &#x2611; Social account (signup and login). Facebook and Google.
- &#x2611; Social share
- &#x2611; Notifications for mentions, comments, replies, likes and messages
- &#x2611; Themes
- &#x2611; Language & Translation (English, French, Spanish, Deutsch, Chinese, Japanese, Korean, and Russian)
- &#x2611; Points system: Reward users with points for their activities and contributions
- &#x2611; Reports and flag
- &#x2611; Advert settings
- &#x2611; Badge system for recognizing user activities and achievements
- &#x2611; Site wide announcement
- &#x2611; Analytics, pageviews and post views
- &#x2611; Ban words
- &#x2610; Monetization: Offer premium features via paywalls, subscription plans, and secure payment integration
- &#x2610; Docker image
- &#x2610; Digital ocean marketplace
- &#x2610; AWS marketplace

### How to contribute

Fork the code, update and make a pull request.

### [License](LICENSE)

### Maintainers

[Olalekan Animashaun](https://github.com/kimolalekan)
