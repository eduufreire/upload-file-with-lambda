import express from 'express'
import fileUpload, { UploadedFile } from 'express-fileupload'
import { handler } from './src/handler'

const app = express()

app.use(express.json())

app.use(fileUpload())

app.post("/teste", async (req, res) => {

    if(req.files?.teste) {
        const file: UploadedFile | UploadedFile[] = req.files.teste
        const teste = file as UploadedFile
        
        try {
            const result = await handler({
                body: teste.data
            })
            res.json(result)

        } catch (err) {
            console.log(err)
        }
    }
    
})

app.listen(3333, () => {
    console.log('server running')
})