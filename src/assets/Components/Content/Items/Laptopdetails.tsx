import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './LaptopDetails.css'

interface Laptop {
	id: number
	title: string
	description: string
	price: number
	image: string
	owner: number
}

const LaptopDetails = () => {
	const { id } = useParams<{ id: string }>()
	const [laptop, setLaptop] = useState<Laptop | null>(null)
	const [ownerName, setOwnerName] = useState<string>('')

	useEffect(() => {
		const fetchLaptopAndOwner = async () => {
			try {
				// Загружаем данные о ноутбуке
				const laptopResponse = await axios.get(
					`https://backend-production-a524.up.railway.app/items/${id}/`
				)
				const laptopData = laptopResponse.data
				setLaptop(laptopData)

				// Загружаем имя владельца
				const ownerResponse = await axios.get(
					`https://backend-production-a524.up.railway.app/users/${laptopData.owner}/`
				)
				setOwnerName(ownerResponse.data.username)
			} catch (error) {
				console.error('Ошибка при загрузке данных:', error)
			}
		}

		fetchLaptopAndOwner()
	}, [id])

	if (!laptop) {
		return <div>Завантаження...</div>
	}

	return (
		<div className='laptop-details'>
			<img src={laptop.image} alt={laptop.title} className='laptop-image' />
			<div className='laptop-info'>
				<h2>{laptop.title}</h2>
				<p>{laptop.description}</p>
				<p className='laptop-price'>
					<strong>Ціна:</strong> ${laptop.price}
				</p>
				<p className='laptop-owner'>
					<strong>Власник:</strong> {ownerName || 'Невідомо'}
				</p>
			</div>
		</div>
	)
}

export default LaptopDetails
