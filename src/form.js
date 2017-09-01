import React, {
   Component
} from 'react';


class Form extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props
      }
   }

   componenWillReceiveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps
         });
      }
   }

   saveForm(form){
      return fetch('http://localhost:3100/rrome/data/model/' + this.state.struct.id, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({
            blob: form
         })
      }).then((resp) => {
         return resp.json()
      });   
    }

   render(){
      return (
         <div style = {{display: 'flex', flex: 1, flexDirection: 'column', height: '50%'}}>
            <h2 style = {{backgroundColor: '#eee'}}>{this.state.struct.name}</h2>
            <Section struct = {this.state.struct} onSubmit = {(form) => {
               this.saveForm(form)
            }}/>
         </div>
      );
   }
}


export default Form;
