export default function Page() {
    return (
        <>
            <h1>Hello, Next.js!</h1>
            <form>
                <input type="file" name="file" id="file" accept=".csv, .txt" />
                <button type="submit">Upload</button>
            </form>
        </>
    )
}
