import React, {
   Component,
   Modal
} from 'react'

export default class EditorModal extends Component{
   
   constructor(props){
      super(props);
      this.state({
         ...props,
         title : "",
         editingTitle : true 
      });
   }
   
   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.props = newProps;
         this.setState({
            ...newProps
         });
      }
   }
   
   _renderModalTitle(){
      if(editingTitle){
         return (
            <FormControl
               type="text"
               value={this.state.title}
               placeholder="Enter title"
               onChange={(e) => {this.setState({title : e.target.value})}}
            /> 
         );              
      }else{
         return (
         
         );
      }
   }

   _renderModal(){
       return (
         <Modal show={this.state.show}>
            <Modal.Header>
               <Modal.Title>{this._renderModalTitle()}</Modal.Title>
            </Modal.Header>
          </Modal>
       );
   }

   render(){
      return (
         {this._renderModal()}
      );
   }
}
