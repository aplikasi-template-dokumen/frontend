import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const [documentList, setDocumentList] = useState([])
  const [lang, setLang] = useState([])
  const [cat, setCat] = useState([])
  const [sub, setSub] = useState([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/t-all`)
      .then((res) => res.json())
      .then((data) => {
        setDocumentList(data.data)
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

  const getDocumentList = async (e, cat_id) => {
    try {
      e.preventDefault()
      if (cat_id == 0) {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/t-all`)
        setDocumentList(response.data.data)

        document.getElementById('kategori').value = 0
        setSub([])
      }

      else {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/t/cat/${cat_id}`)
        setDocumentList(response.data.data)

        const language = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/l`)
        setLang(language.data.data)

        const subCategories = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sc/c/${cat_id}`)
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
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sc/c/${cat_id}`)

        
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
      const sub_cat = parseInt(document.getElementById('sub-kategori').value)

      if (lang == 0 && sub_cat == 0) {
        return
      }

      else {
        const result = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/t/filter/${lang}/${sub_cat}`)
        setDocumentList(result.data.data)
      }
    }

    catch(err) {
      console.log(err)
    }
  }

  const handleSearch = async (e, key) => {
    try {
      e.preventDefault()
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/t/search?key=${key}`)
      // console.log(response.data.status)

      if (response.data.status == 404) {
        setDocumentList([])
      }

      else {
        setDocumentList(response.data.data)
      }
    }

    catch(err) {
      console.log(err)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>TemplateKita</title>
        <meta name="description" content="TemplateKita" />
        <link rel="icon" href="/tab-icon.png" />
      </Head>

      <Navbar />

      <header>
        <h1>Selamat Datang di <span>TemplateKita</span></h1>

        <div className='features'>
          <div>
            <a href='#search'>
              <img src='/images/ft-satu.png' alt='image'/>
              <p><span>Cari template</span> dokumen sesuai kebutuhanmu</p>
            </a>
          </div>

          <div>
            <Link href={'/my/documents'}>
              <img className='largerImg' src='/images/ft-dua.png' alt='image'/>
              <p><span>Buat dokumen</span> berdasarkan template yang kamu pilih</p>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <div id='search' className={styles.searchContainer}>
          <h1>Cari Template</h1>

          <div className={styles.searchForm}>
            <input id='key' type='text' placeholder='Masukkan kata kunci . . .'/>
            <button className='btn lightblue-btn' onSubmit={(event) => handleSearch(event, document.getElementById('key').value)} onClick={(event) => handleSearch(event, document.getElementById('key').value)}><img className={styles.searchIcon} src='/images/icon-search.png' alt='search-icon' /></button>
          </div>

          <div className={styles.categories}>
            <p id='semua-kategori' onClick={(event) => getDocumentList(event, 0)}>Semua Kategori</p>
            { cat.length == 0 ? '' : cat.map((item) => <p key={item.id} onClick={(event) => getDocumentList(event, item.id)}>{item.name}</p>) }
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.filterBox}>
              <h2>Filter Template</h2>

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
                  {sub.length == 0 ? <option value={0}>Pilih Sub Kategori</option> : sub.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                </select>

                <button className='btn blue-btn' onClick={(event) => handleFilter(event)}>Filter</button>
              </form>
          </div>

          <div className={styles.cards}>
            { documentList.length == 0 ? "Template tidak ditemukan . . ." : documentList.map((item) => <Card key={item.id} data={item} />) }
          </div>
        </div>
      <Footer/>
      </main>
    </div>
  )
}