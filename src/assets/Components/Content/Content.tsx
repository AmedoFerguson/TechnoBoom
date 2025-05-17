import { useEffect, useRef, useState, useCallback } from 'react'
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

	const observer = useRef<IntersectionObserver | null>(null)

	const API_URL = 'https://backend-production-a524.up.railway.app/items/'

	const fetchLaptops = async (reset = false) => {
		if (loading || (!hasMore && !reset)) return
		setLoading(true)
		try {
			const response = await axios.get(API_URL, {
				params: { page: reset ? 1 : page, page_size: 6 },
			})
			const data = response.data.results || response.data
			if (reset) {
				setLaptops(data)
				setPage(2)
			} else {
				setLaptops(prev => [...prev, ...data])
				setPage(prev => prev + 1)
			}
			setHasMore(Boolean(response.data.next))
		} catch (err) {
			console.error('Помилка при завантаженні ноутбуків:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		setPage(1)
		setHasMore(true)
		fetchLaptops(true)
	}, [selectedModels, minPrice, maxPrice])

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

	const handleDeleteLaptop = (id: number) => {
		setLaptops(prev => prev.filter(laptop => laptop.id !== id))
		setSelectedLaptop(null)
	}

	const lastLaptopRef = useCallback(
		(node: HTMLDivElement) => {
			if (loading) return
			if (observer.current) observer.current.disconnect()
			observer.current = new IntersectionObserver(entries => {
				if (entries[0].isIntersecting && hasMore) {
					fetchLaptops()
				}
			})
			if (node) observer.current.observe(node)
		},
		[loading, hasMore]
	)

	return (
		<div className='content-wrapper'>
			<Items
				laptops={filteredLaptops}
				onLaptopClick={setSelectedLaptop}
				onDeleteLaptop={handleDeleteLaptop}
				userId={null}
				lastLaptopRef={lastLaptopRef}
			/>
			{loading && <p>Завантаження...</p>}
			{selectedLaptop && (
				<LaptopDetails
					laptop={selectedLaptop}
					onClose={() => setSelectedLaptop(null)}
					token={token}
					onDelete={() => handleDeleteLaptop(selectedLaptop.id)}
				/>
			)}
		</div>
	)
}

export default Content
