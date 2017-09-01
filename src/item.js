import React, {
   Component
} from 'react';

import {
   FormControl,
   Button
} from 'react-bootstrap';

import ReactTable from 'react-table';
import 'react-table/react-table.css'

class Item extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }

   componentWillReceiveProps(newProps){
      if(this.props != newProps){
         this.setState({
            ...newProps
         });
      }
   }

   render(){
      switch(item.state.struct.type.toLowerCase()){
         case "text":
            return(
               <div style = {{display: 'flex', justifyContent: 'space-between', marginRight: 10, marginBottom: 10}}>
                  <label>{this.state.label}</label>
                  <FormControl
                     style={{marginleft: 10, width: 200, display: 'inline-block'}}
                     type="text"
                     placeholder={this.state.label}
                     onChange={(e) => {
                        this.props.onChange(this.state.struct.id, e.target.value)
                     }}/>
               </div>
         );
         default:
            return null;
      }
   }
}

export default Item;
