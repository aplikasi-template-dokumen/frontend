import style from '../../../styles/Profile.module.css'
import NavbarLogin from "../../../components/NavbarLogin"
import Link from 'next/link'

export default function Profil() {
    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <img src='/images/sample-profile.png' />
                {/* <a>Ganti Foto</a> */}

                <p>Role</p>
                <input type='text' value='Contributor' disabled />

                <p>Email</p>
                <input type='email' value='rahma.maulida68@gmail.com' disabled />
                
                <p>Nama Lengkap</p>
                <input type='text' value='Rahma Maulida Shaliha' />

                <p>Username</p>
                <input type='text' value='rahmams68' />

                <p>Pekerjaan</p>
                <select>
                    <option>Pelajar</option>
                    <option>Guru</option>
                    <option>Lainnya</option>
                </select>
                
                <div className={style.btn}>
                    <button>Edit Profil</button>
                    <button>Ganti Password</button>
                </div>
            </div>
        </>
    )
}