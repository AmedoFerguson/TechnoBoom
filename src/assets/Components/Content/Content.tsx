import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://your-backend-url/api/' // замени на актуальный адрес

interface Laptop {
	id: number
	title: string
	price: number
	image_url: string
}

interface ContentProps {
	selectedModels: string[]
	minPrice: string
	maxPrice: string
	token: string
}

const Content: React.FC<ContentProps> = ({
	selectedModels,
	minPrice,
	maxPrice,
	token,
}) => {
	const [laptops, setLaptops] = useState<Laptop[]>([])

	useEffect(() => {
		const fetchLaptops = async () => {
			try {
				const response = await axios.get(`${API_URL}items/`)
				console.log('Ответ от API:', response.data)

				const laptops = Array.isArray(response.data.results)
					? response.data.results
					: Array.isArray(response.data)
					? response.data
					: []

				setLaptops(laptops)
			} catch (error) {
				console.error('Ошибка при загрузке ноутбуков:', error)
			}
		}

		fetchLaptops()
	}, [selectedModels, minPrice, maxPrice])

	return (
		<div className='content'>
			<h2>Список ноутбуков</h2>
			<div className='laptop-grid'>
				{laptops.map(laptop => (
					<div key={laptop.id} className='laptop-card'>
						<img src={laptop.image_url} alt={laptop.title} />
						<h3>{laptop.title}</h3>
						<p>Цена: {laptop.price} грн</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Content
