import React, { Component } from "react";
import { MentionsInput, Mention } from "react-mentions";
import PropTypes from "prop-types";
import defaultMentionStyle from "./defaultMentionStyle";
import users from "./data/dataSample";

import UserInfoContextMenu from "./UserInfoContextMenu";

const queryUsers = users.map((user, i) => {
  return {
    id: user.id,
    display: user.accountName
  };
});

const getUserByUsername = accountName => {
  if (accountName) {
    var user = users.find(item => item.id === accountName);
    return user;
  }
  return {};
};
class EditableTextMention extends Component {
  constructor(props) {
    super(props);

    this.state = {
      plainTextValue: "",
      mentionValue: "",
      isNeedMention: true,
      isEditableTextMention: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.renderSuggestion = this.renderSuggestion.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.textValueMentionKeyDown = this.textValueMentionKeyDown.bind(this);
    this.onClickEditable = this.onClickEditable.bind(this);
  }

  handleChange(event, newValue, newPlainTextValue, mentions) {
    this.setState({
      plainTextValue: newPlainTextValue,
      mentionValue: newValue
    });
  }

  renderSuggestion(entry, search, highlightedDisplay, index) {
    return null;
  }

  onAdd(id, display) {
    this.setState({
      isNeedMention: false
    });
  }

  textValueMentionKeyDown(event) {
    if (event.key === "Enter") {
      this.setState({
        isEditableTextMention: false
      });

      const { dataIndex } = this.props;
      console.log("dataIndex: " + dataIndex);
      this.props.onEventChange(
        true,
        event,
        dataIndex,
        this.state.mentionValue,
        this.state.plainTextValue
      );
    }
  }

  onClickEditable(event) {
    this.setState({
      isEditableTextMention: true
    });
    const { dataIndex } = this.props;
    this.props.onEventChange(
      false,
      event,
      dataIndex,
      this.state.mentionValue,
      this.state.plainTextValue
    );
  }

  componentDidMount() {
    const { mentionValueProps } = this.props;
    if (mentionValueProps) {
      this.setState({
        mentionValue: mentionValueProps
      });
    }
  }

  render() {
    const { isEditableTextMention, mentionValue } = this.state;
    const { newPlanTextValue } = this.props;

    let indexOfPattern = newPlanTextValue.indexOf("#");
    let textBeforePattern = newPlanTextValue.substring(0, indexOfPattern);
    let textAfterPattern = newPlanTextValue.substring(
      textBeforePattern.length,
      newPlanTextValue.length
    );
    let usernameText = textAfterPattern.substring(
      0,
      textAfterPattern.indexOf(" ")
    );
    let textAfterUsername = textAfterPattern.substring(
      usernameText.length,
      textAfterPattern.length
    );

    const getAccountName = usernameText.replace("#", "");
    const user = getUserByUsername(getAccountName);

    return (
      <div className="editableText">
        {isEditableTextMention ? (
          <MentionsInput
            className="mentions-user"
            value={mentionValue}
            onChange={this.handleChange}
            singleLine={true}
            allowSpaceInQuery
            onKeyDown={this.textValueMentionKeyDown}
            placeholder=""
            displayTransform={text => `#${text}`}
          >
            {this.state.isNeedMention ? (
              <Mention
                onAdd={this.onAdd}
                trigger="#"
                data={queryUsers}
                appendSpaceOnAdd={true}
                style={defaultMentionStyle}
              />
            ) : (
              <Mention trigger="#" data={[]} />
            )}
          </MentionsInput>
        ) : (
          <div>
            <span className="spanClassName" onClick={this.onClickEditable}>
              {textBeforePattern}
              <UserInfoContextMenu
                user={user}
                mainMenuText={usernameText}
                onClickEditable={this.onClickEditable}
              />
              {textAfterUsername}
            </span>
          </div>
        )}
      </div>
    );
  }
}
EditableTextMention.propTypes = {
  dataIndex: PropTypes.number.isRequired,
  mentionValue: PropTypes.string.isRequired,
  newPlanTextValue: PropTypes.string.isRequired
};

export default EditableTextMention;
