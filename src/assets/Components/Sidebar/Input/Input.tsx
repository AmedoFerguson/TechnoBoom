import React, { useState } from 'react'
import './Input.css'

interface InputProps {
	type?: string
	placeholder?: string
	value?: string
	onChange?: (value: string) => void
	className?: string
}

const Input: React.FC<InputProps> = ({
	type = 'text',
	placeholder = '',
	value = '',
	onChange,
	className = '',
}) => {
	const [inputValue, setInputValue] = useState<string>(value || '')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = e.target.value
		setInputValue(newValue)
		if (onChange) {
			onChange(newValue)
		}
	}

	return (
		<input
			type={type}
			placeholder={placeholder}
			value={inputValue}
			onChange={handleChange}
			className={`input ${className}`}
		/>
	)
}

export default Input
