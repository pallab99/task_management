import React from 'react';
interface IButton {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
}
const Button: React.FC<IButton> = ({ type, text, onClick }) => {
  return (
    <button
      type={type}
      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
