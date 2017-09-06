import React, {
   Component
} from 'react';

import{
   Modal,
   FormControl,
   Button
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
            return(<Input type = {x} placeholder = {x} />);
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
               <Button onClick={this.state.onHide}>Close</Button>
            </Modal.Footer>
         </Modal>
      );
   }
}

export default FormModal;
