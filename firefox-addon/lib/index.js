/*
The index.js script has no access to any document or any window object.
index.js is the main add-on or background script.
Its execution environment and context are very specific to the addon SDK.
Specific javascript must be in a Content Script
*/
var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
// in main.js
pageMod.PageMod({
  include: /^http[s]*\:\/\/.*plickers.com\/.*/,
  contentScriptWhen: "end",
  contentScriptFile: data.url( "injecter.js" ),
  onAttach: function( worker ) {
    	worker.port.emit( "init", data.url( "texifyplickers.js" ) );
  }
});
