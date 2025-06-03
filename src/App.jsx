import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import StartMenu from "./pages/StartMenu"
import Question from "./pages/Question"
import Score from "./pages/Score"
import {QuizThemeContent} from "./components/Button"


export default function App() {
  const [quizName, setquizName] = useState("");
  const [themes, setThemes] = useState([]);
  const [currTheme, setCurrTheme] = useState({});

  useEffect(() => {
      fetch("data.json").then((response) => {
          if(!response.ok) console.log("Bad data!");
          // console.log(localStorage.getItem(response))
          return response.json();
      })
      .then(data => {
          // console.log(data.quizzes);
          setThemes(data.quizzes);
          // data.quizzes.forEach(theme => {
          //     localStorage.setItem(theme.title, JSON.stringify(theme));
          // })
      })
  }, []);
  // console.log(themes);
  // themes.map(theme => console.log(theme))
  return (
    <div className='container'>
        <Header quizName={currTheme.title} quizIcon={currTheme.icon}></Header>
        <BrowserRouter>
          <Routes>
            <Route 
              path="*"
              element={
                <StartMenu 
                  themeData={themes.map(theme => ([theme.title, theme.icon]))}
                  onCurrTheme={(quizName) => {
                    themes.forEach(theme => {
                      if(theme.title === quizName) setCurrTheme(theme);
                    })
                  }}
                />} 
            />
            <Route path="question" element={<Question currTheme={currTheme}/>} />
            <Route path="score"    element={<Score/>} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}


function Header({quizName, quizIcon}){
    return (
        <header className="header">
            <QuizThemeContent name={quizName}>{quizIcon}</QuizThemeContent>
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