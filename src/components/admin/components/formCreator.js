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
         addedSections: [],
         showModal: false,
         title: ""
      });
   }
   
   exportVals(){
   
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

   toggleModal(){
      this.setState({
         showModal : !this.state.showModal
      });
   }

   _renderSections(){
      return this.state.addedSections.map((x) => {
         
      });
   }

   _renderForm(){
      return(
         {if(addedSections){
            return(
               {this._renderSections}      
            );
         }
         else{
         
         }
         }      
      );   
   }

   render(){
      return(
         <div>
            {if(this.state.title == ""){<h1>New form template</h1>}
            else{<h1>{this.state.title}</h1>}
            }
            {this._renderForm}
         </div>      
      );
   }

}
