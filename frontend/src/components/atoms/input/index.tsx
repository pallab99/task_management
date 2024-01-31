import React from 'react';
interface IInput {
  type?: 'text' | 'email' | 'number';
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
  label: string;
  fieldValues?: any;
}
const Input: React.FC<IInput> = ({
  type,
  name,
  id,
  placeholder,
  required,
  label,
  fieldValues,
}) => {
  return (
    <div>
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        {...fieldValues}
        type={type}
        name={name}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
};

export default Input;
