import type { JSX } from "react"

export type quizDataType = {
  title: string,
  icon:  string,
  questions: questionsType[],
}
export type questionsType = {
  question: string,
  options: string[],
  answer: string
}
export type btnContentType = {
    text: string,
    icon: string | JSX.Element;
}

export type buttonPropsType = {
    btnContent: btnContentType,
    handleClick: (btnContent:btnContentType) => void,
}
export type radioButtonType = {
  btnContent:btnContentType, 
  id: string,
  isAnswer: boolean,
  userChoise: string,
  isRadioDisabled: boolean,
  handleChange: ()=>void
}

export type quizComponentPropsType = {
  handleClickGoToScore: () => void, 
  scoreIncrement: () => void
}

export type headerPropsType = {
  theme:string, 
  handleChangingTheme: (newTheme: string) => void, 
  handleClickModalContent: ()=>void 
}

export type modalContentPropsType = {
  handleCloseClick:   ()=>void, 
  handleClickToStart: ()=>void
}

export type scorePropsType = {
  score: number, 
  handleClickGoToStartMenu: ()=>void
}