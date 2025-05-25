import React, { useState, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sidebar from './assets/Components/Sidebar/Sidebar'
import Header from './assets/Components/Header/Header'
import Content from './assets/Components/Content/Content'
import Register from './assets/Components/Registration/Registration'
import Login from './assets/Components/Login/Login'
import NewAd from './assets/Components/NewAd/NewAd'
import AdPopup from './assets/Components/AdPopup/AdPopup'
import LaptopDetails from './assets/Components/Content/Items/Laptopdetails'
import { Laptop } from './LaptopType'


const App: React.FC = () => {
	const [laptops, setLaptops] = useState<Laptop[]>([])
	const [selectedModels, setSelectedModels] = useState<string[]>([])
	const [minPrice, setMinPrice] = useState('')
	const [maxPrice, setMaxPrice] = useState('')
	const [token, setToken] = useState<string>('')
	const [selectedLaptop, setSelectedLaptop] = useState<Laptop | null>(null)
	const [searchInput, setSearchInput] = useState<string>('')

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
			<AdPopup />
			<Sidebar onFilterChange={handleFilterChange} />
			<Header
				searchInput={searchInput}
				wrapperRef={wrapperRef}
				token={token}
				onLogout={handleLogout}
				laptops={laptops}
				onLaptopClick={setSelectedLaptop}
				onSearchChange={setSearchInput}
			/>
			<Content
				selectedModels={selectedModels}
				minPrice={minPrice}
				maxPrice={maxPrice}
				token={token}
			/>
			{selectedLaptop && (
				<LaptopDetails
					laptop={selectedLaptop}
					onClose={() => setSelectedLaptop(null)}
					token={token}
					onDelete={() => {}}
				/>
			)}
			<Login onTokenChange={handleTokenChange} />
			<Register />
			<NewAd onAddLaptop={handleAddLaptop} token={token} />
		</div>
	)
}

createRoot(document.getElementById('root')!).render(<App />)
