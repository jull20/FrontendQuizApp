import type {quizDataType} from "./Types"

export const defaultQuizData:quizDataType  = {
  title: "",
  icon: "",
  questions: [{
    question: "",
    options: [""],
    answer: ""
  }]
}

export const defaultScore: number = 0; 

export const defaultTheme = () => {
    const cachedTheme = localStorage.getItem("theme");
    return cachedTheme ?? "light";
  }