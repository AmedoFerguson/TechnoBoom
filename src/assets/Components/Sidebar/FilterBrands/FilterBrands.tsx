import React, { useState, useEffect } from 'react'
import './FilterBrands.css'

interface Model {
	id: number
	model: string // Модель ноутбука
}

interface FilterBrandsProps {
	brands: Model[] // Список моделей для фильтрации
	searchTerm: string // Поиск по модели
	onModelChange: (models: string[]) => void // Обработчик изменения моделей
	activeModels: string[] // Передаем активные модели
}

const FilterBrands: React.FC<FilterBrandsProps> = ({
	brands,
	searchTerm,
	onModelChange,
	activeModels,
}) => {
	const [activeBrandIds, setActiveBrandIds] = useState<number[]>([])

	// Сбрасываем активные галочки при изменении активных моделей
	useEffect(() => {
		const newActiveIds = brands
			.filter(brand => activeModels.includes(brand.model))
			.map(brand => brand.id)
		setActiveBrandIds(newActiveIds)
	}, [brands, activeModels])

	const handleClick = (id: number) => {
		setActiveBrandIds(prevActiveIds => {
			const updatedIds = prevActiveIds.includes(id)
				? prevActiveIds.filter(activeId => activeId !== id) // Удаляем модель из активных
				: [...prevActiveIds, id] // Добавляем модель в активные

			const updatedModels = brands
				.filter(brand => updatedIds.includes(brand.id))
				.map(brand => brand.model)

			onModelChange(updatedModels) // Обновляем выбранные модели
			return updatedIds // Возвращаем обновленный массив активных идентификаторов
		})
	}

	const filteredBrands = brands.filter(brand =>
		brand.model.toLowerCase().includes(searchTerm.toLowerCase())
	)

	return (
		<div className='brand_name'>
			{filteredBrands.map(brand => (
				<div
					key={brand.id}
					className={`brand ${
						activeBrandIds.includes(brand.id) ? 'active' : ''
					}`}
					onClick={() => handleClick(brand.id)} // Передаем модель в обработчик
				>
					{brand.model}
				</div>
			))}
		</div>
	)
}

export default FilterBrands
