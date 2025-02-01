import React, { useEffect, useState } from 'react'
import './Laptopdetails.css'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
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

interface JwtPayload {
	user_id: number
	is_superuser: boolean
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

	
	const getUserInfoFromToken = (
		token: string
	): { userId: number | null; isSuperUser: boolean } => {
		try {
			const decoded: JwtPayload = jwtDecode(token)
			return {
				userId: decoded.user_id || null,
				isSuperUser: decoded.is_superuser || false,
			}
		} catch (error) {
			console.error('Ошибка декодирования токена:', error)
			return { userId: null, isSuperUser: false }
		}
	}

	const { userId, isSuperUser } = getUserInfoFromToken(token)

	useEffect(() => {
		if (laptop) {
			const fetchOwnerName = async () => {
				try {
					const response = await axios.get(
						`https://backend-production-a524.up.railway.app/auth/users/${laptop.owner}/`
					)
					setOwnerName(response.data.username)
				} catch (error) {
					console.error('Ошибка при получении данных владельца:', error)
				}
			}

			fetchOwnerName()
		}
	}, [laptop])

	if (!laptop) return null

	const handleDelete = async (id: number) => {
		try {
			await axios.delete(
				`https://backend-production-a524.up.railway.app/items/${id}/`,
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
					src={laptop.image_url || `${NullPng}`}
					className='laptop-photo-details'
					alt='Laptop'
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

				<div className='laptop-desc'>
					<strong>Опис:</strong>
					<textarea
						className='desc-textarea'
						value={laptop.description}
						readOnly
					/>
				</div>

				<p className='laptop-owner'>
					<strong>Власник:</strong> {ownerName || 'Невідомо'}
				</p>

				{(laptop.owner === userId || isSuperUser) && (
					<button
						className='delete-laptop-btn'
						onClick={() => handleDelete(laptop.id)}
					>
						Видалити
					</button>
				)}
			</div>
		</div>
	)
}

export default LaptopDetails
