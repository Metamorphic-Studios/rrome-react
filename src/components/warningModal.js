import React, {
   Component
}from 'react';

import{
   Modal,
   Button
}from 'react-bootstrap';

//a simple warning true/false returning modal for if you havnt saved something
class WarnModal extends Component {
   constructor(props){
      super(props);
      console.log('modal created');
      this.state = {
         ...props
      }
   }
   
   componentWillReceiveProps(newProps){
      if(this.state.props !== newProps){
         console.log('props changing');
         this.setState({
            ...newProps
         });
      }
   }

   quit(){
      console.log('modal quit');
      this.props.quitWarningModal();  
   }
   
   saveQuit(){
      console.log('modal savequit');
      this.props.saveWarningModal();
   }

   goBack(){
      console.log('modal goback');
      this.props.leaveWarningModal();
   }

   render(){
      return(
      <div>
         <Modal show = {this.state.showModal}>
            <Modal.Header>
               <Modal.Title>Unsaved changes! Are you sure you want to quit?</Modal.Title>
            </Modal.Header>
            <Modal.Body style = {{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
               <Button onClick = {() => {this.goBack()}}>No</Button>
               <Button onClick = {() => {this.quit()}}>Yes</Button>
               <Button onClick = {() => {this.saveQuit()}}>Save and quit</Button>
            </Modal.Body>
         </Modal>
      </div>   
      );
   }
}


export default WarnModal;
