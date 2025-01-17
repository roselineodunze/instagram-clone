import AuthForm from './components/AuthForm'
import { useEffect, useState } from 'react'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className='flex px-4 justify-center items-center min-h-[100vh]'>
      <div className='max-w-[756px] flex gap-5 items-center'>
        <div className='hidden sm:block'>
          <img src='/auth.png' />
        </div>
        <div>
          <AuthForm isLogin={isLogin}/>
          <div className='border border-gray-800 font-semibold mt-4 flex items-center justify-center gap-1 h-16 rounded-md'>
            <p className='  '> {isLogin ? "Don't have an account?" : "Do you have an account?"}</p>
            <p className='text-gray-500 cursor-pointer' onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Signup" : "Login"}
            </p>
          </div>
          <p className='text-center my-3 font-semibold '>Get the app.</p>
          <div className='flex gap-3 items-center'>
            <img src='/playstore.png' className='h-12 w-[50%]'/>
            <img src='/microsoft.png' className='h-12 w-[50%]' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage