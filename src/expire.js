import React,{
   Component
} from 'react'

var moment = require('moment');

class ExpiringDate extends Component{
   constructor(props){
      super(props)
      this.state={
         ...props
      }
   }

   componentWillRecieveProps(newProps){
      if(this.props !== newProps){
         this.setState({
            ...newProps   
         });
      }
   }

   _render(){
      var date = new Date(this.state.value);
      var m = moment(date);
      if(date.getTime() < Date.now()){
         return(
            <div>Expires on {m.format('DD/MM/YYYY')} </div>        
         );  
      }
      else{
         return(
            <div style = {{fontColor: 'red'}}>
               Expired on {m.format('DD/MM/YYYY')} </div>
         );  
      }
   }

   render(){
      return(
            {this._render()}       
         );
   }
}


export default ExpiringDate
