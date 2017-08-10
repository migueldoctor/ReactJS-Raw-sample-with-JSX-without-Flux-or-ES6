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

In commit [6](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/d4fd30e759de97088eb5d5878122a7cfd05457a0) we can see how to create a more complex rootElement including several HTML tags. In the comments we can see how using JSX makes our code more readable than nesting js createElement callings.


```javascript 
      // rootElement creation without JSX
      /*
      var rootElement = React.createElement('div',{},
         React.createElement('h1',{},"Contacts"),
         React.createElement('ul',{},
           React.createElement('li', {},
               React.createElement('h2', {}, "James Nelson"),
               React.createElement('a', {href: 'mailto:james@jamesknelson.com'}, 'james@jamesknelson.com')
             ),
             React.createElement('li', {},
               React.createElement('h2', {}, "Joe Citizen"),
               React.createElement('a', {href: 'mailto:joe@example.com'}, 'joe@example.com')
             )
           )
         );
        );
      */

      // rootElement creation with JSX
      var rootElement = <div>
                              <h1>Contacts</h1>
                              <ul>
                                <li><h2>James Nelson</h2>
                                    <a href='mailto:migueldoctor@gmail.com'>migueldoctor@gmail.com</a>
                                </li>
                                <li><h2>Joe Citizen</h2>
                                    <a href='mailto:joe@example.com'>joe@example.com</a>
                                </li>
                              </ul>
                        </div> 

```

In commit [8](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/f11290e2d69cb04649c131546fc6c183e7e57dca) we have replaced the fixed rootElement created 
with JSX and we have composited it making use of an array of contacts, then we have applied filter and map functions and include the var result in the JSX CODE USING BRACKETS {}. As follows we 
can see the evolution of our example


```javascript 
      // rootElement creation without JSX
      /*
        var rootElement = React.createElement('div',{},
         React.createElement('h1',{},"Contacts"),
         React.createElement('ul',{},
           React.createElement('li', {},
               React.createElement('h2', {}, "James Nelson"),
               React.createElement('a', {href: 'mailto:james@jamesknelson.com'}, 'james@jamesknelson.com')
             ),
             React.createElement('li', {},
               React.createElement('h2', {}, "Joe Citizen"),
               React.createElement('a', {href: 'mailto:joe@example.com'}, 'joe@example.com')
             )
           )
         );
        );
      */

      // rootElement creation with JSX
      /*var rootElement = <div>
                              <h1>Contacts</h1>
                              <ul>
                                <li><h2>James Nelson</h2>
                                    <a href='mailto:migueldoctor@gmail.com'>migueldoctor@gmail.com</a>
                                </li>
                                <li><h2>Joe Citizen</h2>
                                    <a href='mailto:joe@example.com'>joe@example.com</a>
                                </li>
                              </ul>
                        </div>
       */

      // Since React and JSX are js compatible we can use it in loops, if statements or any other feature provided by javascript
      //4.1) Let us create an array JSON objects wth users and optional emails
      var contacts = [
        {key: 1, name:'Miguel Doctor', email:'migueldoctor@gmail.com'},
        {key: 2, name:'Bob'},
        {key: 3, name:'Joe Citizen',email:'mailto:joe@example.co'}
      ];
      
      //4.2) Now let's filter the array by choosing the ones with email
      var getEmailFromContact = function (contact) { return contact.email; }
      
      //4.3) filter function applies a condition and return the elements of the array that returns not null
      //map function applies the passed function to all elements of the array. In this case we return the JSX code
    
      var listElements = contacts.filter(getEmailFromContact)
                                 .map(function (contact) {
                                     return <li key={contact.key}>
                                                <h2>{contact.name}</h2>
                                                <a href={'mailto:'+contact.email}>{contact.email}</a>
                                            </li>
                                 })
    //4.4) then we create the fixed part as rootElement making use of the listElements var
    var rootElement = <div>
                        <h1>Contacts</h1>
                        <ul>
                        {listElements}
                        </ul>
                      </div>


      ReactDOM.render(rootElement, document.getElementById('react-app'));
```