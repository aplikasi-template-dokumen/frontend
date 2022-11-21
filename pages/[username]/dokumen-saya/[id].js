import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function DetailDokumenSaya() {
    const user = typeof window !== 'undefined' ? window.localStorage.getItem('u') : {}
    const router = useRouter()

    useEffect(() => {
        if (user === null) {
            router.push(`/`)
        }
    })
    
    return (
        <></>
    )
}