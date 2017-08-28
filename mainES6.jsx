/******************************************* 
 * DATA SECTION
 ******************************************/
      // Then we create a new empty contact object
      var newContact = {name: "", email: "", description: ""}


/******************************************* 
 * COMPONENTS CREATION SECTION 
 ******************************************/

/*************************** 
 ** ContactItem component
 ***************************/

  class ContactItem extends React.Component {
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
  
    ContactForm.propTypes = {
      contact: PropTypes.object.isRequired
    };
      
/*************************** 
 ** ContactView component
 ***************************/
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
                // Events - 4) Finally we have to pass the method handleOnAddContact to the ContactForm component via props by using 
                //             bind method. --> <ContactForm contact={this.props.newContact} onAddContact={this.handleOnAddContact.bind(this)} />
                return (
                        <div className='ContactView'>
                          <h1 className='ContactView-title'>Contacts</h1>
                          <ul className='ContactView-list'>{contactItemElements}</ul>
                          <ContactForm contact={this.props.newContact} onAddContact={this.handleOnAddContact.bind(this)} />
                        </div>
                        ) 
              }
      };
  
  ContactView.propTypes = {
    // Since included in the status this prop is not needed any more 
    //contacts: PropTypes.array.isRequired,
    newContact: PropTypes.object.isRequired
  }

/******************************************* 
 * ENTRY POINT SECTION 
 ******************************************/
    ReactDOM.render(<ContactView newContact={newContact} />, document.getElementById('react-app'));