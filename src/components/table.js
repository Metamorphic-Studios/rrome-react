import React, {
   Component
} from 'react';

import {
   FormControl,
   Button
} from 'react-bootstrap';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import '../../styles/style.css';
import '../../styles/table.css';
var async = require('async');
var utils = require('../utils');

class Table extends Component {
   constructor(props){
      super(props);
      this.state = {
         ...props,
         data: [],
         origData: []
      }
   }

   componentDidMount(){
      this.state.connector.getDataByModel(this.state.struct.id).then((data) => {
         this.lookupItemData(data);
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
            this.lookupItemData(data);
         }); 
      }

      if(newProps.refresh == true){
         getDataByModel(this.state.struct.id).then((data) => { 
            this.lookupItemData(data);
         }); 
         newProps.onEditorRefresh();
      }
   }


   lookupItemData(data){
      this.setState({origData: data});
      async.map(data, (item, cb) => {
         async.map(utils.flatten(this.state.struct.model), (modelElement, callback) => {
            if(modelElement.type == "FSELECT"){
               var id = item[modelElement.id];
               if(id){
                  this.state.connector.getDataById(id).then((res) => {
                     var e =  modelElement["meta-type"]["display_keys"].map((key) => {
                        return res[key];
                     }).join(" ");
                     callback(null, {key: modelElement.id, value: e});
                  });
               }else{
                  callback(null, {key: modelElement.id, value: ''});
               }
            }else{
               callback(null, {key: modelElement.id, value: item[modelElement.id]});
            }
         }, (err, results) => {
            var obj = {};
            for(var i = 0; i< results.length; i++){
               if(results[i].value){
                  obj[results[i].key] = results[i].value;
               }
            }
            obj["_id"] = item["_id"];
            cb(err, obj);
         })
      }, (err, results) => {
         if(!err){
             this.setState({data : results}); 
         }
      });  
   }

   _render(){
         return this._renderViewer(); 
   }

   createTableButtonClick(){
      this.props.onCreate();
   }


   _getTd(state, rowInfo, column, instance){
      return {
         onClick: (e, handleOriginal) => {
            if(this.props.onItemSelect){
               for(var i = 0; i < this.state.data.length; i++){
                  if(rowInfo.original["_id"] == this.state.data[i]["_id"]){
                     this.props.onItemSelect(this.state.origData[i]);
                     break;
                  }
               }
            } 
         }
      }
   }

   _renderViewer(){
      return (
      <div style={{flex:1, display: 'flex', flexDirection: 'column'}}>
         
         <div className = "tableHeader">
            <h2>{this.state.struct.name}</h2>
         </div>
         <div className = "tableContainer">
            <Button className = "btn btn-primary tableCreateButton" onClick={this.createTableButtonClick.bind(this)} >Create</Button>
            <ReactTable
            style={{flex: 1, display: 'flex'}}
            data={this.state.data}
            columns={(this.state.struct && this.state.struct["display_keys"]) ? this.state.struct["display_keys"].map((x) => ({ accessor: x.id, Header: x.label})) : []}
            getTdProps={this._getTd.bind(this)}
            />
         </div>
      </div>
        );
   }

   render(){
      return (
        <div style = {{display: 'flex', height : '100%', flex: 1, flexDirection: 'column'}}>
            {this._render()}
         </div>
      );
   }
}

export default Table;
