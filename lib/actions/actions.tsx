import csv from "csv-parser"
import fs from "fs"
import stream from "stream"
import { promisify } from "util"

// This is a standard Node.js stream utility function. We're using it to create a stream pipeline
const pipeline = promisify(stream.pipeline)

export async function upload(prevState: any, formData: FormData) {
    const file = formData.get("file")

    if (typeof file === "object") let pipelineStream = new stream.PassThrough()

    let lineCount = -1

    fs.createReadStream(file.path)
        .pipe(csv())
        .on("data", (data) => {
            lineCount++
            if (lineCount >= 3) {
                // In csv-parser, data starts at index 0. We want to skip the first 3 lines so we use lineCount > 3
                let trimmedData = {}
                // This for..in loop will iterate through keys and values of data object
                for (let key in data) {
                    // Removes trailing and leading whitespace from keys and their associated values
                    trimmedData[key.trim()] = data[key].trim()
                }
                pipelineStream.write(
                    `${Object.values(trimmedData).join(",")}\n`,
                )
            }
        })
        .on("end", () => {
            pipelineStream.end()
        })

    const newFilePath = "/path/to/save/new/file.csv"
    await pipeline(pipelineStream, fs.createWriteStream(newFilePath))

    return { message: "this is a response for file upload" }
}
