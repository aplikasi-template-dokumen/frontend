import style from '../../../styles/Profile.module.css'
import NavbarLogin from "../../../components/NavbarLogin"
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Profil() {
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

            <div>
                <Link className='backBtn' href='/rahmams'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Halaman Utama</Link>
            </div>

            <div className={style.container}>
                <img src='/images/sample-profile.png' alt='profile' />
                {/* <a>Ganti Foto</a> */}

                <p>Role</p>
                <input type='text' value='Contributor' disabled />

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
                    <Link className={style.button} href={`/${user}/profil/edit`}>Edit Profil</Link>
                    <Link className={style.button} href={`/${user}/profil/ganti-password`}>Ganti Password</Link>
                    {/* <button>Edit Profil</button>
                    <button>Ganti Password</button> */}
                </div>
            </div>
        </>
    )
}