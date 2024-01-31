import React from 'react';
interface IPasswordInput {
  placeholder: string;
  required?: boolean;
  label: string;
  fieldValues?: any;
}
const PasswordInput: React.FC<IPasswordInput> = ({
  placeholder,
  required,
  label,
  fieldValues,
}) => {
  return (
    <div>
      <label
        htmlFor="password"
        className="block mb-2 text-sm font-medium text-gray-900 "
      >
        {label}
      </label>
      <input
        {...fieldValues}
        type="password"
        name="password"
        id="password"
        placeholder={placeholder}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        required={required}
      />
    </div>
  );
};

export default PasswordInput;
