import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import style from '../../styles/Admin.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Dashboard() {
    const router = useRouter()

    useEffect(() => {
        const t = window.localStorage.getItem('t')

        if (t == undefined) {
            router.push('/')
        }
    }, [])

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
                    <Link className='backBtn' href='/'><img src='/images/icon-back.png' alt='back-btn' className='backImg' />Kembali ke Halaman Utama</Link>

                    <h1>Dashboard Admin</h1>
                    <hr />

                    <div className={style.cards}>
                        <Link className={style.card} href='/dashboard/users'>
                            <img src='/images/icon-d-user.png' alt='icon' />
                            <p>User</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/documents'>
                            <img src='/images/icon-d-documents.png' alt='icon' />
                            <p>Dokumen</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/templates'>
                            <img src='/images/icon-d-template.png' alt='icon' />
                            <p>Template</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/categories'>
                            <img src='/images/icon-d-categories.png' alt='icon' />
                            <p>Kategori dan Sub Kategori</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/roles'>
                            <img src='/images/icon-d-roles.png' alt='icon' />
                            <p>Role</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/occupations'>
                            <img src='/images/icon-d-occupations.png' alt='icon' />
                            <p>Pekerjaan</p>
                        </Link>
                        
                        <Link className={style.card} href='/dashboard/submission-statuses'>
                            <img src='/images/icon-d-statuses.png' alt='icon' />
                            <p>Status Ajuan</p>
                        </Link>
                        
                        <Link className={style.card} href='/dashboard/languages'>
                            <img src='/images/icon-d-languages.png' alt='icon' />
                            <p>Bahasa</p>
                        </Link>

                        {/* <Link className={style.card} href='/dashboard/others'> */}
                            {/* <p>Lainnya</p> */}
                            {/* <p>Role, Pekerjaan, Status Ajuan, Bahasa</p> */}
                        {/* </Link> */}
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    )
}