import React, {
   Component
}from 'react';

import { Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import ForeignSelector from './foreignSelector';
const Add =  require('react-icons/lib/fa/plus');

export default class ForeignList extends Component{
   constructor(props){
      super(props);
      this.state = {
         ...props,
         data : [],
         modalShow: false,
         modalValue: ''
      }
   }

   componentWillMount(){
      var id = this.state.struct["meta-type"].id;
      this.getData(id).then((data) => {
         var dat = data.map((x) => {
            return this.state.struct["meta-type"]["display_keys"].map((e) => {
               return x[e];
            });
         });
         this.setState({
            data : dat
         });
      });
   }

   getData(id){
      return fetch("http:localhost:3100/rrome/data/model/" + id).then((res) => {
         return res.json();
      });
   }

   _renderItems(){
      return this.state.data.map((x) => {
         return (<ListGroupItem>{x.value}</ListGroupItem>);
      });
   }

   modalSave(){
      var id = this.state.modalValue;
      var dat = this.state.data;
      dat.push(id);
      this.setState({
         modalValue: '',
         data: dat
      });
   }

   _renderModal(){
      return (
         <Modal show = {this.state.modalShow}>
            <Modal.Header>
               <Modal.Title>Add item to {this.state.struct.label}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{display: 'flex', flexDirection: 'row', flex: 1}}>
               <ForeignSelector struct={this.state.struct} style={{flex:1 }} onChange={(val) => this.setState({modalValue: val})}/> 
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={this.modalSave.bind(this)}> Save </Button>
               <Button onClick={()=>this.setState({modalShow: false})}> Close </Button>
            </Modal.Footer>
         </Modal>
      );
   }
   

   render(){
      return (
         <div>
         <h4>{this.state.struct.label}</h4>
         <ListGroup>
            {this._renderItems()}
         </ListGroup>
         {this._renderModal()}
         <Button onClick={()=>{this.setState({modalShow: true})}}>
            <Add /> Add
         </Button>
         </div>
      ); 
   }
}
