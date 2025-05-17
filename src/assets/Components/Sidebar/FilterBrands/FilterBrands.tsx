import React from 'react'

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
	// searchTerm, // eslint предупреждает, что не используется — можно убрать
	onModelChange,
	activeModels,
}) => {
	const handleCheckboxChange = (modelName: string) => {
		let updatedModels = [...activeModels]
		if (updatedModels.includes(modelName)) {
			updatedModels = updatedModels.filter(m => m !== modelName)
		} else {
			updatedModels.push(modelName)
		}
		onModelChange(updatedModels)
	}

	return (
		<div className='filter-brands'>
			{brands && brands.length > 0 ? (
				brands.map(brand => (
					<label key={brand.id} className='brand-label'>
						<input
							type='checkbox'
							checked={activeModels.includes(brand.model)}
							onChange={() => handleCheckboxChange(brand.model)}
						/>
						{brand.model}
					</label>
				))
			) : (
				<div>Нет доступных моделей</div>
			)}
		</div>
	)
}

export default FilterBrands
