import style from '../../styles/Documents.module.css'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter  } from 'next/router'
import { useEffect, useState } from 'react'

export default function SubmissionDetail() {
    const [uid, setUid] = useState()
    const router = useRouter()
    const [data, setData] = useState({})

    const modules = {
        toolbar: []
    }

    useEffect(() => {
        const t = typeof window !== 'undefined' ? window.localStorage.getItem('t') : {}

        if (t == null) {
            router.push('/')
        }

        else {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/s/${router.query.id}?token=${t}`)
                .then((res) => res.json())
                .then((val) => {
                    setData(val.data)
                    setUid(val.uid)
                })
        }

    }, [])

    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading . . .</p>
    })

    const handleSubmit = async (e, s_id) => {
        try {
            e.preventDefault()

            let notes = document.getElementById('notes').value
            const date = new Date().toISOString()
            
            if (notes == '') {
                notes = null
            }

            else
            if (notes != '') {
                notes = notes + ' (reviewer)'
            }

            // else {
            //     notes = 'Ajuan ditolak, ' + notes + ' (reviewer)'
            // }

            const result = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/s/${router.query.id}/send-review?token=${window.localStorage.getItem('t')}`, {
                notes,
                status_id: s_id,
                reviewer_id: uid,
                publish_date: date
            })

            router.push('/submissions')
        }

        catch(err) {
            console.log(err)
        }
    }

    return(
        <div className='body'>
            <Navbar />

            <div className='main-container'>
                <main>
                    <Link className='backBtn' href='/submissions'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Daftar Template Ajuan</Link>
                    
                    <h1>Review: {data.title}</h1>
                    <hr />

                    <div className={style.info}>
                        <img src={data.img == null ? '/img-not-available.jpg' : data.img} alt='image' />

                        <form className={style.form}>
                            <div>
                                <h4>Judul Template</h4>
                                <p>: {data.title}</p>
                            </div>
                                
                            <div>
                                <h4>Deskripsi</h4>
                                <p>: {data.desc} </p>
                            </div>

                            <div>
                                <h4>Kategori</h4>
                                <p>: {data.cat == undefined ? 'Loading...' : data.cat.name}</p>
                            </div>

                            <div>
                                <h4>Sub Kategori</h4>
                                <p>: {data.sub_cat == undefined ? 'Loading...' : data.sub_cat.name}</p>
                            </div>

                            <div>
                                <h4>Kontributor</h4>
                                <p>: {data.contributor == undefined ? 'Loading...' : data.contributor.username}</p>
                            </div>

                            <div>
                                <h4>Catatan</h4>
                                <p>: {data.notes}</p>
                            </div>
                        </form>
                    </div>

                    <div className={style.container}>
                        <QuillNoSSRWrapper className={style.document} value={data.data} modules={modules} placeholder='Nothing here . . .' theme='snow' readOnly />
                        
                        <div className={style.action}>
                            <h3>Komentar Reviewer</h3>
                            <textarea id='notes' placeholder='Tuliskan komentar terkait template untuk kontributor...'></textarea>
                            
                            <Link href='/' onClick={(event) => handleSubmit(event, 4)}><button className='btn green-btn'>Terima</button></Link>
                            <Link href='/' onClick={(event) => handleSubmit(event, 3)}><button className='btn blue-btn'>Revisi</button></Link>
                            <Link href='/' onClick={(event) => handleSubmit(event, 1)}><button className='btn red-btn'>Tolak</button></Link>
                        </div>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}