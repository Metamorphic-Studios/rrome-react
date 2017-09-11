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

   handleChange(evt){
      if(this.props.onChange){
         this.props.onChange(evt.target.value);
      }
   }

   render(){
      return (
         <FormControl style = {{display: 'flex', margin: '2px'}}
            type={this.parseType()}
            componentClass={this.parseClass()}
            placeholder={this.state.placeholder}
            onChange={this.handleChange.bind(this)}/>            
      );
   }
}
