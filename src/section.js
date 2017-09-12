import React, {
   Component
} from 'react'

import {
   FormControl
}  from 'react-bootstrap';

import Input from './items';
import List from './list';

class Section extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         content: {}
      }
   }

   componentWillReceiveProps(newProps){
      if(this.state.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }

   mapChange(id, val){
      var change = {};
      change[id] = val;
      
      var content = {
         ...this.state.content,
         ...change
      }
      this.setState({
         content:content
      });

      if(this.props.onChange){
         this.props.onChange(content);
      }
   }

   _renderItems(){
      return this.state.struct.map((x) => {
            switch(x.type){
               case "LIST":
                  return(<List value = {(this.state.content[x.id]) ? this.state.content[x.id] : []} struct = {x} onChange={(evt) => { 
                     this.mapChange(x.id, evt)
                  }}/>);
               default:
                  return(<Input type = {x.type} placeholder={x.label} onChange={(evt) => { this.mapChange(x.id, evt) }}/>);
            }
      });
   }

   render(){
      return(
         <div style = {{display: 'flex', flexDirection: (this.state.horizontal) ? 'row' : 'column', width: '80%', justifyContent: 'flex-start', flexWrap: 'wrap', flex: 1}}>
            {this._renderItems()}
         </div>
      );
   }
}

export default Section;
