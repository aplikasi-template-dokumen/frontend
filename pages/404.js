import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
    return(
        <div className='not-found-container'>
            <Head>
                <title>TemplateKita</title>
                <meta name="description" content="TemplateKita" />
                <link rel="icon" href="/tab-icon.png" />
            </Head>
            
            <div className='not-found-box'>
                <h1>404</h1>
                <h3>Halaman tidak ditemukan!</h3>
            </div>

            <Link href='/'>Ke Halaman utama</Link>
        </div>
    )
}