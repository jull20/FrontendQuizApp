import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './css/App.css';
import StartMenu from "./components/StartMenu"
import Question from "./components/Question"
import Score from "./components/Score"
function App() {
  return (
    <BrowserRouter>
    <Routes>
      {/* подстановочный путь */}
      <Route path="*"        element={<StartMenu></StartMenu>} />
      <Route path="question" element={<Question></Question>} />
      <Route path="score"    element={<Score></Score>} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
