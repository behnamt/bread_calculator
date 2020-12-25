import React, { ChangeEvent } from 'react';

interface SelectProps {
  name: string;
  options: { value: string; label: string }[];
  label: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = (props: SelectProps) => {
  const { label, name, options, onChange } = props;

  const onSelect = (event: ChangeEvent<HTMLSelectElement>) =>
    onChange(event.target.value);

  return (
    <>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        name={name}
        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        onChange={onSelect}
      >
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </>
  );
};

export default Select;
