# ptt-comment-flag

A Chrome extension to shows country flag for every PTT comment

## Chrome Extension

### Installtion

Click badge below to install.

[![Chrome Web Store](https://developer.chrome.com/webstore/images/ChromeWebStore_BadgeWBorder_v2_206x58.png)](https://chrome.google.com/webstore/detail/fhnkhcdcpalgfgneoojgcbmhnfjaepii)

### Development

1. Head to [chrome-extension](chrome-extension)
2. Have fun

P.S. This extension is written in pure javascript with no dependencies

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

## License

This project is licensed under the MIT license.

Read [LICENSE](LICENSE) for more information.
