"use client"

import { useFormState } from "react-dom"

import { upload } from "../lib/actions/actions"
import SubmitButton from "./SubmitButton"

export default function UploadForm() {
    const [state, formAction] = useFormState(upload, {
        message: "initial message state",
    })
    return (
        <form action={formAction}>
            <input type="file" name="file" id="file" accept=".csv, .txt" />
            <div>State action:</div>
            <div>{state?.message}</div>
            <SubmitButton />
        </form>
    )
}
