export default function ToggleColorTheme({handleChangingTheme, theme}: {handleChangingTheme: (newTheme: string) => void, theme:string}){
    const checked = {"checked": theme==='dark'};
    const change = () => {
        handleChangingTheme(theme==='light' ? 'dark' : 'light');
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