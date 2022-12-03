import style from '../../styles/Profile.module.css'
import Navbar from '../../components/Navbar'
import Link from 'next/dist/client/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function ProfilePage() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push(`/`)
        }

        else {
            fetch(`http://127.0.0.1:3001/u/profile/${user}`)
                .then((res) => res.json())
                .then((val) => {
                    document.getElementById('role').value = val.data.role
                    document.getElementById('email').value = val.data.email
                    document.getElementById('name').value = val.data.full_name
                    document.getElementById('uname').value = val.data.username
                    document.getElementById('occ').value = val.data.occupation
                })
        }
    }, [])

    return(
        <>
            <Navbar />

            <div>
                <Link className='backBtn' href={'/'}><img src='/images/icon-back.png' alt='icon' className='backImg' />Kembali ke Halaman Utama</Link>
            </div>

            <div className={style.container}>
                <img src='/images/sample-profile.png' alt='profile' />

                <p>Role</p>
                <input id='role' type='text' disabled />

                <p>Email</p>
                <input id='email' type='email' disabled />
                
                <p>Nama Lengkap</p>
                <input id='name' type='text' />

                <p>Username</p>
                <input id='uname' type='text' />

                <p>Pekerjaan</p>
                <input id='occ' type='text' />
                {/* <select>
                    <option>Pelajar</option>
                    <option>Guru</option>
                    <option>Lainnya</option>
                </select> */}
                
                <div className={style.btn}>
                    <Link className={style.button} href={`/profile/edit`}>Edit Profil</Link>
                    <Link className={style.button} href={`/profile/change-password`}>Ganti Password</Link>
                    {/* <button>Edit Profil</button>
                    <button>Ganti Password</button> */}
                </div>
            </div>
        </>
    )
}