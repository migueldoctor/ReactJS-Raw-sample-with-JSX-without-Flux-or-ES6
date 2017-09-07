# ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6
Step by Step tutorial about how to use ReactJS with JSX and without any other react ecosystem tool like npm or Webpack or Redux... This tutorial aims to create the same example than this other [ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-](https://github.com/migueldoctor/ReactJS-Raw-sample-no-JSX-or-Flux-or-ES6-/) tutorial but using JSX instead of plain javascript react functions. In addition it will include a version of the react java script code making use of the new standard ES6 of javascript. In the section 10 of the current README.md document, a file named mainES6.jsx is created and explained including the migrated version.

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

### 3.  Using js functions and vars within JSX code 

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
### 4.  Moving js code from the html file to an external jsx file (main.jsx)

In commit [11](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/9d24b20e1d80e3fcf263f13206e503b4f2007a4f) we have refactored the source code in order to separate the JSX code and the html code. In consequence we have created a new file called main.jsx and place on it all js and jsx code we previously had within a script tag in the index.html file.

Once removed the js code from the html file, we have to reference it AFTER the div block where the react code will be rendered

KEEP IN MIND THAT THIS DOESN'T WORK FOR SOME BROWSERS LIKE CHROME, because it only renders jsx code served by a server 
         So you can use Firefox or Safari and if you want to install a light weight server A good one is http-server which can be installed from npm with the following command:

            npm install -g http-server
        And started from your project’s root directory like so:

            http-server
        Your page will now be viewable at http://127.0.0.1:8080/.

In this tutorial we have decided to update the launch.json in commit [12](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/10ad54a4b88f87bcdf993fe9a2a287a84d9fe196) in order to use FF instead of Chrome so we don't deviate from the main goal of the tutorial.

```javascript
  <body>
     <div id="react-app">
    </div>
    
    <script src="https://cdn.jsdelivr.net/react/15.5.4/react.js"></script>
    <script src="https://cdn.jsdelivr.net/react/15.5.4/react-dom.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>
    
    <script type="text/babel" src="./main.jsx"/>
  </body>
```

### 5.  Using React.createClass() to create your own components
So far we are using react just to create HTML components by making use of Javascript. But the real power of React comes with the posibility of create your own components so you can use it as regular HTML components on your reactjs source files. Reactjs defines new components by invoking the method React.createClass(). When using this method you have to define the following properties:

1. propTypes: (This is optional but recommendable for testing purposes) Here you can define the attributes of your new component (just like the href attribute of the a HTML component)
2. render: This is mandatory and it is a function returing the JSX code that needs to be rendered when this component is used on a reactjs program.

Let's see an example of using React.createClass method:

```javascript
// Custom components must start with upper letter
var SampleItem = React.createClass({
        propTypes: {
                //This attributes will be available from render function under this.props.name and this.props.email
                name: React.PropTypes.string.isRequired,
                email: React.PropTypes.string, //This one is not mandatory
        },
        render: function() {
                return (
                        <li>
                          <h2>{this.props.name}</h2>
                          <a href={'mailto:'+this.props.email}>{this.props.email}</a>
                        </li>
                    )
        }
});
```

Once created you can use it with React.createElement() or in this case as any other JSX element as you would do with any other standard HTML component.

```javascript
var rootElement = <SampleItem name='Miguel Doctor' email='fakeemail@mail.com' />

//var rootElement = React.createElement(SampleItem, {name:'Miguel Doctor'});
ReactDOM.render(rootElement, document.getElementById('react-app'))
```

### 6.  Refactor your code by creating a ContactItem component with React.createClass()
In the previous section we described how to use createClass method to create your component. Now In commit [15](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/0282ab430a0dc0fe9d096de4925c207bf41d391c) we can see how to apply that to our example.

1. We update the contacts array by adding description field to some of the stored objects.

```javascript
var contacts = [
    {key: 1, name: "Fake user", email: "fakeemail@mail.com", description: "This is a fake user to make the sample"},
    {key: 2, name: "Bob", description:"Bob is a great user but without email, so he will be filtered out"},
    {key: 3, name: "Miguel", email:"MiguelfakeEmail@mail.com"}
    ]
```
2. We create the component ContactItem by useing React.createClass method

```javascript
//2) We create the React Component ContactItem
var ContactItem = React.createClass({
    propTypes: { // The passed argument must be an object with name, email and description fields being name mandatory
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string,
        description: React.PropTypes.string,
    },

    render: function() {
        return (
            <li key={this.props.key}>
              <h2>{this.props.name}</h2>
              <a href={'mailto:'+this.props.email}>{this.props.email}</a>
              <div>{this.props.description}</div>
            </li>
//            React.createElement('li',{}, // We create an list element and we print the name, the email and the description using several html tags
//                React.createElement('h2',{},this.props.name),
//                React.createElement('a',{href:'mailto:'+this.props.email}, this.props.email),
//               React.createElement('div',{},this.props.description)
            )
        );
    }
});

```
3. We invoke the component ContactItem by using React.createElement method (Remember not to use quotes ' )

```javascript
//3) Then we apply the filter and for each element in the array (contact), we return the element ContactItem just defined
var getEmailFromContact = function(contact) { return contact.email; }
var listElements = contacts.filter(getEmailFromContact)
                                 .map(function (contact) {
                                     return <ContactItem name={contact.name} email={contact.email} description={contact.description}/>
                                 })
```

### 7.  Rendering changes in React with ReactDOM.render()

React doesn't include any kind of automatically-updating views mechanism, so the developer must to indicate react when to make a re-render of the displayed data. In short, React makes use of a shadow DOM tree, and changes are done on that shadow DOM tree. So when we recall a ReactDOM.render(), React compares the displayed real DOM tree with the shadow one, and it updates ONLY the elements that have been updated. That is why react is so efficient.

In order to decide what to change, React uses a number of rules to decide what to do:

ReactElements with differing types are trashed and re-rendered
ReactElements with differing props or children are re-rendered in place
Identical ReactElements which have been re-ordered within an array are moved to reflect the new order
When React encounters an array of ReactElements with identical type and props, despite looking identical from the outside it cannot know that they are really identical. This is because elements can have internal state – for example, whether the element currently has user focus. This becomes a problem when React goes to re-render those elements, as it cannot tell one from another – and thus doesn’t know if their order within the array has changed.

This is where the key property from the earlier examples comes in. It lets React distinguish between elements, and keep the DOM aligned with our ReactElement tree.

```javascript
var ContactItem = React.createClass({
    propTypes: { // The passed argument must be an object with name, email and description fields being name mandatory
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string,
        description: React.PropTypes.string,
    },

    render: function() {
        return (
            <li key={this.props.key}>  <-- this is the added key property
              <h2>{this.props.name}</h2>
              <a href={'mailto:'+this.props.email}>{this.props.email}</a>
              <div>{this.props.description}</div>
            </li>
            )
        );
    }
});
```

### 8.  Forms in React
In React, input elements are not complicated at all. The _value_ is taken as a prop, and this is what will be displayed. It's very important to mention that since *the component can’t directly change the props* (as the values passed in from the outside world) user input won’t cause any change in the displayed value. Therefore you will need to set up events handlers in order to process the user inputs and modify your UI accordingly.

In addition to value, input elements take the props you’d expect them to. With a few minor exceptions, the attributes you can pass to a HTML \<input> are also available as props. There are two exceptions worth keeping in mind:

   1. React textarea elements take their content as a value prop, not as children
   2. The HTML for attribute is bound to the __*htmlFor*__ prop (as for is a reserved word in JavaScript)

In commit [18](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/21586318d59435b1c061675a02b1ba1a49d78c70) we have implemented the form to add contacts to our react app following the 3 steps indicated below:
  
   1. Creation of the component ContactForm by using React.createClass()
   
   ```javascript
        // 1) Here we create the ContactForm react component which will receive a contact object as passed prop argument
      // React Component ContactForm
      var ContactForm = React.createClass({
        propTypes: {
          contact: React.PropTypes.object.isRequired
        },

        render: function(){
            return ( 
              <form className='ContactForm'>
                <input type='text' placeholder='Name (required)' value={this.props.contact.name}/>
                <input type='text' placeholder='Email (optional)' value={this.props.contact.email}/>
                <input type='textarea' placeholder='Description (optional)' value={this.props.contact.description}/>
                <button type='submit'>Add Contact</button>
              </form>
            )
        }
      });
   ```
   
   2. Initialize a var containing an empty contact object
   ```javascript
        //2) Then we create a new empty contact object
        var newContact = {name: "", email: "", description: ""}
   ```
   3. Added the component ContactForm to our rootElement
  
  ```javascript
    //3) Finally we add the ContactForm component to our rootElement component   
    var rootElement = <div>
                        <h1>Contacts</h1>
                        <ul>
                        {listElements}
                        </ul>
                        <ContactForm contact={newContact}/>
                      </div>
  ```
### 9.  Styling React apps by using className React attribute

In React, we can assign class attributes to the components by using the property className (Note that like the DOM, React uses the className property to assign CSS classes (as class is a reserved word in JavaScript). There are several methods to assign css styles to our components, but for simplicity on this example we are going to pass them directly to the render function of the component.

1. So let's start by creating a style.css file including the definition of the used css classes (ContactItem, ContactItem-name, ContactItem-email and ContactItem-description). This file needs to be referenced in the head of your index.html file as indicated below.

 ```html
         <link rel="stylesheet" href="style.css">
 
 ```

The content of the css file is described as follows:

```css
      body {
      font-family: Tahoma, sans-serif;
      margin: 0;
      }

      /* ContactView component CSS rules */
      .ContactView-title {
        font-size: 24px;
        padding: 0 24px;
      }

      .ContactView-list {
        list-style: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid #f0f0f0;
      }

      /*ContactItem component CSS rules */
      .ContactItem {
        margin: 0;
        padding: 8px 24px;
        border-bottom: 1px solid #f0f0f0;
      }
      .ContactItem-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0;
      }
      .ContactItem-email {
        font-size: 14px;
        margin-top: 4px;
        font-style: italic;
        color: #888;
      }
      .ContactItem-description {
        font-size: 14px;
        margin-top: 4px;
      }

      /*ContactForm component CSS rules */
      .ContactForm {
        padding: 8px 24px;
      }
      .ContactForm > input,
      .ContactForm > textarea {
        display: block;
        width: 240px;
        padding: 4px 8px;
        margin-bottom: 8px;
        border-radius: 3px;
        border: 1px solid #888;
        font-size: 14px;
      }   
  ```
2. Once the css file is created and properly referenced we have to assign the css classes to the render functions of the components by using *className* attribute. Let's start by ContactItem:

  ```javascript
 var ContactItem = React.createClass({
        propTypes:{ //The passed argument must be a js object with name,email and description. This section is optional and can be infered by React by the JSX code in the render function
          //This way to define the proptypes is deprecated but we leave it in this way for learning porpuses
          name:React.PropTypes.string.isRequired, //Pay attention because PropTypes here starts with capitals but in the line up it starts in lower case. 
          email:React.PropTypes.string,
          description:React.PropTypes.string
        },
        render: function () {
          // Wrong! There is no need to specify the key here: <li key={this.props.key}> because it only makes sense if you want to return an array variable so
          // it should be placed in the return contained in the map function. See https://fb.me/react-warning-keys for more information
          //return <li key={this.props.key}>
          return  <li className='ContactItem'> 
                    <h2 className='ContactItem-name'>{this.props.name}</h2>
                    <a className='ContactItem-email' href={'mailto:'+this.props.email}>{this.props.email}</a>
                    <div className='ContactItem-description'>{this.props.description}</div>
                  </li>
        }
      });
  ```

  3. Let's continuewith the component ContactForm:

```javascript
  // React Component ContactForm
      var ContactForm = React.createClass({
        propTypes: {
          contact: React.PropTypes.object.isRequired
        },
        render: function(){
            return ( 
              <form className='ContactForm'>
                <input type='text' className='ContactItem-name' placeholder='Name (required)' value={this.props.contact.name}/>
                <input type='text' className='ContactItem-email' placeholder='Email (optional)' value={this.props.contact.email}/>
                <input type='textarea' className='ContactItem-description' placeholder='Description (optional)' value={this.props.contact.description}/>
                <button type='submit'>Add Contact</button>
              </form>
            )
        }
      });
```

  4. Next, in order to keep more reusible our react script we are going to create a ContactView component that receives the list of contacts as well as the new contact used to store the input data. It will make use of the *ContactForm* and *ContactItem* components. As follows the code and the CSS associated views. IMPORTANT, pay attention to the key attribute here when creating the var *contactItemElements*

```javascript
    var ContactView = React.createClass({
            propTypes: {
                    contacts: React.PropTypes.array.isRequired,
                    newContact: React.PropTypes.object.isRequired,
            },

            render: function() {
                    var getEmailFromContact = function(contact) { return contact.email };
                    var contactItemElements = contacts.filter(getEmailFromContact)
                                                      .map(function(contact) { // Correct! Key should be specified inside the array.See https://fb.me/react-warning-keys for more information.
                                                                            return <ContactItem
                                                                                        key={contact.key}
                                                                                        name={contact.name} 
                                                                                        email={contact.email} 
                                                                                        description={contact.description}/>
                                                                    }
                                                            );

                    return (
                            <div className='ContactView'>
                              <h1 className='ContactView-title'>Contacts</h1>
                              <ul className='ContactView-list'>{contactItemElements}</ul>
                              <ContactForm contact={this.props.newContact} />
                            </div>
                            )
            }
          });
```


4. Finally we render the ContactView component as root component of the react application. 

```javascript
        /*
        * Entry point
        */

        ReactDOM.render(<ContactView contacts={contacts} newContact={newContact} />, document.getElementById('react-app'));
```

In commit [20](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/881ad0c1366ddbaca2c4e61b55ffe038c48eb3ad) you can see the result of these changes and a reestructured version of the script

### 10.  Migrating to ES6 JS version

If you run the app we have created you will luckly see some errors related to some deprecated packages and functions. At the same time the debug console suggest to upgrade your code to be ES6 JS compliant. In this section we are going to create a file called mainES6.jsx file including the same functionality than main.jsx but using JS ES6 instead of ES5. In commit [25](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/aaaea9a6d1bfe12943327a75235f04d891ce4025) you have the source code of mainES6.jsx. Remeber to update the html file with this js file as indicated in commit [24](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/793d887310014e69f0127dd3cfb74e9cb3b66c44)

Here you have a component making use of the ES6 syntax

```javascript

/*************************** 
 ** ContactItem component
 ***************************/

  class ContactItem extends React.Component { //INSTEAD OF React.createClass({ the ES6 version uses class and extends
        /** React.PropTypes has moved into a different package since React v15.5. Please use the prop-types library instead. 
         * So that it's why in this ES6 version is commented. In order to use it you must import the package as described here
         * https://www.npmjs.com/package/prop-types or including within the html the following script tag
         * <script src="https://unpkg.com/prop-types/prop-types.js"></script>
         * And then define it after the creation of the class
         * Remember to import it at the begining of the script:
         * import PropTypes from 'prop-types'; // ES6 
         * 
        propTypes:{
          name:React.PropTypes.string.isRequired, //Pay attention because PropTypes here starts with capitals but in the line up it starts in lower case. 
          email:React.PropTypes.string,
          description:React.PropTypes.string
        },*/


      render() { // The signature function: render() is not needed in ES6, use render() instead.
          return  <li className='ContactItem'> 
                    <h2 className='ContactItem-name'>{this.props.name}</h2>
                    <a className='ContactItem-email' href={'mailto:'+this.props.email}>{this.props.email}</a>
                    <div className='ContactItem-description'>{this.props.description}</div>
                  </li>
       }
  };
  // Proptypes definition are not included in the compoent in ES6! they are defined later as indicated

    // PropTypes exports a range of validators that can be used to make sure the data you receive is valid. 
    // In this example, we're using PropTypes.string 
    // When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. 
    //For performance reasons, propTypes is only checked in development mode.
  ContactItem.propTypes = {
    name: PropTypes.string.isRequired, 
    email:PropTypes.string,
    description:PropTypes.string
  };

  // You can also define default Prop Values as indicated in the following sample
  // Specifies the default values for props:
  ContactItem.defaultProps = {
    name: 'No name typed'
  };

```

Another important new feature of ES6 is the arrow operator (=>) that allows you to replace the following code:
```javascript
  var contactItemElements = contacts.filter(getEmailFromContact)
                                                  .map(function(contact) { // Correct! Key should be specified inside the array.See https://fb.me/react-warning-keys for more information.
                                                                        return <ContactItem
                                                                                     key={contact.key}
                                                                                     name={contact.name} 
                                                                                     email={contact.email} 
                                                                                     description={contact.description}/>
                                                                }
                                                        );

```

by the following nicer one:

```javascript
 var contactItemElements = contacts.filter(getEmailFromContact).map(contact => { // Here we make use of the arrow function from ES6 
                                                                                              return <ContactItem
                                                                                                        key={contact.key}
                                                                                                        name={contact.name} 
                                                                                                        email={contact.email} 
                                                                                                        description={contact.description}/>
                                                                                               });
```


### 11.  Defining state for a React component

Components in react not only have properties, they also have a state. A state is an immutable object, that triggers the render method every time this is modified.
In order to initialize the state of a component we need to define the method constructor(). Wihin this method we need to invoke super() method, inherited from React.Component class. 
Once this is done, within the constructor we can define the state by using  *this.state* as indicated in the following script:

```javascript
 class ContactView extends React.Component {
    /**
     * Constructor method allows to define the state of the component.
     * @memberof ContactView
     */
    constructor() { // Components in react apart from properties, they have a state. A state is an immutable object, that triggers the render method every time this is modified. 
      super();      //We then include the external variable contacts as state variable for the ContactView component, which is the top level compoennt      
      this.state = {
                contacts : [
                    {key: 1, name:'Miguel Doctor', email:'migueldoctor@gmail.com', description:'Miguel is the one making this example, so for that reason it will have a description field'},
                    {key: 2, name:'Bob', description:'Bob is a great user but without email, so for that reason we provide him with a description'},
                    {key: 3, name:'Joe Citizen',email:'joe@example.co'}
                ]
      };
    }
```

In consequence in our example we must perform the following changes in order to use the state var contacts:
 
 1. The global var contacts must be removed
 2. In render method from ContactView component, instead of using the global var contacts we have to use the this.state var as indicated below:

  ```javascript
  var contactItemElements = this.state.contacts.filter(getEmailFromContact).map(contact => { 
                                                                                                return <ContactItem
                                                                                                          key={contact.key}
  ```

 3. Finally, since the var contact has been included within the highest level component and the global var has been removed, there is no need to pass it as prop, so
    the entry point of the App will look like this:

  ```javascript
      ReactDOM.render(<ContactView newContact={newContact} />, document.getElementById('react-app'));
  ```

In commit [27](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/1c9a90241ca0250fe45830b18e3c5c32303cd37d) we can see the full example source code

### 12.  Managing uncontrolled forms in react

Using form components such as <input> in React presents a challenge that is absent when writing traditional form HTML. For example, in HTML:
  ```html
    <input type="text" name="title" value="Untitled" />
  ```
This renders an input initialized with the value, Untitled. When the user updates the input, the node's value property will change. However, node.getAttribute('value') will still return the value used at initialization time, Untitled. Unlike HTML, React components must represent the state of the view at any point in time and not only at initialization time. For example, in React:

```javascript
  render: function() {
      return <input type="text" name="title1" value="Untitled" />;
  }

  render: function() {
      return <input type="text" name="title2" />;
  }
```
This method describes the view at any point in time, the value of the text input "title1" has value attribute defined to Untitled so it should always be Untitled. 
Which means that the user will not be able to update the value of this component, because it's a *React Controlled Component*. However, the input "title2" has not value attribute
so it will work as *uncontrolled component*. In the current section we will make use of the second approach, uncontrolled components.

As introduction to controlled components we can state that If you add a value={whatever} property to the input, which makes it a controlled component, then it is read-only unless you add an *onChange* handler that updates the value of whatever

  1. Set inputs in the form, as uncontrolled components.

  ```javascript
  /*************************** 
  ** ContactForm component
  ***************************/
    class ContactForm extends React.Component {
      render() {
              // Events - 1) If we want to use the form in uncontrolled mode we have to remove the attribute value from the input JSX elements. In addition
              //             Since the components are uncontrolled we need to add the attribute name to be able to recover their values
              return ( 
                <form className='ContactForm'>
                  <input type='text' className='ContactItem-name' placeholder='Name (required)' name='name'/>
                  <input type='text' className='ContactItem-email' placeholder='Email (optional)' name='email'/>
                  <textarea className='ContactItem-description' placeholder='Description (optional)' name='description'/>
                  <button type='submit'>Add Contact</button>
                </form>
              )
          }
      };
  ```

  2. Set attribute onSubmit on the form element. This attribute must recaive as prop a method that will be defined in the father component and will be executed when the user submit the form

  ```javascript
/*************************** 
 ** ContactForm component
 ***************************/
  class ContactForm extends React.Component {
    render() {
            // Events - 1) If we want to use the form in uncontrolled mode we have to remove the attribute value from the input JSX elements.
            // Events - 2) Then we have to add the attribute onSubmit to the form and assign it to a method passed as prop from the father
            //    component, which means that it's the father the one in charge of define this method and bind it to the child. In addition
            //    the atribute name must be defined in order to retrieve the value from it
            return ( 
              <form className='ContactForm' onSubmit={this.props.onAddContact}>
                <input type='text' className='ContactItem-name' placeholder='Name (required)' name='name'/>
                <input type='text' className='ContactItem-email' placeholder='Email (optional)' name='email'/>
                <textarea className='ContactItem-description' placeholder='Description (optional)' name='description'/>
                <button type='submit'>Add Contact</button>
              </form>
            )
        }
    };
```

3. Now we have to update the father component (ContactView) making two things if we want to get our form working fine.
  * Create the method handleOnAddContact that will be executed when onSubmit. Since the form is uncontrolled we need to retrieve
    the user inputs from event.target reference

```javascript
      // Events - 3) We have to define here (the father of the component Form) the method handleOnAddContact
    handleOnAddContact(event) {
      //a) cancel the page reloading
      event.preventDefault();
      
      //b) save into a let variable the value received from the web form
      let contactSubmitted = {
        name:event.target.name.value,
        email: event.target.email.value,
        description: event.target.description.value,
      }
      console.log(event.target.name.value);
      console.log(event.target.email.value);
      console.log(event.target.description.value);

      //Let's reindex the keys on the contact list
      for (var i=0;i<this.state.contacts.length;i++) {
        this.state.contacts[i].key=i+1;
      }
      contactSubmitted.key = this.state.contacts.length+1;

      //c) Access the state (via setState) and add the new contact to the contacts state var.
      //   This invokation of the setState method will trigger a the execution of the render method
      this.setState({
        contacts: this.state.contacts.concat([contactSubmitted])
      })


      //d) Let's reset the form
      event.target.name.value='';
      event.target.email.value='';
      event.target.description.value = '';
      
    }
```


  * Passing the just created method to the child component via bind method (so this references will be transformed to the invoker component instead of the component where they have been defined)

```javascript
 // Events - 4) Finally we have to pass the method handleOnAddContact to the ContactForm component via props by using 
                //             bind method. --> <ContactForm contact={this.props.newContact} onAddContact={this.handleOnAddContact.bind(this)} />
                return (
                        <div className='ContactView'>
                          <h1 className='ContactView-title'>Contacts</h1>
                          <ul className='ContactView-list'>{contactItemElements}</ul>
                          <ContactForm contact={this.props.newContact} onAddContact={this.handleOnAddContact.bind(this)} />
                        </div>
                        )
```

On commit [29](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/ef5345046ba735688f5a512ed336db8830d08125) you can see the full code of the app

### 13.  Managing controlled forms in react

A controlled input accepts its current value as a prop, as well as a callback to change that value. You could say it’s a more “React way” of approaching this (which doesn’t mean you should always use it). In consequence your inputs should define the attribute value (checked for checkbox and radio input types) and the attritbute onChange.

```html
  <input value={someValue} onChange={handleChange} />
```

Following this approach the value of this input has to live in the state somewhere. Typically, the component that renders the input (aka the form component) saves that in its state: So the DATA Section 
of the srcript must be removed. The inputs will be now encapsulated within the ContactForm component.


```javascript
/******************************************* 
 * DATA SECTION
 ******************************************/
  // Then we create a new empty contact object
  var newContact = {name: "", email: "", description: ""}
```

Once removed we need to remove the attribute contact from the ContactForm instance and the newContact attribute from the ContactView instance.


```javascript

//<ContactForm contact={this.props.newContact} onAddContact={this.handleOnAddContact.bind(this)} />
  <ContactForm onAddContact={this.handleOnAddContact.bind(this)} />
// ...
//ReactDOM.render(<ContactView newContact={newContact} />, document.getElementById('react-app'));
  ReactDOM.render(<ContactView/>, document.getElementById('react-app'));
```

Now that everything is more encapsulated and reusable we can have a look into the Controlled ContactForm Component.
Please, pay attention to the handle custom methods (tagged with *2)* )in the source code below:

Every time you type a new character, handleContactNameChange (or the others, depending on where you type) is called. It takes in the new value of the input and sets it in the state.
This flow kind of ‘pushes’ the value changes to the form component, so the Form component always has the current value of the input, without needing to ask for it explicitly.
*This means your data (state) and UI (inputs) are always in sync*. The state gives the value to the input, and the input asks the Form to change the current value.
This also means that the form component can respond to input changes immediately, which could be very usefull on any of the following scenarios:
  1. in-place feedback, like validations
  2. disabling the button unless all fields have valid data
  3. enforcing a specific input format, like credit card numbers

```javascript
/*************************** 
 ** ContactForm component
 ***************************/
    /**
     * ContactForm used in controlled way
     * 
     */
    class ContactForm extends React.Component {
      // 1) Since the form is going to be controlled by react we need to store the input values into the state of the Form component
      constructor() {
        super();
        this.state = {
          contactToAddBean: {name: '', email:'', description:''}
        };
      }
      //2) We need to create custom methods to handle the change of the values in the fields,
      //   otherwise the inputs will be readonly as far as react is concern
      handleContactNameChange(event) {
        // The most direct way of updating the state mutating state is to directly copy by using the ES6 spread/rest operator: 
        var newContactToAddBean = {...this.state.contactToAddBean} //here deconstruct state.abc into a new object-- effectively making a copy
        newContactToAddBean.name = event.target.value;
        this.setState({contactToAddBean: newContactToAddBean});
      };

      handleContacEmailChange(event) {
        var newContactToAddBean = {...this.state.contactToAddBean}
        newContactToAddBean.email = event.target.value;
        this.setState({contactToAddBean: newContactToAddBean});
      };

      handleContactDescriptionChange(event) {
        var newContactToAddBean = {...this.state.contactToAddBean}
        newContactToAddBean.description = event.target.value;
        this.setState({contactToAddBean: newContactToAddBean});
      };

      //3) Now, since the inputs are managed from this component we need to create this method to pass it to the father component.
      submitContactToAdd(event)
      {
        event.preventDefault();
        this.props.onAddContact(this.state.contactToAddBean); // This line passes the state to the component father,
                                                              // onAddContact must be defined in the father and pass it via props
        var newContactToAddBean = {...this.state.contactToAddBean}
        
        //Finally reset the form
        newContactToAddBean.name = '';
        newContactToAddBean.email = '';
        newContactToAddBean.description = ''; 
        this.setState({contactToAddBean: newContactToAddBean});
      }

      // 4) On form, we invoke on onSubmit attribute the above defined custom method
      //    The inputs must define the onChange attribute assigned to the handle methods defined above
      render() {
                return ( 
                  <form className='ContactForm' onSubmit={this.submitContactToAdd.bind(this)}>
                    <input type='text' className='ContactItem-name' placeholder='Name (required)' value={this.state.contactToAddBean.name} onChange={this.handleContactNameChange.bind(this)}/>
                    <input type='text' className='ContactItem-email' placeholder='Email (optional)' value={this.state.contactToAddBean.email} onChange={this.handleContacEmailChange.bind(this)}/>
                    <textarea className='ContactItem-description' placeholder='Description (optional)' value={this.state.contactToAddBean.description} onChange={this.handleContactDescriptionChange.bind(this)}/>
                    <button type='submit'>Add Contact</button>
                  </form>
                )
            }
    };
```

It's important to realize that now, all information and events and actions related to the form are selfcontained and properly encapsulated within the component with no dependecies from outside.
Now, it's the father component who should pass it a function doing whatever he wants to do with the data provided by the form, but without dealing with inputs events or whatver. So if the Form component changes, the faher doesn't need to be changed, and viceversa. Let's see how the father component ContactView will look like following this approach

```javascript
/*************************** 
 ** ContactView component
 ***************************/
  class ContactView extends React.Component {
    /**
     * Constructor method allows to define the state of the component.
     * @memberof ContactView
     */
    constructor() { // Components in react apart from properties, they have a state. A state is an immutable object, that triggers the render method every time this is modified. 
      super();  
      this.state = {
                contacts : [
                    {key: 1, name:'Miguel Doctor', email:'migueldoctor@gmail.com', description:'Miguel is the one making this example, so for that reason it will have a description field'},
                    {key: 2, name:'Bob', description:'Bob is a great user but without email, so for that reason we provide him with a description'},
                    {key: 3, name:'Joe Citizen',email:'joe@example.co'}
                ]
      };
    }
    
    //1) Since the component is connected to the ContactForm in a Controlled way, it doesn't need to 
    //   handle the event inputs, but it needs to retrieve the input value from
    //   the child component in this method which will be passed to the child via props
    //   The argument of the function is the data received from the child
    handleOnAddContact(contactSubmitted){

      //Let's reindex the keys on the contact list
      for (var i=0;i<this.state.contacts.length;i++) {
        this.state.contacts[i].key=i+1;
      }
      contactSubmitted.key = this.state.contacts.length+1;

      // Access the state (via setState) and add the new contact to the contacts state var.
      //   This invokation of the setState method will trigger a the execution of the render method
      this.setState({
        contacts: this.state.contacts.concat([contactSubmitted])
      })
    }

    render() {
                var getEmailFromContact = function(contact) { return contact.email };
                // Here we replace the var contacts by the state var contacts.
                // IMPORTANT. In this way, everytime the array contacts is updated, since it's part of the state, the render method will be executed again, without reloading
                var contactItemElements = this.state.contacts.filter(getEmailFromContact).map(contact => { // Here we make use of the arrow function from ES6 
                                                                                              return <ContactItem
                                                                                                        key={contact.key}
                                                                                                        name={contact.name} 
                                                                                                        email={contact.email} 
                                                                                                        description={contact.description}/>
                                                                                                     });
                return (
                        <div className='ContactView'>
                          <h1 className='ContactView-title'>Contacts</h1>
                          <ul className='ContactView-list'>{contactItemElements}</ul>
                          <ContactForm onAddContact={this.handleOnAddContact.bind(this)} />
                        </div>
                        )
              }
      };
```

In commit[32](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/2f73019f4754da2471beec7f124f43bc629bc633) you can find the final version of the app after becoming "controlled". The uncontrolled version of the sample will remain in the file mainES6NoControlledForms.jsx in case you need it to have a look.

### 14.  Uncontrolled vs Controlled forms in react

So, what approach should we follow in our apps? Well, there is no answer for that question, it depends on the UX experience you want to achieve. Both the controlled and uncontrolled form fields have their merit. Evaluate your specific situation and pick the approach — what works for you is good enough.

If your form is incredibly simple in terms of UI feedback, uncontrolled with refs is entirely fine. You don’t have to listen to what the various articles are saying is “bad”. Also, this is not an once-and-for-all decision: you can always migrate to controlled input.

I recommend to have a look in the following [link](https://goshakkk.name/controlled-vs-uncontrolled-inputs-react/) in order to clarify and to get a better understanding about the differences between Controlled and Uncontrolled forms in React.

### 15.  Splitting React Components into separate files

One of the advantages of using react is the chance of split your UI into independent components that can be reused in many places or projects. In order to do so, React encourages us to create a different jsx file for each component that we create. In order to make all this components working fine together is strongly recommended to make use of a module managing system like [Webpack](http://webpack.github.io/) [or SystemJS](https://github.com/systemjs/systemjs). But for the purpose of this tutorial, and since we are using client side rendering, we are going to illustrate this matter by assigning react components to the window object. IMPORTANT: The presented method is not for production use, and it's discouraged. It's presented here just for educational reasons.

1. We create a folder within our project containing our components. The name of the folder can be 'components' and each component must be located into a dedicated folder as indicated as follows. Finally the name of the file for each component must be the name of the class dedined on it.
   
+ root
  - components
    - contact-form
      - ContactForm.jsx
    - contact-item
      - ContactItem.jsx
    - contact-view
      - ContactView.jsx
  - index.html
  - mainES6.jsx

2. The code for each jsx file is displayed below. Note that in order to make the components available from one file to another we have added a line at the end of each file. Please read the begining of the current section in order to get info about why this method is descouraged and only usefull for learning reasons.

+ ContactForm.jsx
  ```javascript
  /*************************** 
  ** ContactForm component
  ***************************/
      /**
      * ContactForm used in controlled way
      * 
      */
      class ContactForm extends React.Component {
          // 1) Since the form is going to be controlled by react we need to store the input values into the state of the Form component
          constructor() {
            super();
            this.state = {
              contactToAddBean: {name: '', email:'', description:''}
            };
          }
          //2) We need to create methods to handle the change of the values in the fields,
          //   otherwise the inputs will be readonly as far as react is concern
          handleContactNameChange(event) {
            // The most direct way of updating the state mutating state is to directly copy by using the ES6 spread/rest operator: 
            var newContactToAddBean = {...this.state.contactToAddBean} //here deconstruct state.abc into a new object-- effectively making a copy
            newContactToAddBean.name = event.target.value;
            this.setState({contactToAddBean: newContactToAddBean});
          };
    
          handleContacEmailChange(event) {
            var newContactToAddBean = {...this.state.contactToAddBean}
            newContactToAddBean.email = event.target.value;
            this.setState({contactToAddBean: newContactToAddBean});
          };
    
          handleContactDescriptionChange(event) {
            var newContactToAddBean = {...this.state.contactToAddBean}
            newContactToAddBean.description = event.target.value;
            this.setState({contactToAddBean: newContactToAddBean});
          };
    
          //3) Now, since the inputs are managed from this component we need to create this method to pass it to the father component.
          submitContactToAdd(event)
          {
            event.preventDefault();
            this.props.onAddContact(this.state.contactToAddBean); // This line pass the state to the component father,
                                                                  // onAddContact must be defined in the father and pass it via props
            var newContactToAddBean = {...this.state.contactToAddBean}
            
            //Finally reset the form
            newContactToAddBean.name = '';
            newContactToAddBean.email = '';
            newContactToAddBean.description = ''; 
            this.setState({contactToAddBean: newContactToAddBean});
          }
    
          // 4) On form, we invoke on onSubmit attribute the above defined custom method
          //    The inputs must define the onChange attribute assigned to the handle methods defined above
          render() {
                    return ( 
                      <form className='ContactForm' onSubmit={this.submitContactToAdd.bind(this)}>
                        <input type='text' className='ContactItem-name' placeholder='Name (required)' value={this.state.contactToAddBean.name} onChange={this.handleContactNameChange.bind(this)}/>
                        <input type='text' className='ContactItem-email' placeholder='Email (optional)' value={this.state.contactToAddBean.email} onChange={this.handleContacEmailChange.bind(this)}/>
                        <textarea className='ContactItem-description' placeholder='Description (optional)' value={this.state.contactToAddBean.description} onChange={this.handleContactDescriptionChange.bind(this)}/>
                        <button type='submit'>Add Contact</button>
                      </form>
                    )
                }
        };


    // Since our jsx files are wrapped into closure during babel processing, and we are doing so from the browser we need
    // to export this component. The simplest way is adding the component to the window object
    // WARNING: This method is only for teaching purposes!!! In real application we should use webpack bulding system!!!!!!
    window.ContactForm = ContactForm;

  ```

+ ContactItem.jsx
  ```javascript
  /*************************** 
  ** ContactItem component
  ***************************/

  class ContactItem extends React.Component {
      
        render() {
            // Wrong! There is no need to specify the key here: <li key={this.props.key}> because it only makes sense if you want to return an array variable so
            // it should be placed in the return contained in the map function. See https://fb.me/react-warning-keys for more information
            //return <li key={this.props.key}>
            return  <li className='ContactItem'> 
                      <h2 className='ContactItem-name'>{this.props.name}</h2>
                      <a className='ContactItem-email' href={'mailto:'+this.props.email}>{this.props.email}</a>
                      <div className='ContactItem-description'>{this.props.description}</div>
                    </li>
          }
    };

    // Proptypes definition
    // PropTypes exports a range of validators that can be used to make sure the data you receive is valid. 
    // In this example, we're using PropTypes.string 
    // When an invalid value is provided for a prop, a warning will be shown in the JavaScript console. 
    //For performance reasons, propTypes is only checked in development mode.
    ContactItem.propTypes = {
      name: PropTypes.string.isRequired, 
      email:PropTypes.string,
      description:PropTypes.string
    };

    // You can also define default Prop Values as indicated in the following sample
    // Specifies the default values for props:
    ContactItem.defaultProps = {
      name: 'No name typed'
    };

    // Since our jsx files are wrapped into closure during babel processing, and we are doing so from the browser we need
    // to export this component. The simplest way is adding the component to the window object
    // WARNING: This method is only for teaching purposes!!! In real application we should use webpack bulding system!!!!!!
    window.ContactItem = ContactItem;

  ```

+ ContactView.jsx
  ```javascript
  /*************************** 
  ** ContactView component
  ***************************/
  class ContactView extends React.Component {
      /**
      * Constructor method allows to define the state of the component.
      * @memberof ContactView
      */
      constructor() { // Components in react apart from properties, they have a state. A state is an immutable object, that triggers the render method every time this is modified. 
        super();  
        this.state = {
                  contacts : [
                      {key: 1, name:'Miguel Doctor', email:'migueldoctor@gmail.com', description:'Miguel is the one making this example, so for that reason it will have a description field'},
                      {key: 2, name:'Bob', description:'Bob is a great user but without email, so for that reason we provide him with a description'},
                      {key: 3, name:'Joe Citizen',email:'joe@example.co'}
                  ]
        };
      }
      
      //1) Since the component is connected to the ContactForm in a Controlled way, it doesn't need to 
      //   handle the event inputs, but it needs to retrieve the input value from
      //   the child component in this method which will be passed to the child via props
      //   The argument of the function is the data received from the child
      handleOnAddContact(contactSubmitted){

        //Let's reindex the keys on the contact list
        for (var i=0;i<this.state.contacts.length;i++) {
          this.state.contacts[i].key=i+1;
        }
        contactSubmitted.key = this.state.contacts.length+1;

        // Access the state (via setState) and add the new contact to the contacts state var.
        //   This invokation of the setState method will trigger a the execution of the render method
        this.setState({
          contacts: this.state.contacts.concat([contactSubmitted])
        })      
      }

      render() {
                  var getEmailFromContact = function(contact) { return contact.email };
                  // Here we replace the var contacts by the state var contacts.
                  // IMPORTANT. In this way, everytime the array contacts is updated, since it's part of the state, the render method will be executed again, without reloading
                  var contactItemElements = this.state.contacts.filter(getEmailFromContact).map(contact => { // Here we make use of the arrow function from ES6 
                                                                                                return <ContactItem
                                                                                                          key={contact.key}
                                                                                                          name={contact.name} 
                                                                                                          email={contact.email} 
                                                                                                          description={contact.description}/>
                                                                                                      });
                  return (
                          <div className='ContactView'>
                            <h1 className='ContactView-title'>Contacts</h1>
                            <ul className='ContactView-list'>{contactItemElements}</ul>
                            <ContactForm onAddContact={this.handleOnAddContact.bind(this)} />
                          </div>
                          ) 
                }
  };


    // Since our jsx files are wrapped into closure during babel processing, and we are doing so from the browser we need
    // to export this component. The simplest way is adding the component to the window object
    // WARNING: This method is only for teaching purposes!!! In real application we should use webpack bulding system!!!!!!
    window.ContactView = ContactView;

  ```

+ mainES6.jsx - This file only contains now the entry point for the APP
  ```javascript
  /******************************************* 
  * ENTRY POINT SECTION 
  ******************************************/
  //
  ReactDOM.render(<ContactView/>, document.getElementById('react-app'));
  ```

+ index.html - We need to include the script tags for all the jsx files we have created individually for each component

  ```html
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>I'm in Sample React app USING JSX and using ES6 but without Flux, Redux, Webpack, Gulp and so on... just JS + JSX!</title>
      <link rel="stylesheet" href="style.css"/>
    </head>
    <body>
      
      <!-- 1) This is the DIV where the react app will be rendered -->
      <div id="react-app">
      </div>

      <script src="https://cdn.jsdelivr.net/react/15.5.4/react.js"></script>
      <script src="https://cdn.jsdelivr.net/react/15.5.4/react-dom.js"></script>
      <script src="https://unpkg.com/prop-types/prop-types.js"></script>
      
      <script src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.34/browser.min.js"></script>

      <script type="text/babel" src="./components/contact-item/ContactItem.jsx"></script>
      <script type="text/babel" src="./components/contact-form/ContactForm.jsx"></script>
      <script type="text/babel" src="./components/contact-view/ContactView.jsx"></script>
      <script type="text/babel" src="./mainES6.jsx"></script>
    </body>
  </html>
  ```

### 16.  Forms validation using Controlled forms in ReactJS

Let's show how to disable the submit form button in case the user doesn't type any value for name input fields. In case of email and description inputs they are not mandatory so the validation doesn't apply to them.

1. Go to ContactForm.jsx and add the following method isValid to the class (the name can be whatever you want)

```javascript
isValid() {
          const {contactToAddBean} = this.state; // In this way we retrive the element contactToAddBean from the state
          return contactToAddBean.name.length >0;
        }
```

2. Then modify the render method by invoking the isValid method and by adding the attribute *disabled = {!isEnabled}* to the button tag.

```javascript
render() {
              const isEnabled = this.isValid(); //<-- In this way we check everytime we render if the forms is Enabled or not
              
              return ( 
                    <form className='ContactForm' onSubmit={this.submitContactToAdd.bind(this)}>
                    .....
                      <button type='submit' disabled = {!isEnabled}> Add Contact</button> 
                    </form>
                  )
              }
      };
```

3. You can tweak the isValid method to make other assertions. For example you must be sure that the email, if it's not empty it contains a @ before enabling the submit button:

```javascript
isValid() 
        {
          const {contactToAddBean} = this.state;
          if (contactToAddBean.name.length >0) {
            if (contactToAddBean.email.length >0) {
                return contactToAddBean.email.includes("@");
              }
            else return true;
          }
          else return false;
        }
```

On commit [36](https://github.com/migueldoctor/ReactJS-Raw-sample-with-JSX-without-Flux-or-ES6/commit/32033149299224d4a6ecd5af525126742506692a) this validation feature has been implemented.