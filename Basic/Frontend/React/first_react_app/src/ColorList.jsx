export default function ColorList({colors}) {
    // const lis = colors.map(color => <li>{color}</li>)
    return (
        <>
            <p>Color List</p>
            <ul>{colors.map(color => <li style={{color:color}}>{color}</li>)}</ul>
        </>
    )
}