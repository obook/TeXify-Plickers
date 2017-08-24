/*
The index.js script has no access to any document or any window object.
index.js is the main add-on or background script.
Its execution environment and context are very specific to the addon SDK.
Specific javascript must be in a Content Script
*/

console.log('TeXify-Plickers57 index.js');

var s = document.createElement('script');
s.src = chrome.extension.getURL("data/texifyplickers.js");
(document.head||document.documentElement).appendChild(s);
s.parentNode.removeChild(s);
