export default function List({value}) {
    const randidx = Math.floor(Math.random() * value.length)
    const e = value[randidx]
    return (
        <>
            <p>The list of values: {value}</p>
            <p>Current value: {e}</p>
        </>
    )
}