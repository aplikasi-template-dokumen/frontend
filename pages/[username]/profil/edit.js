import style from '../../../styles/Profile.module.css'
import NavbarLogin from "../../../components/NavbarLogin"
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function EditProfil() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push(`/`)
        }
    })

    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <img src='/images/sample-profile.png' />

                <p>Email</p>
                <input type='email' value='rahma.maulida68@gmail.com' disabled />
                
                <p>Nama Lengkap</p>
                <input type='text' value='Rahma Maulida Shaliha' />

                <p>Username</p>
                <input type='text' value='rahmams68' />

                <p>Pekerjaan</p>
                <select>
                    <option>Pelajar</option>
                    <option>Guru</option>
                    <option>Lainnya</option>
                </select>
                
                <div className={style.btn}>
                    <Link href={`#`} className={`${style.button} ${style.fullWidth}`}>Simpan</Link>
                </div>
            </div>
        </>
    )
}