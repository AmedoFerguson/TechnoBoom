import React, { useState, useRef, useEffect } from 'react'
import Input from '../Sidebar/Input/Input'

interface Laptop {
	id: number
	title: string
	model: string
	price: number
	description: string
	owner: number
	image_url: string
}

interface SearchBarProps {
	value: string
	onChange: (value: string) => void
	laptops: Laptop[]
	onLaptopClick: (laptop: Laptop) => void
}

const SearchBar: React.FC<SearchBarProps> = ({
	value,
	onChange,
	laptops,
	onLaptopClick,
}) => {
	const [isFocused, setIsFocused] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const filteredLaptops = laptops.filter(
		laptop =>
			laptop.title.toLowerCase().includes(value.toLowerCase()) ||
			laptop.model.toLowerCase().includes(value.toLowerCase())
	)

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsFocused(false)
			}
		}
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='search-container' ref={containerRef}>
			<div>
				<Input
					type='text'
					placeholder='Поиск'
					value={value}
					onChange={onChange}
					className='your-class'
				/>
			</div>
			{isFocused && value && (
				<div className='search-results'>
					{filteredLaptops.length > 0 ? (
						filteredLaptops.map(laptop => (
							<div
								key={laptop.id}
								className='search-result-item'
								onMouseDown={() => onLaptopClick(laptop)}
							>
								{laptop.title}
							</div>
						))
					) : (
						<div className='no-results'>Нічого не знайдено</div>
					)}
				</div>
			)}
		</div>
	)
}

export default SearchBar
