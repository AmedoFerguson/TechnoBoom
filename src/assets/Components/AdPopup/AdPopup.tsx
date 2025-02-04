import React, { useEffect, useState, useRef } from 'react'
import './AdPopup.css'
import logo from './zoofeel_logo.png'
import meowSound from './meow.mp3' // добавьте файл звука в ваш проект

const AdPopup: React.FC = () => {
	const [isVisible, setIsVisible] = useState(true)
	const audioRef = useRef<HTMLAudioElement>(null)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false)
		}, 10000)

		return () => clearTimeout(timer)
	}, [])

	const handleButtonClick = () => {
		audioRef.current?.play()
		setTimeout(() => {
			window.open(
				'https://zoofeel.onrender.com',
				'_blank',
				'noopener,noreferrer'
			)
		}, 500) // задержка для завершения звука
	}

	if (!isVisible) return null

	return (
		<div className='ad-popup'>
			<div className='ad-content'>
				<img src={logo} alt='ZooFeel Logo' />
				<h2>Хочеш собаку? Чи ти кошатник?</h2>
				<p>Тоді переходь сюди і знайди свою вівцю!</p>
				<button className='go' onClick={handleButtonClick}>
					Перейти на сайт
				</button>
				<button className='close-button' onClick={() => setIsVisible(false)}>
					Закрити
				</button>
				<audio ref={audioRef} src={meowSound} preload='auto' />
			</div>
		</div>
	)
}

export default AdPopup
