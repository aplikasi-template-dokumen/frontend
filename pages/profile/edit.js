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
    const [uploadImg, setUploadImg] = useState(null)

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
                    document.getElementById('aff').value = val.data.affiliation
                    setOccId(val.data.occupation_id)

                    const image = val.data.profile_img.data

                    // const buff = Buffer.image.toS(image, 'utf8')
                    // console.log(buff)

                    const img = image.toString('base64')
                    setUploadImg(img)
                    // console.log(img)
                    
                    // console.log(buff)
                    // console.log(buff.toString('base64'))

                    // const buff = new Buffer(image)
                    // const imageD = buff.toString('base64')
                    // console.log(imageD)
                    // setTempImg(imageD)
                })
        }
    }, [])

    const handleUploadImage = async (e) => {
        e.preventDefault()

        const file = e.target.files[0]
        const preview = document.getElementById('profile-img')
        const reader = new FileReader()
        // console.log(file)

        reader.addEventListener('load', () => {
            const result = reader.result
            
            // preview.src = result
            setTempImg(reader.result)
            console.log(reader.result)

            const buff = Buffer.from(reader.result, 'utf8')
            setUploadImg(buff)
            // console.log(buff)
            // console.log(buff.toString('base64'))
            
            // const encode = Buffer.from(reader.result, 'base64')
            // const decode = encode.toString('base64')
            // atob()
            // btoa()
            // console.log(encode)
            // console.log(decode)
            //Buffer.from(str, 'base64') andbuf.toString('base64').
        }, false)

        if (file) {
            reader.readAsDataURL(file)
        }

    }

    const handleSubmit = async (e) => {
        try  {
            e.preventDefault()

            const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
            const uname = document.getElementById('uname').value
            const name = document.getElementById('name').value
            const occ_id = document.getElementById('occ').value
            const profile_img = uploadImg == null ? null : uploadImg
            const aff = document.getElementById('aff').value

            // const encode = Buffer.from(reader.result, 'base64')

            // console.log(`${id} - ${username} - ${full_name} - ${occupation_id} - ${affiliation}`)
            // console.log(profile_img)

            const response = await axios.post(`http://127.0.0.1:3001/u/${id}/edit-profile`, {
                uname,
                name,
                occ_id,
                profile_img,
                aff
            })

            console.log(response)

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
                <input id='name' type='text' />

                <p>Username</p>
                <input id='uname' type='text' />

                <p>Pekerjaan</p>
                { occs.length == 0 ? <select id="occ"><option value={-1}>Pilih Pekerjaan</option><option>Loading...</option></select> : <select id='occ' defaultValue={occId} >{ occs.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) }</select> }

                <p>Afiliasi</p>
                <input id='aff' type='text' />

                <p>Foto Profil</p>
                <input id='input-img' type='file' accept="image/png, image/jpeg" onChange={(event) => handleUploadImage(event)} />
                
                <div className={style.btn}>
                    <Link onClick={(event) => handleSubmit(event)} href={`#`} className={`${style.button} ${style.fullWidth}`}>Simpan</Link>
                </div>
            </div>
        </>
    )
}