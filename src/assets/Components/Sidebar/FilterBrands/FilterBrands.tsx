import React, { useState } from 'react'
import './FilterBrands.css'

interface Brand {
	id: number
	brand: string
}

interface FilterBrandsProps {
	brands: Brand[]
}

const FilterBrands: React.FC<FilterBrandsProps> = ({ brands }) => {
	const [activeBrandIds, setActiveBrandIds] = useState<number[]>([]) 

	const handleClick = (id: number) => {
		setActiveBrandIds(prevActiveIds => {

			if (prevActiveIds.includes(id)) {
				return prevActiveIds.filter(activeId => activeId !== id)
			} else {
				return [...prevActiveIds, id]
			}
		})
	}

	return (
		<div className='brand_name'>
			{brands.map(brand => (
				<div
					key={brand.id}
					className={`brand ${
						activeBrandIds.includes(brand.id) ? 'active' : ''
					}`} 
					onClick={() => handleClick(brand.id)}
				>
					{brand.brand}
				</div>
			))}
		</div>
	)
}

export default FilterBrands
