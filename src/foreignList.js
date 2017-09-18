import React, {
   Component
}from 'react';

import { ListGroup, ListGroupItem } from 'react-bootstrap';

export default class ForeignList extends Component{
   constructor(props){
      super(props);
      this.state = {
         ...props,
         data : []
      }
   }

   componentWillMount(){
      var id = this.state.struct["meta-type"].id;
      this.getData(id).then((data) => {
         var dat = data.map((x) => {
            return this.state.struct["meta-type"]["display_keys"].map((e) => {
               return x[e];
            });
         });
         this.setState({
            data : dat
         });
      });
   }

   getData(id){
      return fetch("http:localhost:3100/rrome/data/model/" + id).then((res) => {
         return res.json();
      });
   }

   _renderItems(){
      return this.state.data.map((x) => {
         return (<ListGroupItem>{x.firstName}</ListGroupItem>);
      });
   }
   

   render(){
      return (
         <ListGroup>
            {this._renderItems()}
         </ListGroup>
      ); 
   }
}
