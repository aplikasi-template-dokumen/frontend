import style from '../../styles/Profile.module.css'
import Navbar from '../../components/Navbar'
import Link from 'next/dist/client/link'
import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ChangePassword() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push('/')
        }
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(`http://127.0.0.1:3001/u/${user}/change-pass`, {
                oldPass: document.getElementById('old-pass').value,
                newPass: document.getElementById('pass').value,
                newPassConf: document.getElementById('re-pass').value
            })
            // console.log(response)
            router.push('/profile')
        }

        catch(err) {
            console.log(err)
        }
    }

    return(
        <>
            <Navbar />

            <div>
                <Link className='backBtn' href={'/profile'}><img src='/images/icon-back.png' alt='icon' className='backImg' />Kembali ke Halaman Profil</Link>
            </div>

            <div className={style.container}>
                <img src='/images/sample-profile.png' alt='profile' />

                <p>Password Lama</p>
                <input id='old-pass' type='password' required />

                <p>Password Baru</p>
                <input id='pass' type='password' required />

                <p>Konfirmasi Password Baru</p>
                <input id='re-pass' type='password' required />
                
                <div className={style.btn}>
                    <Link onClick={(event) => handleSubmit(event)} href={`#`} className={`${style.button} ${style.fullWidth}`}>Simpan</Link>
                </div>
            </div>
        </>
    )
}