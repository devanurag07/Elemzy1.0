import produce from "immer";
import React from "react";
import { FormControl,TextField } from "@material-ui/core";

const ChoiceForm = ({ questionKey, choiceData, data, setData }) => {

    const updateChoiceValue = (e) => {
      const newState = produce(data, (draft) => {
        //   Going through assignment questions
        for (let question of draft.questions) {
        // Getting the right one
          if (question.key == questionKey) {
            
            // Looping through question choices
            for (let choice of question.choices) {

              if (choice.key == choiceData.key) {
                // Changing the state
                choice[e.target.name] = e.target.value;
              }
            }
          }
        }
      });
  
      setData(newState);
    };
  
    let choiceErrors = {};
    let qFormErrors = {};

    if (data.errors.qFormErrors) {
      qFormErrors = data.errors.qFormErrors;
  
      if (qFormErrors[questionKey]) {
        if (qFormErrors[questionKey]["choices"][choiceData.key]) {
          choiceErrors = qFormErrors[questionKey]["choices"][choiceData.key];
        }
      }
    }
  
    const hasError = (choiceErrors) => {
      if (choiceErrors.error) {
        return true;
      }
      return false;
    };
  
    const hasChoiceFieldErr=hasError(choiceErrors);
    
    return (
      <div className="choiceForm">
        <FormControl>
          <TextField
            value={choiceData.title}
            name="title"
            label="Choice"
            onChange={updateChoiceValue}
            error={hasChoiceFieldErr}
          />
        </FormControl>
      </div>
    );
  };


  export default ChoiceForm;