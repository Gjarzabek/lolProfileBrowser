# task-lolapp
! App will work only on browsers with disabled cors. Below instructions how to run google-chrome with cors disabled
! Development Riot Api key expires in 24h.
  If a key expired, enter yours using key input in a settings card or email me and i will send you one


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Browser Setup with no cors
Google Chrome setup:

<b>Linux</b>
```
google-chrome --disable-web-security --user-data-dir={pathToSomeFolder}
```

<b>Windows</b>
1. Right click on desktop, add new shortcut
2. Add the target as "[PATH_TO_CHROME]\chrome.exe" --disable-web-security --disable-gpu --user-data-dir=~/chromeTemp
3. Click OK.