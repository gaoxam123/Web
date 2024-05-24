export default function Slots({val1, val2, val3}) {
    return (
        <>
            <p>{val1} {val2} {val3}</p>
            {(val1 === val2 && val2 === val3) ? 
            (<>
            <h2 style={{color:"green"}}>You Win</h2>
            <h2>Congrats</h2>
            </>) : <h2 style={{color:"red"}}>You lose</h2>}
        </>
    )
}