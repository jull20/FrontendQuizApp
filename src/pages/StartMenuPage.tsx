import { useContext } from "react";
import {Button} from "../components/Button"
import type {propsType, quizDataType, btnContentType} from "../components/Types"
import {ThemeContext} from "../App"

export default function StartMenu({handleClick}: {handleClick: (btnContent:btnContentType) => void}){
    const theme = useContext(ThemeContext);
    let btnContent: Array<btnContentType> = [];
    let cachedData = localStorage.getItem("quizzes");
    if(cachedData) {
        btnContent = JSON.parse(cachedData).map((quizTopik: quizDataType) => {return {text: quizTopik.title, icon: quizTopik.icon}});
    }
    return (
        <main className="main">
            <div className={"startMenuTextContainer " + theme}>
                <h1 className='subtitle'>Welcome to the <p className='title'>Frontend Quiz!</p></h1>
                <p className='description'>Pick a subject to get started.</p>
            </div>
            <div className="buttonGroup startMenuPage">
                {
                    btnContent.map((topikNameIcon: btnContentType) => <Button key={topikNameIcon.text} btnContent={topikNameIcon} handleClick={handleClick} />)
                }
            </div>
        </main>
    )
}
