import style from '../../styles/Templates.module.css'
import Navbar from '../../components/Navbar'
import Link from 'next/link'

export default function SubmissionDetail() {
    return(
        <>
            <Navbar />

            <div className={style.container}>
                <Link className='backBtn' href='/submissions'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Daftar Template Ajuan</Link>

                <main>
                    <h1>Review: Judul Template</h1>
                    <hr />

                    <div className={style.info}>
                        <img src='/img-surat.png' alt='image' />

                        <form>
                                <div>
                                    <h4>Judul Template</h4>
                                    <p>: Lorem ipsum dolor sit amet</p>
                                </div>
                                
                                <div>
                                    <h4>Deskripsi</h4>
                                    <p>: Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet, lorem ipsum dolor sit amet </p>
                                </div>

                                <div>
                                    <h4>Kategori</h4>
                                    <p>: Lorem ipsum dolor sit amet</p>
                                </div>

                                <div>
                                    <h4>Sub Kategori</h4>
                                    <p>: Lorem ipsum dolor sit amet</p>
                                </div>

                                <div>
                                    <h4>Kontributor</h4>
                                    <p>: Lorem ipsum dolor sit amet</p>
                                </div>

                                <div>
                                    <h4>Catatan</h4>
                                    <p>: Lorem ipsum dolor sit amet</p>
                                </div>
                            </form>
                    </div>
                    
                </main>
            </div>
        </>
    )
}