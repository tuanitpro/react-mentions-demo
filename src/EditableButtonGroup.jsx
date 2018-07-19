import React, {Component} from 'react'

import EditableTextSuggestion from './EditableTextSuggestion';
import EditableTextMention from './EditableTextMention';

let listEditableTextMentions = [];
class EditableButtonGroup extends Component{    
    constructor(props){
        super(props);
        
        this.state = {
            isEditableName: false,            
            isVisibleButtonPlus: true,
            nameValue: '',        
            isNeedMention: true
        }
        this.onClickButtonPlus = this.onClickButtonPlus.bind(this);
      
        this.mapEditableTextMention = this.mapEditableTextMention.bind(this);
        this.onChangeEditableTextMentionShowHideButtonPlus = this.onChangeEditableTextMentionShowHideButtonPlus.bind(this);
        this.onChangeEditableTextSuggestionShowHideButtonPlus = this.onChangeEditableTextSuggestionShowHideButtonPlus.bind(this);
    }
    mapEditableTextMention(item, index){
        return <EditableTextMention key={index} onEventChange={this.onChangeEditableTextMentionShowHideButtonPlus}/>
    }
    onChangeEditableTextMentionShowHideButtonPlus(isVisibleButtonPlus){
        this.setState({            
            isVisibleButtonPlus: isVisibleButtonPlus,            
        })        
    }
    onChangeEditableTextSuggestionShowHideButtonPlus(isVisibleButtonPlus, newValue){
        this.setState({            
            isVisibleButtonPlus: isVisibleButtonPlus,            
            isEditableName: ! isVisibleButtonPlus 
        })
 
        this.setState({
            nameValue: newValue
        })

    }

    onClickButtonPlus(event){
        let _isEditableName = false;
        let _isEditableMentionName = false;
        if(this.state.nameValue===''){
            _isEditableName = true;            
        }
        else{
            _isEditableMentionName = true;
            listEditableTextMentions.push(1);
        }

        this.setState({
            isEditableName: _isEditableName,
            isEditableMentionName: _isEditableMentionName,
            isVisibleButtonPlus: false
        })
      
    }
 
    
    render(){
        const {isEditableName, isEditableMentionName, isVisibleButtonPlus} = this.state;
        
        const displayListEditableMention = listEditableTextMentions.map(this.mapEditableTextMention);
        return(
            <div className="edit-button-group">
                <div className="button-plus">
                {isVisibleButtonPlus ?  <button onClick={this.onClickButtonPlus}>Add</button>:''}                
                </div>
               <EditableTextSuggestion isEditableTextSuggest={isEditableName} onEventChange={this.onChangeEditableTextSuggestionShowHideButtonPlus}/>
            
             {isEditableMentionName &&           
<div className="list-edit-mentions">
{displayListEditableMention}
             </div>    }
              
                
            </div>
        )
    }
}

export default EditableButtonGroup