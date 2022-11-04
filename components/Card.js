import Link from 'next/link'
import style from '../styles/Card.module.css'

export default function Card(data) {
    console.log('Card Data: ', data)
    return (
        <>
            <div id={data.data.id} className={style.container}>
                {/* <Link href={`/dokumen/${data.data.id}`}>
                    <img src={data.data.img} alt="image" />
                    <p>{data.data.title}</p>
                </Link> */}

                <Link href={`/rahmams/dokumen/${data.data.id}`}>
                    <img src={data.data.img} alt="image" />
                    <p>{data.data.title}</p>
                </Link>
            </div>
        </>
    )
}