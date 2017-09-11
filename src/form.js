import React, {
   Component
} from 'react';

import { 
   FormControl
} from 'react-bootstrap';

import Input from './items';
import List from './list';
import Section from './section';
import MultiSection from './multiSection';

class Form extends Component {
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

  _render(){
      return this.state.struct.model.map((x) => {
         if(this.isArray(x)){
           return(<MultiSection sections = {x}/>);
         }
         else{
            return(<Section horizontal = {false} struct = {x}/>);
         }
      }); 
  }
 
   render(){
      return (
        <div style = {{display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center'}}> 
            <h2 style={{marginTop: '10px'}}> {this.state.struct.name} </h2>
            {this._render()} 
        </div>
      );
   }
}


export default Form;
