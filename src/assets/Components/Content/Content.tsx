import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_URL = 'https://backend-production-a524.up.railway.app/'

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

				console.log('Отправка запроса с параметрами:', params)
				const response = await axios.get(`${API_URL}items/`, {
					params,
					headers: token ? { Authorization: `Bearer ${token}` } : {},
				})

				console.log('Полный ответ от сервера:', response)
				console.log('Данные ответа:', response.data)
				console.log('Тип данных:', typeof response.data)
				console.log('Это массив?', Array.isArray(response.data))

				if (response.data?.results) {
					console.log('Найдено поле results:', response.data.results)
					console.log('Тип results:', typeof response.data.results)
					console.log('Results - массив?', Array.isArray(response.data.results))
				}

				let laptopsData: Laptop[] = []

				if (response.data?.results && Array.isArray(response.data.results)) {
					laptopsData = response.data.results
				} else if (Array.isArray(response.data)) {
					laptopsData = response.data
				} else {
					console.warn('Неожиданный формат данных:', response.data)
					setError('Неожиданный формат данных от сервера')
				}

				console.log('Обработанные данные ноутбуков:', laptopsData)
				setLaptops(laptopsData)
			} catch (err) {
				console.error('Ошибка при загрузке:', err)
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
							style={{ width: '200px', height: '150px', objectFit: 'cover' }}
						/>
						<h3>{laptop.title}</h3>
						<p>Цена: {laptop.price} грн</p>
					</div>
				))}
			</div>
		</div>
	)
}

export default Content
