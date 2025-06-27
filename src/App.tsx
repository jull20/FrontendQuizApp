import { useState, useEffect, useContext, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import StartMenu from './pages/StartMenuPage'
import Quiz from './pages/QuizPage'
import Score from './pages/ScorePage'
import ToggleColorTheme from "./components/ToggleColorTheme"
import {ButtonContent} from "./components/Button"
import type {quizDataType, btnContentType} from "./components/Types"
import './css/App.css'

export const ThemeContext = createContext<string>("light");


const emptyQuizData:quizDataType[]  = [{
  title: "",
  icon: "",
  questions: [{
    question: "",
    options: [""],
    answer: ""
  }]
}]
// const emptySelectedTopic: btnContentType = {text: "",icon: ""};
const emptyScore: number = 0; 

export default function App() {
  const [score, setScore] = useState<number>(emptyScore);
  const [theme, setTheme] = useState<string>("light");
  let navigate = useNavigate();

  const loadQuizData = () => {
    try{
      const cachedData = localStorage.getItem("quizzes");
      if(!cachedData){
        console.log("new data")
        fetch("data.json").then(response => {
          if(!response.ok) console.log("bad data") 
          return response.json();
        }).then(data => {
          localStorage.setItem("quizzes", JSON.stringify(data["quizzes"]));
        })
      }
    }catch(error){
      console.log(error)
    }
  }
  const returnToDefaultSettings = () => {
    setScore(emptyScore);
    localStorage.removeItem("selectedTopic")
  }
  const cachingSelectedTopic = (topic:btnContentType) => {
    const cachedQuiz  = localStorage.getItem("quizzes");
    const cachedTopic = localStorage.getItem("selectedTopic");
    const isStorageHasPrevTopic = cachedTopic && cachedQuiz && JSON.parse(cachedTopic).text !== topic.text;
    if(isStorageHasPrevTopic || !cachedTopic && cachedQuiz) {
      let newData: quizDataType[] = JSON.parse(cachedQuiz) 
      localStorage.setItem("selectedTopic", JSON.stringify(findTopic(newData, "title", topic.text)))
    }
  }
  const handleClickGoToQuiz = (btnContent:btnContentType) => {
    cachingSelectedTopic(btnContent);
    navigate("/quiz-page", {replace: true})
  }
  const handleClickGoToScore     = () => navigate("/score-page", {replace: true}) 
  const handleClickGoToStartMenu = () => {
    navigate("/", {replace: true})
    returnToDefaultSettings();
  }
  const scoreIncrement = () => { if(score < 10) setScore(score => score+1); }

  useEffect(() => loadQuizData(), []);
  return (
    <ThemeContext value={theme}>
      <div className={'page ' + theme}>
        <div className="contentArea">
          <Header 
            handleChangingTheme={(newTheme: string) => setTheme(newTheme)}
            theme={theme} 
            />
          <Routes>
            <Route 
              path='/' 
              element={
                <StartMenu 
                  handleClick = {handleClickGoToQuiz}
                />
              } 
            />
            <Route 
              path='/quiz-page' 
              element={
                <Quiz 
                  scoreIncrement = {scoreIncrement} 
                  handleClickGoToScore={handleClickGoToScore} 
                />
              } 
            />
            <Route 
              path='/score-page' 
              element={
                <Score 
                  score={score}
                  handleClickGoToStartMenu={handleClickGoToStartMenu}
                />
              } 
            />
          </Routes>
        </div>
      </div>
    </ThemeContext>
  )
}

function Header(props: {handleChangingTheme: (newTheme: string) => void, theme:string }){
  let tryGetTopic = localStorage.getItem("selectedTopic");
  let data: quizDataType = emptyQuizData[0];
  if(tryGetTopic) data = JSON.parse(tryGetTopic);

  return(
    <header className='header'>
      <ButtonContent content={{text: data.title, icon: data.icon}}/>
      <ToggleColorTheme {...props}/>
    </header>
  )
}

function findTopic(arr: Array<quizDataType>, key: string, value: string): quizDataType | undefined {
  return arr.find((obj: quizDataType) => obj[key] === value);

}