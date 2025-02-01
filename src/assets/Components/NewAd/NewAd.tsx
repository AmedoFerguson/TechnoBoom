import React, { useState } from 'react'
import axios from 'axios'
import './NewAd.css'
import { RxCross2 } from 'react-icons/rx'

interface Laptop {
	id: number
	title: string
	model: string
	price: number
	description: string
	image?: File | null 
}

interface NewAdProps {
	onAddLaptop: (newLaptop: Laptop) => void
	token: string 
}

const NewAd: React.FC<NewAdProps> = ({ onAddLaptop, token }) => {
	const [laptopData, setLaptopData] = useState<Omit<Laptop, 'id'>>({
		title: '',
		model: '',
		price: 0,
		description: '',
		image: null,
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setLaptopData({
			...laptopData,
			[e.target.name]: e.target.value,
		})
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setLaptopData({
				...laptopData,
				image: e.target.files[0],
			})
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!token) {
			console.log('Токен отсутствует')
			return
		}

		try {
			const formData = new FormData()
			formData.append('title', laptopData.title)
			formData.append('model', laptopData.model)
			formData.append('price', laptopData.price.toString())
			formData.append('description', laptopData.description)
			if (laptopData.image) {
				formData.append('image', laptopData.image) 
			}

			const response = await axios.post(
				'https://backend-production-a524.up.railway.app/items/', 
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data', 
					},
				}
			)

			if (response.status === 201) {
				const newLaptop: Laptop = {
					id: response.data.id,
					...laptopData,
					image: null, 
				}
				onAddLaptop(newLaptop)

				
				setLaptopData({
					title: '',
					model: '',
					price: 0,
					description: '',
					image: null,
				})

				console.log('Ноутбук успешно добавлен', response.data)
			} else {
				console.error('Ошибка при добавлении ноутбука', response.data)
			}
		} catch (error) {
			console.error('Ошибка при добавлении ноутбука', error)
		}
		window.location.reload()
	}

	const handleNewAdClick = () => {
		const AdWrapper = document.querySelector('.add-ad') as HTMLElement
		AdWrapper.style.display = 'none'
		const mainWrapper = document.querySelector('.wrapper') as HTMLElement
		mainWrapper?.classList.toggle('active')
	}

	return (
		<form onSubmit={handleSubmit} className='add-ad'>
			<RxCross2 className='exit-button-ad' onClick={handleNewAdClick} />
			<h3>Додати ноутбук</h3>
			<div className='ad-wrapper'>
				<input
					name='title'
					value={laptopData.title}
					onChange={handleInputChange}
					placeholder='Назва'
				/>
				<input
					name='model'
					value={laptopData.model}
					onChange={handleInputChange}
					placeholder='Модель'
				/>
				<input
					name='price'
					type='number'
					value={laptopData.price}
					onChange={handleInputChange}
					placeholder='Ціна'
				/>
				<textarea
					name='description'
					value={laptopData.description}
					onChange={handleInputChange}
					placeholder='Опис'
				/>
				<input
					type='file'
					name='image'
					accept='image/*'
					onChange={handleFileChange}
					className='input-btn'
				/>
				<button type='submit' className='submit-btn'>
					Додати
				</button>
			</div>
		</form>
	)
}

export default NewAd
