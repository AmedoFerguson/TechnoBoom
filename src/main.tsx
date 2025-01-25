import React, { useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sidebar from './assets/Components/Sidebar/Sidebar'
import Header from './assets/Components/Header/Header'
import Content from './assets/Components/Content/Content'
import Register from './assets/Components/Registration/Registration'
import Login from './assets/Components/Login/Login'
import NewAd from './assets/Components/NewAd/NewAd'

interface Laptop {
	id: number
	title: string
	model: string
	price: number
	description: string
}

const App: React.FC = () => {
	const [, setLaptops] = useState<Laptop[]>([])
	const [selectedModels, setSelectedModels] = useState<string[]>([])
	const [minPrice, setMinPrice] = useState('')
	const [maxPrice, setMaxPrice] = useState('')
	const [token, setToken] = useState<string>('')

	const wrapperRef = useRef<HTMLDivElement>(null)

	const handleFilterChange = (
		models: string[],
		minPrice: string,
		maxPrice: string
	) => {
		setSelectedModels(models)
		setMinPrice(minPrice)
		setMaxPrice(maxPrice)
	}

	const handleAddLaptop = (newLaptop: Laptop) => {
		setLaptops(prevLaptops => [...prevLaptops, newLaptop])
	}

	const handleTokenChange = (newToken: string) => {
		setToken(newToken)
	}

	const handleLogout = () => {
		setToken('')
	}

	return (
		<div className='wrapper' ref={wrapperRef}>
			<Sidebar onFilterChange={handleFilterChange} />

			<Header
				searchInput={''}
				wrapperRef={wrapperRef}
				token={token}
				onLogout={handleLogout}
			/>
			<Content
				selectedModels={selectedModels}
				minPrice={minPrice}
				maxPrice={maxPrice}
				token={token}
			/>
			<Login onTokenChange={handleTokenChange} />
			<Register />
			<NewAd onAddLaptop={handleAddLaptop} token={token} />
		</div>
	)
}

createRoot(document.getElementById('root')!).render(<App />)
