/*
ref : http://louisremi.com/2011/12/09/mozilla-addons-jquery-injection-script-file-injection/
*/

console.log('FF-TeXify-Plickers injecter.js');

var script = document.createElement( "script" );
script.type = "text/javascript";

self.port.on("init", function( scriptURL ) {
  script.src = scriptURL;
  window.document.body.appendChild( script );
});
