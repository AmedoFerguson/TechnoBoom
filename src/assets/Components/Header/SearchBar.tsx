import React, { useState, useRef, useEffect } from 'react'
import Input from '../Sidebar/Input/Input'
import searchImg from '../../../../public/search.png'
import nullImage from '../../../../public/null.png'
import './SearchBar.css'

export interface Laptop {
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
	const [debouncedValue, setDebouncedValue] = useState(value)
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, 500)

		return () => clearTimeout(handler)
	}, [value])

	const filteredLaptops = laptops.filter(
		laptop =>
			laptop.title.toLowerCase().includes(debouncedValue.toLowerCase()) ||
			laptop.model.toLowerCase().includes(debouncedValue.toLowerCase())
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
			<img src={searchImg} alt='search' height='27px' className='search-img' />
			<Input
				type='text'
				placeholder='Пошук ноутбука...'
				value={value}
				onChange={onChange}
				className='search-holder'
				onFocus={() => setIsFocused(true)}
			/>
			{isFocused && debouncedValue && (
				<div className='search-results'>
					{filteredLaptops.length > 0 ? (
						filteredLaptops.map(laptop => (
							<div
								key={laptop.id}
								className='search-result-item'
								onMouseDown={() => {
									onLaptopClick(laptop)
									setIsFocused(false)
								}}
							>
								<img src={laptop.image_url || nullImage} alt={laptop.title} />
								<div>
									{laptop.title} ({laptop.model})
								</div>
								<div>
									{laptop.price.toLocaleString('uk-UA', {
										style: 'currency',
										currency: 'UAH',
									})}
								</div>
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
