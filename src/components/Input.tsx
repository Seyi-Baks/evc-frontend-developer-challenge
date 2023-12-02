import { FC } from 'react'

type Props = {
    label?: string;
    name: string;
    type?: string;
    className?: string;
    id?: string;
    width?: string;
    placeholder?: string;
}

const Input: FC<Props> = ({ label, name, type = "text", className = "", id = "", width="w-full mb-6", placeholder }) => {
    return (
        <div className={`${width}`}>
                <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor={id || name}>
                    {label}
                </label>
                <input
                    name={name}
                    placeholder={placeholder}
                    className={`appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 text-sm ${className}`}
                    id={id || name}
                    type={type}
                />
        </div>
    );
}

export default Input


