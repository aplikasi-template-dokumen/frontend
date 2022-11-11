import style from '../../../styles/Documents.module.css'
import NavbarLogin from '../../../components/NavbarLogin'
import Editor from '../../../components/Editor'
// import CKeditor from '../../../components/CKeditor'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function DetailTemplateLogin() {
    const [editorLoaded, setEditorLoaded] = useState(false)
    const [data, setData] = useState("")

    useEffect(() => {
        setEditorLoaded(true)
    }, [])

    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div className={style.document}>
                    {/* <CKeditor name="description" onChange={ (data) => { setData(data) } } editorLoaded={editorLoaded} />
                    {JSON.stringify(data)} */}
                    <Editor />
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