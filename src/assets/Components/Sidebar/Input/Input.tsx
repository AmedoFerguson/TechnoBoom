import React from 'react'
import './Input.css'

interface InputProps {
	type: string
	placeholder: string
	value: string
	onChange: (value: string) => void 
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
			onChange={e => onChange(e.target.value)}
			className={`input ${className}`}
		/>
	)
}

export default Input
