import Navbar from "../../../components/Navbar"
import Footer from "../../../components/Footer"
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

    const [catId, setCatId] = useState(-1)
    const [subId, setSubId] = useState(-1)
    const [langId, setLangId] = useState(-1)

    const [tempImg, setTempImg] = useState(null)

    const currentContent = useRef({})

    // const [id, setId] = useState()
    // const [data, setData] = useState({})

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
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/t/${router.query.id}`)
            .then((res) => res.json())
            .then((val) => {
                setData(val.data)
                setCatId(val.data.cat_id)
                setSubId(val.data.sub_cat_id)
                setLangId(val.data.lang_id)
                document.getElementById('temp-title').innerHTML = val.data.title
                
                fetch(`${process.env.NEXT_PUBLIC_API_URL}/sc/c/${val.data.cat_id}`)
                    .then((res) => res.json())
                    .then((data) => {
                        setSub(data.data)
                    })
            })
        
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/c`)
            .then((res) => res.json())
            .then((data) => {
              setCat(data.data)
            })

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/l`)
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
          setCatId(catId)
    
          if (cat_id == 0) {
            setSub([])
          }
    
          else {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sc/c/${cat_id}`) 
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
        const img = document.getElementById('image').files[0]
        const notes = document.getElementById('notes').value
        
        const formData = new FormData()

        formData.append('title', title)
        formData.append('desc', desc)
        formData.append('lang_id', lang_id)
        formData.append('cat_id', cat_id)
        formData.append('sub_cat_id', sub_cat_id)
        formData.append('img', img)
        formData.append('notes', notes)
        formData.append('data', JSON.stringify(currentContent.current))
        formData.append('status_id', s_id)

        if (s_id == 1 && (title == '' || desc == '')) {
            console.log('Buat draft = Data tidak boleh kosong!')
        }

        // else
        // if (s_id == 2 && (title == '' || desc == '' || img == null)) {
        //     console.log('Ajukan template - Data tidak boleh kosong!')
        // }

        else {
            const id = typeof window !== 'undefined' ? window.localStorage.getItem('i') : {}
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/t/${router.query.id}/edit?u_id=${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })

            console.log(response)

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

    return(
        <>
            <Navbar />

            <div className='main-container'>
                <main>
                    <Link className='backBtn' href='/my/templates'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Template Saya</Link>
                    {/* <h1>Buat Template</h1> */}
                    <h1 id='temp-title'>Loading...</h1>
                    <hr />

                    <div className={style.reqBox}></div>

                    <div className={style.info}>
                        <img src={tempImg == null ? data.img : tempImg} alt='image' />

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
                                { lang.length == 0 ? <select id="lang"><option value={-1}>Pilih Bahasa</option><option>Loading...</option></select> : <select id='lang' value={langId} onChange={(event) => setLangId(event.target.value)}>{ lang.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) }</select> }
                            </div>

                            <div>
                                <p>Kategori</p>
                                { cat.length == 0 ? <select id="cat"><option value={-1}>Pilih Kategori</option><option>Loading...</option></select> : <select id='cat' value={catId} onChange={(event) => handleSubCategory(event)}>{ cat.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) }</select> }
                            </div>

                            <div>
                                <p>Sub Kategori</p>
                                { sub.length == 0 ? <select id="sub"><option value={-1}>Pilih Sub Kategori</option><option>Loading...</option></select> : <select id='sub' value={subId} onChange={(event) => setSubId(event.target.value)}>{ sub.map((item) => <option key={item.id} value={item.id}>{item.name}</option>) }</select> }
                            </div>

                            <div>
                                <p>Gambar Preview</p>
                                <input id="image" type='file' accept="image/png, image/jpeg" defaultValue={data.img} onChange={(event) => handleUploadImage(event)} />
                            </div>

                            <div>
                                <p>Catatan</p>
                                <input id="notes" type='text' defaultValue={data.notes} />
                                {/* <p id="notes">{data.notes}</p> */}
                            </div>
                        </form>
                    </div>

                    <QuillNoSSRWrapper className='text-editor' defaultValue={data.data} onChange={handleChange} modules={modules} placeholder='Type something here . . .' theme='snow' />

                    <div className={style.btnGroup}>
                        <Link href='/' className={style.btn} onClick={(event) => handleSubmit(event, 1)}>
                            <button  className='btn blue-btn'>Simpan</button>
                        </Link>
                        
                        <Link href='/' className={style.btn} onClick={(event) => handleSubmit(event, 2)}>
                            <button className='btn green-btn'>Ajukan</button>
                        </Link>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    )
}