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
         initialValue: '',
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
      this.setState({value: evt.target.value});
      if(this.props.onChange){
         this.props.onChange(evt.target.value);
      }
   }

   render(){
      return (
         <FormControl style = {{display: 'flex', margin: '2px', resize: 'none', width: '100%'}}
            type={this.parseType()}
            componentClass={this.parseClass()}
            placeholder={this.state.placeholder}
            value={(this.state.value) ? this.state.value : this.state.initialValue}
            onChange={this.handleChange.bind(this)}/>            
      );
   }
}
