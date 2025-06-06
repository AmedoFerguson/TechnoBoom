import React from 'react'
import './Items.css'
import nullImage from '../../../../../public/null.png'

interface Laptop {
	id: number
	title: string
	model: string
	price: number
	description: string
	owner: number
	image_url: string
}

interface ItemsProps {
	laptops: Laptop[]
	onLaptopClick: (laptop: Laptop) => void
	onDeleteLaptop: (id: number) => void
	userId: number | null
}

const Items: React.FC<ItemsProps> = ({
	laptops,
	onLaptopClick,
	onDeleteLaptop,
	userId,
}) => {
	return (
		<div className='laptop-list'>
			{laptops.map(laptop => (
				<li
					key={laptop.id}
					onClick={() => onLaptopClick(laptop)}
					style={{ cursor: 'pointer' }}
				>
					<div className='laptop'>
						<div className='upper-laptop'>
							<img src={laptop.image_url || nullImage}
							 alt={laptop.title} />
						</div>
						<div className='lower-laptop'>
							<div className='laptop-title'>{laptop.title}</div>
							<div className='laptop-model'>{laptop.model}</div>
							<div className='laptop-price'>{laptop.price}₴</div>
						</div>
					</div>
					{userId === laptop.owner && (
						<button
							onClick={e => {
								e.stopPropagation()
								onDeleteLaptop(laptop.id)
							}}
							className='btn-delete'
						>
							Удалить
						</button>
					)}
				</li>
			))}
		</div>
	)
}

export default Items
