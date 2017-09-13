import React, {
   Component
} from 'react';

import { 
   FormControl,
   Button
} from 'react-bootstrap';
import Back from 'react-icons/lib/fa/chevron-left';
import Input from './items';
import List from './list';
import Section from './section';
import MultiSection from './multiSection';

class Form extends Component {
   constructor(props){
      super(props);
      this.state = {
         content: {},
         ...props 
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
      return fetch('http://localhost:3100/rrome/data/id/' + id + '/delete', {
         method: 'POST', 
         headers: {
            'Content-Type': 'application/json'
         }
      }).then((resp) => {
         return resp.json();
      });
   }

   saveForm(form){
      var url = "http://localhost:3100/rrome/data/model/" + this.state.struct.id;
      if(this.state.content._id){
         url = "http://localhost:3100/rrome/data/id/" +  this.state.content._id.id;
      }
      return fetch(url, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            blob: form
         })
      }).then((resp) => {
         return resp.json()
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
         content: content
      });
      console.log(content);
   }

  _render(){
      return this.state.struct.model.map((x) => {
         if(this.isArray(x)){
           return(<MultiSection sections = {this.mapStructs(x, this.state.content)} onChange={this.handleChange.bind(this)}/>);
         }
         else{
            return(<Section horizontal = {false} struct = {this.mapStruct(x, this.state.content)} onChange={this.handleChange.bind(this)}/>);
         }
      }); 
  }

 
   render(){
      return (
      <div style={{display: 'flex', flex: 1, flexDirection: 'column'}}>
         <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            {this._back()}   
            <h2 style={{marginTop: '10px'}}> {this.state.struct.name} </h2>
         </div>
        <div style = {{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center'}}> 
            {this._render()} 
        </div>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Button onClick={() => {
               if(this.state.content._id){
                  this.deleteForm(this.state.content._id.id).then((resp) => {
                     this.props.onBack();
                  });
               }else{
                  this.props.onBack();
               }
            }}>{(this.state.content._id) ? 'Delete' : 'Cancel'}</Button>
            <Button onClick={() => {
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
         return (<Back style={{cursor: 'pointer', fontSize: '20px', marginRight: '20px'}} onClick={this.props.onBack.bind(this)}/>);
      }else{
         return null;
      }
   }
}


export default Form;
