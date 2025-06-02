import {OptionButton, AnswerBtnContent, SubmitButton, QuizThemeContent} from "../components/Button"
import { useState, useEffect } from 'react';

export default function Question({quizName}){
    const [questionNum, setQuestionNum] = useState(0);

    // console.log(quizName.props.name)
    // quizName = quizName.props.name;
    quizName = "HTML"
    // let title = JSON.parse(localStorage.getItem(quizName)).title
    // console.log(title)
    let handleNextQuestion = () => {
        if(questionNum < 9) setQuestionNum(questionNum+1);
    }
    let handleSelectBtn = () => {

    }

    let data = JSON.parse(localStorage.getItem(quizName)).questions[questionNum];

    let questionText = data.question;
    let questionOptions = data.options;
    let answer = data.answer;
    return (
        <main className="main">
            <div className="questionContainer">
                <div className="questionTextContainer">
                    <p className="questionNum">Question <span>{questionNum+1}</span> of 10</p>
                    <h1 className='questionText'>
                        {questionText}
                    </h1>
                </div>
                <div className="progressBarContainer">
                    <progress id="progress-bar" value={questionNum+1} max="10"></progress>
                </div>
            </div>
            <div className="buttonGroup">
                <OptionButton>
                    <AnswerBtnContent letter={"A"}>{questionOptions[0]}</AnswerBtnContent>
                </OptionButton>
                <OptionButton>
                    <AnswerBtnContent letter={"B"}>{questionOptions[1]}</AnswerBtnContent>
                </OptionButton>
                <OptionButton>
                    <AnswerBtnContent letter={"C"}>{questionOptions[2]}</AnswerBtnContent>
                </OptionButton>
                <OptionButton>
                    <AnswerBtnContent letter={"D"}>{questionOptions[3]}</AnswerBtnContent>
                </OptionButton>
            </div>
            <button onClick={handleNextQuestion}>Next question</button>
        </main>
    )
}