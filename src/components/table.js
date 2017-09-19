import React, {
   Component
} from 'react';

import {
   FormControl,
   Button
} from 'react-bootstrap';

import { getDataByModel } from '../utils/data';

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

   componentWillMount(){
      getDataByModel(this.state.struct.id).then((data) => {
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
         getDataByModel(newProps.struct.id).then((data) => {
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
         
         <div className = "tableHeader">
            <h2>{this.state.struct.name}</h2>
         </div>
         <div className = "tableContainer">
            <Button className = "btn btn-primary tableCreateButton" onClick={this.props.onCreate.bind(this)} >Create</Button>
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
