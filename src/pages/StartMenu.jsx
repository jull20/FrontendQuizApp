import { useState } from 'react';
import {OptionButton, SubmitButton, QuizThemeContent} from "../components/Button"
import { useNavigate } from 'react-router-dom';

export default function StartMenu(props){
    let themes = props.themeData
    const navigate = useNavigate(); 
    let handleClick = (e, name) => {
        console.log(e.target)
        navigate('question', { replace: true });
        props.onCurrTheme(name);
    }
    return (
        <main className="main">
            <div className="startMenuTextContainer">
                <h1 className='subtitle'>Welcome to the <p className='title'>Frontend Quiz!</p></h1>
                <p className='description'>Pick a subject to get started.</p>
            </div>
            <div className="buttonGroup">
                {
                    themes.map(theme => (
                        <OptionButton name={theme[0]} handle={handleClick}>
                            <QuizThemeContent  name={theme[0]}>{theme[1]}</QuizThemeContent>
                        </OptionButton>
                    ))
                }
            </div>
        </main>
    )
}


