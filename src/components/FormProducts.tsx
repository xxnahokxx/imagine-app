/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { db } from '@/firebaseConfig';
import { Enterprise, Product } from '@/utils/types';
import productValidation from '@/validations/productValidation';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'

const FormProducts = () => {
    const [product, setProduct] = useState<Product>({});
    const [enterprise, setEnterprise] = useState<Enterprise[]>();
    const [result, setResult] = useState<string>("");
    const [error, setError] = useState<Product>({});
    const productCollection = collection(db, "product")
    const enterpriseCollection = collection(db, "enterprise")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    useEffect(() => {
        const getEnterprise = async () => {
            const data = await getDocs(enterpriseCollection)
            const onlyData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setEnterprise(onlyData)
        }
        getEnterprise()
        setError(productValidation(product))
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const arError = Object.values(error).length;
        if (arError === 0) {
            await addDoc(productCollection, product)
            setResult("Product success")
            setTimeout(() => {
                location.reload()
            }, 3000)
        } else {
            setResult("Product error")
        }
    }

    console.log(product);


    return (
        <>
            <form onSubmit={handleSubmit} className="insert-form" action="">
                <h1 className='font-semibold text-slate-900 text-center mt-3'>Create product</h1>
                <div>
                    <label htmlFor="enterprise">Enterprise:</label>
                    <select className='w-full text-center rounded-lg py-2' onChange={handleChange} name="enterprise">
                        <option value="">selecciona una opción</option>
                        {enterprise?.map(el => <option key={el.id} value={el.name}>{el.name}</option>)}
                    </select>
                </div>
                <div className='w-full p-0 flex flex-col'>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleChange} className='input' name="name" type="text" placeholder='write a name' />
                    {error?.name && <span className='text-[#ff0000] font-bold text-[1rem]'>{error.name}</span>}
                </div>
                <div className='w-full p-0 flex flex-col'>
                    <label htmlFor="amount">Amount</label>
                    <input onChange={handleChange} className='input' name="amount" type="text" placeholder='insert an amount' />
                    {error?.amount && <span className='text-[#ff0000] font-bold text-[1rem]'>{error.amount}</span>}
                </div>
                <div className='w-full p-0 flex flex-col'>
                    <label htmlFor="price">Price</label>
                    <input onChange={handleChange} className='input' name="price" type="text" placeholder='insert a price' />
                    {error?.price && <span className='text-[#ff0000] font-bold text-[1rem]'>{error.price}</span>}
                </div>
                <div className='w-full p-0 flex flex-col'>
                    <label htmlFor="description">Description</label>
                    <input onChange={handleChange} className='input' name="description" type="text" placeholder='write a description' />
                    {error?.description && <span className='text-[#ff0000] font-bold text-[1rem]'>{error.description}</span>}
                </div>
                <button className='btn-success' type='submit'>Create</button>
            </form>
            {result && <span>{result}</span>}
        </>
    )
}

export default FormProducts
