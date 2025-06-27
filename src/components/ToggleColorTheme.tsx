import type React from "react"
import { useState } from 'react'

export default function ToggleColorTheme({handleChangingTheme, theme}: {handleChangingTheme: (newTheme: string) => void, theme:string}){
    // // const [text, setText] = useState<string>("kek");
    // const [isChecked, setIsChecked] = useState<boolean>(false);
    const checked = {"checked": theme==='dark'};
    const change = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangingTheme(theme==='light' ? 'dark' : 'light');
        // console.log("1 isChecked = " + isChecked)
        // setIsChecked(event.currentTarget.checked);
        // if(text === "lol") setText("new lol")
        // else setText("lol")
        // let newTheme = event.currentTarget.checked ? "dark" : "light";
        // console.log(event.currentTarget.checked)
        // console.log(newTheme)
        // handleChangingTheme(newTheme);
        // console.log("2 isChecked = " + isChecked)
    }
    return (
        <div className="themeToggle">
            <img className="themeImg" src="./assets/images/icon-sun-dark.svg" alt="" />
            <label className="switchTheme" >
                <input {...checked} type="checkbox" onChange={change}></input>
                <span className="switch round"></span>
            </label>
            <img className="themeImg" src="./assets/images/icon-moon-dark.svg" alt="" />
        </div>
    )
}