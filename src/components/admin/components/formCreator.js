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
      var updatedSections = this.state.addedSections;
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
      return this.state.addedSections.map(x => {
      
      }); 
   }

   _renderForm(){
      if(addedSections){

      }else{
         
      }
   }

   _renderTitle(){
      if(this.state.title == ""){
         return(<h1>New form template</h1>);
      }else{
         return(<h1>{this.state.title}</h1>);
      }
   }

   render(){
      return(
         <div>
            {this._renderTitle()}
            {this._renderForm()}
         </div>      
      );
   }
}


