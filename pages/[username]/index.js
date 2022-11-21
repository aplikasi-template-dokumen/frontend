import Head from 'next/head'
import NavbarLogin from '../../components/NavbarLogin'
import FilterBox from '../../components/FilterBox'
import Card from '../../components/Card'
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function HomeLogin() {
  const [documentList, setDocumentList] = useState([])
  const router = useRouter()

  const changeSelectedCategory = (e, category) => {
    console.log(category);
  }

  const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}

  useEffect(() => {
    if (user === null) {
      router.push('/')
    }

    fetch('http://localhost:3000/api/documents/semua-kategori')
      .then((res) => res.json())
      .then((data) => {
        setDocumentList(data)
      })
    // console.log("List:", documentList)
  }, [])

  const getDocumentList = async (e, category) => {
    try {
      e.preventDefault()
      const respone = await axios.get(`http://localhost:3000/api/documents/${category}`)
      setDocumentList(respone.data)
      console.log('List ', category, ': ', documentList)
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

      <NavbarLogin />

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
            <input id='keyword' type='text' placeholder='Masukkan kata kunci . . .'/>
            <button><img className={styles.searchIcon} src='/images/icon-search.png' /></button>
          </div>

          <div className={styles.categories}>
            <p id='semua-kategori' onClick={(event) => getDocumentList(event,'semua-kategori')}>Semua Kategori</p>
            <p id='surat' onClick={(event) => getDocumentList(event,'surat')}>Surat</p>
            <p id='proposal' onClick={(event) => getDocumentList(event,'proposal')}>Proposal</p>
            <p id='laporan' onClick={(event) => getDocumentList(event,'laporan')}>Laporan</p>
            <p id='tugas' onClick={(event) => getDocumentList(event,'tugas')}>Tugas</p>
            <p id='karya-tulis' onClick={(event) => getDocumentList(event,'karya-tulis-ilmiah')}>Karya Tulis Ilmiah</p>
          </div>
        </div>

        <div className={`${styles.content} ${styles.bgSample}`}>
          <div className={styles.filterBox}>
            <FilterBox />
          </div>

          <div className={styles.cards}>
            {/* <h2>Hasil Pencarian</h2> */}
            { documentList.map((item) => <Card key={item.id} data={item} />) }
          </div>
        </div>
      </main>
    </div>
  )
}
