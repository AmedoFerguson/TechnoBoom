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
	const [loading, setLoading] = useState(false)
	const [page, setPage] = useState(1)
	const [hasMore, setHasMore] = useState(true)

	const API_URL = 'https://backend-production-a524.up.railway.app/items/'

	const fetchLaptops = async () => {
		if (!hasMore) return
		setLoading(true)
		try {
			const response = await axios.get(API_URL, {
				params: { page, page_size: 6 },
			})
			const data = response.data.results || response.data
			setLaptops(prev => [...prev, ...data])
			setHasMore(Boolean(response.data.next))
			setPage(prev => prev + 1)
		} catch (err) {
			console.error('Помилка при завантаженні ноутбуків:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		setLaptops([])
		setPage(1)
		setHasMore(true)
	}, [selectedModels, minPrice, maxPrice])

	useEffect(() => {
		fetchLaptops()
	}, [page])

	const filteredLaptops = laptops.filter(laptop => {
		const matchesModel =
			selectedModels.length === 0 ||
			selectedModels.some(
				model => laptop.model.toLowerCase() === model.toLowerCase()
			)
		const matchesPrice =
			(!minPrice || laptop.price >= parseFloat(minPrice)) &&
			(!maxPrice || laptop.price <= parseFloat(maxPrice))
		return matchesModel && matchesPrice
	})

	return (
		<div className='content-wrapper'>
			<Items
				laptops={filteredLaptops}
				onLaptopClick={setSelectedLaptop}
				onDeleteLaptop={() => {}}
				userId={null}
			/>
			{loading && <p>Завантаження...</p>}
			{hasMore && !loading && (
				<button onClick={fetchLaptops}>Показати ще</button>
			)}

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
