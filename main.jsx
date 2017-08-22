/******************************************* 
 * DATA SECTION
 ******************************************/
      var contacts = [
        {key: 1, name:'Miguel Doctor', email:'migueldoctor@gmail.com', description:'Miguel is the one making this example, so for that reason it will have a description field'},
        {key: 2, name:'Bob', description:'Bob is a great user but without email, so for that reason we provide him with a description'},
        {key: 3, name:'Joe Citizen',email:'mailto:joe@example.co'}
      ];

      // Then we create a new empty contact object
      var newContact = {name: "", email: "", description: ""}


/******************************************* 
 * COMPONENTS CREATION SECTION 
 ******************************************/

/*************************** 
 ** ContactItem component
 ***************************/

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

/*************************** 
 ** ContactForm component
 ***************************/
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
      
/*************************** 
 ** ContactView component
 ***************************/
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

/******************************************* 
 * ENTRY POINT SECTION 
 ******************************************/
    ReactDOM.render(<ContactView contacts={contacts} newContact={newContact} />, document.getElementById('react-app'));