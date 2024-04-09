import React from 'react'
import { Button, Label, TextInput } from 'flowbite-react'
import { Link } from 'react-router-dom'
export default function SignUp() {
  return <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
      {/* left */}
      <div className='flex-1'>
        <Link to="/" className='font-bold dark:text-white text-4xl'>
          <span className='px-2 py-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-lg text-white'>My</span>
          Blog
        </Link>
        <p className='text-sm mt-5'>
          这是我的博客，可以使用的邮箱和密码注册
        </p>
      </div>
      {/* right */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4'>
          <div>
            <Label value='你的用户名'/>
            <TextInput type='text'
            placeholder='用户名'
            id='username'/>
          </div>
          <div className=''>
            <Label value='你的邮箱'/>
            <TextInput type='text'
            placeholder='name@youremail.com'
            id='email'/>
          </div>
          <div className=''>
            <Label value='你的密码'/>
            <TextInput type='text'
            placeholder='密码'
            id='password'/>
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit'> 
          注册
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>已有账号？</span>
          <Link to='/sign-in' className='text-blue-500'>
          登录
          </Link>
        </div>
      </div>
    </div>
  </div>

}
