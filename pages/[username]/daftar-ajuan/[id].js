import NavbarLogin from '../../../components/NavbarLogin'
import style from '../../../styles/Templates.module.css'
import Link from 'next/dist/client/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function DetailTemplateAjuan() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push('/')
        }

        //axios here
    })

    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/rahmams/daftar-ajuan'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Daftar Template Ajuan</Link>

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

                        <div className={style.view}>
                            <div className={style.document}></div>

                            <div className={style.comment}>
                                <h4>Komentar Reviewer</h4>
                                <textarea></textarea>

                                <div className={style.btnGroup}>
                                    <Link href='/' className={style.btn}>
                                        <button>Terima</button>
                                    </Link>

                                    <Link href='/' className={style.btn}>
                                        <button>Tolak</button>
                                    </Link>

                                    <Link href='/' className={style.btn}>
                                        <button>Revisi</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}