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