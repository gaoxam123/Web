export default function Greeter(props) {
    return (
        <>
            <h1>Hi {props.person}</h1>
            <h2>-{props.from}</h2>
        </>
    )
}