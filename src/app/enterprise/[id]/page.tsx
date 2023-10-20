/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { db } from '@/firebaseConfig'
import { Enterprise } from '@/utils/types'
import { AddPrefixToKeys, collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

type ParamsType = {
    id: string
}

const EnterpriseIdPage = () => {
    const router = useRouter()
    const params: ParamsType = useParams()
    const enterpriseCollection = collection(db, "enterprise")
    const [enterprise, setEnterprise] = useState<Enterprise>();
    useEffect(() => {
        const getEnterprise = async () => {
            try {
                const data = await getDocs(enterpriseCollection)
                const onlyData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                const info = onlyData.find(info => info.id === params.id)
                setEnterprise(info)
            } catch (error) {
                console.log(error);
            }
        }
        getEnterprise()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setEnterprise({ ...enterprise, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (enterprise) {
            await updateDoc(doc(db, "enterprise", params.id), enterprise as any)
            setTimeout(() => {
                router.push("/enterprise")
            }, 2000)
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className="insert-form" action="">
                <h1 className='font-semibold text-slate-900 text-center mt-3'>Edit enterprise</h1>
                <div>
                    <label htmlFor="">Name:</label>
                    <input onChange={handleChange} value={enterprise?.name} className='input' name="name" type="text" placeholder='name' />
                </div>

                <div>
                    <label htmlFor="">Nit:</label>
                    <input onChange={handleChange} value={enterprise?.NIT} className='input' name="NIT" type="text" placeholder='description' />
                </div>
                <div>
                    <label htmlFor="">Address:</label>
                    <input onChange={handleChange} value={enterprise?.address} className='input' name="address" type="text" placeholder='amount' />
                </div>
                <div>
                    <label htmlFor="">Phone:</label>
                    <input onChange={handleChange} value={enterprise?.phone} className='input' name="phone" type="text" placeholder='price' />
                </div>
                <button className='btn-success' type='submit'>Edit</button>
            </form>
        </>
    )
}

export default EnterpriseIdPage
