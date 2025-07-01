import { useContext } from "react";
import {Button} from "../components/Button"
import type {quizDataType, btnContentType} from "../components/Types"
import {ThemeContext} from "../App"

export default function StartMenu({quizData, handleClick}: {quizData: quizDataType[], handleClick: (btnContent:btnContentType) => void}){
    const theme = useContext(ThemeContext);
    let btnContent: Array<btnContentType> = [];
    const cachedData = localStorage.getItem("quizzes");
    const arr = cachedData ? JSON.parse(cachedData) : quizData;
    btnContent = arr.map((quizTopik: quizDataType) => {return {text: quizTopik.title, icon: quizTopik.icon}});
    
    return (
        <main className="main">
            <div className={"titleTextContainer " + theme}>
                <h1 className='subtitle'>Welcome to the <p className='title'>Frontend Quiz!</p></h1>
                <p className={'description ' + theme}>Pick a subject to get started.</p>
            </div>
            <div className="buttonGroup startMenuPage">
                {
                    btnContent.map((topikNameIcon: btnContentType) => <Button key={topikNameIcon.text} btnContent={topikNameIcon} handleClick={handleClick} />)
                }
            </div>
        </main>
    )
}
