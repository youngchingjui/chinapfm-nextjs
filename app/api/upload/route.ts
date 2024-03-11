import csv from "csv-parser"
import fs from "fs"
import { NextApiRequest, NextApiResponse } from "next"
import stream from "stream"
import { promisify } from "util"

const pipeline = promisify(stream.pipeline)

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
    const body = await req.body
    const file = req.file

    if (typeof file !== "object" || !file || !file.path) {
        res.status(400).json({
            error: "Invalid file upload. Please upload a file.",
        })
        return
    }

    let pipelineStream = new stream.PassThrough()

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

    return res
        .status(200)
        .json({ message: "this is a response for file upload" })
}
