import React, {
   Component
} from 'react';

import { 
   FormControl,
   Button
} from 'react-bootstrap';
import { deleteDataById, createDataByModel, saveDataById } from '../utils/data';

import WarnModal from './warningModal.js';
import Back from 'react-icons/lib/fa/chevron-left';
import Input from './items';
import List from './list';
import Section from './section';
import MultiSection from './multiSection';
import '../../styles/style.css';

class Form extends Component {
   constructor(props){
      super(props);
      this.state = {
         content: {},
         ...props,
         beenSaved: true,
         showWarningModal : false
      }
   }

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }

      if(this.props.struct.id !== newProps.struct.id){ 
         this.setState({
            content: {
            
            }
         });
      }
   }

   deleteForm(id){
      return deleteDataById(id);
   }

   saveForm(form){
      if(this.state.content._id){
         return saveDataById(this.state.content._id.id, form);
      }else{
         return createDataByModel(this.state.struct.id, form);
      }
      this.setState({
         beenSaved: true
      });
    }

  isArray(array){
      for(var i=0; i<array.length; i++){
         if(Array.isArray(array[i])) return true;  
      }
      return false;
  }

   
   mapStruct(struct, content){
      return struct.map((x) => {
         return {
            ...x,
            value: content[x.id]
         }
      });
   }

   mapStructs(structs, content){
      return structs.map((x) => {
         return this.mapStruct(x, content);
      });
   }

   handleChange(c){
      var content = {
         ...this.state.content,
         ...c
      }

      this.setState({
         content: content,
         beenSaved: false
      });
   }
   
   renderWarning(){
      return(<WarnModal 
         saveWarningModal={this.saveWarningModal.bind(this)}
         quitWarningModal={this.quitWarningModal.bind(this)}
         leaveWarningModal={this.leaveWarningModal.bind(this)}
         showModal = {this.state.showWarningModal}/>);
   }

   saveWarningModal(){
      this.setState({
         showWarningModal : false
      });
      this.saveForm(this.state.content).then((res) => {
         this.props.onBack();
      });
   }

   leaveWarningModal(){
      this.setState({
         showWarningModal : false
      });
   }

   quitWarningModal(){
      this.setState({
         showWarningModal : false
      }); 
      this.props.onBack();
   }   

  _render(){
      return this.state.struct.model.map((x) => {
         if(this.isArray(x)){
           return(<MultiSection sections = {this.mapStructs(x, this.state.content)} onChange={this.handleChange.bind(this)}/>);
         }
         else{
            return(<Section inMulti = {false} struct = {this.mapStruct(x, this.state.content)} onChange={this.handleChange.bind(this)}/>);
         }
      }); 
  }

 
   render(){
      return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
         <div className = "formHeader">
            {this._back()}   
            <h2> {this.state.struct.name} </h2>
         </div>
        <div className = "formBody" style = {{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center'}}> 
            {this._render()} 
        </div>
        <div className = "formFooter">
            {this.renderWarning()}
            <Button className = "btn btn-footer btn-danger" onClick={() => {   
               if(this.state.content._id){
                  this.deleteForm(this.state.content._id.id).then((resp) => {
                     this.props.onBack()
                  }); 
               }
               else{
                  console.log(this.state.beenSaved);
                  if(this.state.beenSaved){
                     this.props.onBack();
                  }else{
                     this.setState({
                           showWarningModal: true
                     });
                  }
               }
            }}>{(this.state.content._id) ? 'Delete' : 'Cancel'}</Button>
            <Button  className = "btn btn-footer btn-primary" onClick={() => {
               this.saveForm(this.state.content).then((resp) => {
                 this.props.onBack() 
               });
            }}>{(this.state.content._id) ? 'Save' : 'Create'}</Button>
         </div>
      </div>
      );
   }


   _back(){
      if(this.props.onBack){
         return (<Back className = "backButton" size = {50} onClick={this.props.onBack.bind(this)}/>);
      }else{
         return null;
      }
   }
}


export default Form;
