import React, {Component} from 'react';
import Autosuggest from 'react-autosuggest';
import users from './data/dataSample';
import UserInfoContextMenu from './UserInfoContextMenu';

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
  
    return inputLength === 0 ? [] : users.filter(user =>
      user.accountName.toLowerCase().slice(0, inputLength) === inputValue
    );
  };
  
const getSuggestionValue = suggestion => suggestion.accountName;

const renderSuggestion = suggestion => (
  <div>
    {suggestion.accountName}
  </div>
);

class EditableTextSuggestion extends Component{
    constructor(props) {
        super(props);     
        this.state = {
          value: '',
          suggestions: [],
          isEditableTextSuggest: false
        };

        this.onClickEditable = this.onClickEditable.bind(this);
      }
      onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });        
      };
      onBlur = (event, { highlightedSuggestion  }) => {       
        this.setState({
            isEditableTextSuggest: false
          });      
          const newValue = event.target.value;
          this.props.onEventChange(true, newValue);  
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
    
      onClickEditable(event){
        this.setState({                      
            isEditableTextSuggest: true,             
        })
        this.props.onEventChange(false, null);  
     }
      render() {
        const { value, suggestions } = this.state;
        let {isEditableTextSuggest} = this.props;
        const inputProps = {
          placeholder: 'Type a username',
          value,
          onChange: this.onChange,
          onBlur : this.onBlur 
        };                
        let user = {
          skype: value,
          extension: '123456',
          phone: '123',
          name: value,
          id: Math.random().toString()
        };
        return (
            <div>
            {isEditableTextSuggest ?
                <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
              />:  
              <UserInfoContextMenu user={user} mainMenuText={value} onClickEditable={this.onClickEditable}  />
            }
            </div>
        );
    }
}
export default EditableTextSuggestion