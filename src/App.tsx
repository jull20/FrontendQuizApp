import { useState, useEffect, createContext, useContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import StartMenu from './pages/StartMenuPage'
import Quiz from './pages/QuizPage'
import Score from './pages/ScorePage'
import ToggleColorTheme from "./components/ToggleColorTheme"
import {ButtonContent} from "./components/Button"
import type {quizDataType, btnContentType, headerPropsType, modalContentPropsType} from "./components/Types"
import {defaultQuizData, defaultScore, defaultTheme} from "./components/DefaultValues"
import './css/App.css'

export const ThemeContext = createContext<string>("light");

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false); 
  const [score, setScore]                   = useState<number>(defaultScore);
  const [quizData, setQuizData]             = useState<quizDataType[]>([defaultQuizData]);
  const [theme, setTheme]                   = useState<string>(defaultTheme);
  const navigate = useNavigate();

  const loadQuizData = () => {
    const cachedData = localStorage.getItem("quizzes");
    if(!cachedData){
      fetch("data.json").then(response => {
        if(!response.ok) console.log("bad data") 
        return response.json();
      }).then(data => {
        localStorage.setItem("quizzes", JSON.stringify(data["quizzes"]));
        setQuizData(data);
      })
    }
  }
  const returnToDefaultSettings = () => {
    setScore(defaultScore);
    localStorage.removeItem("selectedTopic");
    localStorage.removeItem("currentQuestion");
  }
  const cachingSelectedTopic = (topic:btnContentType) => {
    const cachedQuiz  = localStorage.getItem("quizzes");
    const cachedTopic = localStorage.getItem("selectedTopic");
    const isStorageHasPrevTopic = cachedTopic && cachedQuiz && JSON.parse(cachedTopic).text !== topic.text;
    if(isStorageHasPrevTopic || !cachedTopic && cachedQuiz) {
      const newData: quizDataType[] = JSON.parse(cachedQuiz)
      const selectedTopic: quizDataType | undefined = newData.find((obj: quizDataType) => obj.title === topic.text) 
      localStorage.setItem("selectedTopic", JSON.stringify(selectedTopic));
    }
  }
  const scoreIncrement = () => { if(score < 10) setScore(score => score+1); }
  const handleChangingTheme = (newTheme:string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); 
  }
  const handleClickGoToQuiz = (btnContent:btnContentType) => {
    cachingSelectedTopic(btnContent);
    navigate("/quiz-page", {replace: true});
  }
  const handleClickGoToScore     = () => navigate("/score-page", {replace: true}) 
  const handleClickGoToStartMenu = () => {
    navigate("/", {replace: true});
    returnToDefaultSettings();
    setIsModalVisible(false);

  }
  useEffect(() => loadQuizData(), []);

  return (
    <ThemeContext value={theme}>
      <div id='page' className={'page ' + theme}>
        {isModalVisible && <ModalContent handleCloseClick={() => setIsModalVisible(false)} handleClickToStart={handleClickGoToStartMenu}/>}
        <div className="contentArea">
          <Header 
            handleChangingTheme={handleChangingTheme}
            theme={theme}
            handleClickModalContent={() => setIsModalVisible(true)} 
            />
          <Routes>
            <Route 
              path='/' 
              element={
                <StartMenu 
                  quizData={quizData}
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


function ModalContent({handleCloseClick, handleClickToStart}: modalContentPropsType){
  const theme = useContext(ThemeContext);
  return (
    <div className="modalContainer">
      <div className={"modalContent resultContent contentConainer " + theme}>
        <p>Are you sure you want to go to the start menu?</p>
        <div className="modalBtnGroup">
          <button className='btn serviceButton' onClick={handleClickToStart}>Go</button>
          <button className='btn serviceButton closeButton' onClick={handleCloseClick}>Close</button>
        </div>
      </div>
    </div>
  )
}

function Header(props: headerPropsType){
  const tryGetTopic = localStorage.getItem("selectedTopic");
  let selectedTopic: quizDataType = defaultQuizData;
  if(tryGetTopic) selectedTopic = JSON.parse(tryGetTopic);

  return(
    <header className='header'>
      <ButtonContent 
        content={{text: selectedTopic.title, icon: selectedTopic.icon}} 
        handleClick={props.handleClickModalContent}
        style={{cursor: "pointer"}}
      />
      <ToggleColorTheme {...props}/>
    </header>
  )
}