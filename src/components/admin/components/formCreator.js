import React,{
   Component
} from 'react'

import {
   Button
} from 'react-bootstrap'

export default class FormCreator extends Component{

   constructor(props){
      super(props);
      this.state({
         ...props,
         addedSections: undefined
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
      var updatedSections = [];
      updatedSections.push(this.state.addedSections);
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
   
   }

   _renderForm(){
      return(
         if(addedSections){
            return(
               
               {this._renderSections}      
            );
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
