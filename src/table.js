import React, {
   Component
} from 'react';

import {
   FormControl,
   Button
} from 'react-bootstrap';

import ReactTable from 'react-table';
import 'react-table/react-table.css';

class Table extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         data: [],
         view: 'viewer'
      }
   }

   getData(id){
      return fetch('http://localhost:3100/rrome/data/model/' + id).then((resp) => {
         return resp.json();
      });
   }

   componentWillMount(){
      this.getData(this.state.struct.id).then((data) => {
         this.setState({
            data: data
         });
      });
   }

   componentWillReceiveProps(newProps){
      if(this.props != newProps){
         this.setState({
            ...newProps
         });
      }

      if(newProps.struct.id !== this.props.struct.id){
         this.getData(newProps.struct.id).then((data) => {
            this.setState({
               data: data
            });
         });
      }
   }

   mapKeys(item){
      return this.state.struct["display_keys"].map((x) => {
         return item[x];
      });
   }

   _renderItem(){
      return this.state.data.map((x) => {
        return(
            <li>
            {this.mapKeys(x)}
            </li>
         ) 
      })
   }

   _render(){
      if(this.state.view == 'editor'){
         return this._renderEditor();
      }
      else{
         return this._renderViewer();
      }
   }

   _renderViewer(){
      return (
        <ReactTable
         style={{flex: 1, display: 'flex'}}
         data={this.state.data}
         columns={
            this.state.struct["display_keys"].map((x) =>
                  ({
               accessor: x,
               Header: x
            })
            )
         } />
        );
   }

   _renderEditor(){
      return(
         <Form struct = {this.state.struct} />      
      );
   }

   render(){
      return (
        <div style = {{display: 'flex', flex: 1, flexDirection: 'column'}}>
         <div style = {{display: 'flex', flex: 0.25, flexDirection: 'columm', alignItems: 'flex-start'}}>
            <h2>{this.state.struct.name}</h2>
            <Button bsStyle = "info" onClick={() => this.setState({view: 'editor'}) }>Add new {this.state.struct.name}</Button>
            </div>
            {this._render()}
            </div>
         );
   }
}

export default Table;
