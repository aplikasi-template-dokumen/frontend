import style from '../../styles/Profile.module.css'
import Navbar from '../../components/Navbar'
import Link from 'next/dist/client/link'
import axios from 'axios'
import { use, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function EditProfile() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
    const router = useRouter()

    const [occs, setOccs] = useState([])
    const [occId, setOccId] = useState(-1)
    const [tempImg, setTempImg] = useState(null)

    const [uname, setUname] = useState('')
    const [name, setName] = useState('')
    const [aff, setAff] = useState('')

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

            const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
            const formData = new FormData()

            formData.append('id', id)
            formData.append('uname', uname)
            formData.append('name', name)
            formData.append('occ_id', occId)
            formData.append('image', document.getElementById('input-img').files[0])
            formData.append('aff', aff)

            console.log(formData)

            const response = await axios.post(`http://127.0.0.1:3001/u/${id}/edit-profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(response.data)

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
                    <Link onClick={(event) => handleSubmit(event)} href={`#`} className={`${style.button} ${style.fullWidth}`}>Simpan</Link>
                </div>
            </div>
        </>
    )
}