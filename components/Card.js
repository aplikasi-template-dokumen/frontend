import Link from 'next/link'
import style from '../styles/Card.module.css'

export default function Card(data) {
    console.log('Card Data: ', data)
    return (
        <>
            <div id={data.data.id} className={style.container}>
                <Link href={`/document/${data.data.id}`}>
                    <img src={data.data.img} alt="image" />
                    <p>{data.data.title}</p>
                </Link>
            </div>
        </>
    )
}