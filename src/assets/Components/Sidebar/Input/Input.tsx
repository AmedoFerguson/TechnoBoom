import React, { CSSProperties } from 'react'
import './Input.css'

interface InputProps {
	type: string
	placeholder: string
	value: string
	onChange: (value: string) => void
	className?: string
	onFocus?: () => void
	style?: CSSProperties
}

const Input: React.FC<InputProps> = ({
	type,
	placeholder,
	value,
	onChange,
	className,
	onFocus,
}) => {
	return (
		<input
			type={type}
			placeholder={placeholder}
			value={value}
			onChange={e => onChange(e.target.value)}
			onFocus={onFocus}
			className={`input ${className ?? ''}`}
		/>
	)
}

export default Input
