import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import users from "./data/dataSample";
import UserInfoContextMenu from "./UserInfoContextMenu";

const getUserByUsername = accountName => {
  if (accountName) {
    var user = users.find(item => item.accountName === accountName);
    return user;
  }
  return {};
};

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : users.filter(
        user =>
          user.accountName.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestion => suggestion.accountName;

const renderSuggestion = suggestion => <div>{suggestion.accountName}</div>;

class EditableTextSuggestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      suggestions: [],
      isEditableTextSuggest: false
    };

    this.onClickEditable = this.onClickEditable.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }
  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onKeyPress(event) {
    const newValue = this.state.value;
    if (event.key === "Enter") {
      if (newValue) {
        this.props.onEventChange(true, newValue);
        this.setState({
          isEditableTextSuggest: false
        });
      }
    }
  }
  onBlur = (event, { highlightedSuggestion }) => {
    const newValue = event.target.value;
    if (newValue) {
      this.props.onEventChange(true, newValue);
      this.setState({
        isEditableTextSuggest: false
      });
    }
  };

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onClickEditable(event) {
    this.setState({
      isEditableTextSuggest: true
    });
    this.props.onEventChange(false, null);
  }
  render() {
    const { value, suggestions } = this.state;
    const { isEditableTextSuggest } = this.props;
    const inputProps = {
      placeholder: "Type a username",
      value,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onKeyPress: this.onKeyPress,
      autoFocus: "true"
    };
    const user = getUserByUsername(value);

    return (
      <div>
        {isEditableTextSuggest ? (
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
            focusInputOnSuggestionClick={true}
          />
        ) : (
          <UserInfoContextMenu
            user={user}
            mainMenuText={value}
            onClickEditable={this.onClickEditable}
          />
        )}
      </div>
    );
  }
}
export default EditableTextSuggestion;
