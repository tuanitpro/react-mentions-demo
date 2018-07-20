import React, { Component } from "react";

import EditableTextSuggestion from "./EditableTextSuggestion";
import EditableTextMention from "./EditableTextMention";

class EditableButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditableName: false,
      isVisibleButtonPlus: true,
      nameValue: "",
      isNeedMention: true,
      listEditableTextMentions: []
    };
    this.onClickButtonPlus = this.onClickButtonPlus.bind(this);

    this.mapEditableTextMention = this.mapEditableTextMention.bind(this);
    this.onChangeEditableTextMentionShowHideButtonPlus = this.onChangeEditableTextMentionShowHideButtonPlus.bind(
      this
    );
    this.onChangeEditableTextSuggestionShowHideButtonPlus = this.onChangeEditableTextSuggestionShowHideButtonPlus.bind(
      this
    );
  }
  mapEditableTextMention(item, index) {
    return (
      <EditableTextMention
        key={index}
        mentionValue={item.mentionValue}
        newPlanTextValue={item.newPlanTextValue}
        dataIndex={index}
        onEventChange={this.onChangeEditableTextMentionShowHideButtonPlus}
      />
    );
  }

  onChangeEditableTextMentionShowHideButtonPlus(
    isVisibleButtonPlus,
    event,
    dataIndex,
    mentionValue,
    newPlanTextValue
  ) {
    const { listEditableTextMentions } = this.state;
    this.setState({
      isVisibleButtonPlus: isVisibleButtonPlus
    });
    if (event.key === "Enter") {
      listEditableTextMentions[dataIndex] = {
        mentionValue: mentionValue,
        newPlanTextValue: newPlanTextValue
      };
      if (newPlanTextValue === "") {
        listEditableTextMentions.splice(dataIndex, 1);
      }

      this.setState({
        listEditableTextMentions: listEditableTextMentions
      });
    }
  }

  onChangeEditableTextSuggestionShowHideButtonPlus(
    isVisibleButtonPlus,
    newValue
  ) {
    this.setState({
      isVisibleButtonPlus: isVisibleButtonPlus,
      isEditableName: !isVisibleButtonPlus
    });

    this.setState({
      nameValue: newValue
    });
  }

  onClickButtonPlus(event) {
    let _isEditableName = false;
    let _isEditableMentionName = false;
    const { listEditableTextMentions } = this.state;
    if (this.state.nameValue === "") {
      _isEditableName = true;
    } else {
      _isEditableMentionName = true;
      listEditableTextMentions.push({
        mentionValue: "",
        newPlanTextValue: ""
      });
    }

    this.setState({
      isEditableName: _isEditableName,
      isEditableMentionName: _isEditableMentionName,
      isVisibleButtonPlus: false,
      listEditableTextMentions: listEditableTextMentions
    });
  }

  render() {
    const {
      isEditableName,
      isEditableMentionName,
      isVisibleButtonPlus,
      listEditableTextMentions
    } = this.state;

    const displayListEditableMention = listEditableTextMentions.map(
      this.mapEditableTextMention
    );
    return (
      <div className="edit-button-group">
        <div className="button-plus">
          {isVisibleButtonPlus ? (
            <button className="btn-add" onClick={this.onClickButtonPlus}>
              +
            </button>
          ) : (
            <button className="btn-add" disabled>
              +
            </button>
          )}
        </div>
        <EditableTextSuggestion
          isEditableTextSuggest={isEditableName}
          onEventChange={this.onChangeEditableTextSuggestionShowHideButtonPlus}
        />

        {isEditableMentionName && (
          <div className="list-edit-mentions">{displayListEditableMention}</div>
        )}
      </div>
    );
  }
}

export default EditableButtonGroup;
