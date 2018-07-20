import React, { Component } from "react";
import PropTypes from "prop-types";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class UserInfoContextMenu extends Component {
  constructor(props) {
    super(props);

    this.onClickEditable = this.onClickEditable.bind(this);
  }
  onClickEditable(event) {
    this.props.onClickEditable(true);
  }
  render() {
    const { user, mainMenuText } = this.props;
    return (
      <span>
        {mainMenuText !== "" && (
          <span>
            <ContextMenuTrigger id={user.id}>
              <a
                className="aClassName"
                title={mainMenuText}
                onClick={this.onClickEditable}
              >
                {mainMenuText}
              </a>
            </ContextMenuTrigger>
            <ContextMenu id={user.id}>
              <MenuItem data={{ item: user.skype }} onClick={this.handleClick}>
                {user.skype}
              </MenuItem>
              <MenuItem
                data={{ item: user.extension }}
                onClick={this.handleClick}
              >
                {user.extension}
              </MenuItem>
              <MenuItem data={{ item: user.phone }} onClick={this.handleClick}>
                {user.phone}
              </MenuItem>
            </ContextMenu>
          </span>
        )}
      </span>
    );
  }
}
UserInfoContextMenu.propTypes = {
  user: PropTypes.object.isRequired,
  mainMenuText: PropTypes.string.isRequired
};

export default UserInfoContextMenu;
