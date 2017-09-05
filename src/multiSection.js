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
         return(<Section horizontal = {false} struct = {x}/>);
      });  
   }

   render(){
      return (
            <div style = {{display: 'flex', flex: 1, flexDirection: 'row'}}>
               {this._renderSections()}
            </div>
         );
   }
}

export default MultiSection;
