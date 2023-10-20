"use client"
import { db } from '@/firebaseConfig';
import { Product } from '@/utils/types';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ProductPage = () => {

  const router = useRouter();
  const [products, setProducts] = useState<Product[]>();
  const productsCollections = collection(db, "product")

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await getDocs(productsCollections)
        const onlyData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setProducts(onlyData)
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, [])

  const deleteProduct = async (id : string) => {
    await deleteDoc(doc(db, "product", id))
  }

  return (
    <>
      <div className='flex flex-wrap gap-5 p-6 container mx-auto'>

        {products?.map(prod =>
          <div className='flex flex-col bg-slate-500 min-w-[300px] max-w-[400px] p-7 rounded-xl gap-2' key={prod.id}>

            <div className='flex justify-between'>
              <h3>Name:</h3>
              <h1> {prod.name}</h1>
            </div>
            <div className='flex justify-between'>
              <h3>Description:</h3>
              <p> {prod.description}</p>
            </div>
            <div className='flex justify-between'>
              <h3>Amount:</h3>
              <p> {prod.amount}</p>
            </div>
            <div className='flex justify-between'>
              <h3>Price:</h3>
              <p> {prod.price}</p>
            </div>
            <div className='flex justify-between'>
              <h3>Enterprise:</h3>
              <p> {prod.enterprise}</p>
            </div>

            <div className='flex justify-around '>
              <button className='btn-warning' onClick={()=> router.push(`/product/${prod.id}`)} >Edit</button>
              <button className='btn-danger' onClick={()=> deleteProduct(prod.id ?? "")} >Delete</button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default ProductPage
