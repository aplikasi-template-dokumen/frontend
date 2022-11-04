import style from '../../../styles/Profile.module.css'
import NavbarLogin from "../../../components/NavbarLogin"
import Link from 'next/link'

export default function GantiPassword() {
    return (
        <>
            <NavbarLogin />

            <div className={style.container}>
                <img src='/images/sample-profile.png' />

                <p>Password Lama</p>
                <input type='password' required />

                <p>Password Baru</p>
                <input type='password' required />

                <p>Konfirmasi Password Baru</p>
                <input type='password' required />
                
                <div className={style.btn}>
                    <button className={style.fullWidth}>Simpan</button>
                </div>
            </div>
        </>
    )
}