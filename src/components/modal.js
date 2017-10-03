import React, {
   Component
} from 'react';

import{
   Modal,
   FormControl,
   Button,
   Label
} from 'react-bootstrap';

import Input from './items';

class FormModal extends Component{
   constructor(props){
      super(props);
      this.state = {
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

   renderFields(){
      return this.state.struct.map((x) => {
            return(<div><Label>{x}</Label><Input type = {x} placeholder = {'Enter' + x} /></div>);
      });
   }

   render(){
      return(
         <Modal show = {this.state.show}>
               <Modal.Header>
                  <Modal.Title>hold</Modal.Title>
               </Modal.Header>
            <Modal.Body>
               {this.renderFields()}
            </Modal.Body>
            <Modal.Footer>
               <Button> Save </Button>
               <Button onClick={this.state.onHide}>Close</Button>
            </Modal.Footer>
         </Modal>
      );
   }
}

export default FormModal;
