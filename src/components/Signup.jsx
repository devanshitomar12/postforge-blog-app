import React, {useState} from 'react'
import authService from '../appwrite/auth'
import {Link ,useNavigate} from 'react-router-dom'
import {login} from '../redux/authslice'
import {Button, Input, Logo} from './index.js'
import {useDispatch} from 'react-redux'
import {useForm} from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

  return (
    <div className="flex items-center justify-center my-8">
            <div className={`relative overflow-hidden mx-auto w-full max-w-lg bg-white rounded-2xl p-10 shadow-2xl border border-slate-100`}>
                <div className="absolute top-0 right-0 -m-16 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -m-16 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative">
                <div className="mb-6 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-3xl font-extrabold leading-tight text-slate-800 tracking-tight">Sign up to create account</h2>
                <p className="mt-4 text-center text-sm text-slate-600">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-semibold text-purple-600 transition-all duration-200 hover:text-indigo-600 hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
            {error && <p className="text-red-500 mt-6 text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}

                <form onSubmit={handleSubmit(create)} className="mt-8 relative">
                    <div className='space-y-5'>
                        <Input
                        label="Full Name: "
                        placeholder="Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                        />
                        <Input
                        label="Email: "
                        placeholder="Enter your email"
                        type="email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                "Email address must be a valid address",
                            }
                        })}
                        />
                        <Input
                        label="Password: "
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            required: true,})
                        }
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>

    </div>
  )
}

export default Signup
