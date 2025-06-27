import React, { useState, useContext } from 'react'
import type {questionsType, btnContentType, quizComponentType} from "../components/Types"
import {RadioButton} from "../components/Button"
import {ThemeContext} from "../App"

const optionBtnIcons = [
    <path className='svgLetterPath' d="M14.8898 26C14.7938 26 14.7038 25.964 14.6198 25.892C14.5478 25.82 14.5118 25.73 14.5118 25.622C14.5118 25.574 14.5238 25.52 14.5478 25.46L18.8858 13.85C18.9218 13.73 18.9878 13.628 19.0838 13.544C19.1918 13.448 19.3358 13.4 19.5158 13.4H21.4778C21.6578 13.4 21.7958 13.448 21.8918 13.544C21.9878 13.628 22.0598 13.73 22.1078 13.85L26.4458 25.46C26.4578 25.52 26.4638 25.574 26.4638 25.622C26.4638 25.73 26.4278 25.82 26.3558 25.892C26.2838 25.964 26.1998 26 26.1038 26H24.5378C24.3698 26 24.2438 25.964 24.1598 25.892C24.0878 25.808 24.0398 25.73 24.0158 25.658L23.1698 23.462H17.8238L16.9778 25.658C16.9538 25.73 16.8998 25.808 16.8158 25.892C16.7438 25.964 16.6238 26 16.4558 26H14.8898ZM18.4538 21.392H22.5398L20.4878 15.83L18.4538 21.392Z" fill="#626C7F"/>,
    <path className='svgLetterPath' d="M16.1661 26C16.0461 26 15.9441 25.958 15.8601 25.874C15.7761 25.79 15.7341 25.688 15.7341 25.568V13.85C15.7341 13.718 15.7761 13.61 15.8601 13.526C15.9441 13.442 16.0461 13.4 16.1661 13.4H21.3861C22.3581 13.4 23.1501 13.55 23.7621 13.85C24.3741 14.138 24.8241 14.54 25.1121 15.056C25.4121 15.572 25.5621 16.172 25.5621 16.856C25.5621 17.312 25.4781 17.714 25.3101 18.062C25.1541 18.398 24.9561 18.674 24.7161 18.89C24.4881 19.106 24.2601 19.274 24.0321 19.394C24.5001 19.61 24.9141 19.97 25.2741 20.474C25.6341 20.978 25.8141 21.578 25.8141 22.274C25.8141 22.994 25.6521 23.636 25.3281 24.2C25.0041 24.764 24.5241 25.208 23.8881 25.532C23.2521 25.844 22.4661 26 21.5301 26H16.1661ZM18.2361 24.092H21.2421C21.8901 24.092 22.3821 23.918 22.7181 23.57C23.0541 23.21 23.2221 22.778 23.2221 22.274C23.2221 21.746 23.0481 21.308 22.7001 20.96C22.3641 20.612 21.8781 20.438 21.2421 20.438H18.2361V24.092ZM18.2361 18.566H21.0621C21.6981 18.566 22.1721 18.416 22.4841 18.116C22.8081 17.804 22.9701 17.402 22.9701 16.91C22.9701 16.406 22.8081 16.016 22.4841 15.74C22.1721 15.452 21.6981 15.308 21.0621 15.308H18.2361V18.566Z" fill="#626C7F"/>,
    <path className='svgLetterPath' d="M20.6117 26.18C19.4957 26.18 18.5477 25.988 17.7677 25.604C16.9997 25.208 16.4117 24.65 16.0037 23.93C15.5957 23.198 15.3677 22.322 15.3197 21.302C15.3077 20.81 15.3017 20.282 15.3017 19.718C15.3017 19.154 15.3077 18.614 15.3197 18.098C15.3677 17.09 15.5957 16.22 16.0037 15.488C16.4237 14.756 17.0177 14.198 17.7857 13.814C18.5657 13.418 19.5077 13.22 20.6117 13.22C21.4277 13.22 22.1597 13.328 22.8077 13.544C23.4557 13.76 24.0077 14.06 24.4637 14.444C24.9197 14.816 25.2737 15.254 25.5257 15.758C25.7777 16.262 25.9097 16.808 25.9217 17.396C25.9337 17.504 25.8977 17.594 25.8137 17.666C25.7417 17.738 25.6517 17.774 25.5437 17.774H23.8337C23.7017 17.774 23.5937 17.744 23.5097 17.684C23.4257 17.612 23.3657 17.498 23.3297 17.342C23.1377 16.55 22.8077 16.01 22.3397 15.722C21.8717 15.434 21.2897 15.29 20.5937 15.29C19.7897 15.29 19.1477 15.518 18.6677 15.974C18.1877 16.418 17.9297 17.156 17.8937 18.188C17.8577 19.172 17.8577 20.18 17.8937 21.212C17.9297 22.244 18.1877 22.988 18.6677 23.444C19.1477 23.888 19.7897 24.11 20.5937 24.11C21.2897 24.11 21.8717 23.966 22.3397 23.678C22.8077 23.378 23.1377 22.838 23.3297 22.058C23.3657 21.89 23.4257 21.776 23.5097 21.716C23.5937 21.656 23.7017 21.626 23.8337 21.626H25.5437C25.6517 21.626 25.7417 21.662 25.8137 21.734C25.8977 21.806 25.9337 21.896 25.9217 22.004C25.9097 22.592 25.7777 23.138 25.5257 23.642C25.2737 24.146 24.9197 24.59 24.4637 24.974C24.0077 25.346 23.4557 25.64 22.8077 25.856C22.1597 26.072 21.4277 26.18 20.6117 26.18Z" fill="#626C7F"/>,
    <path className='svgLetterPath' d="M16.0079 26C15.8879 26 15.7859 25.958 15.7019 25.874C15.6179 25.79 15.5759 25.688 15.5759 25.568V13.85C15.5759 13.718 15.6179 13.61 15.7019 13.526C15.7859 13.442 15.8879 13.4 16.0079 13.4H20.3999C21.6119 13.4 22.6079 13.586 23.3879 13.958C24.1799 14.33 24.7739 14.882 25.1699 15.614C25.5779 16.346 25.7879 17.24 25.7999 18.296C25.8239 18.824 25.8359 19.292 25.8359 19.7C25.8359 20.108 25.8239 20.57 25.7999 21.086C25.7759 22.202 25.5719 23.126 25.1879 23.858C24.8039 24.578 24.2219 25.118 23.4419 25.478C22.6739 25.826 21.6899 26 20.4899 26H16.0079ZM18.0779 23.93H20.3999C21.0719 23.93 21.6179 23.834 22.0379 23.642C22.4579 23.45 22.7639 23.144 22.9559 22.724C23.1599 22.292 23.2679 21.728 23.2799 21.032C23.2919 20.672 23.2979 20.36 23.2979 20.096C23.3099 19.82 23.3099 19.55 23.2979 19.286C23.2979 19.01 23.2919 18.698 23.2799 18.35C23.2559 17.366 23.0099 16.64 22.5419 16.172C22.0739 15.704 21.3299 15.47 20.3099 15.47H18.0779V23.93Z" fill="#626C7F"/>
]

export default function Quiz({handleClickGoToScore, scoreIncrement}: quizComponentType){
    const [questionNum,         setQuestionNum]         = useState<number>(0);
    const [userChoise,          setUserChoise]          = useState<string>("");
    const [isRadioDisabled,     setIsRadioDisabled]     = useState<boolean>(false);
    const [isBtnNextQVisible,   setIsBtnNextQVisible]   = useState<boolean>(false);
    const [isBtnResultsVisible, setIsBtnResultsVisible] = useState<boolean>(false);
    const [isRadioSelected,     setIsRadioSelected]     = useState<boolean>(false);
    const [isErrorVisible,      setIsErrorVisible]      = useState<boolean>(false);
    const theme = useContext(ThemeContext);

    const tryGetTopic = localStorage.getItem("selectedTopic");
    let selectedTopic = tryGetTopic ? JSON.parse(tryGetTopic) : null;

    let optionBtnIconsIndex        = 0;
    let questionsAmount: number    = selectedTopic?.questions.length ?? 0,
        questions: questionsType[] = selectedTopic?.questions ?? [];

    const handleClickNextQuestion = () => {
        if(questionNum < questionsAmount-1) {
            setQuestionNum        (questionNum         => ++questionNum);
            setIsRadioDisabled      (isRadioDisabled       => !isRadioDisabled);
            setIsBtnNextQVisible(isBtnNextQVisible => !isBtnNextQVisible);
        }
    }

    const handleClickSubmitButton = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(isRadioSelected){
            setIsErrorVisible(false);
            let data = Object.fromEntries(new FormData(event.currentTarget))
            let userAnswer: string = String(data.answerOption)
            setUserChoise       (userAnswer)
            setIsRadioDisabled  (isRadioDisabled   => !isRadioDisabled);
            setIsBtnNextQVisible(isBtnNextQVisible => !isBtnNextQVisible);
            setIsRadioSelected  (false);
            if(userAnswer === questions[questionNum].answer) scoreIncrement();
            if(questionNum === questionsAmount-1) setIsBtnResultsVisible(true);
        }
        else{
            setIsErrorVisible(true);
            console.log("not selected")
        }
    }
    
    return (
        <main className="main">
            <div className="questionContainer">
                <div className="questionTextContainer">
                    <p className={"questionNum " + theme}>Question <span>{questionNum+1}</span> of 10</p>
                    <h1 className={'questionText ' + theme}>
                        {questions[questionNum].question}
                    </h1>
                </div>
                <div className="progressBarContainer">
                    <progress className={theme} id="progress-bar" value={questionNum+1} max="10"></progress>
                </div>
            </div>
            <div className="answerOptionsContainer">
                <form className='form' onSubmit={handleClickSubmitButton}>
                    <div className="buttonGroup quizPage">
                        {
                            questions[questionNum].options.map((option:string) => {
                                let answer = questions[questionNum].answer;
                                let btnContent: btnContentType = {text: option, icon: optionBtnIcons[optionBtnIconsIndex++]}
                                return (
                                    <RadioButton 
                                        key={option} 
                                        id={String(optionBtnIconsIndex)} 
                                        btnContent={btnContent} 
                                        isAnswer={answer === option}
                                        userChoise={userChoise}
                                        isRadioDisabled={isRadioDisabled}
                                        handleChange={() => setIsRadioSelected(true)}
                                    />
                                )
                            })
                        }
                    </div>
                    <button 
                        className={'btn serviceButton submit'} 
                        style={{
                            display: !isBtnNextQVisible ? "" : "none",
                            backgroundColor: isRadioSelected ? "#A729F5" : ""
                        }}
                    >Submit Answer</button> 
                </form>
                <div className="selectionError" style={{display: isErrorVisible ? "" : "none"}}>
                    <img className='iconState' src="./assets/images/icon-incorrect.svg" alt="icon-incorrect" />
                    <p className='textError'>Please select an answer</p>
                </div> 
                {
                    (isBtnResultsVisible)
                        ? <button className='btn serviceButton' onClick={handleClickGoToScore}>Results</button>
                        : <button className={'btn serviceButton'} style={{display: isBtnNextQVisible ? "" : "none"}} onClick={handleClickNextQuestion}>Next question</button>
                }
            </div>
        </main>
    )
}