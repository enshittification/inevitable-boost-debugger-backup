import browser from 'webextension-polyfill';
import { detect } from 'detect-browser';
import {
  type BrowserMessage,
  type BrowserMessageType,
  type ColorScheme
} from './models';
import settingsConnector from './settings-connector';

console.log('background script running...');

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('got message', message);
  switch (message.type as BrowserMessageType) {
  }
});

