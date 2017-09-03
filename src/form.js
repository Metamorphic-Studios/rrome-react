import React, {
   Component
} from 'react';

import { 
   FormControl
} from 'react-bootstrap';

import Text from './items/text';
import Date from './items/date';
import Number from './items/number';

class Form extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }

   componenWillReceiveProps(newProps){
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
      var items = [];
      console.log(this.state.struct.model);
      for(var k in this.state.struct.model){
         var item = this.state.struct.model[k];
         console.log(item);
         switch(item.type){
            case "TEXT":
               items.push(<Text />);
               break;
            case "DATE":
               items.push(<Date />);
               break;
            case "NUMBER":
               items.push(<Number />);
               break;
         }
      }
      console.log(items);
      return items;
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
