import React,{
   Component
}from 'react';

import{
   ListGroup,
   ListGroupItem
} from 'react-bootstrap';
//a List component for storing 2d array values to be displayed on a form,
//ie a Cert or Drivers Lisence
class List extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }

   componentWillReceieveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }
   
   //returns each individual item depending on the value type within 
   //@param 'i' the array containing the key & value
   renderItem(i){
      console.log(this.state.struct);
      return this.state.struct.map((x, ix) => {
          switch(x){
             case "DATE":
               return i[ix];   
             case "TEXT":
               return i[ix];
             case "NUMBER":
               return i[ix];
          }
      });  
   }
   //returns a list of <ListGroupItems> for display within the list itself
   renderItems(){
      console.log(this.state.value);
     return this.state.value.map((x) => {
        console.log(x);
            return (               
                  <ListGroupItem>
                     {this.renderItem(x)}                 
                  </ListGroupItem>
                  );
      });
   }

   render(){
      return(
            <ListGroup>
            {this.renderItems()}              
            </ListGroup>
         );
   }
}

export default List;

