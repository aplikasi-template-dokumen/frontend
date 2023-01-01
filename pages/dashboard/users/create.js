import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import style from '../../../styles/Profile.module.css'

export default function DashboardEditUsers() {
    const router = useRouter()

    // const [roles, setRoles] = useState([])
    // const [roleId, setRoleId] = useState(-1)
    const [occs, setOccs] = useState([])
    const [occId, setOccId] = useState(-1)
    const [tempImg, setTempImg] = useState(null)

    const [uname, setUname] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    // const [aff, setAff] = useState('')
    const [pass, setPass] = useState('')
    const [repass, setRepass] = useState('')

    useEffect(() => {
        const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}

        if (!t) {
            router.push('/')
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/o`)
                .then((res) => res.json())
                .then((val) => {
                    setOccs(val.data)
                })
        }
    }, [])

    // const handleUploadImage = async (e) => {
    //     e.preventDefault()

    //     const reader = new FileReader()
    //     const file = e.target.files[0]

    //     reader.addEventListener('load', () => {
    //         setTempImg(reader.result)
    //     }, false)

    //     if (file) {
    //         reader.readAsDataURL(file)
    //     }
    // }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/u/regist`, {
                email,
                name,
                uname,
                occ_id: occId,
                pass,
                repass
            })

            // const formData = new FormData()
            
            // formData.append('role', roleId)
            // formData.append('uname', uname)
            // formData.append('email', email)
            // formData.append('name', name)
            // formData.append('occ_id', occId)
            // formData.append('image', document.getElementById('input-img').files[0])
            // formData.append('aff', aff)

            // const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/u/${router.query.id}/update?token=${window.localStorage.getItem('t')}`, formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })

            router.push('/dashboard/users')
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
                    <Link className='backBtn' href={'/dashboard/users'}><img src='/images/icon-back.png' alt='icon' className='backImg' />Kembali ke Halaman Users</Link>
                </main>
                
                <div className={style.container}>
                    {/* <img id='profile-img' src={tempImg == null ? '/images/sample-profile.png' : tempImg.toString('base64')} alt='profile' /> */}

                    {/* <p>Role</p>
                    { roles.length == 0 ? <select id="occ"><option value={-1}>Pilih Role</option><option>Loading...</option></select> : <select id='role' value={roleId} onChange={(e) => setRoleId(e.target.value)} >{ roles.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) }</select> } */}

                    <p>Email</p>
                    <input id='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    
                    <p>Nama Lengkap</p>
                    <input id='name' type='text' value={name} onChange={(e) => setName(e.target.value)} />

                    <p>Username</p>
                    <input id='uname' type='text' value={uname} onChange={(e) => setUname(e.target.value)} />

                    <p>Pekerjaan</p>
                    { occs.length == 0 ? <select id="occ"><option value={-1}>Pilih Pekerjaan</option><option>Loading...</option></select> : <select id='occ' value={occId} onChange={(e) => setOccId(e.target.value)} >{ occs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) }</select> }

                    {/* <p>Afiliasi</p>
                    <input id='aff' type='text' value={aff} onChange={(e) => setAff(e.target.value)} /> */}

                    <p>Password <span>*</span></p>
                    <input type='password' id='pass' onChange={(e) => setPass(e.target.value)} required/>

                    <p>Konfirmasi Password <span>*</span></p>
                    <input type='password' id='confirm-pass' onChange={(e) => setRepass(e.target.value)} required/>

                    {/* <p>Foto Profil</p>
                    <input id='input-img' type='file' accept="image/png, image/jpeg" onChange={(event) => handleUploadImage(event)} /> */}
                    
                    <div className={style.btn}>
                        <Link onClick={(event) => handleSubmit(event)} href={`#`} className={`btn blue-btn ${style.button} ${style.fullWidth}`}>Simpan</Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}