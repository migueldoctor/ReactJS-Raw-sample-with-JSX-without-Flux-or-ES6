/******************************************* 
 * COMPONENTS CREATION SECTION 
 ******************************************/

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

/******************************************* 
 * ENTRY POINT SECTION 
 ******************************************/
    ReactDOM.render(<ContactView/>, document.getElementById('react-app'));