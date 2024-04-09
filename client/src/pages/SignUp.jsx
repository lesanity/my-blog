import React from 'react'
import { useState } from 'react';
import { Alert, Button, Label, TextInput, Spinner } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('请填写完整的信息!');
    }
    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok){
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };
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
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div>
            <Label value='用户名' />
            <TextInput type='text'
              placeholder='用户名'
              id='username' onChange={handleChange} />
          </div>
          <div className=''>
            <Label value='邮箱' />
            <TextInput type='email'
              placeholder='name@youremail.com'
              id='email' onChange={handleChange} />
          </div>
          <div className=''>
            <Label value='设置密码' />
            <TextInput type='password'
              placeholder='密码'
              id='password' onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>注册中...</span>
              </>
            ) : ('注册')}
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>已有账号？</span>
          <Link to='/sign-in' className='text-blue-500'>
            登录
          </Link>
        </div>
        {
          errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )
        }
      </div>
    </div>
  </div>

}
