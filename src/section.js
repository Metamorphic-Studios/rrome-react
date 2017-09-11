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
                  return(<List value = {[['foo', 'bar'],['bar', 'foo']]} struct = {x}/>);
               default:
                  return(<Input type = {x.type} placeholder={x.label} onChange={(evt) => { this.mapChange(x.id, evt) }}/>);
            }
      });
   }

   render(){
      return(
         <div style = {{display: 'flex', flexDirection: (this.state.horizontal) ? 'row' : 'column', width: '80%', alignSelf: 'center', flexWrap: 'wrap'}}>
            {this._renderItems()}
         </div>
      );
   }
}

export default Section;
