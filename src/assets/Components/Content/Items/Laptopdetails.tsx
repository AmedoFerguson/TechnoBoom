import './LaptopDetails.css'

interface Laptop {
	id: number
	title: string
	description: string
	price: number
	image_url: string
	owner: number
}

interface Props {
	laptop: Laptop
	onClose: () => void
	token: string
	onDelete: () => void
}

const LaptopDetails: React.FC<Props> = ({ laptop, onClose }) => {
	return (
		<div className='laptop-details'>
			<img
				src={laptop.image_url}
				alt={laptop.title}
				className='laptop-image'
				loading='lazy'
			/>
			<div className='laptop-info'>
				<h2>{laptop.title}</h2>
				<p>{laptop.description}</p>
				<p className='laptop-price'>
					<strong>Ціна:</strong> {laptop.price}₴
				</p>
				<p className='laptop-owner'>
					<strong>Власник ID:</strong> {laptop.owner}
				</p>
			</div>
			<button onClick={onClose}>Закрити</button>
		</div>
	)
}

export default LaptopDetails
