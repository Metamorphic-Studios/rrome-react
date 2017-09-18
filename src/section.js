import React, {
   Component
} from 'react'

import {
   FormControl
}  from 'react-bootstrap';

import Input from './items';
import List from './list';
import ForeignSelector from './foreignSelector';

class Section extends Component {
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

      if(this.props.struct !== newProps.struct){
         this.setState({
            content: {}
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
                  return(<List value = {(x.value) ? x.value : []} struct = {x} onChange={(evt) => {
                     this.mapChange(x.id, evt)
                  }}/>);
               case "FSELECT":
                  return(<ForeignSelector struct = {x}/>);
               default:
                  return(<Input type = {x.type} placeholder={x.label} onChange={(evt) => { this.mapChange(x.id, evt) }} value={x.value} />);
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
