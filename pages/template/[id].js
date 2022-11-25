import style from '../../styles/Documents.module.css'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import ReadQuill from '../../components/ReadQuill'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from "next/router";

export default function Dokumen() {
    // const router = useRouter()
    // const [value, setValue] = useState('tes')

    // useEffect(() => {
    //     fetch(`http://127.0.0.1:3001/t/${router.query.id}`)
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setValue(data.data)
    //         })
    // })

    // useEffect(() => {
    //     const response = axios.get(`http:/127.0.0.1:3000/t/${router.query.id}`)
    //     console.log('Res: ', response)
    // })

    return (
        <>
        <Navbar />

        <div className={style.container}>
            <div className={style.document}>
                <ReadQuill/>
            </div>
            
            <div className={style.action}>
                <p>Judul Template</p>
                <Link href='/'><button>Gunakan Template</button></Link>
                <Link href='/'><button>Unduh Template (.doc)</button></Link>
            </div>
        </div>
        </>
    )
}