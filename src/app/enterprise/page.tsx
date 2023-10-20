"use client"
import { db } from '@/firebaseConfig'
import { Enterprise } from '@/utils/types'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const EnterprisePage = () => {
    const [company, setCompany] = useState<Enterprise[]>()
    const companyCollections = collection(db, "enterprise")
    const getCompany = async () => {
        const data = await getDocs(companyCollections)
        const onlyData = data.docs.map(doc => ({ ...doc.data(), id: doc.id }))
        setCompany(onlyData)
    }

    useEffect(() => {
        getCompany()
    }, [])

    const deleteEnterprise = async (id: string) => {
        await deleteDoc(doc(db, "enterprise", id))
        getCompany()
    }

    return (
        <div>
            <h1 className='text-center font-bold text-[30px]'>Enterprise list</h1>

            <div className='flex flex-wrap container mx-auto gap-4 mt-6'>
                {company?.map(el =>
                    <div key={el.id} className='flex flex-col items-center w-[300px] bg-slate-500 rounded-lg p-6'>
                        <h1 className='font-bold text-[20px]'>{el.name}</h1>
                        <div className='flex justify-between w-full'>
                            <h3 className='font-semibold text-[18px]'>Nit: </h3>
                            <p>{el.NIT}</p>
                        </div>
                        <div className='flex justify-between w-full'>
                            <h3 className='font-semibold text-[18px]'>Address: </h3>
                            <p>{el.address}</p>
                        </div>
                        <div className='flex justify-between w-full'>
                            <h3 className='font-semibold text-[18px]'>Phone: </h3>
                            <p>{el.phone}</p>
                        </div>
                        <div className='flex justify-between w-full'>
                            <button className='btn-warning'>Edit</button>
                            <button className='btn-danger' onClick={() => deleteEnterprise(el.id ?? "")}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default EnterprisePage
