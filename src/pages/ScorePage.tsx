import type {btnContentType, quizDataType} from "../components/Types"
import {ButtonContent} from "../components/Button"

export default function Score({score, handleClickGoToStartMenu}: {score: number, handleClickGoToStartMenu: ()=>void}){
    let tryGetTopic = localStorage.getItem("selectedTopic");
    let data: quizDataType = {
                title: "",
                icon: "",
                questions: [{
                    question: "",
                    options: [""],
                    answer: ""
                }]};
    if(tryGetTopic) data = JSON.parse(tryGetTopic);
    return (
        <main className="main">
            <div className="startMenuTextContainer">
                <h1 className='subtitle'>Quiz completed <p className='title'>You scored...</p></h1>
            </div>
            <div className="resultContainer">
                <div className="resultContent">
                    <ButtonContent content={{text: data.title, icon: data.icon}} />
                    <div className="result">
                        <h1 className="score">{score}<p className="totalScore">out of 10</p></h1>
                    </div>
                </div>
                <button 
                    className="btn serviceButton"
                    onClick={handleClickGoToStartMenu}
                >
                    Play Again
                </button>
            </div>
        </main>
    )
}