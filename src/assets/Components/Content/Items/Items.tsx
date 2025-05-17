import React from 'react'
import './Items.css'
import NullPng from '../../../../../public/null.png'

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
	lastLaptopRef: (node: HTMLDivElement) => void
}

const Items: React.FC<ItemsProps> = ({
	laptops,
	onLaptopClick,
	onDeleteLaptop,
	userId,
	lastLaptopRef,
}) => {
	return (
		<div className='laptop-list'>
			{laptops.map((laptop, index) => {
				const isLast = index === laptops.length - 1
				return (
					<div
						key={laptop.id}
						ref={isLast ? lastLaptopRef : null}
						onClick={() => onLaptopClick(laptop)}
						style={{ cursor: 'pointer' }}
					>
						<div className='laptop'>
							<div className='upper-laptop'>
								<img src={laptop.image_url || `${NullPng}`} />
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
								Видалити
							</button>
						)}
					</div>
				)
			})}
		</div>
	)
}

export default Items
