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