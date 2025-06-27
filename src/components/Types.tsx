import type { JSX } from "react"

export type btnContentType = {
    text: string,
    icon: string | JSX.Element;
}

export type propsType = {
    btnContent: btnContentType[],
    handleClick: (btnContent:btnContentType) => void,
}

export type questionsType = {
  question: string,
  options: string[],
  answer: string
}

export type quizDataType = {
  title: string,
  icon:  string,
  questions: questionsType[],
}

export type radioButtonType = {
  btnContent:btnContentType, 
  id: string,
  isAnswer: boolean,
  userChoise: string,
  isRadioDisabled: boolean,
  handleChange: ()=>void
}

export type quizComponentType = {
  handleClickGoToScore: () => void, 
  scoreIncrement: () => void
}
