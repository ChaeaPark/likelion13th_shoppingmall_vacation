import React, { useState } from 'react';
import CommonInput from '../components/CommonInput';
import CommonButton from '../components/CommonButton';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    birthday: '',
    password: '',
  });

  const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('회원가입이 완료되었습니다!');
    navigate('/main');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white p-6 md:p-10 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl md:text-3xl font-bold text-center mb-6">Register</h2>

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

          <CommonButton type="submit" disabled={!isFormComplete}>
            Register
          </CommonButton>
        </form>

        <p className="text-sm md:text-base text-center mt-4">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
