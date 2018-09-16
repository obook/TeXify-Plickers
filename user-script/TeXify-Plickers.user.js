// ==UserScript==
// @name TeXify-Plickers
// @namespace https://github.com/obook/TeXify-Plickers
// @version	15
// @description	GreaseMonkey script for add LaTeX code in Plickers website. Use delimiters [; and ;]
// @author obooklage
// @licence MIT License (MIT)
// @grant none
// @include https://plickers.com/*
// @include https://*.plickers.com/*
// @include https://www.plickers.com/*
// @homepageURL https://github.com/obook/TeXify-Plickers/
// @downloadURL	https://github.com/obook/TeXify-Plickers/raw/master/user-script/TeXify-Plickers.user.js
// @updateURL https://github.com/obook/TeXify-Plickers/raw/master/user-script/TeXify-Plickers.user.js
// @icon https://github.com/obook/TeXify-Plickers/raw/master/icon.png
// @run-at document-end
// ==/UserScript==

var mathjaxloaded = false;
var debugtexify = false;
var movequestionimage = false;

function ConsolePrint(message)
{
  var startTime = new Date();
  console.log('[TeXify-Plickers] '+ startTime.toLocaleTimeString() + ' ' + message) ;
}

function OnLoadMathJax()
{
    ConsolePrint('MATHJAX READY');
    
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

    if( mathjaxloaded !== true)
    {
        ConsolePrint('MATHJAX NOT LOADED YET ');
        return;
    }
    
    /* choices div present ? */
    var choices_div_array = document.getElementsByClassName('choices-container animate-transition ng-isolate-scope');
    if( choices_div_array.length > 0 )
    {
        /* Is the question content the special span ? */
        if( !document.getElementById("spantexified") )
        {
            ConsolePrint('NEW QUESTION ');

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
                ConsolePrint('SAME QUESTION ');
        }  
    }

    if( debugtexify === true )
        ConsolePrint('MATHJAX RESCAN ');
    
    /* MathJax.Hub.Queue(["Typeset",MathJax.Hub]); : chrome compatible but not for firefox */
    MathJax.Hub.Typeset();
}

/* Intercept CTRL+E for "[; XX ;]" insertion */

function keyDownHandler(zEvent) {
    if (zEvent.ctrlKey  &&  zEvent.code === "KeyE") {
      ConsolePrint('CONTROL-E KEY DETECTED');
      /* question editor present ? */
      var editor_div_array = document.getElementsByClassName('table-question heading-small ng-binding ng-hide');
      if( editor_div_array.length > 0 )
      {
        ConsolePrint(editor_div_array.length + ' EDITOR(S) DETECTED ');
        
        // Insert "[; XX ;]"
        // 
      }
    }
}

/* Application */
if (self == top) { /* run only in the top frame. we do our own frame parsing */
  ConsolePrint('STARTED');
  var script = document.createElement('script');
  script.type = 'text/javascript';
  /* end 30/04/2017 : script.src = "https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML"; */
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.1/MathJax.js?config=TeX-MML-AM_CHTML";
  script.onload = OnLoadMathJax;
  document.head.appendChild(script);
  /* Keyboard */
  /* not ready : 
   * document.addEventListener("keydown", keyDownHandler, false);
   * */
  setInterval(TeXifyPlickers, 3000);
}
