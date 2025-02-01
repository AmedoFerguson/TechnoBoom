import { useEffect, useState } from 'react'
import './content.css'
import axios from 'axios'
import Items from './Items/Items'
import LaptopDetails from './Items/Laptopdetails'

interface Laptop {
	id: number
	title: string
	model: string
	price: number
	description: string
	owner: number
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
	const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null)
	const API_URL = 'https://backend-production-a524.up.railway.app/'

	const fetchLaptops = async () => {
		try {
			const response = await axios.get<Laptop[]>(`${API_URL}items/`)
			setLaptops(response.data)
		} catch (error) {
			console.error('Ошибка загрузки ноутбуков', error)
		}
	}

	useEffect(() => {
		fetchLaptops()
	}, [])

	const filteredLaptops = laptops.filter(laptop => {
		const matchesModel =
			selectedModels.length > 0
				? selectedModels.some(
						model => laptop.model.toLowerCase() === model.toLowerCase()
				  )
				: true

		const matchesPrice =
			(!minPrice || laptop.price >= parseFloat(minPrice)) &&
			(!maxPrice || laptop.price <= parseFloat(maxPrice))

		return matchesModel && matchesPrice
	})

	return (
		<div className='content-wrapper'>
			<Items
				laptops={filteredLaptops}
				onLaptopClick={laptop => setSelectedLaptop(laptop)}
				onDeleteLaptop={() => {}}
				userId={null}
			/>

			{selectedLaptop && (
				<LaptopDetails
					laptop={selectedLaptop}
					onClose={() => setSelectedLaptop(null)}
					token={token} 
					onDelete={() => {}} 
				/>
			)}
		</div>
	)
}

export default Content
