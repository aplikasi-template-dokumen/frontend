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
                    <div className={style.cards}>
                        <Link className={style.card} href='/dashboard/users'>
                            <p>User</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/documents'>
                            <p>Dokumen</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/templates'>
                            <p>Template</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/categories'>
                            <p>Kategori dan Sub Kategori</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/roles'>
                            <p>Role</p>
                        </Link>

                        <Link className={style.card} href='/dashboard/occupations'>
                            <p>Pekerjaan</p>
                        </Link>
                        
                        <Link className={style.card} href='/dashboard/submission-statuses'>
                            <p>Status Ajuan</p>
                        </Link>
                        
                        <Link className={style.card} href='/dashboard/languages'>
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