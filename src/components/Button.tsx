import { useContext, type JSXElementConstructor } from "react";
import type {btnContentType, radioButtonType} from "./Types"
import {ThemeContext} from "../App"


export function Button(props: {btnContent: btnContentType, handleClick: (btnContent:btnContentType) => void}){
    const theme = useContext(ThemeContext);
    let btnContent: btnContentType = props.btnContent,
        handleClick = props.handleClick;
    return (
        <button className={"btn optionButton " + theme} onClick={()=>handleClick(btnContent)}>
            <ButtonContent content={btnContent} />
        </button>
    )
}

export function ButtonContent({content}: {content: btnContentType}){
    const theme = useContext(ThemeContext);
    let img = null;
    const typeOfIcon: Array<string> = ["html", "css", "javascript", "accessibility"]
    if(typeof content.icon === "string") img = <img src={content.icon} alt="option answer icon"/>
    else img = <>
                <svg fill="none" viewBox="0 0 40 40">
                    <path className="svgBgPath" d="M0 6C0 2.68629 2.68629 0 6 0H34C37.3137 0 40 2.68629 40 6V34C40 37.3137 37.3137 40 34 40H6C2.68629 40 0 37.3137 0 34V6Z"/>
                    {content.icon}
                </svg>
               </>
    return(
        <div className={"content " + theme}>
            {
                content.text 
                ? <>
                    <div className={"iconContainer " + (typeOfIcon.includes(content.text.toLowerCase()) ? content.text.toLowerCase() : "") }>
                       {img}
                    </div>
                    <p>{content.text}</p>
                </>
                : <></>
            }
        </div>
    )
}

export function RadioButton({btnContent, id, isAnswer, userChoise, isRadioDisabled, handleChange}: radioButtonType){
    const theme = useContext(ThemeContext);
    let isSelected = userChoise === btnContent.text;
    let disabled = {"disabled": isRadioDisabled};
    let style: string = theme;
    let answerStateUrl = "null";
    const userAnswerCorrect: string = " chosenAnswerIsCorrect",
          userAnswerWrong: string   = " chosenAnswerIsWrong",
          answerCorrect: string     = " correctAnswer";
    if(isSelected){
        style += (isAnswer) ? userAnswerCorrect : userAnswerWrong;
        answerStateUrl = (isAnswer) ? "./assets/images/icon-correct.svg" : "./assets/images/icon-incorrect.svg";
    }
    else if(isAnswer){
        style += answerCorrect;
        answerStateUrl = "./assets/images/icon-correct.svg";
    }
    
    return (
        <label onChange={handleChange} className={"radio " + style} >
            <input {...disabled} type="radio" id={id} value={btnContent.text} name="answerOption"/>
            <ButtonContent content={btnContent}/>
            <img className="iconState" style={{display: isRadioDisabled && answerStateUrl!=="null" ? "" : "none"}} src={answerStateUrl} alt="" />
        </label>
    )
}