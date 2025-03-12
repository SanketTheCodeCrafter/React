import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Logo, Input, Button } from '../components/index'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'

function SignUp() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(login(userData))
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[80vh] px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <div className="text-center">
                    <div className="mb-6 inline-flex justify-center">
                        <Logo width="80px" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Create your account
                    </h2>
                    <p className="text-gray-600 text-sm">
                        Already have an account?{" "}
                        <Link 
                            to="/login"
                            className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg text-center text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit(create)} className="mt-8 space-y-6">
                    <div className="space-y-5">
                        <Input 
                            label="Full Name"
                            placeholder="John Doe"
                            {...register("name", {
                                required: true,
                                minLength: 3
                            })}
                        />
                        <Input 
                            label="Email"
                            type="email"
                            placeholder="john@example.com"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => 
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Please enter a valid email address"
                                }
                            })}
                        />
                        <Input 
                            label="Password"
                            type="password"
                            placeholder="Create a strong password"
                            {...register("password", {
                                required: true,
                                minLength: 6
                            })}
                        />
                    </div>

                    <Button
                        type="submit"
                        className={`w-full py-3 text-base font-medium rounded-lg transition-all duration-200 
                            ${loading 
                                ? 'bg-gray-200 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800'
                            } text-white shadow-sm`}
                        disabled={loading}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                                <span>Creating your account...</span>
                            </div>
                        ) : (
                            "Create Account"
                        )}
                    </Button>

                    <p className="text-center text-sm text-gray-600 mt-4">
                        By signing up, you agree to our{" "}
                        <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                            Privacy Policy
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp