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