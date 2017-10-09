import React,{
   Component
} from 'react'

import {
   Button
} from 'react-bootstrap'

export default class FormCreator extends Component{
   /*this.props.toggleModal() is the callback*/
   constructor(props){
      super(props);
      this.state({
         ...props,
         addedSections: [], 
         showModal: false
      });
   }

   componentWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }
   
   

   addSection(sect){
      var updatedSections = this.state.addedSections;
      updatedSections.push(sect);
      this.setState({
         addedSections : updatedSections
      });
   }

   _toggleModal(){
      this.setState({
         showModal : !this.state.showModal
      });
   }


   _renderSections(){
      return this.state.addedSections.map(x => {
      
      }); 
   }

   _renderForm(){
      return(
         {
            if(addedSections){
               this._renderSections();
            }
         }      
      );   
   }

   render(){
      return(
         <div>
            <h1>New form template</h1>
            {this._renderForm}
         </div>      
      );
   }
}


