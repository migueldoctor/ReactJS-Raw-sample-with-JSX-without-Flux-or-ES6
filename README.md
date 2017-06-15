# ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6
Step by Step tutorial about how to use ReactJS with JSX and without any other react ecosystem tool like Webpack or ES6 or Redux... This tutorial aims to create the same example than this other [ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-](https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-/) tutorial but using JSX instead of plain javascript react functions

### 1. Setting up the environment

Commit [3](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/388e0aaca581721312eca46107dddb34c1eb7b7e) illustrate the most basic JSX program. We have to import the react and react-dom libraries into the html document
```javascript 
 <script src="https://cdn.jsdelivr.net/react/15.5.4/react.js"></script>
 <script src="https://cdn.jsdelivr.net/react/15.5.4/react-dom.js"></script>
```   

In addition since the web browser doesn’t understand JSX natively, we need to transform it to JavaScript first. 
This is handled by including Babel 5’s in-browser ES6 and JSX transformer called browser.js. 
Babel will recognize JSX code in <script type="text/babel"></script> tags and transform it into JavaScript on the fly. 
Transforming JSX in the browser works quite well during development. 
So let's import it
```javascript 
  <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
``` 

### 2. Using JSX instead of React.createElement() JSX function
As described on the previous [tutorial](https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6) about react without JSX, you need to use the function React.createElement() in order to create HTML or react components. When working with JSX you don't need to use that function, so you only have to assign the JSX code to a var as shown below:

```javascript 
//Without JSX
//var rootElement = React.createElement('div',{},
//React.createElement('h1',{},"Contacts"));

//With JSX
var rootElement = <div><h1>Contacts</h1></div> ;
```

  