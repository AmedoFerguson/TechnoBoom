import React, { useEffect, useState } from 'react'
import './AdPopup.css'

const AdPopup: React.FC = () => {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false)
		}, 10000)

		return () => clearTimeout(timer)
	}, [])

	if (!isVisible) return null

	return (
		<div className='ad-popup'>
			<div className='ad-content'>
				<h2>Хочешь собаку? Или ты кошатник?</h2>
				<p>Тогда переходи сюда и найди своего любимца!</p>
				<a
					href='https://zoofeel.onrender.com'
					target='_blank'
					rel='noopener noreferrer'
				>
					Перейти на сайт
				</a>
				<button className='close-button' onClick={() => setIsVisible(false)}>
					Закрыть
				</button>
			</div>
		</div>
	)
}

export default AdPopup
