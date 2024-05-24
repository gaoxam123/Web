function handleHover() {

}
export default function Clicker({buttonText, message}) {
    return (
        <button onClick={() => alert(message)}>{buttonText}</button>
    )
}