import Navbar from "../../../components/Navbar"
import style from '../../../styles/MyDocument.module.css'
import Link from "next/link"
import dynamic from "next/dynamic"
import axios from 'axios'
import { useRouter } from "next/router"
import { useState, useEffect, useRef } from "react"

export default function MyTemplateDetail() {
    const router = useRouter()
    // const [value, setValue] = useState({})
    const [data, setData] = useState({})
    const [cat, setCat] = useState([])
    const [sub, setSub] = useState([])
    const [lang, setLang] = useState([])

    const currentContent = useRef({})

    // const [id, setId] = useState()
    // const [data, setData] = useState({})

    // const [title, setTitle] = useState(data.title)
    // const [desc, setDesc] = useState(data.desc)
    // const [notes, setNotes] = useState(data.notes)

    // useEffect(() => {
    //     const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
    //     setId(id)

    //     if (id == null) {
    //         router.push('/')
    //     }

    //     else {
    //         //fetch
    //     }
    // }, [])

    useEffect(() => {
        fetch(`http://127.0.0.1:3001/t/${router.query.id}`)
            .then((res) => res.json())
            .then((val) => {
                setData(val.data)
                // console.log(val.data)
                document.getElementById('temp-title').innerHTML = val.data.title
            })
        
        fetch('http://127.0.0.1:3001/c')
            .then((res) => res.json())
            .then((data) => {
              setCat(data.data)
            })

        fetch('http://127.0.0.1:3001/l')
            .then((res) => res.json())
            .then((data) => {
                setLang(data.data)
            })
    }, [])

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ script: "sub" }, { script: "super" }],
            [{ indent: "-1" }, { indent: "+1" }],
            [{ align: [] }],
            ["image", "blockquote", "code-block"],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ["link", "image", "video", "formula"],
            ["clean"]
        ],
    }

    const QuillNoSSRWrapper = dynamic(import('react-quill'), {
        ssr: false,
        loading: () => <p>Loading . . .</p>
    })

    function handleChange(content, delta, source, editor) {
        currentContent.current = editor.getContents()
    }

    const handleSubCategory = async (e) => {
        try {
          e.preventDefault()
    
          const cat_id = e.target.value
    
          if (cat_id == 0) {
            setSub([])
          }
    
          else {
            const response = await axios.get(`http://127.0.0.1:3001/sc/c/${cat_id}`) 
            setSub(response.data.data)
          }
    
        }
    
        catch(err) {
          console.log()
        }
    }

    const handleSubmit = async (e, s_id) => {
        e.preventDefault()
        const title = document.getElementById('title').value
        const desc = document.getElementById('desc').value
        const lang_id = document.getElementById('lang').value
        const cat_id = document.getElementById('cat').value
        const sub_cat_id = document.getElementById('sub').value
        const img = document.getElementById('image').value
        const notes = document.getElementById('notes').value

        if (title == '' || desc == '' || lang == -1 || cat_id == -1 || sub_cat_id == -1 || img == '') {
            console.log('Form data tidak boleh kosong!')
            console.log(s_id)
            return false
        }

        else {
            const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
            const response = await axios.post(`http://127.0.0.1:3001/t/${router.query.id}/edit?u_id=${id}`, {
                title,
                desc,
                lang_id,
                cat_id,
                sub_cat_id,
                img,
                data: currentContent.current,
                notes,
                status_id: s_id
            })

            router.push('/my/templates')
        }
    }

    const handleTitleChanged = async (e) => {
        e.preventDefault()

        if (e.target.value == '') {
            document.getElementById('temp-title').innerHTML = 'Untitled'
        }

        else {
            document.getElementById('temp-title').innerHTML = e.target.value
        }
    }

    return(
        <>
            <Navbar />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/my/templates'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Template Saya</Link>
                </div>

                <main>
                    {/* <h1>Buat Template</h1> */}
                    <h1 id='temp-title'>Loading...</h1>
                    <hr />

                    <div className={style.reqBox}></div>

                    <form className={style.form}>
                        <div>
                            <p>Judul Template</p>
                            <input id="title" type='text' defaultValue={data.title} onChange={(event) => handleTitleChanged(event)} required />
                        </div>

                        <div>
                            <p>Deskripsi</p>
                            <input id="desc" type='text' defaultValue={data.desc} />
                        </div>

                        <div>
                            <p>Bahasa</p>
                            <select id="lang">
                                <option value={-1}>Pilih Bahasa</option>
                                {lang.length == 0 ? <option>Loading...</option> : lang.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <p>Kategori</p>
                            <select id="cat" defaultValue={data.cat_id} onChange={(event) => handleSubCategory(event)}>
                                <option value={-1}>Pilih Kategori</option>
                                {cat.length == 0 ? <option>Loading...</option> : cat.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <p>Sub Kategori</p>
                            <select id="sub" defaultValue={data.sub_cat_id}>
                                {sub.length == 0 ? <option value={-1}>Pilih Sub Kategori</option> : sub.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                            </select>
                        </div>

                        <div>
                            <p>Gambar Preview</p>
                            {/* <input id='image' type='file' /> */}
                            <input id="image" type='text' defaultValue={data.img} />
                        </div>

                        <div>
                            <p>Catatan</p>
                            <input id="notes" type='text' defaultValue={data.notes} />
                            {/* <p id="notes">{data.notes}</p> */}
                        </div>
                    </form>

                    <div className="editor-container">
                        <QuillNoSSRWrapper id='text-editor' defaultValue={data.data} onChange={handleChange} modules={modules} placeholder='Type something here . . .' theme='snow' />
                    </div>

                    <div className={style.btnGroup}>
                        {/* <Link href='/' className={style.btn}>
                            <button className={style.btnHapus}>Hapus</button>
                        </Link> */}

                        <Link href='/' className={style.btn} onClick={(event) => handleSubmit(event, 1)}>
                            <button>Simpan</button>
                        </Link>
                        
                        <Link href='/' className={style.btn} onClick={(event) => handleSubmit(event, 2)}>
                            <button className={style.btnAjukan}>Ajukan</button>
                        </Link>
                    </div>
                </main>
            </div>
        </>
    )
}