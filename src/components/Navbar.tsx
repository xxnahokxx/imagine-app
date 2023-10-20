"use client"
import Link from 'next/link'
import React from 'react'
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { auth } from '@/firebaseConfig'
import { useAuthState } from 'react-firebase-hooks/auth'

const NavbarComponent = () => {

    const router = useRouter()
    const [user, loading, error] = useAuthState(auth)

    const logout = async () => {
        try {
            await signOut(auth)
            router.push('/login')
        } catch (error) {
            console.error('Error al cerrar sesión', error)
        }
    }

    if (!loading && !user) {
        router.push("/login")
    }

    return (
        <>
           {!loading && user && <div className='w-full bg-gray-500/40 '>
                <div className='flex justify-between py-4 container px-12 mx-auto'>
                    <div>
                        <h1>IMAGINE.app</h1>

                    </div>
                    <div className="flex gap-6">
                        <ul className='flex gap-8'>
                            <Link href="/product"><li>Products</li></Link>
                            <Link href="/addProduct"><li>new product</li></Link>
                            <Link href="/enterprise"><li>Enterprise</li></Link>
                            <Link href="/addEnterprise"><li>new enterprise</li></Link>
                        </ul>
                        <button onClick={logout}>Logout</button>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default NavbarComponent
