import React, {
   Component
} from 'react';


import Section from './section';

class MultiSection extends Component {
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

   _renderSections(){
      return this.state.sections.map((x) => {
         return(<Section inMulti = {true} struct = {x} onChange={this.props.onChange.bind(this)}/>);
      });  
   }

   render(){
      return (
            <div style = {{display: 'flex', flexDirection: 'row', width: '80%', margin: '10px'}}>
               {this._renderSections()}
            </div>
         );
   }
}

export default MultiSection;
