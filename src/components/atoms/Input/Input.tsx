import React, { ChangeEvent } from 'react';

interface InputProps {
  name: string;
  label: string;
  onChange: (value: string) => void;
  type?: string;
}

const defaultProps = {
  type: 'text',
};

const Input: React.FC<InputProps> = (props: InputProps) => {
  const { name, label, type, onChange } = props;
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        className="mt-1 border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
};

Input.defaultProps = defaultProps;

export default Input;
