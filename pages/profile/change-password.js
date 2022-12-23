import style from '../../styles/Profile.module.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/dist/client/link'
import axios from 'axios'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function ChangePassword() {
    const router = useRouter()

    useEffect(() => {
        const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}

        if (t === null) {
            router.push('/')
        }
    })

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/u/change-pass?token=${window.localStorage.getItem('t')}`, {
                oldPass: document.getElementById('old-pass').value,
                newPass: document.getElementById('pass').value,
                newPassConf: document.getElementById('re-pass').value
            })
            
            router.push('/profile')
        }

        catch(err) {
            console.log(err)
        }
    }

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
                    <Link className='backBtn' href={'/profile'}><img src='/images/icon-back.png' alt='icon' className='backImg' />Kembali ke Halaman Profil</Link>
                </main>

                <div className={style.container}>
                    {/* <img src='/images/sample-profile.png' alt='profile' /> */}

                    <p>Password Lama</p>
                    <input id='old-pass' type='password' required />

                    <p>Password Baru</p>
                    <input id='pass' type='password' required />

                    <p>Konfirmasi Password Baru</p>
                    <input id='re-pass' type='password' required />
                    
                    <div className={style.btn}>
                        <Link onClick={(event) => handleSubmit(event)} href={`#`} className={`btn blue-btn ${style.button} ${style.fullWidth}`}>Simpan</Link>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}