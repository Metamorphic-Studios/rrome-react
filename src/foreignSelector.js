import React, {
   Component
} from 'react';

import Select from 'react-select';

export default class ForeignSelector extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         selectELem: false
      }
   } 

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }
   
   getOptions(){
      
   }

   render(){
      <Select
         name = "some-holder-value"
         value = "one"
      />
   }
}
