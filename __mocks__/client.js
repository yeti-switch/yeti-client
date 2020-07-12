import { JSDOM } from 'jsdom';

const dom = new JSDOM();
global.document = dom.window.document;
global.window = dom.window;

// Mocking document height check
global.document.querySelector = () => ({ cllientHeight: 100 });
