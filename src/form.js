import React, {
   Component
} from 'react';

import { 
   FormControl
} from 'react-bootstrap';

import Input from './items';
import List from './list';
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

   _renderItems(){
      return this.state.struct.model.map((x) => {
         switch(x.type){
            case "LIST":
               return(<List value = {[['foo' , 'bar'], ['yeah','na'],['billy','haine'],['geaz','geag']]} struct = {x['meta-type']}/>);
            default:
               return(<Input type={x.type} placeholder={x.id} />);

         }
      });
   }

   render(){
      return (
         <div style = {{display: 'flex', flex: 1, flexDirection: 'column', height: '50%'}}>
            <h2 style = {{backgroundColor: '#eee'}}>{this.state.struct.name}</h2>
            {this._renderItems()}
         </div>
      );
   }
}


export default Form;
