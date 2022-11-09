import style from '../styles/Dashboard.module.css'

export default function DataTable(type) {
    console.log("Type: ", type)
    if (type.type === 'user') {
        return (
            <div>
                <table>
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
                </table>
            </div>
        )
    }

    else if (type.type === 'dokumen') {
        return (
            <div>
                <table>
                    <tr>
                        <td>No</td>
                        <td>Id Dokumen</td>
                        <td>Id User</td>
                        <td>Judul</td>
                        <td>Tgl Dibuat</td>
                        <td>Tgl Diperbarui</td>
                        <td>Aksi</td>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>118</td>
                        <td>rms134</td>
                        <td>Proposal Kegiatan Bulan Bahasa Tahun 2022</td>
                        <td>10/08/22</td>
                        <td>17/10/22</td>
                        <td><button className={style.btnEdit}>Lihat</button></td>
                        <td><button>Hapus</button></td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>119</td>
                        <td>rdms57</td>
                        <td>Laporan PKL 2022</td>
                        <td>10/08/22</td>
                        <td>17/10/22</td>
                        <td><button className={style.btnEdit}>Lihat</button></td>
                        <td><button>Hapus</button></td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>120</td>
                        <td>rdms57</td>
                        <td>Surat Peminjaman Ruangan Ekskul PMR</td>
                        <td>10/08/22</td>
                        <td>17/10/22</td>
                        <td><button className={style.btnEdit}>Lihat</button></td>
                        <td><button>Hapus</button></td>
                    </tr>
                </table>
            </div>
        )
    }

    else if (type.type === 'template') {
        return (
            <div>
                <table>
                    <tr>
                        <td>No</td>
                        <td>Id Template</td>
                        <td>Judul</td>
                        <td>Status</td>
                        <td>Kontributor</td>
                        <td>Tgl Dibuat</td>
                        <td>Tgl Diperbarui</td>
                        <td>Aksi</td>
                    </tr>

                    <tr>
                        <td>1</td>
                        <td>73</td>
                        <td>Proposal Kegiatan</td>
                        <td>Publish</td>
                        <td>rahmams68</td>
                        <td>10/08/22</td>
                        <td>17/10/22</td>
                        <td><button className={style.btnEdit}>Lihat</button></td>
                        <td><button>Hapus</button></td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>74</td>
                        <td>Surat Izin</td>
                        <td>Publish</td>
                        <td>rumikaadms</td>
                        <td>10/08/22</td>
                        <td>17/10/22</td>
                        <td><button className={style.btnEdit}>Lihat</button></td>
                        <td><button>Hapus</button></td>
                    </tr>
                </table>
            </div>
        )
    }

    else if (type.type === 'ajuan') {
        return (
            <div>
                <table>
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
                </table>
            </div>
        )
    }
}