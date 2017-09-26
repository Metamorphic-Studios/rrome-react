import React, {
   Component
}from 'react';

import { getDataById } from '../utils/data';


import { 
   Button, 
   ListGroup, 
   ListGroupItem,
   Modal,
   Glyphicon
} from 'react-bootstrap';
import ForeignSelector from './foreignSelector';
const Add =  require('react-icons/lib/fa/plus');

export default class ForeignList extends Component{
   constructor(props){
      super(props);
      this.state = {
         ...props,
         listData : [],
         data : (props.value && props.value.length > 0) ? props.value : [],
         modalShow: false,
         modalValue: ''
      }
   }

   componentWillMount(){
      this.getListData();
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
  
   remove(element){
      var tempList = this.state.listData;
      var index = -1;
      for(var i = 0; i < tempList.length; i++){
         if(tempList[i] == element){
            index = i;
            break;
         }
      }
      tempList.splice(index, 1);
      this.setState({
      
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
         return (<ListGroupItem style ={{display : 'flex', justifyContent : 'space-around'}}>
               {this._renderItem(x)}
               <Button bsSize = 'xsmall' onClick={this.remove.bind(this, x)} style={{position: 'absolute', right: '5px'}}><Glyphicon glyph = 'remove'/></Button> 
               </ListGroupItem>);
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
      if(this.props.onChange){
         this.props.onChange(dat);
      }
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
               <Button onClick={this.modalSave.bind(this)}> Ok </Button>
               <Button onClick={()=>this.setState({modalShow: false})}> Cancel </Button>
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
