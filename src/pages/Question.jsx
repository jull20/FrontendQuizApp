import {OptionButton, AnswerBtnContent, SubmitButton, QuizThemeContent} from "../components/Button"
import { useState, useEffect } from 'react';

export default function Question({currTheme}){
    const [questionNum, setQuestionNum] = useState(0);
    const [activeBtn,  setActiveBtn]    = useState(false);
    const [correctBtn, setcorrectBtn]   = useState(false);
    const [wrongBtn,   setWrongBtn]     = useState(false);

    let handleNextQuestion = () => {
        if(questionNum < 9) setQuestionNum(questionNum+1);
    }
    let handleClick = (e) => {
        setActiveBtn(true);
        console.log(e.target)
    }
    let questionText = currTheme.questions[questionNum].question;
    let questionOptions = currTheme.questions[questionNum].options;
    let answer = currTheme.questions[questionNum].answer;
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
                {
                    questionOptions.map(option => (
                        <OptionButton handle={handleClick}>
                            <AnswerBtnContent letter={"A"}>{option}</AnswerBtnContent>
                        </OptionButton>
                    ))
                }
            </div>
            <button onClick={handleNextQuestion}>Next question</button>
        </main>
    )
}