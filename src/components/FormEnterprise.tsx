"use client"
import { db } from '@/firebaseConfig';
import { Enterprise } from '../utils/types';
import enterpriseValidation from '@/validations/enterpriseValidation'
import {  addDoc, collection, doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const FormEnterprise = () => {

    const [info, setInfo] = useState<Enterprise>({});
    const [error, setError] = useState<Enterprise>({});
    const [result, setResult] = useState<string>();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setInfo({ ...info, [name]: value });
    }

    // const enterpriseCollection = collection(db, "enterprise")

    useEffect(() => {
        setError(enterpriseValidation(info))
    },[info])

    const handleInput = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const arErrors = Object.values(error).length;
        console.log(arErrors);

        if (arErrors === 0) {
            info.NIT && await setDoc(doc(db, "enterprise", info.NIT), info);
            setResult("Success")
            location.reload()
        } else {
            setResult("Verifica los datos ingresados")
        }
    }

    return (
        <>
            <form onSubmit={handleInput} className='insert-form' action="">
                <h1 className='font-semibold text-slate-900 text-center mt-3'>Enterprise create</h1>
                <input onChange={handleChange} name="name" value={info.name} className='input' type="text" placeholder='name...' />
                {error?.name && <span className='text-[#ff0000] font-bold text-[1rem]'>{error.name}</span>}
                <input onChange={handleChange} name="address" value={info.address} className='input' type="text" placeholder='address...' />
                {error?.address && <span className='text-[#ff0000] font-bold text-[1rem]'>{error.address}</span>}
                <input onChange={handleChange} name="NIT" value={info.NIT} className='input' type="text" placeholder='NIT...' />
                {error?.NIT && <span className='text-[#ff0000] font-bold text-[1rem]'>{error.NIT}</span>}
                <input onChange={handleChange} name="phone" value={info.phone} className='input' type="text" placeholder='telephone number...' />
                {error?.phone && <span className='text-[#ff0000] font-bold text-[1rem]'>{error.phone}</span>}
                <button className="btn-success" type='submit'>create</button>
            </form>
            {<span>{result}</span>}
        </>
    )
}

export default FormEnterprise
