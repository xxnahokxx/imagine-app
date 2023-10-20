"use client"
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from '@/firebaseConfig';
import { useEffect, useState } from 'react';


export default function Home() {

  const [enterprise, setEnterprise] = useState<any>();

  const enterpriseCollectionRef = collection(db, "enterprise");

  useEffect(() => {
    const getEnterprise = async () => {
      try {
        const data = await getDocs(enterpriseCollectionRef);
        const onlyData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        setEnterprise(onlyData);
      } catch (error) {
        console.log(error);
      }

    }
    getEnterprise()
  }, [])

  return (
    <>
    </>
  )
}
