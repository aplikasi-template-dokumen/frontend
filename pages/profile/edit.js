import style from '../../styles/Profile.module.css'
import Navbar from '../../components/Navbar'
import Link from 'next/dist/client/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function EditProfile() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
    const router = useRouter()

    const [occs, setOccs] = useState([])

    useEffect(() => {
        if (user === null) {
            router.push(`/`)
        }

        else {
            fetch(`http://127.0.0.1:3001/o`)
                .then((res) => res.json())
                .then((val) => {
                    setOccs(val.data)
                })

            fetch(`http://127.0.0.1:3001/u/profile/${user}`)
                .then((res) => res.json())
                .then((val) => {
                    document.getElementById('email').value = val.data.email
                    document.getElementById('name').value = val.data.full_name
                    document.getElementById('uname').value = val.data.username
                    document.getElementById('occ').value = val.data.occupation_id
                })

        }
    }, [])
    
    return(
        <>
            <Navbar />

            <div>
                <Link className='backBtn' href={'/profile'}><img src='/images/icon-back.png' alt='icon' className='backImg' />Kembali ke Halaman Profil</Link>
            </div>

            <div className={style.container}>
                <img src='/images/sample-profile.png' alt='profile' />

                <p>Email</p>
                <input id='email' type='email' disabled />
                
                <p>Nama Lengkap</p>
                <input id='name' type='text' />

                <p>Username</p>
                <input id='uname' type='text' />

                <p>Pekerjaan</p>
                <select id='occ'>
                    { occs.length == 0 ? <option>Loading...</option> : occs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) }
                </select>
                
                <div className={style.btn}>
                    <Link href={`#`} className={`${style.button} ${style.fullWidth}`}>Simpan</Link>
                </div>
            </div>
        </>
    )
}