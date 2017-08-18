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
      //4.1) Let us create an array JSON objects wth users and optional emails.
      //Now we add as well description fields to some of the contacts elements
      var contacts = [
        {key: 1, name:'Miguel Doctor', email:'migueldoctor@gmail.com', description:'Miguel is the one making this example, so for that reason it will have a description field'},
        {key: 2, name:'Bob', description:'Bob is a great user but without email, so for that reason we provide him with a description'},
        {key: 3, name:'Joe Citizen',email:'mailto:joe@example.co'}
      ];

       // Then we create a new empty contact object
       var newContact = {name: "", email: "", description: ""}
      
      //5a) Here we create our first component with react and JSX
      var ContactItem = React.createClass({
        propTypes:{ //The passed argument must be a js object with name,email and description. This section is optional and can be infered by React by the JSX code in the render function
          //This way to define the proptypes is deprecated but we leave it in this way for learning porpuses
          name:React.PropTypes.string.isRequired, //Pay attention because PropTypes here starts with capitals but in the line up it starts in lower case. 
          email:React.PropTypes.string,
          description:React.PropTypes.string
        },
        render: function () {
          return <li key={this.props.key}>
                    <h2>{this.props.name}</h2>
                    <a href={'mailto:'+this.props.email}>{this.props.email}</a>
                    <div>{this.props.description}</div>
                    </li>
        }
      });

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

      //4.2) Now let's filter the array by choosing the ones with email
      var getEmailFromContact = function (contact) { return contact.email; }
      
      //4.3) filter function applies a condition and return the elements of the array that returns not null
      //map function applies the passed function to all elements of the array. 

      //5b)In this case we return the ContactItem reactComponent we have just created
      var listElements = contacts.filter(getEmailFromContact)
                                 .map(function (contact) {
                                     return <ContactItem name={contact.name} email={contact.email} description={contact.description}/>
                                 })

    // Finally we add the ContactForm component to our rootElement component
    var rootElement = <div>
                        <h1>Contacts</h1>
                        <ul>
                        {listElements}
                        </ul>
                        <ContactForm contact={newContact}/>
                      </div>

    ReactDOM.render(rootElement, document.getElementById('react-app'));