import React, {
   Component
} from 'react';

import 'react-table/react-table.css'

class Menu extends Component {
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

   _renderList(){
      return this.state.menu.map((x) => {
         return(
            <li onClick={this.state.onPress.bind(this, x.id)} style = {this.state.itemStyle}>
               {this.props.renderItem(x, name)}
            </li>
         )
      });
   }

   render(){
      return (
         <div style = {this.state.style}>      
            <ul style = {this.state.containerStyle}>
               {this._renderList()}
            </ul>
         </div>
      );
   }
}

export default Menu;
