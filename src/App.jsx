import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import StartMenu from "./pages/StartMenu"
import Question from "./pages/Question"
import Score from "./pages/Score"


export default function App() {
  const [quizName, setquizName] = useState("");
  return (
    <div className='container'>
        <Header quizName={quizName}></Header>
        <BrowserRouter>
          <Routes>
            <Route path="*"        element={<StartMenu onQuizName={setquizName}></StartMenu>} />
            <Route path="question" element={<Question quizName={quizName}></Question>} />
            <Route path="score"    element={<Score></Score>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
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