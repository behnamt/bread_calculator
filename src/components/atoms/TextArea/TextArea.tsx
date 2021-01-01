import React from 'react';

interface TextAreaProps {
  name: string;
  label: string;
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = (props: TextAreaProps) => {
  const { name, label, onChange } = props;
  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        className="mt-1 border p-1.5 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
};

export default TextArea;
