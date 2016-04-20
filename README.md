# TeXify-Plickers
<img src="LOGO.png" width="64"> TeXify-Plickers allows you to include mathematics in [Plickers](https://plickers.com) questions. Is **NOT** a formula editor; LaTeX, MathML or AsciiMath notation language must be known. Is based on [MathJax](https://www.mathjax.org/) technology.

## Installation and usage

You can include mathematics to plickers using a GreaseMonkey/Tampermonkey _user-script_ or a native _firefox add-on_ desktop and mobile (Android).

### Use a user script for desktop (FireFox & Google Chrome desktop)

* 1) install [GreaseMonkey for FireFox](https://addons.mozilla.org/fr/firefox/addon/greasemonkey/) or [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo);
* 2) install [TeXify-Plickers user script](https://raw.githubusercontent.com/obook/TeXify-Plickers/master/user-script/TeXify-Plickers.user.js);

### Use the native FireFox Add-on (Desktop & Android)

* install [FireFox Addon](https://addons.mozilla.org/en-US/firefox/addon/texifyplickers/)

### Usage

Then, create questions and use delimiters **[;** and **;]** (inline) or **$$** and **$$** for insert math code.

## Sample
```
14) If [;  \, \frac{2}{a-1} = \frac{4}{y} \, ;] and [; y \neq 0 ;] where  [; a \neq 1 ;] , what is [; y ;] in terms of [; a ;] ?

A: [; y = 2a - 2  ;]
B: [; y = 2a - 4 ;]
C: [; y = 2a - \frac{1}{2} ;]
D: [; y= \frac{1}{2} \, a + 1 ;]
```

Live view result

<img src="screen-view.png" width="420">

## Technics and security considerations

### compiling firefox add-on

#### nmp jpm jpm-mobile installation
```
$ sudo apt-get install npm
$ sudo npm install jpm jpm-mobile --global
```
edit /usr/local/lib/node\_modules/jpm\_mobile/bin/jmp-mobile and add cmd line and change 2 run lines :
```
var VERSION = require("../package.json").version;
var cmd = require("jpm/lib/cmd");
var run = require("../lib/run").run;
...
.action(function () {
    var manifest = require(path.join(cwd, "package.json"));
    run(manifest, makeOptions(program, "run"))
...
  .action(function () {
    var manifest = require(path.join(cwd, "package.json"))
    run(manifest, makeOptions(program, "test"))
```
edit cat /usr/local/lib/node\_modules/jpm\_mobile/lib/adb.js and modify profile line

```
  console.log("Starting Firefox with " + options.profile);
  var p = cp.spawn(options.adb, [
              "shell",
              "am start",
              "-a",
              "android.activity.MAIN",
              "-n",
              options.intent + "/.App",
              "--es",
              "args",
              "'-profile " + options.profile + "'"
          ], makeOptions(options));
  p.stdout.pipe(process.stdout);
```

#### test on android device
```
jpm-mobile run -b firefox --adb $(which adb)
```

### security
TeXify-Plickers use script = createElement("script") and document.head.appendChild(script) to add mathjax javascript library from [hardcoded link of MathJax Content Delivery Network (CDN) ](https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-MML-AM_CHTML) to plickers.com website. This is secure until MathJax CDN and your DNS are not compromised.

## Known Bugs

### tampermonkey for Dolphin

Under tampermonkey for Dolphin (Android), the @include directive is buggy. You must change the script line

```
// @include https://plickers.com/*
```
to

```
// @include *
```

### Picture of question is inserted after choices.

*************************************************************************************************************
<img src="badge.gif" width="128">

