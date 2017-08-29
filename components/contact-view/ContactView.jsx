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