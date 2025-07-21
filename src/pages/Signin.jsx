import React, { useState } from 'react';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';
import { useNavigate } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import kakaoLogo from '../assets/kakao_logo.png';

const Signin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    birthday: '',
    password: '',
  });

  const isFormComplete = Object.values(formData).every(
    (value) => value.trim() !== ''
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userEmail', formData.email);
    alert('로그인 성공!');
    navigate('/main');
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;

  // 인가코드 받는 함수 작성
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <>
      <div className="relative min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center px-4 md:hidden">
        {/* 모바일 반응형 */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute w-[400px] h-[400px] bg-purple-300 opacity-30 rounded-full blur-3xl top-[-100px] left-[-100px]" />
          <div className="absolute w-[300px] h-[300px] bg-indigo-300 opacity-30 rounded-full blur-2xl bottom-[-80px] right-[-60px]" />
        </div>

        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 md:p-10 border border-indigo-100">
          <div className="flex items-center justify-center mb-6 gap-2">
            <FaShoppingBag className="text-3xl text-purple-600" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Sign In
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <CommonInput
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <CommonInput
              label="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-xxxx-xxxx"
            />
            <CommonInput
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <CommonInput
              label="Birthday"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              type="date"
            />
            <CommonInput
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />

            <CommonButton
              type="submit"
              disabled={!isFormComplete}
              variant="signin"
            >
              Sign In
            </CommonButton>
          </form>

          <p className="text-sm md:text-base text-center mt-6 text-gray-600">
            Don’t have an account?{' '}
            <span
              onClick={handleGoToRegister}
              className="text-indigo-600 hover:underline cursor-pointer font-medium"
            >
              Register
            </span>
          </p>
        </div>
      </div>

      <div
        className="hidden md:flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100
 p-4"
      >
        {/* 데스크탑 반응형 */}
        <main className="flex flex-col items-center justify-center h-full flex-1 bg-white">
          <h1 className="text-[#191919] text-2xl font-semibold text-center mb-8">
            카카오톡으로 간편하게 로그인하고 <br />
            서비스를 이용해보세요!
          </h1>

          <button
            onClick={handleLogin}
            className="flex items-center justify-center gap-2 w-[280px] py-3 cursor-pointer rounded-md bg-[#FEE500] text-[#191919] hover:opacity-90 transition"
          >
            <img src={kakaoLogo} alt="kakao" className="w-6 h-6" />
            <span className="text-base font-semibold">카카오로 계속하기</span>
          </button>
        </main>
      </div>
    </>
  );
};

export default Signin;
