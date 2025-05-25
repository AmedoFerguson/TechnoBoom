import React, { useState } from 'react'
import axios from 'axios'
import './NewAd.css'
import { RxCross2 } from 'react-icons/rx'
import { Laptop } from '../../../LaptopType'

interface LaptopFormData {
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
	const [laptopData, setLaptopData] = useState<LaptopFormData>({
		title: '',
		model: '',
		price: 0,
		description: '',
		image: null,
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setLaptopData(prev => ({
			...prev,
			[name]: name === 'price' ? Number(value) : value,
		}))
	}

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setLaptopData(prev => ({
				...prev,
				image: e.target.files![0],
			}))
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
				'https://backend-production-a524.up.railway.app/items/items/',
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
					title: laptopData.title,
					model: laptopData.model,
					price: laptopData.price,
					description: laptopData.description,
					owner: response.data.owner, 
					image_url: response.data.image_url, 
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
				console.error('Ошибка при создании ноутбука', response.data)
			}
		} catch (error) {
			console.error('Ошибка при добавлении ноутбука', error)
		}
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
			<h3>Добавить ноутбук</h3>
			<div className='ad-wrapper'>
				<input
					name='title'
					value={laptopData.title}
					onChange={handleInputChange}
					placeholder='Название'
					required
				/>
				<input
					name='model'
					value={laptopData.model}
					onChange={handleInputChange}
					placeholder='Модель'
					required
				/>
				<input
					name='price'
					type='number'
					value={laptopData.price}
					onChange={handleInputChange}
					placeholder='Цена'
					required
					min={0}
				/>
				<textarea
					name='description'
					value={laptopData.description}
					onChange={handleInputChange}
					placeholder='Описание'
					required
				/>
				<input
					type='file'
					name='image'
					accept='image/*'
					onChange={handleFileChange}
					className='input-btn'
				/>
				<button type='submit' className='submit-btn'>
					Добавить
				</button>
			</div>
		</form>
	)
}

export default NewAd
