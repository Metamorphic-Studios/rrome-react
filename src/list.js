import React, {
   Component
}from 'react';

import{
   ListGroup,
   ListGroupItem,
   Button,
   Modal
} from 'react-bootstrap';

import FormModal from './modal';
import ExpiringDate from './expire';
import Input from './items';
const Add =  require('react-icons/lib/fa/plus');
//a List component for storing 2d array values to be displayed on a form,
//ie a Cert or Drivers Lisence
class List extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         modalShow: false,
         modalContent: []
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
      return this.state.struct['meta-type'].map((x, ix) => {
          switch(x.type){
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
   
   renderModal(){
      return(
         <Modal show = {this.state.modalShow}>
            <Modal.Header>
               <Modal.Title>Add item to {this.state.struct.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{display: 'flex', flexDirection: 'row'}}>
               {this.renderModalFields()}
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={this.modalSave.bind(this)}> Save </Button>
               <Button onClick={()=>this.setState({modalShow: false})}> Close </Button>
            </Modal.Footer>
         </Modal>
      );  
   }

   modalSave(){
      var v = this.state.value;
      var a = {
         ...this.state.modalContent
      };
      v.push(a);

      if(this.props.onChange){
         this.props.onChange(v);
      }
      console.log(v);
      this.setState({modalShow: false});
   }
   
   handleModalChange(ix, evt){
      var modalContent = this.state.modalContent;
      modalContent[ix] = evt;
      this.setState({modalContent: modalContent});
   }

   renderModalFields(){
      return this.state.struct['meta-type'].map((x, ix) => {
         return(<Input type = {x.type} placeholder = {x.label} onChange={(evt) => { this.handleModalChange(ix, evt); }} />);
      });
   }

   render(){
      return(
         <div style={{flex: 1}}>
            <h4> {this.state.struct.label} </h4>  
            <ListGroup style = {{display: 'flex', flexDirection: 'column', margin : '5px'}}>
            {this.renderItems()}              
            </ListGroup>
            <Button onClick={()=>{this.setState({modalShow: true})}}>
               <Add /> Add
            </Button>
            {this.renderModal()}
         </div>
         );
   }
}

export default List;

