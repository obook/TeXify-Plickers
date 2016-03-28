// ==UserScript==
// @name	TeXify-Plickers
// @namespace	https://github.com/obook/TeXify-Plickers
// @version	9
// @description	GreaseMonkey script for add LaTeX code in Plickers website. Use delimiters [; and ;]
// @author	obooklage
// @grant	none
// @include	https://plickers.com/*
// @downloadURL	https://github.com/obook/TeXify-Plickers/
// @updateURL	https://github.com/obook/TeXify-Plickers/raw/master/TeXify-Plickers.user.js
// @icon	https://github.com/obook/TeXify-Plickers/raw/master/icon.png
// @run-at	document-end
// ==/UserScript==

var mathjaxloaded = false;

function OnLoadMathJax()
{
    var startTime = new Date();
    console.log('TeXify-Plickers MathJax loaded.' + startTime.toLocaleTimeString());
    
    MathJax.Hub.Config({
    showProcessingMessages : false,
    tex2jax: {
      inlineMath: [ ['[;',';]'] ],
      processEscapes: true
    }
    });
    
    mathjaxloaded = true;
}

function TeXifyPlickers() {
    var startTime = new Date();
    
    if( mathjaxloaded != true)
    {
        console.log('TeXify-Plickers error MathJax not loaded yet' + startTime.toLocaleTimeString());
        return;
    }
    
    /* choices div present ? */
    var choices_div_array = document.getElementsByClassName('choices-container animate-transition ng-isolate-scope');
    if( choices_div_array.length > 0 )
    {
        /* Is the question content the special span ? */
        if( document.getElementById("spantexified") )
        {
            console.log('SAME QUESTION');
        }
        else
        {
            console.log('NEW QUESTION');

            /* choices presents, hide */
            choices_div_array[0].style.visibility = "hidden";

            /* new span */
            var span = document.createElement("span");
            span.id = "spantexified";
            span.style.fontSize = '80%';
            var hr = document.createElement('hr');
            span.appendChild(hr); 

            /* Get choices */
            var choices_array  = document.getElementsByClassName('padding-top ng-binding ng-scope');
            for(i=0;i<choices_array.length;i++)
            {
                var choice  = choices_array[i].innerHTML;
                var iDiv = document.createElement('div');
                iDiv.id = 'texifiedchoice'+i;
                iDiv.innerHTML = choice;
                span.appendChild(iDiv); 
            }

            /* add span's choices to question */
            document.getElementsByClassName('question-body ng-binding ng-isolate-scope')[0].appendChild(span);
        }
    }

    console.log('TeXify-Plickers MathJax rescan ' + startTime.toLocaleTimeString());
    MathJax.Hub.Queue(["Typeset",MathJax.Hub]);

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
    setInterval(TeXifyPlickers, 3000);
}
