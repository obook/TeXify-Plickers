// ==UserScript==
// @name        TeXify-Plickers
// @namespace   https://github.com/obook/TeXify-Plickers
// @description GreaseMonkey script for add LaTeX code in Plickers website. Use delimiters [; and ;]
// @author         obooklage
// @oujs:author    obooklage
// @include        http://plickers.com/*
// @include        https://plickers.com/*
// @version     1
// @grant       none
// ==/UserScript==

console.log("TeXify-Plickers is loading ...");
var mathjaxloaded = false;

function OnLoadMathJax()
{
	console.log("OnLoadMathJax was called.");
	mathjaxloaded = true;
	MathJax.Hub.Config({tex2jax: {inlineMath: [['[;',';]']]}});
}

function TeXifyPlickers() {
    var startTime = new Date();
    console.log('TeXify-Plickers ' + startTime.toLocaleTimeString());
    if( mathjaxloaded == true)
    {
    	MathJax.Hub.Typeset();
    } 
}

/* Application */

if (self == top) { /* run only in the top frame. we do our own frame parsing */
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML";
    script.onload = OnLoadMathJax;
    document.head.appendChild(script);
    setInterval(TeXifyPlickers, 5000);
}

console.log("TeXify-Plickers is loaded.");

