import React, {Component} from 'react';
import { MentionsInput, Mention } from 'react-mentions';
import defaultStyle from './defaultStyle';
import defaultMentionStyle from './defaultMentionStyle';
import users from './data/dataSample';
import { merge } from 'lodash';
import UserInfoContextMenu from './UserInfoContextMenu';

import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const style = merge({}, defaultStyle, {
    suggestions: {
      list: {
        maxHeight: 100,
        overflow: 'auto',
        position: 'absolute',
        bottom: 14,
      },
    },
  })

const queryUsers = users.map((user, i)=>{
    return {
      id: user.id,
      display: user.accountName,
    };
  });

 
class EditableTextMention extends Component{
    constructor(props){
        super(props);
        
        this.state = {                     
            plainTextValue: '',
            mentionValue: '',
            isNeedMention: true,
            isEditableTextMention: true
        }
       
        this.handleChange = this.handleChange.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.textValueMentionKeyDown = this.textValueMentionKeyDown.bind(this);
        this.onClickEditable = this.onClickEditable.bind(this);
        this.textValueMentionOnBlur = this.textValueMentionOnBlur.bind(this);
    }
    handleChange(event, newValue, newPlainTextValue, mentions) {  
        this.setState({
            plainTextValue: newPlainTextValue,    
            mentionValue: newValue     
        })      
        
     }
     renderSuggestion (entry, search, highlightedDisplay, index){
         return null;
     }
     onAdd(id, display){    
       this.setState({        
         isNeedMention : false
       })
       
     }
     textValueMentionKeyDown(event){
        if(event.key === 'Enter'){
        this.setState({                      
            isEditableTextMention: false,             
        })           
        this.props.onEventChange(true);  
       
        }
     }
     textValueMentionOnBlur(event){
       this.setState({                      
        isEditableTextMention: false,             
        })      
      this.props.onEventChange(true);  
     }
     onClickEditable(event){
        this.setState({                      
            isEditableTextMention: true,             
        })  
        this.props.onEventChange(false);  
     }
     
    render(){
        const {mentionValue, plainTextValue, isEditableTextMention} = this.state;
        const inputText = plainTextValue;
        let indexOfPattern = inputText.indexOf('#');
        let textBeforePattern = inputText.substring(0, indexOfPattern);
        let textAfterPattern = inputText.substring(textBeforePattern.length, inputText.length);   
        let usernameText = textAfterPattern.substring(0, textAfterPattern.indexOf(' '));   
        let textAfterUsername = textAfterPattern.substring(usernameText.length, textAfterPattern.length);   

        let user = {
          skype: usernameText,
          extension: '123456',
          phone: '123',
          name: usernameText,
          id: Math.random().toString()
        };
        return(
            <div className="editableText">
              {isEditableTextMention ?
                  <MentionsInput
                  style={style}
                  value={mentionValue}
                  onChange={this.handleChange}                  
                  singleLine={true}
                  allowSpaceInQuery
                  onKeyDown={this.textValueMentionKeyDown}         
                         
                  placeholder="Mention any user by typing `#` followed by at least one char"
                  displayTransform={text => `#${text}`}
                >
                {this.state.isNeedMention ?  <Mention onAdd={this.onAdd} trigger="#" data={queryUsers} appendSpaceOnAdd={true}   style={defaultMentionStyle} />: <Mention  trigger="#" data={[]}    style={defaultMentionStyle} />}
               
                </MentionsInput>
              :                         
              <UserInfoContextMenu user={user} mainMenuText={plainTextValue} onClickEditable={this.onClickEditable}  />                     
            }               
           </div>
        )
    }
}
export default EditableTextMention