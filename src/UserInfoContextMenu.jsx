import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class UserInfoContextMenu extends Component {
  constructor(props){
    super(props);

    this.onClickEditable  = this.onClickEditable.bind(this);
  }
  onClickEditable(event){
      this.props.onClickEditable(true);
  }
  render() {
    
    let {user, mainMenuText} = this.props;

    const inputText = mainMenuText;
    let indexOfPattern = inputText.indexOf('#');
    let textBeforePattern = inputText.substring(0, indexOfPattern);
    let textAfterPattern = inputText.substring(textBeforePattern.length, inputText.length);   
    let usernameText = textAfterPattern.substring(0, textAfterPattern.indexOf(' '));   
    let textAfterUsername = textAfterPattern.substring(usernameText.length, textAfterPattern.length);   

    return (
      <div> 
          <ContextMenuTrigger id={user.id}>
            <span  className="spanClassName" onClick={this.onClickEditable}>
                {textBeforePattern}
                  <a className="aClassName"  title={usernameText}>{usernameText}</a>
                {textAfterUsername}
            </span>
          </ContextMenuTrigger>
    
          <ContextMenu id={user.id}>
            <MenuItem data={{ item: user.skype }} onClick={this.handleClick}>
              {user.skype}
            </MenuItem>
            <MenuItem data={{ item: user.extension }} onClick={this.handleClick}>
              {user.extension}
            </MenuItem>
            <MenuItem divider />
            <MenuItem data={{ item: user.phone }} onClick={this.handleClick}>
              {user.phone}
            </MenuItem>
          </ContextMenu>
    
        </div>
    );
  }
}
UserInfoContextMenu.propTypes = {
  user: PropTypes.object.isRequired,
  mainMenuText: PropTypes.string.isRequired
};

export default UserInfoContextMenu;