import type {headerPropsType} from "../components/Types"

export default function ToggleColorTheme({handleChangingTheme, theme}: headerPropsType){
    const checked = {"checked": theme==='dark'};
    const change = () => {
        handleChangingTheme(theme==='light' ? 'dark' : 'light');
    }
    let sunImg  = (theme === 'light') ? "./assets/images/icon-sun-dark.svg"  : "./assets/images/icon-sun-light.svg" ;
    let moonImg = (theme === 'light') ? "./assets/images/icon-moon-dark.svg" : "./assets/images/icon-moon-light.svg";
    return (
        <div className="themeToggle">
            <img className="themeImg" src={sunImg} alt="sun" />
            <label className="switchTheme" >
                <input {...checked} type="checkbox" onChange={change} />
                <span className="switch round"></span>
            </label>
            <img className="themeImg" src={moonImg} alt="moon" />
        </div>
    )
}