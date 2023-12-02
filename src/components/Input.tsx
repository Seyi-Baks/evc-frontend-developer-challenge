import {  Field } from 'formik';
import { FC } from 'react'

type Props = {
    label?: string;
    name: string;
    type?: string;
    className?: string;
    id?: string;
    width?: string;
    placeholder?: string;
    min?: string;
}

const Input: FC<Props> = ({ label, name, type = "text", className = "", id = "", width="w-full mb-6", placeholder, min }) => {
    return (
        <div className={`${width} flex flex-col`}>
            <label htmlFor={id || name} className="text-gray-700 text-xs font-bold mb-1">
                {label}
            </label>
            <Field
                name={name}
                placeholder={placeholder}
                type={type}
                className={`appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm ${className}`}
                id={id || name}
                min={min}
            />
        </div>
    );
}

export default Input


