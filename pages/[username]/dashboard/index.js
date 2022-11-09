import NavbarLogin from "../../../components/NavbarLogin"
import DataTable from "../../../components/DataTable"
import style from '../../../styles/Dashboard.module.css'
import Link from "next/link"
import { useState } from "react"

export default function Dashboard() {
    const [type, setType] = useState('user')

    function changeType(e, type) {
        e.preventDefault()
        setType(type)
    }

    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <div>
                    <Link className='backBtn' href='/rahmams'><img src='/images/icon-back.png' alt='icon' className='backImg'/>Kembali ke Halaman Utama</Link>
                </div>

                <main>
                    <h1>Dashboard Admin</h1>
                    <hr />
                    
                    <form>
                        <div>
                            <p>Tampilkan Data:</p>

                            <select id="types">
                                <option value='user' onClick={(event) => changeType(event, 'user')}>User</option>
                                <option value='dokumen' onClick={(event) => changeType(event, 'dokumen')}>Dokumen</option>
                                <option value='template' onClick={(event) => changeType(event, 'template')}>Template</option>
                                <option value='ajuan' onClick={(event) => changeType(event, 'ajuan')}>Ajuan</option>
                            </select>
                        </div>

                        <div>
                            <input type='text' placeholder='Masukkan keyword . . .' />
                        </div>
                    </form>

                    <DataTable type={type} />

                    {/* <table>
                        <tr>
                            <td>No</td>
                            <td>Username</td>
                            <td>Email</td>
                            <td>Nama Lengkap</td>
                            <td>Pekerjaan</td>
                            <td>Role</td>
                            <td>Aksi</td>
                        </tr>

                        <tr>
                            <td>1</td>
                            <td>rahmams</td>
                            <td>rahma.maulida68@gmail.com</td>
                            <td>Rahma Maulida Shaliha</td>
                            <td>Mahasiswa</td>
                            <td>Contributor</td>
                            <td><button className={style.btnEdit}>Edit</button></td>
                            <td><button>Hapus</button></td>
                        </tr>

                        <tr>
                            <td>2</td>
                            <td>rumikadms</td>
                            <td>rumikadamayantims@gmail.com</td>
                            <td>Rumika Damayanti Mariani Sitohang</td>
                            <td>Mahasiswa</td>
                            <td>User</td>
                            <td><button className={style.btnEdit}>Edit</button></td>
                            <td><button>Hapus</button></td>
                        </tr>
                        
                        <tr>
                            <td>3</td>
                            <td>rahmams</td>
                            <td>rahma.maulida68@gmail.com</td>
                            <td>Rahma Maulida Shaliha</td>
                            <td>Mahasiswa</td>
                            <td>Contributor</td>
                            <td><button className={style.btnEdit}>Edit</button></td>
                            <td><button>Hapus</button></td>
                        </tr>

                        <tr>
                            <td>4</td>
                            <td>rumikadms</td>
                            <td>rumikadamayantims@gmail.com</td>
                            <td>Rumika Damayanti Mariani Sitohang</td>
                            <td>Mahasiswa</td>
                            <td>User</td>
                            <td><button className={style.btnEdit}>Edit</button></td>
                            <td><button>Hapus</button></td>
                        </tr>
                    </table> */}
                </main>
            </div>
        </>
    )
}