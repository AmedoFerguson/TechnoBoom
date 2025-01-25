import React from 'react'
import './Input.css'

interface InputProps {
	type: string
	placeholder: string
	value: string
	onChange: (value: string) => void // Ожидаем строку
	className?: string
}

const Input: React.FC<InputProps> = ({
	type,
	placeholder,
	value,
	onChange,
	className,
}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={e => onChange(e.target.value)} // Передаем значение
			className={`input ${className}`}
		/>
	)
}

export default Input
