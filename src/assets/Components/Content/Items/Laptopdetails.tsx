import React, { useEffect, useState } from 'react'
import './Laptopdetails.css'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

interface Laptop {
	id: number
	title: string
	model: string
	price: number
	description: string
	owner: number
	image_url: string
}

interface JwtPayload {
	user_id: number
}

interface LaptopDetailsProps {
	laptop: Laptop | null
	onClose: () => void
	token: string
	onDelete: (id: number) => void
}

const LaptopDetails: React.FC<LaptopDetailsProps> = ({
	laptop,
	onClose,
	token,
	onDelete,
}) => {
	const [ownerName, setOwnerName] = useState<string>('')

	const getUserIdFromToken = (token: string): number | null => {
		try {
			const decoded: JwtPayload = jwtDecode(token)
			return decoded.user_id || null
		} catch (error) {
			console.error('Ошибка декодирования токена:', error)
			return null
		}
	}

	useEffect(() => {
		if (laptop) {
			const fetchOwnerName = async () => {
				try {
					const response = await axios.get(
						`https://backend-production-a524.up.railway.app/auth/users/${laptop.owner}/`
					)
					setOwnerName(response.data.username)
				} catch (error) {
					console.error('Error fetching owner data', error)
				}
			}

			fetchOwnerName()
		}
	}, [laptop])

	if (!laptop) return null

	const userIdFromToken = getUserIdFromToken(token)

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(
				`https://backend-production-a524.up.railway.app/items/items/${id}/`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)

			onDelete(id)
		} catch (error) {
			console.error('Ошибка при удалении ноутбука:', error)
		}
		window.location.reload()
	}

	return (
		<div className='laptop-details'>
			<RxCross2 className='exit-button-details' onClick={onClose} />
			<div className='ad'>Оголошення</div>
			<div className='upper-laptop-details'>
				<img
					src={laptop?.image_url || '../../../../../public/null.png'}
					className='laptop-photo-details'
					alt={laptop?.title || 'Ноутбук'}
				/>
			</div>
			<div className='lower-laptop-details'>
				<h4 className='laptop-title'>{laptop.title}</h4>
				<p className='laptop-model'>
					<strong>Модель:</strong> {laptop.model}
				</p>
				<p className='laptop-price'>
					<strong>Ціна:</strong> {laptop.price}₴
				</p>
				<p className='laptop-desc'>
					<strong>Опис:</strong>{' '}
					<textarea className='desc-textarea'>{laptop.description}</textarea>
				</p>
				<p className='laptop-owner'>
					<strong>Власник:</strong> {ownerName || 'Невідомо'}
				</p>

				{laptop.owner === userIdFromToken && (
					<button
						className='delete-laptop-btn'
						onClick={() => handleDelete(laptop.id)}
					>
						Удалить
					</button>
				)}
			</div>
		</div>
	)
}

export default LaptopDetails
