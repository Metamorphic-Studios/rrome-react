import React, {
   Component
} from 'react';

import Form from './form';
import Table from './table';

export default class Editor extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         selectedItem: {},
         editing: false
      }
   }

   componentWillReceiveProps(newProps){
      if(this.props.struct.id !== newProps.struct.id){
         this.setState({
            editing: false,
            selectedItem: {}
         });
      }

      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }

   render(){
      if(!this.state.struct) return null;
      if(this.state.editing){
         return (<Form struct={this.state.struct} content={this.state.selectedItem} onBack={() => this.setState({editing: false}) }/>);
      }else{
         return (<Table struct={this.state.struct} onItemSelect={(item) => {
            this.setState({
               editing: true,
               selectedItem: item
            });
         }}
         onCreate={() => {
            this.setState({
               editing: true,
               selectedItem: {}
            });
         }}/>);
      }
   }
}
