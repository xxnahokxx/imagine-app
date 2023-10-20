/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { db } from '@/firebaseConfig';
import { Product } from '@/utils/types';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type ParamsType = {
    id: string
}

const ProductIdPage = () => {
    const router = useRouter()
    const params: ParamsType = useParams()
    const productCollection = collection(db, "product")
    const [product, setProduct] = useState<Product>();
    useEffect(() => {
        const getProduct = async () => {
            try {
                const data = await getDocs(productCollection)
                const onlyData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
                const info = onlyData.find(info => info.id === params.id)
                setProduct(info)
            } catch (error) {
                console.log(error);
            }
        }
        getProduct()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProduct({ ...product, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (product) {
            await updateDoc(doc(db, "product", params.id), product)
            setTimeout(() => {
                router.push("/product")
            }, 2000)
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="insert-form" action="">
                <h1 className='font-semibold text-slate-900 text-center mt-3'>Edit product</h1>
                <div>
                    <label htmlFor="">Name:</label>
                    <input onChange={handleChange} value={product?.name} className='input' name="name" type="text" placeholder='name' />
                </div>

                <div>
                    <label htmlFor="">Description:</label>
                    <input onChange={handleChange} value={product?.description} className='input' name="description" type="text" placeholder='description' />
                </div>
                <div>
                    <label htmlFor="">Amount:</label>
                    <input onChange={handleChange} value={product?.amount} className='input' name="amount" type="text" placeholder='amount' />
                </div>
                <div>
                    <label htmlFor="">Price:</label>
                    <input onChange={handleChange} value={product?.price} className='input' name="price" type="text" placeholder='price' />
                </div>
                <button className='btn-success' type='submit'>Edit</button>
            </form>
        </>
    )
}

export default ProductIdPage
