import style from '../../../styles/Documents.module.css'
import NavbarLogin from '../../../components/NavbarLogin'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function DetailTemplateLogin() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    const router = useRouter()

    const [editorLoaded, setEditorLoaded] = useState(false)
    const [data, setData] = useState("")

    useEffect(() => {
        if (user === null) {
            router.push(`/`)
        }

        else {
            setEditorLoaded(true)
        }
    }, [])

    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div className={style.document}>
                    {/*  */}
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