// ==UserScript==
// @name        TeXify-Plickers
// @namespace   https://github.com/obook/TeXify-Plickers
// @version     2
// @description GreaseMonkey script for add LaTeX code in Plickers website. Use delimiters [; and ;]
// @author         obooklage
// @oujs:author    obooklage
// @include        http://plickers.com/*
// @include        https://plickers.com/*
// @downloadURL    https://github.com/obook/TeXify-Plickers/
// @updateURL      https://github.com/obook/TeXify-Plickers/raw/master/TeXify-Plickers.user.js
// @icon           https://github.com/obook/TeXify-Plickers/raw/master/icon.png
// @grant       none
// @run-at document-end
// ==/UserScript==

var mathjaxloaded = false;

function OnLoadMathJax()
{
    var startTime = new Date();
	console.log('TeXify-Plickers MathJax loaded.' + startTime.toLocaleTimeString());
	mathjaxloaded = true;
	MathJax.Hub.Config({tex2jax: {inlineMath: [['[;',';]']]}});
}

function TeXifyPlickers() {
    var startTime = new Date();
    console.log('TeXify-Plickers MathJax rescan ' + startTime.toLocaleTimeString());
    if( mathjaxloaded == true)
    {
    	MathJax.Hub.Typeset();
    } 
}

/* Application */

if (self == top) { /* run only in the top frame. we do our own frame parsing */
    var startTime = new Date();
    console.log('TeXify-Plickers is started ' + startTime.toLocaleTimeString());
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML";
    script.onload = OnLoadMathJax;
    document.head.appendChild(script);
    setInterval(TeXifyPlickers, 5000);
}
