import { useState } from 'react';
import Button from "./Button"

export default function StartMenu(){
    const [quizName, setquizName] = useState("");

    return (
        <div className='container'>
            <Header quizName={quizName}></Header>
            <main className="main">
                
                <Button name={"HTML"}          onQuizName={setquizName}></Button>
                <Button name={"CSS"}           onQuizName={setquizName}></Button>
                <Button name={"Javascript"}    onQuizName={setquizName}></Button>
                <Button name={"Accessibility"} onQuizName={setquizName}></Button>
            </main>
        </div>
    )
}

function Header({quizName}){
    return (
        <header className="header">
            <div className="quizName">
                <h1>{quizName}</h1>
            </div>
            <ToggleColorTheme></ToggleColorTheme>
        </header>
    )
}
function ToggleColorTheme(){
    return (
        <label className="switchTheme">
            <input type="checkbox"></input>
            <span className="switch round"></span>
        </label>
    )
}