import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './Content.css'

interface Laptop {
	id: number
	title: string
	price: number
	image_url: string | null
	model?: string
}

interface ContentProps {
	selectedModels: string[]
	minPrice: string
	maxPrice: string
	token: string
}

const API_URL = 'https://backend-production-a524.up.railway.app/'

const Content: React.FC<ContentProps> = ({
	selectedModels,
	minPrice,
	maxPrice,
	token,
}) => {
	const [laptops, setLaptops] = useState<Laptop[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchLaptops = async () => {
			setIsLoading(true)
			setError(null)

			try {
				const params: Record<string, any> = {}

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
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				})

				let laptopsData: Laptop[] = []

				if (response.data?.results && Array.isArray(response.data.results)) {
					laptopsData = response.data.results
				} else if (Array.isArray(response.data)) {
					laptopsData = response.data
				} else if (response.data?.data && Array.isArray(response.data.data)) {
					laptopsData = response.data.data
				} else {
					throw new Error('Неверный формат данных')
				}

				const validatedLaptops = laptopsData
					.map(item => ({
						id: Number(item.id),
						title: String(item.title || 'Без названия'),
						price: Number(item.price) || 0,
						image_url: item.image_url || null,
						model: item.model ? String(item.model) : undefined,
					}))
					.filter(item => !isNaN(item.id) && item.title)

				setLaptops(validatedLaptops)
			} catch (err) {
				setError('Не удалось загрузить данные')
			} finally {
				setIsLoading(false)
			}
		}

		fetchLaptops()
	}, [selectedModels, minPrice, maxPrice, token])

	if (isLoading) {
		return <div className='loading'>Загрузка...</div>
	}

	if (error) {
		return <div className='error'>{error}</div>
	}

	if (laptops.length === 0) {
		return <div className='empty'>Нет ноутбуков, соответствующих фильтрам</div>
	}

	return (
		<div className='content'>
			<h2>Список ноутбуков ({laptops.length})</h2>
			<div className='laptop-grid'>
				{laptops.map(laptop => (
					<div key={laptop.id} className='laptop-card'>
						<img
							src={laptop.image_url || '/null.png'}
							alt={laptop.title}
							className='laptop-image'
						/>
						<h3>{laptop.title}</h3>
						{laptop.model && <p>Модель: {laptop.model}</p>}
						<p>Цена: {laptop.price} грн</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Content
