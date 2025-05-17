import React from 'react'
import './LaptopDetails.css'

interface Laptop {
	id: number
	title: string
	description: string
	price: number
	image_url: string
	owner: number
}

interface LaptopDetailsProps {
	laptop: Laptop
	onClose: () => void
	token: string
	onDelete: () => void
}

const LaptopDetails: React.FC<LaptopDetailsProps> = ({
	laptop,
	onClose,
	onDelete,
}) => {
	return (
		<div className='laptop-details'>
			<button onClick={onClose} className='btn-close'>
				Закрити
			</button>
			<img src={laptop.image_url} alt={laptop.title} className='laptop-image' />
			<div className='laptop-info'>
				<h2>{laptop.title}</h2>
				<p>{laptop.description}</p>
				<p className='laptop-price'>
					<strong>Ціна:</strong> {laptop.price} ₴
				</p>
				<button onClick={onDelete} className='btn-delete'>
					Видалити
				</button>
			</div>
		</div>
	)
}

export default LaptopDetails
