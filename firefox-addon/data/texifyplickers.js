// ==UserScript==
// @name FF-TeXify-Plickers
// @namespace https://github.com/obook/FF-TeXify-Plickers
// @version	12
// @description	GreaseMonkey script for add LaTeX code in Plickers website. Use delimiters [; and ;]
// @author obooklage
// @licence MIT License (MIT)
// @grant none
// @include https://plickers.com/*
// @homepageURL https://github.com/obook/FF-TeXify-Plickers/
// @updateURL https://github.com/obook/FF-TeXify-Plickers/raw/master/FF-TeXify-Plickers.user.js
// @downloadURL	https://github.com/obook/FF-TeXify-Plickers/raw/master/FF-TeXify-Plickers.user.js
// @icon https://github.com/obook/FF-TeXify-Plickers/raw/master/icon.png
// @run-at document-end
// ==/UserScript==

var mathjaxloaded = false;
var debugtexify = false;
var movequestionimage = false;

if( debugtexify === true )
    console.log('FF-TeXify-Plickers starting ...');

function OnLoadMathJax()
{
var startTime = new Date();

    MathJax.Hub.Config({
    showProcessingMessages : false,
    tex2jax: {
      inlineMath: [ ['[;',';]'] ],
      processEscapes: true
    }
    });
    
    mathjaxloaded = true;

    console.log('FF-TeXify-Plickers MATHJAX READY ' + startTime.toLocaleTimeString());
}

function TeXifyPlickers() {
    var startTime = new Date();
    
    if( mathjaxloaded !== true)
    {
        console.log('FF-TeXify-Plickers MATHJAX NOT LOADED YET ' + startTime.toLocaleTimeString());
        return;
    }
    
    /* choices div present ? */
    var choices_div_array = document.getElementsByClassName('choices-container animate-transition ng-isolate-scope');
    if( choices_div_array.length > 0 )
    {
        /* Is the question content the special span ? */
        if( !document.getElementById("spantexified") )
        {
            console.log('FF-TeXify-Plickers NEW QUESTION ' + startTime.toLocaleTimeString());

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
                console.log('FF-TeXify-Plickers SAME QUESTION ' + startTime.toLocaleTimeString());
        }  
    }

    if( debugtexify === true )
        console.log('FF-TeXify-Plickers MATHJAX RESCAN ' + startTime.toLocaleTimeString());
    
    /* MathJax.Hub.Queue(["Typeset",MathJax.Hub]); : chrome compatible but not for firefox */
    MathJax.Hub.Typeset();
}

var startTime = new Date();

/* Application */
if (self == top) { /* run only in the top frame. we do our own frame parsing */
    console.log('FF-TeXify-Plickers STARTED ' + startTime.toLocaleTimeString());
    var script = document.createElement('script');
    script.type = 'text/javascript';
    /* end 30/04/2017 : script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"; */
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";
    script.onload = OnLoadMathJax;
    document.head.appendChild(script);
    window.setInterval(TeXifyPlickers, 3000);
}
else if( debugtexify === true )
{
    console.log('FF-TeXify-Plickers self is not top, NO INJECTION ' + startTime.toLocaleTimeString());
}