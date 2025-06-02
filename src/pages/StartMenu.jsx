import { useState } from 'react';
import {OptionButton, SubmitButton, QuizThemeContent} from "../components/Button"
import { useNavigate } from 'react-router-dom';

export default function StartMenu(props){
    const navigate = useNavigate(); 
    let handleClick = (name) => {
        navigate('question', { replace: true });
        props.onQuizName(name);
    }
    return (
        <main className="main">
            <div className="startMenuTextContainer">
                <h1 className='subtitle'>Welcome to the <p className='title'>Frontend Quiz!</p></h1>
                <p className='description'>Pick a subject to get started.</p>
            </div>
            <div className="buttonGroup">
                <OptionButton handle={handleClick}>
                    <QuizThemeContent name="HTML"></QuizThemeContent>
                </OptionButton>
                <OptionButton handle={handleClick}>
                    <QuizThemeContent name="CSS"></QuizThemeContent>
                </OptionButton>
                <OptionButton handle={handleClick}>
                    <QuizThemeContent name="Javascript"></QuizThemeContent>
                </OptionButton>
                <OptionButton handle={handleClick}>
                    <QuizThemeContent name="Accessibility"></QuizThemeContent>
                </OptionButton>
            </div>
        </main>
    )
}


