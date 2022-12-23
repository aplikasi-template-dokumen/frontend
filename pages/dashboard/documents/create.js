import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Navbar from '../../../components/Navbar'
import style from '../../../styles/Admin.module.css'

export default function DashboardCreateDocuments() {
    useEffect(() => {}, [])

    return(
        <div className='main-container'>
            <Head>
                <title>TemplateKita</title>
                <meta name="description" content="TemplateKita" />
                <link rel="icon" href="/tab-icon.png" />
            </Head>
            
            <Navbar />
        </div>
    )
}