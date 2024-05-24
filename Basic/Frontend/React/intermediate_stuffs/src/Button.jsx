import "./Button.css"

export default function Button({click}) {
    return (
        <>
            <button onClick={click} className="Button">Click me</button>        
        </>
    )
}