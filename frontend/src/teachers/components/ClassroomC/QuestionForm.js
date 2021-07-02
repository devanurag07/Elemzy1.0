import produce from "immer";
import React, { useEffect } from "react";
import { FormControl, Button, makeStyles, TextField } from "@material-ui/core";
import ChoiceForm from "./ChoiceForm";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: "1em",
    paddingBottom: "1em",

    "& .MuiFormLabel-root": {
      fontSize: "12px",
      fontWeight: "405",
    },

    "& .choiceForm": {
      paddingLeft: "1em",
    },
  },
}));

const QuestionForm = ({ questionFormData, data, setData }) => {
  const classes = useStyles();

  const handleChange = (e) => {
    const newData = produce(data, (draft) => {
      for (let question of draft.questions) {
        if (question.key === questionFormData.key) {
          question[e.currentTarget.name] = e.target.value;
        }
      }

      return draft;
    });

    setData(newData);
  };

  const addChoice = () => {
    const newState = produce(data, (draft) => {
      for (let question of draft.questions) {
        if (question.key == questionFormData.key) {
          // Pushing the choice
          question.choices.push({
            key: question.choices.length,
            title: "",
          });
        }
      }
    });

    setData(newState);
  };

  let qFormErrors = {};

  if (data.errors.qFormErrors) {
    qFormErrors = data.errors.qFormErrors;
  }

  const hasError = (questionFormKey, qFormErrors, fieldType) => {
    if (qFormErrors[questionFormKey]) {
      if (qFormErrors[questionFormKey][fieldType].error) {
        return true;
      }
      return false;
    }
    return false;
  };

  const questionNumber = questionFormData.key;

  const hasQuestionFieldErr = hasError(
    questionFormData.key,
    qFormErrors,
    "question"
  );
  const questionFieldErrMsg = hasQuestionFieldErr
    ? qFormErrors[questionNumber]["question"].msg
    : "";

  const hasAnswerFieldErr = hasError(
    questionFormData.key,
    qFormErrors,
    "answer"
  );
  const answerFieldErrMsg = hasAnswerFieldErr
    ? qFormErrors[questionNumber]["answer"].msg
    : "";

  return (
    <div className={`question-form ${classes.root}`}>
      <FormControl>
        <TextField
          label="Question"
          onChange={handleChange}
          name="question"
          value={questionFormData.question}
          //Error handling
          error={hasQuestionFieldErr}
          helperText={questionFieldErrMsg}
          variant="outlined"
          size="small"
        />
      </FormControl>

      <FormControl>
        <TextField
          label="Answer"
          onChange={handleChange}
          name="answer"
          value={questionFormData.answer}
          //Error handling
          error={hasAnswerFieldErr}
          helperText={answerFieldErrMsg}
          variant="outlined"
          size="small"
        />
      </FormControl>

      {questionFormData.choices.map((choice) => {
        return (
          <ChoiceForm
            questionKey={questionNumber}
            choiceData={choice}
            data={data}
            setData={setData}
          />
        );
      })}

      <Button
        onClick={addChoice}
        variant="outlined"
        color="primary"
        size="small"
      >
        Add Choice
      </Button>
    </div>
  );
};

export default QuestionForm;
