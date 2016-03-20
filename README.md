# TeXify-Plickers
<img src="LOGO.png" width="48"> This GreaseMonkey user script allows you to include mathematics in [Plickers](https://plickers.com) questions. This plugin is not a formula editor, LaTeX language must be known. Library used : the JavaScript display engine [MathJax](https://www.mathjax.org/).

### Installation

* 1) install [GreaseMonkey extension for FireFox](https://addons.mozilla.org/fr/firefox/addon/greasemonkey/)
* 2) install [TeXify-Plickers user script](https://github.com/obook/TeXify-Plickers/raw/master/TeXify-Plickers.user.js)
* 3) Create questions and use delimiters [; and ;] for insert MathJax code.

### Sample question

```
In physics, the mass-energy equivalence is stated by the equation [; E=mc^2 ;], discovered in 1905 by Albert Einstein. Depending on the value of  [; x ;] the equation  [;  f(x) = \sum_{i=0}^{n} \frac{a_i}{1+x} ;] may diverge or converge.

A: Integral [;  \int_{a}^{b} x^2 dx ;]
B: Sum [; \sum_{n=1}^{\infty} 2^{-n} = 1 ;]
C: [;  \lim_{h \rightarrow 0 } \frac{f(x+h)-f(x)}{h}  ;]
D: roots [; x_{1,2} = \frac{- b \pm \sqrt{\Delta}}{2a} ;]
```

### Live view result

<img src="sample.png" width="328">

