import React, { useState } from 'react'
import { data, Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { Logo, Input, Button } from '../components/index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Login() {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')

    const login = async (data) => {
        setError('')
        setLoading(true) 
        try {
            const session = await authService.login(data.email, data.password)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {

                    dispatch(authLogin(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%' />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">LogIn to your account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don't have an account?
                    <Link
                        to="/signup"
                        className="font-medium text-primary transition-all duration-200 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form className='mt-8' onSubmit={handleSubmit(login)}>
                    <div className='space-y-5'>
                        <Input
                            label="Email"
                            placeholder="Enter your email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />

                        <Input
                            label="Password"
                            placeholder="Enter your password"
                            type="password"
                            {...register('password', {
                                required: true,
                                minLength: 6,
                            })}
                        />

                    <Button
                        type="submit"
                        className={`w-full transition-all duration-200 ${
                            loading 
                                ? 'bg-gray-400 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                        } text-white font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center justify-center`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                Signing in...
                            </div>
                        ) : (
                            'LogIn'
                        )}
                    </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login