

export function SubmitButton({name, children}){
    // console.log(name)
    return (
        <p type="submitButton">{name + children}</p>
    )
}

export function OptionButton(props){
    return (
        <Button {...props} type="optionButton"></Button>
    )
}


function Button(props){
    let style = "btn " + props.type;
    return (
        <button className={style} onClick={(e) => {props.handle(e, props.name)}}>
            {props.children}
        </button>
    )
}

export function QuizThemeContent(props){
    return(
        <div className="content">
        {(props.name) ? 
            <>
                <div className={"iconContainer " + props.name.toLowerCase()}>
                    <img src={props.children} alt="svg"/>
                </div>
                <p>{props.name}</p>
            </>
        : <></>      
        }
        </div>
    )
}

export function AnswerBtnContent({letter, children}){
    return(
        <div className="content">
            <div className="iconContainer">
                {letter}
            </div>
            <p>{children}</p>
        </div>
    )
}
