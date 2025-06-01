export default function Button({name, onQuizName}){
    return (
        <button className="btn" onClick={() => {onQuizName(name)}}>{name}</button>
    )
}