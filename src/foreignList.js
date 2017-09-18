import React, {
   Component
}from 'react';

export default class ForeignList extends Component{
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }
}
