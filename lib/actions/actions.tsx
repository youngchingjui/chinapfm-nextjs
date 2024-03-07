"use server"

export async function upload(prevState: any, formData: FormData) {
    const rawFormData = { file: formData.get("file") }

    //TODO: Upload file to server

    return { message: "this is a response for file upload" }
}
