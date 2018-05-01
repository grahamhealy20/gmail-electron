
const shell = require('electron').shell;
const $webview = document.querySelector('webview');
const $loader = document.querySelector('.loader');
let isInitialLoad = true;

$webview.addEventListener('did-start-loading', () => {
  // we use client side rendering in the web app, so the loader is only needed on the first page load
  if(isInitialLoad) {
    $webview.classList.add('hide');
    $loader.classList.remove('loader-hide');
    isInitialLoad = false;
  }
});

$webview.addEventListener('dom-ready', () => {
  $webview.classList.remove('hide');
  // have to delay in order for the webview show/resize to settle
  setTimeout(() => {
    $loader.classList.add('loader-hide');
  }, 100);
});

$webview.addEventListener('new-window', (e) => {
                  console.log('new window event called');
                const protocol = require('url').parse(e.url).protocol
                if (protocol === 'http:' || protocol === 'https:') {
                    shell.openExternal(e.url)
                }
  });
