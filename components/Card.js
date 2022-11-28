import Link from 'next/link'
import style from '../styles/Card.module.css'

export default function Card(data) {
    // const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}

    // console.log('Card Data: ', data)s
    return (
        <>
            <div id={data.data.id} className={style.container}>
                <Link href={`/templates/${data.data.id}`}>
                    <img src={data.data.img} alt="image" />
                    <p>{data.data.title}</p>
                </Link>

                {/* <Link href={`/${user}/templates/${data.data.id}`}>
                    <img src={data.data.img} alt="image" />
                    <p>{data.data.title}</p>
                </Link> */}
            </div>
        </>
    )
}