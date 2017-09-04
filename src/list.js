import React,{
   Component
}from 'react';

import{
   ListGroup,
   ListGroupItem
} from 'react-bootstrap';

import ExpiringDate from './expire';
//a List component for storing 2d array values to be displayed on a form,
//ie a Cert or Drivers Lisence
class List extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }
   
   //returns each individual item depending on the value type within 
   //@param 'i' the array containing the key & value
   renderItem(i){
      return this.state.struct.map((x, ix) => {
          switch(x){
             case "DATE":
               return (<div>{i[ix]}</div>);
             case "DATE:D":
               return (<ExpiringDate value = {i[ix]}/>);
             case "TEXT":
               return (<div>{i[ix]}</div>);
             case "NUMBER":
               return (<div>{i[ix]}</div>);
          }
      });  
   }
   //returns a list of <ListGroupItems> for display within the list itself
   renderItems(){
      console.log(this.state.value);
     return this.state.value.map((x) => {
        console.log(x);
            return (               
                  <ListGroupItem style = {{display: 'flex', justifyContent: 'space-between'}}>
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

