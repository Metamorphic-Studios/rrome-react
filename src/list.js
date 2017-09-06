import React, {
   Component
}from 'react';

import{
   ListGroup,
   ListGroupItem,
   Button
} from 'react-bootstrap';
import FormModal from './modal';
import ExpiringDate from './expire';
//a List component for storing 2d array values to be displayed on a form,
//ie a Cert or Drivers Lisence
class List extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         modVisible: false
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
     return this.state.value.map((x) => {
            return (               
                  <ListGroupItem style = {{display: 'flex', justifyContent: 'space-evenly'}}>
                     {this.renderItem(x)}                 
                  </ListGroupItem>
                  
                  );
      });
   }

   render(){
      return(
         <div>
            <ListGroup style = {{display: 'flex', flexDirection: 'column', margin : '5px'}}>
            {this.renderItems()}              
            </ListGroup>
            <Button onClick={()=>{this.setState({modVisible: true}); console.log(this.state.modVisible)}}>
               openModal
            </Button>
            <FormModal 
               show = {this.state.modVisible} 
               struct = {this.state.struct}
               onHide = {()=>this.setState({modVisible: false})}
            />
         </div>
         );
   }
}

export default List;

