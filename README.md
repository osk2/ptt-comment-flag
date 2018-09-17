# ptt-comment-flag

[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/fhnkhcdcpalgfgneoojgcbmhnfjaepii.svg)](https://chrome.google.com/webstore/detail/%E5%85%AB%E5%8D%A6%E6%8F%92ip/fhnkhcdcpalgfgneoojgcbmhnfjaepii)
[![Mozilla Add-on](https://img.shields.io/amo/v/ptt-comment-flag.svg)](https://addons.mozilla.org/zh-TW/firefox/addon/ptt-comment-flag/)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fosk2%2Fptt-comment-flag.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fosk2%2Fptt-comment-flag?ref=badge_shield)


A browser extension to shows country flag for every PTT comment

## Browser Extension

### Installation

Click badge below to install.

[![Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png)](https://chrome.google.com/webstore/detail/fhnkhcdcpalgfgneoojgcbmhnfjaepii)
[![Firefox Add-ons](https://addons.cdn.mozilla.net/static/img/addons-buttons/AMO-button_1.png)](https://addons.mozilla.org/zh-TW/firefox/addon/ptt-comment-flag/)

### Install userscript

Install a script manager (Tampermonkey, Violentmonkey, ...) then click badge below.

[![userscript](https://img.shields.io/badge/install-userscript-brightgreen.svg?longCache=true&style=flat-square)](https://github.com/osk2/ptt-comment-flag/raw/master/userscript/ptt-comment-flag.user.js)

### Development

1. Head to [chrome-extension](chrome-extension)
2. Have fun

P.S. Firefox also supports Chrome extension

## Backend

The backend is for extension to query country flag of IP.

### Prerequisite

- Node.js version >= 8
- [Yarn](https://yarnpkg.com)

### Installation

```shell
yarn
```

### Usage

#### Production Mode

```shell
NODE_ENV=production node .
```

#### Development Mode

In order to develop locally, this mode will run without SSL

```shell
node .
```

App will listen on port 9977

## Thanks

Flag icons are provided by [FAMFAMFAM](http://www.famfamfam.com/lab/icons/flags/)

Chrome extension icon is provided by [Freepik](http://www.freepik.com) from [www.flaticon.com](www.flaticon.com)

### Contributors

Thanks [@FlandreDaisuki](https://github.com/FlandreDaisuki) and [@Lin-Buo-Ren](https://github.com/Lin-Buo-Ren) for their contributions.

## License

This project is licensed under the MIT license.

Read [LICENSE](LICENSE) for more information.


[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fosk2%2Fptt-comment-flag.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fosk2%2Fptt-comment-flag?ref=badge_large)
