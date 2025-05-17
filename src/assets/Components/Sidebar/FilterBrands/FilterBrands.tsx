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
	onModelChange,
	activeModels,
}) => {
	const handleCheckboxChange = (model: string, checked: boolean) => {
		if (checked) {
			onModelChange([...activeModels, model])
		} else {
			onModelChange(activeModels.filter(m => m !== model))
		}
	}

	return (
		<div className='filter-brands-list'>
			{brands.length === 0 && <p>Моделі не знайдено</p>}
			{brands.map(brand => (
				<label key={brand.id} className='filter-brand-item'>
					<input
						type='checkbox'
						checked={activeModels.includes(brand.model)}
						onChange={e => handleCheckboxChange(brand.model, e.target.checked)}
					/>
					{brand.model}
				</label>
			))}
		</div>
	)
}

export default FilterBrands
