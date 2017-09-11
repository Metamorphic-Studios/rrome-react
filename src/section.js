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

   componentWillReceiveProps(newProps){
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
                  return(<List value = {[['foo', 'bar'],['bar', 'foo']]} struct = {x}/>);
               default:
                  return(<Input type = {x.type} placeholder={x.label} />);
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
