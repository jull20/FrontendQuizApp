import { useContext } from "react";
import type {quizDataType, scorePropsType} from "../components/Types"
import {defaultQuizData} from "../components/DefaultValues"
import {ButtonContent} from "../components/Button"
import {ThemeContext} from "../App"

export default function Score({score, handleClickGoToStartMenu}: scorePropsType){
    const theme = useContext(ThemeContext);
    const tryGetTopic = localStorage.getItem("selectedTopic");
    let data: quizDataType = defaultQuizData;
    if(tryGetTopic) data = JSON.parse(tryGetTopic);
    return (
        <main className="main">
            <div className={"titleTextContainer " + theme}>
                <h1 className='subtitle'>Quiz completed <p className='title'>You scored...</p></h1>
            </div>
            <div className="resultContainer">
                <div className={"resultContent contentConainer " + theme}>
                    <ButtonContent content={{text: data.title, icon: data.icon}} />
                    <div className="result">
                        <h1 className={"score " + theme}>{score}<p className={"totalScore " + theme}>out of 10</p></h1>
                    </div>
                </div>
                <button 
                    className="btn serviceButton"
                    onClick={handleClickGoToStartMenu}
                > Play Again </button>
            </div>
        </main>
    )
}