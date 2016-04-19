# TeXify-Plickers
<img src="LOGO.png" width="64"> TeXify-Plickers allows you to include mathematics in [Plickers](https://plickers.com) questions. Is **NOT** a formula editor; LaTeX, MathML or AsciiMath notation language must be known. Is based on [MathJax](https://www.mathjax.org/) technology.

## Installation and usage

You can include mathematics to plickers using a user-script or a firefox add-on.

### Use a user script for desktop (FireFox - Google Chrome desktop)

* 1) install [GreaseMonkey for FireFox](https://addons.mozilla.org/fr/firefox/addon/greasemonkey/) or [Tampermonkey for Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo);
* 2) install [TeXify-Plickers user script](https://raw.githubusercontent.com/obook/TeXify-Plickers/master/user-script/TeXify-Plickers.user.js);

### Use the Add-on for desktop (FireFox & FireFox for Android)

* install [FireFox Addon](https://addons.mozilla.org/en-US/firefox/addon/texifyplickers/)

### Usage

Then, create questions and use delimiters **$$** and **$$** or **[;** and **;]** (inline) for insert LaTeX code.

## Sample

<img src="question-edit.png" width="420">

Live view result

<img src="screen-view.png" width="420">

## Known Bugs

### tampermonkey for Dolphin

Under tampermonkey for Dolphin (Android), the @include directive is buggy. You must change the script line

```
// @include	https://plickers.com/*
```
to

```
// @include	*
```

#### Picture of question is inserted after choices.
*************************************************************************************************************
<img src="badge.gif" width="128">

