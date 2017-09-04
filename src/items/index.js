import React, {
   Component
} from 'react';

import {
   FormControl
} from 'react-bootstrap';

export default class Input extends Component {
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

   parseType(){
      switch(this.state.type){
         case "TEXT":
            return "text";
         case "DATE":
            return "date";
         case "NUMBER":
            return "number";
      }
   }

   render(){
      return (
         <FormControl
            type={this.parseType()}
            placeholder={this.state.placeholder} />
            
      );
   }
}
