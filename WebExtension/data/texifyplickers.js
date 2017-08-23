// ==UserScript==
// @name TeXify-Plickers
// @namespace https://github.com/obook/TeXify-Plickers
// @version	14
// @description	GreaseMonkey script for add LaTeX code in Plickers website. Use delimiters [; and ;]
// @author obooklage
// @licence MIT License (MIT)
// @grant none
// @include https://plickers.com/*
// @include https://*.plickers.com/*
// @include https://www.plickers.com/*
// @homepageURL https://github.com/obook/TeXify-Plickers/
// @updateURL https://github.com/obook/TeXify-Plickers/raw/master/TeXify-Plickers.user.js
// @downloadURL	https://github.com/obook/TeXify-Plickers/raw/master/TeXify-Plickers.user.js
// @icon https://github.com/obook/TeXify-Plickers/raw/master/icon.png
// @run-at document-end
// ==/UserScript==

var mathjaxloaded = false;
var debugtexify = false;
var movequestionimage = false;

function OnLoadMathJax()
{
    var startTime = new Date();
    console.log('TeXify-Plickers57 MATHJAX READY ' + startTime.toLocaleTimeString());
    
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
    
    if( mathjaxloaded !== true)
    {
        console.log('TeXify-Plickers57 MATHJAX NOT LOADED YET ' + startTime.toLocaleTimeString());
        return;
    }
    
    /* choices div present ? */
    var choices_div_array = document.getElementsByClassName('choices-container animate-transition ng-isolate-scope');
    if( choices_div_array.length > 0 )
    {
        /* Is the question content the special span ? */
        if( !document.getElementById("spantexified") )
        {
            console.log('TeXify-Plickers57 NEW QUESTION ' + startTime.toLocaleTimeString());

            /* choices presents, hide */
            choices_div_array[0].style.visibility = "hidden";
                    
            /* new span */
            var span = document.createElement("span");
            span.id = "spantexified";
            span.style.fontSize = '80%';

            /* move question picture  */
            var pictures_div_array = document.getElementsByClassName('image-container');
            if( pictures_div_array.length > 0 && movequestionimage === true)
            {
                span.appendChild( pictures_div_array[0] );
            }
 
            /* add paragraph */
            var paragraph = document.createElement('p');
            span.appendChild(paragraph);
            
            /* add hr */
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
        else
        {
            if( debugtexify === true )
                console.log('TeXify-Plickers57 SAME QUESTION ' + startTime.toLocaleTimeString());
        }  
    }

    if( debugtexify === true )
        console.log('TeXify-Plickers57 MATHJAX RESCAN ' + startTime.toLocaleTimeString());
    
    /* MathJax.Hub.Queue(["Typeset",MathJax.Hub]); : chrome compatible but not for firefox */
    MathJax.Hub.Typeset();
}

/* Application */
if (self == top) { /* run only in the top frame. we do our own frame parsing */
    var startTime = new Date();
    console.log('TeXify-Plickers57 STARTED ' + startTime.toLocaleTimeString());
    var script = document.createElement('script');
    script.type = 'text/javascript';
    /* end 30/04/2017 : script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"; */
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";
    script.onload = OnLoadMathJax;
    document.head.appendChild(script);
    setInterval(TeXifyPlickers, 3000);
}
