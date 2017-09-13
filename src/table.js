import React, {
   Component
} from 'react';

import {
   FormControl,
   Button
} from 'react-bootstrap';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../styles/style.css';

class Table extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         data: []
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


   _render(){
         return this._renderViewer(); 
   }

   _renderViewer(){
      return (
      <div style={{flex:1, display: 'flex', flexDirection: 'column'}}>
         
         <div className = "tableHeader">{this.state.struct.name}</div>
         <div className = "tableContainer">
            <Button style={{alignSelf: 'flex-start', marginBottom : '10px'}} onClick={this.props.onCreate.bind(this)}>Create</Button>
            <ReactTable
            style={{flex: 1, display: 'flex'}}
            data={this.state.data}
            columns={(this.state.struct && this.state.struct["display_keys"]) ? this.state.struct["display_keys"].map((x) => ({ accessor: x.id, Header: x.label})) : []}
            getTdProps={(state, rowInfo, column, instance) => {
               return {
                  onClick: (e, handleOriginal) => {
                     if(this.props.onItemSelect){
                        this.props.onItemSelect(rowInfo.original);
                     } 
                  }
               }
            }}
            />
         </div>
      </div>
        );
   }

   render(){
      return (
        <div style = {{display: 'flex', flex: 1, flexDirection: 'column'}}>
            {this._render()}
            </div>
         );
   }
}

export default Table;
