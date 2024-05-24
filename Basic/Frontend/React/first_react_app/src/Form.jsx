function handleSubmit(e) {
    e.preventDefault()
}
export default function Form() {
    return (
        <form onSubmit={handleSubmit}>
            <button>submit</button>
        </form>
    )
}