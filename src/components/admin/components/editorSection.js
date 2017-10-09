import React, {
   Component
} from 'react';

import {
   Button
} from 'react-bootstrap';

export default class EditorSection extends Component {
   
   constructor(props){
      super(props);
      this.state({
         ...props,
         showModal : false,
         addedItems: []
      });
   }
   
   toggleModal(){
      this.setState({
         showModal : !this.state.showModal
      });
   }

   exportVals(){
   
   }

   addItem(item){
      var updatedItems = [];
      updatedItems.push(this.state.addedItems);
      updatedItems.push(item);
      this.setState({
         addedItems : updatedItems
      });
   }
   
   

   _renderItems(){
      return this.state.addedItems.map((x) => {
         switch(x.type){
            case "LIST":
               return(<List value ={(x.value) ? x.value : []} struct = {x} onChange = {() => {}}/>);
            case "FSELECT":
               return(<ForeignSelector value = {x.value} struct = {x} onChange = {() => {}}/>);
            case "FLIST":
               return(<ForeignList value = {x.value} struct = {x} onChange = {() => {}}/>);
            default:
               return(<Input value = {x.value} type = {x.type} placeHolder = {x.label} onChange = {() =>{}}/>);
         }
      });          
   }

   render(){
      return(
         <div style = {{display: 'flex', flex: 1}}> 
            <EditorModal show={this.state.showModal} toggleModal={this.toggleModal.bind(this)} />
            <Button bsStyle="primary" onClick={() =>{this.toggleModal()}}>Add field</Button>
         </div>      
      );      
   }
   
}
