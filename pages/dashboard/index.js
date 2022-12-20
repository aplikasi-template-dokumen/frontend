import Head from 'next/head'
import Link from 'next/link'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import style from '../../styles/Admin.module.css'

export default function Dashboard() {
    return(
        <>
            <Head>
                <title>TemplateKita</title>
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

                        <Link className={style.card} href='/dashboard/others'>
                            <p>Lainnya</p>
                            {/* <p>Role, Pekerjaan, Status Ajuan, Bahasa</p> */}
                        </Link>
                    </div>
                </main>
            </div>

            <Footer />
        </>
    )
}