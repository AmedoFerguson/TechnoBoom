import React, { useEffect, useState } from 'react'
import axios from 'axios'

interface Brand {
	id: number
	model: string
}

interface FilterBrandsProps {
	onSelectBrand: (brand: Brand | null) => void
}

const API_URL = 'http://localhost:8000/' // Подставь свой бекенд

const FilterBrands: React.FC<FilterBrandsProps> = ({ onSelectBrand }) => {
	const [brands, setBrands] = useState<Brand[]>([])
	const [searchTerm, setSearchTerm] = useState('')
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchBrands = async () => {
			setLoading(true)
			setError(null)
			try {
				const response = await axios.get(`${API_URL}items/models/`)
				const data = response.data
				console.log('Получили данные моделей:', data)

				if (!Array.isArray(data)) {
					throw new Error('Ответ от сервера не является массивом')
				}

				// Валидация каждого элемента
				const validBrands = data
					.map((item: any) =>
						item &&
						typeof item.model === 'string' &&
						typeof item.id === 'number'
							? { id: item.id, model: item.model }
							: null
					)
					.filter((item): item is Brand => item !== null)

				setBrands(validBrands)
			} catch (err: any) {
				console.error('Ошибка загрузки моделей:', err)
				setError('Не удалось загрузить модели')
			} finally {
				setLoading(false)
			}
		}

		fetchBrands()
	}, [])

	// Фильтруем бренды по поисковому термину
	const filteredBrands = Array.isArray(brands)
		? brands.filter(brand =>
				brand.model.toLowerCase().includes(searchTerm.toLowerCase())
		  )
		: []

	return (
		<div>
			<input
				type='text'
				placeholder='Поиск бренда'
				value={searchTerm}
				onChange={e => setSearchTerm(e.target.value)}
				style={{ marginBottom: '10px', padding: '5px', width: '200px' }}
			/>
			{loading && <p>Загрузка брендов...</p>}
			{error && <p style={{ color: 'red' }}>{error}</p>}
			<ul>
				{filteredBrands.map(brand => (
					<li
						key={brand.id}
						onClick={() => onSelectBrand(brand)}
						style={{ cursor: 'pointer', padding: '5px 0' }}
					>
						{brand.model}
					</li>
				))}
				{filteredBrands.length === 0 && !loading && !error && (
					<li>Бренды не найдены</li>
				)}
			</ul>
		</div>
	)
}

export default FilterBrands
