import React, {
   Component
} from 'react';

import {
   FormControl
} from 'react-bootstrap';

export default class Number extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }

   render(){
      return (
         <FormControl
            type="number" />
            
      );
   }
}
