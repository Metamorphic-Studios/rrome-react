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

   parseClass(){
      switch(this.state.type){
         case "TEXTAREA":
            return "textarea";
      }
   }

   render(){
      return (
<<<<<<< HEAD
         <FormControl style = {{display: 'flex'}}
            type={this.parseType()}
=======
         <FormControl style = {{display: 'flex', flexWrap: 'wrap'}}
            type={this.parseType()}   
            componentClass={this.parseClass()}
>>>>>>> 5c405413d6455a5fcfbcf20257509fda5c96fe38
            placeholder={this.state.placeholder} />            
      );
   }
}
