import React, {
   Component
}from 'react';

import { getDataById } from '../utils/data';


import { Button, ListGroup, ListGroupItem, Modal } from 'react-bootstrap';
import ForeignSelector from './foreignSelector';
const Add =  require('react-icons/lib/fa/plus');

export default class ForeignList extends Component{
   constructor(props){
      super(props);
      this.state = {
         ...props,
         listData : [],
         data : [],
         modalShow: false,
         modalValue: ''
      }
   }

   getListData(){
      this.setState({
         listData : []
      });
      this.state.data.map((dat) => {
         getDataById(dat.value).then((result) => {
            var employee = this.state.struct["meta-type"]["list_display"].map((e) => {
               return result[e];
            });
            return employee;   
         }).then((res) => {
            var l = this.state.listData;
            l.push(res);
            this.setState({
               listData : l
            });
         });
      });
   }
   
   _renderItem(item){
      var arr = [];
      for(var i = 0; i < item.length; i++){
         arr.push(<div style ={{marginRight : '5px'}}>{item[i]}</div>);
      } 
      return arr;
   }
   _renderItems(){
      return this.state.listData.map((x) => {
         return (<ListGroupItem style ={{display : 'flex', justifyContent : 'left'}}>{this._renderItem(x)}</ListGroupItem>);
      });
   }

   modalSave(){
      var id = this.state.modalValue;
      var dat = this.state.data;
      if(dat.includes(id))
         return;
      dat.push(id);
      this.setState({
         data: dat
      });
      this.getListData();
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
         <div style = {{flex : 1}}>
         <h4>{this.state.struct.label}</h4>
         <ListGroup style = {{display : 'flex', flexDirection : 'column', margin : '5px'}}>
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
