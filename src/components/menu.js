import React, {
   Component
} from 'react';

import 'react-table/react-table.css'
import '../../style.css'

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
            <li className="menu-item" onClick={this.state.onPress.bind(this, x.id)} style = {this.state.itemStyle}>
               <div className="menu-inner-item">
               {x.name}
               </div>
            </li>
         )
      });
   }

   render(){
      return (
         <div style = {this.state.style} className="menu-container">      
            <ul style = {this.state.containerStyle} className="menu-list">
               {this._renderList()}
            </ul>
         </div>
      );
   }
}

export default Menu;
