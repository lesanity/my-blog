import React from 'react'
import { useState } from 'react';
import { Alert, Button, Label, TextInput, Spinner } from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
export default function SignIn() {
  const [formData, setFormData] = useState({});
  const {loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('请填写完整的信息!'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if(res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
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
          请输入邮箱和密码登录
        </p>
      </div>
      {/* right */}
      <div className='flex-1'>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className=''>
            <Label value='邮箱' />
            <TextInput type='email'
              placeholder='name@youremail.com'
              id='email' onChange={handleChange} />
          </div>
          <div className=''>
            <Label value='密码' />
            <TextInput type='password'
              placeholder='******'
              id='password' onChange={handleChange} />
          </div>
          <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
            {loading ? (
              <>
                <Spinner size='sm' />
                <span className='pl-3'>登录中...</span>
              </>
            ) : ('登录')}
          </Button>
        </form>
        <div className='flex gap-2 text-sm mt-5'>
          <span>还没有账号？</span>
          <Link to='/sign-up' className='text-blue-500'>
            注册
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
