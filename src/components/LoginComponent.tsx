/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { auth } from '@/firebaseConfig'
import { loginValidation } from '@/validations/loginValidation'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

export type Login = {
    user?: string
    password?: string
}

const LoginComponent = () => {

    const router = useRouter()
    const [user, loading, error] = useAuthState(auth)
    const [login, setLogin] = useState<Login>(
        {
            user: "",
            password: "",
        }
    )
    const [errorForm, setErrorForm] = useState<Login>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setLogin({ ...login, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setErrorForm(loginValidation(login))
        try {
            if (login.user && login.password) {
                signInWithEmailAndPassword(auth, login.user, login.password)
            }
        } catch (error) {
            console.log("verifica los datos ingresados");

        }
    }

    console.log(loading);

    useEffect(() => {
        if (user) {
            router.push('/addEnterprise');
        }
    }, [user, loading]);


    return (
        <>
            <form onSubmit={handleSubmit} action="" className='flex flex-col bg-slate-400 w-[300px] px-6 pb-10 gap-6 border-transparent rounded-lg mt-6 mx-auto'>
                <h1 className='text-center font-medium text-xl mt-5'>Sign In</h1>
                <input className={`px-3 py-1.5`} onChange={handleChange} name="user" type="text" placeholder='User' />
                {errorForm?.user && <span className='text-[#ff0000] font-bold text-[1rem]'>{errorForm.user}</span>}
                <input className={`px-3 py-1.5`} onChange={handleChange} name="password" type="password" placeholder='password' />
                {errorForm?.password && <span className='text-[#ff0000] font-bold text-[1rem]'>{errorForm.password}</span>}
                <button className='btn-success'>Login</button>
            </form>
        </>
    )
}

export default LoginComponent
