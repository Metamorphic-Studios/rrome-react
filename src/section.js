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
      }
   }

   componentWillReceieveProps(newProps){
      if(this.state.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }

   _renderItems(){
      return this.state.struct.map((x) => {
            switch(x.type){
               case "LIST":
                  return(<List value = {[['foo', 'bar'],['bar', 'foo']]} struct = {x['meta-type']}/>);
               default:
                  return(<Input type = {x.type} placeholder={x.label} />);
            }
      });
   }

   render(){
      return(
         <div style = {{display: 'flex', flex: 1, flexDirection: (this.state.horizontal) ? 'row' : 'column', width: '80%', alignSelf: 'center'}}>
            <h2 style = {{backgroundColor: '#eee'}}>{this.state.struct.name}</h2>
            {this._renderItems()}
         </div>
      );
   }
}

export default Section;
