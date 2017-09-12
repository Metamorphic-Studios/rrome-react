import React, {
   Component
} from 'react';

import { 
   FormControl,
   Button
} from 'react-bootstrap';

import Input from './items';
import List from './list';
import Section from './section';
import MultiSection from './multiSection';

class Form extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         content: {}
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

   saveForm(form){
      return fetch('http://localhost:3100/rrome/data/model/' + this.state.struct.id, {
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

   flatten(arr){
  return arr.reduce(function (flat, toFlatten) {
         return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
       }, []);
   }
   
   getKeys(arr){
      var flat = this.flatten(arr);
      return flat.map((x) => x.id);
   }

   pairValues(keys, content){
      var pair = {};
      keys.map((x) => {
         pair[x] = content[x];
      });
      return pair;
   }

   mapStruct(struct, content){
      return struct.map((x) => {
         return {
            ...x,
            value: content[x.id]
         }
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
           return(<MultiSection sections = {x} onChange={this.handleChange.bind(this)}/>);
         }
         else{
            return(<Section horizontal = {false} struct = {this.mapStruct(x, this.state.content)} onChange={this.handleChange.bind(this)}/>);
         }
      }); 
  }
 
   render(){
      return (
        <div style = {{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center'}}> 
            <h2 style={{marginTop: '10px'}}> {this.state.struct.name} </h2>
            {this._render()} 
            <Button onClick={this.saveForm.bind(this, this.state.content)}>Create</Button>
        </div>
      );
   }
}


export default Form;
