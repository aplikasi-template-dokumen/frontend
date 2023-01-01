import Head from 'next/head'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/dist/client/link'
import style from '../../styles/Profile.module.css'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

export default function EditProfile() {
    const router = useRouter()

    const [occs, setOccs] = useState([])
    const [occId, setOccId] = useState(-1)
    const [tempImg, setTempImg] = useState(null)

    const [uname, setUname] = useState('')
    const [name, setName] = useState('')
    const [aff, setAff] = useState('')

    useEffect(() => {
        const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}
        
        if (!t) {
            router.push(`/`)
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/o`)
                .then((res) => res.json())
                .then((val) => {
                    setOccs(val.data)
                })

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/u/profile?token=${t}`)
                .then((res) => res.json())
                .then((val) => {
                    setName(val.data.full_name)
                    setUname(val.data.username)
                    setAff(val.data.affiliation)
                    setOccId(val.data.occupation_id)
                    setTempImg(val.data.profile_img)
                    document.getElementById('email').value = val.data.email
                })
        }
    }, [])

    const handleUploadImage = async (e) => {
        e.preventDefault()

        const reader = new FileReader()
        const file = e.target.files[0]

        reader.addEventListener('load', () => {            
            setTempImg(reader.result)
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e) => {
        try  {
            e.preventDefault()

            const formData = new FormData()

            formData.append('uname', uname)
            formData.append('name', name)
            formData.append('occ_id', occId)
            formData.append('image', document.getElementById('input-img').files[0])
            formData.append('aff', aff)

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/u/edit-profile?token=${window.localStorage.getItem('t')}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
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
                    <img id='profile-img' src={tempImg == null ? '/images/sample-profile.png' : tempImg.toString('base64')} alt='profile' />

                    <p>Email</p>
                    <input id='email' type='email' disabled />
                    
                    <p>Nama Lengkap</p>
                    <input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />

                    <p>Username</p>
                    <input id='uname' type='text' value={uname} onChange={(e) => setUname(e.target.value)} />

                    <p>Pekerjaan</p>
                    { occs.length == 0 ? <select id="occ"><option value={-1}>Pilih Pekerjaan</option><option>Loading...</option></select> : <select id='occ' value={occId} onChange={(e) => setOccId(e.target.value)} >{ occs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) }</select> }

                    <p>Afiliasi</p>
                    <input id='aff' type='text' value={aff} onChange={(e) => setAff(e.target.value)} />

                    <p>Foto Profil</p>
                    <input id='input-img' type='file' accept="image/png, image/jpeg" onChange={(event) => handleUploadImage(event)} />
                    
                    <div className={style.btn}>
                        <Link onClick={(event) => handleSubmit(event)} href={`#`} className={`btn blue-btn ${style.button} ${style.fullWidth}`}>Simpan</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}