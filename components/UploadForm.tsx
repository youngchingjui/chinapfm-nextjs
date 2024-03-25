"use client"

import { useState } from "react"

import SubmitButton from "./SubmitButton"

export default function UploadForm() {
    const [file, setFile] = useState<File | null>(null)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
        })

        console.log("response", response)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="file"
                name="file"
                id="file"
                accept=".csv, .txt"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFile((e.target.files as FileList)[0] || null)
                }
            />
            <div>State action:</div>
            <SubmitButton />
        </form>
    )
}
