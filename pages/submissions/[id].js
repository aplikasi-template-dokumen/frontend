import style from '../../styles/Templates.module.css'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import axios from 'axios'
import { useRouter  } from 'next/router'
import { useEffect, useState } from 'react'

export default function SubmissionDetail() {
    const router = useRouter()
    const [data, setData] = useState({})

    const modules = {
        toolbar: []
    }

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/s/${router.query.id}`)
            .then((res) => res.json())
            .then((val) => {
                setData(val.data)
            })
    }, [])

    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading . . .</p>
    })

    const handleSubmit = async (e, s_id) => {
        try {
            e.preventDefault()

            const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
            let notes = document.getElementById('notes').value
            const date = new Date().toISOString()
            
            if (notes == '') {
                notes = null
            }

            else
            if (notes != '' && s_id !== 1) {
                notes = notes + ' (reviewer)'
            }

            else {
                notes = 'Ajuan ditolak, ' + notes + ' (reviewer)'
            }

            const result = await axios.post(`http://127.0.0.1:3001/s/${router.query.id}/send-review`, {
                notes,
                status_id: s_id,
                reviewer_id: id,
                publish_date: date
            })

            router.push('/submissions')
        }

        catch(err) {
            console.log(err)
        }
    }

    return(
        <>
            <Navbar />

            <div className={style.container}>
                <Link className='backBtn' href='/submissions'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Daftar Template Ajuan</Link>

                <main>
                    <h1>Review: {data.title}</h1>
                    <hr />

                    <div className={style.info}>
                        <img src={data.img} alt='image' />

                        <form>
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

                    <div className={style.containerEditor}>
                        <div className="editor-container">
                            <QuillNoSSRWrapper id='text-editor' value={data.data} modules={modules} placeholder='Nothing here . . .' theme='snow' readOnly />
                        </div>

                        <div className={style.action}>
                            <p>Komentar Reviewer</p>
                            <textarea id='notes' placeholder='Tuliskan komentar terkait template untuk kontributor...'></textarea>
                            <Link href='/' onClick={(event) => handleSubmit(event, 4)}><button>Terima</button></Link>
                            <Link href='/' onClick={(event) => handleSubmit(event, 1)}><button>Tolak</button></Link>
                            <Link href='/' onClick={(event) => handleSubmit(event, 3)}><button>Revisi</button></Link>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}