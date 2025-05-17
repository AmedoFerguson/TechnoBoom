import React, { useState, useEffect } from 'react'
import './FilterBrands.css'

interface Model {
	id: number
	model: string
}

interface FilterBrandsProps {
	brands: Model[]
	searchTerm: string
	onModelChange: (models: string[]) => void
	activeModels: string[]
}

const FilterBrands: React.FC<FilterBrandsProps> = ({
	brands,
	searchTerm,
	onModelChange,
	activeModels,
}) => {
	const [activeBrandIds, setActiveBrandIds] = useState<number[]>([])

	useEffect(() => {
		const newActiveIds = brands
			.filter(brand => activeModels.includes(brand.model))
			.map(brand => brand.id)
		setActiveBrandIds(newActiveIds)
	}, [brands, activeModels])

	const handleClick = (id: number) => {
		setActiveBrandIds(prevActiveIds => {
			const updatedIds = prevActiveIds.includes(id)
				? prevActiveIds.filter(activeId => activeId !== id)
				: [...prevActiveIds, id]

			const updatedModels = brands
				.filter(brand => updatedIds.includes(brand.id))
				.map(brand => brand.model)

			onModelChange(updatedModels)
			return updatedIds
		})
	}

	const uniqueBrands = Array.isArray(brands)
		? Array.from(new Map(brands.map(brand => [brand.model, brand])).values())
		: []

	const filteredBrands = uniqueBrands.filter(brand =>
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
					onClick={() => handleClick(brand.id)}
				>
					{brand.model}
				</div>
			))}
		</div>
	)
}

export default FilterBrands
