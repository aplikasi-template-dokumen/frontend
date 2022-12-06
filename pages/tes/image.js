import axios from "axios"
import { useState } from "react"

export default function TesImage() {
    const [file, setFile] = useState(null)

    const previewFile = async (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()

        setFile(e.target.files[0])
        // console.log('Image size: ', (file.size/1024).toFixed(1), ' KB')
        // console.log('Image size: ', (file.size/1048576).toFixed(1), ' MB')

        reader.addEventListener('load', () => {
            document.getElementById('preview').src = reader.result
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const getImg = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', file)
        
        try {
            const result = await axios.post(`http://127.0.0.1:3001/tes/upload-img`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
            }
            })
        
            console.log('Result: ', result)
        }

        catch(err) {
            console.log(err)
        }
    }

    return(
        <>
            <h1>Mari tes input image di sini~</h1>
            <br />

            <input type='file' id='image' accept=".png, ,.jpg, .jpeg" onChange={(event) => previewFile(event)} />

            <br />
            <br />

            <button onClick={(event) => getImg(event)}>Click</button>
            <img id='preview' height='200px' src='' alt='Preview will appear here' />

        </>
    )
}