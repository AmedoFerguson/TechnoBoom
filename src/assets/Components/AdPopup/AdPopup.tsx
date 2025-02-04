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
				<h2>Хочеш собаку? Чи ти кошатник?</h2>
				<p>Тоді переходь сюди і знайди свого улюбленця!</p>
				<a
					href='https://zoofeel.onrender.com'
					target='_blank'
					rel='noopener noreferrer'
				>
					Перейти на сайт
				</a>
				<button className='close-button' onClick={() => setIsVisible(false)}>
					Закрити
				</button>
			</div>
		</div>
	)
}

export default AdPopup
