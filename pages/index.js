import Head from 'next/head'
import Navbar from '../components/Navbar'
// import FilterBox from '../components/FilterBox'
import Card from '../components/Card'
import styles from '../styles/Home.module.css'
import stylesFilter from '../styles/Filter.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [documentList, setDocumentList] = useState([])
  const [lang, setLang] = useState([])
  const [cat, setCat] = useState([])
  const [sub, setSub] = useState([])

  const router = useRouter()

  // const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}

  useEffect(() => {
    fetch('http://127.0.0.1:3001/t-all')
      .then((res) => res.json())
      .then((data) => {
        setDocumentList(data.data)
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

  const getDocumentList = async (e, cat_id) => {
    try {
      e.preventDefault()
      if (cat_id == 0) {
        const response = await axios.get(`http://127.0.0.1:3001/t-all`)
        setDocumentList(response.data.data)

        document.getElementById('kategori').value = 0
        setSub([])
      }

      else {
        const response = await axios.get(`http://127.0.0.1:3001/t/cat/${cat_id}`)
        setDocumentList(response.data.data)

        const language = await axios.get(`http://127.0.0.1:3001/l`)
        setLang(language.data.data)

        const subCategories = await axios.get(`http://127.0.0.1:3001/sc/c/${cat_id}`)
        setSub(subCategories.data.data)

        document.getElementById('kategori').value = cat_id
      }
    }

    catch(err) {
      console.log(err)
    }
  }

  const handleSubCategory = async (e) => {
    try {
      e.preventDefault()

      const cat_id = document.getElementById('kategori').value

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

  const handleFilter = async (e) => {
    try {
      e.preventDefault()

      const lang = parseInt(document.getElementById('bahasa').value)
      // const cat = parseInt(document.getElementById('kategori').value)
      const sub_cat = parseInt(document.getElementById('sub-kategori').value)

      // console.log(`${lang} - ${cat} - ${sub_cat}`)

      if (lang == 0 && sub_cat == 0) {
        return
      }

      else {
        const result = await axios.get(`http://localhost:3001/t/filter/${lang}/${sub_cat}`)
        setDocumentList(result.data.data)
        // console.log(result.data.data)
        // console.log('List ', documentList)
      }
    }

    catch(err) {
      console.log(err)
    }
  }

  const handleSearch = async (e, key) => {
    try {
      e.preventDefault()
      const response = await axios.get(`http://127.0.0.1:3001/t/search?key=${key}`)
      console.log('Key: ', key, ' Res: ', response.data.data)
      setDocumentList(response.data.data)
    }

    catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>TemplateKita</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <header className={styles.header}>
        <h1>Selamat Datang di <span>TemplateKita</span></h1>
        <div className='fitur'>
          <div>
            <img src='/images/ft-satu.png' alt='image'/>
            <p><span>Cari template</span> dokumen sesuai kebutuhanmu</p>
          </div>
          <div>
            <img className='largerImg' src='/images/ft-dua.png' alt='image'/>
            <p><span>Buat dokumen</span> berdasarkan template yang kamu pilih</p>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.search}>
          <h1>Cari Template</h1>

          <div className={styles.form}>
            <input id='key' type='text' placeholder='Masukkan kata kunci . . .'/>
            <button onSubmit={(event) => handleSearch(event, document.getElementById('key').value)} onClick={(event) => handleSearch(event, document.getElementById('key').value)}><img className={styles.searchIcon} src='/images/icon-search.png' alt='search-icon' /></button>
          </div>

          <div className={styles.categories}>
            <p id='semua-kategori' onClick={(event) => getDocumentList(event, 0)}>Semua Kategori</p>
            <p id='surat' onClick={(event) => getDocumentList(event, 1)}>Surat</p>
            <p id='proposal' onClick={(event) => getDocumentList(event, 2)}>Proposal</p>
            <p id='laporan' onClick={(event) => getDocumentList(event,3)}>Laporan</p>
            <p id='tugas' onClick={(event) => getDocumentList(event, 4)}>Tugas</p>
            <p id='karya-tulis' onClick={(event) => getDocumentList(event, 5)}>Karya Tulis Ilmiah</p>
          </div>
        </div>

        <div className={`${styles.content} ${styles.bgSample}`}>
          <div className={styles.filterBox}>
            <div className={stylesFilter.container}>
              <h2>Filter Dokumen</h2>

              <form>
                <p>Bahasa</p>
                <select id='bahasa'>
                  <option value={0}>Pilih Bahasa</option>
                  {lang.length == 0 ? <option>Loading...</option> : lang.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>

                <p>Kategori</p>
                <select id='kategori' onChange={(event) => handleSubCategory(event)}>
                  <option value={0}>Pilih Kategori</option>
                  {cat.length == 0 ? <option>Loading...</option> : cat.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>

                <p>Sub Kategori</p>
                <select id='sub-kategori'>
                  {/* <option value={0}>Pilih Sub Kategori</option> */}
                  {sub.length == 0 ? <option value={0}>Pilih Sub Kategori</option> : sub.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>

                <button onClick={(event) => handleFilter(event)}>Filter</button>
              </form>
            </div>
          </div>

          <div className={styles.cards}>
            { documentList.length == 0 ? "Loading . . ." : documentList.map((item) => <Card key={item.id} data={item} />) }
          </div>
        </div>
      </main>
    </div>
  )
}