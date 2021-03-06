import React, {
   Component
} from 'react';

import Select from 'react-select';
import 'react-select/dist/react-select.css';
export default class ForeignSelector extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         options: [],
         value: (props.value) ? props.value : ''
      }
   } 

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }
   
   componentWillMount(){
      var id = this.state.struct["meta-type"].id
      this.state.connector.getDataByModel(id).then((options) => {
         var opt = options.map((x) => {
            return {
               value : x._id, 
               label: this.state.struct["meta-type"]["display_keys"].map((y) => {
                  return x[y];
               }).join(" ") 
            }
         });
         this.setState({
            options: opt
         });
      });
   }


   onChange(val){
      this.setState({value: val});
      if(this.props.onChange){
         this.props.onChange(val);
      }  
   }

   render(){
     return(
        <div style={this.props.style}>
         <Select
            name = ''
            searchable = {false}
            clearable = {false}
            placeholder = {this.state.struct.label}
            options = {this.state.options}
            value={this.state.value}
            onChange={this.onChange.bind(this)}
         />
        </div>
      );
   }
}
