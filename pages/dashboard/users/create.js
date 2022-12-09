import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import style from '../../../styles/Admin.module.css'

export default function DashboardCreateUsers() {
    useEffect(() => {}, [])

    return(
        <div className='main-container'>
            <Head>
                <title>TemplateKita</title>
            </Head>
            
            <Navbar />
        </div>
    )
}