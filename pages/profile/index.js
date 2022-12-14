import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/dist/client/link'
import style from '../../styles/Profile.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function ProfilePage() {
    const router = useRouter()
    const [profileImg, setProfileImg] = useState(null)

    useEffect(() => {
        const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}

        if (!t) {
            router.push(`/`)
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/u/profile?token=${t}`)
                .then((res) => res.json())
                .then((val) => {
                    document.getElementById('role').value = val.data.role
                    document.getElementById('email').value = val.data.email
                    document.getElementById('name').value = val.data.full_name
                    document.getElementById('uname').value = val.data.username
                    document.getElementById('occ').value = val.data.occupation
                    document.getElementById('aff').value = val.data.affiliation
                    setProfileImg(val.data.profile_img)
                })
        }
    }, [])

    return(
        <div className='body'>
            <Head>
                <title>TemplateKita</title>
                <meta name="description" content="TemplateKita" />
                <link rel="icon" href="/tab-icon.png" />
            </Head>
            
            <Navbar />

            <div className='main-container'>
                <main>
                    <Link className='backBtn' href={'/'}><img src='/images/icon-back.png' alt='icon' className='backImg' />Kembali ke Halaman Utama</Link>

                    <div className={style.container}>
                        <img src={ profileImg == null ? '/images/sample-profile.png' : profileImg } alt='profile' />

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

                        <p>Afiliasi</p>
                        <input id='aff' type='text' />
                        
                        <div className={style.btn}>
                            <Link className={`btn blue-btn ${style.button}`} href={`/profile/edit`}>Edit Profil</Link>
                            <Link className={`btn blue-btn ${style.button}`} href={`/profile/change-password`}>Ganti Password</Link>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}