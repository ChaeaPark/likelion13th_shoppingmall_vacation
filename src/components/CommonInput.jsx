import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaBirthdayCake,
  FaLock,
} from 'react-icons/fa';

const iconMap = {
  name: <FaUser />,
  phone: <FaPhone />,
  email: <FaEnvelope />,
  birthday: <FaBirthdayCake />,
  password: <FaLock />,
};

const CommonInput = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder,
}) => {
  return (
    <div className="flex flex-col w-full relative">
      <label className="text-sm md:text-base font-medium text-gray-700 mb-1">
        {label}
      </label>
      <span className="absolute left-3 top-1/2 translate-y-[2px] -translate-y-1/2 text-gray-400 text-lg">
        {iconMap[name]}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className="pl-10 border border-gray-300 rounded-md px-3 py-2 md:py-3 text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-300"
      />
    </div>
  );
};

export default CommonInput;
