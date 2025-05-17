import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://backend-production-a524.up.railway.app/' // актуальный URL

interface Laptop {
	id: number
	title: string
	price: number
	image_url: string | null
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
				const params: any = {}

				if (selectedModels.length > 0) {
					params.model = selectedModels
				}

				if (minPrice) {
					params.min_price = minPrice
				}

				if (maxPrice) {
					params.max_price = maxPrice
				}

				const response = await axios.get(`${API_URL}items/`, {
					params,
				})

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
			<h2>Список ноутбуків</h2>
			<div className='laptop-grid'>
				{laptops.map(laptop => (
					<div key={laptop.id} className='laptop-card'>
						<img
							src={laptop.image_url || '/null.png'}
							alt={laptop.title}
							style={{ width: '200px', height: '150px', objectFit: 'cover' }}
						/>
						<h3>{laptop.title}</h3>
						<p>Ціна: {laptop.price} грн</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Content
