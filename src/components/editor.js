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

   onBack(){
      this.setState({editing: false});
      this.refreshEditor();
   }
   
   refreshEditor(){ 
      this.setState({refresh : true});
   }

   onEditorRefreshFinish(){
      this.setState({refresh : false});
   }

   render(){
      if(!this.state.struct) return null;
      if(this.state.editing){
         return (
            <Form  
               connector={this.state.connector}
               struct={this.state.struct}
               content={this.state.selectedItem}
               onBack={this.onBack.bind(this)}/>);
      }else{
         return (
            <Table
               connector={this.state.connector}
               refresh={this.state.refresh}
               onEditorRefresh={this.onEditorRefreshFinish.bind(this)}
               struct={this.state.struct}
               onItemSelect={(item) => {
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
               }}/>
         );
      }
   }
}
