import { Component } from 'react'
import axios from 'axios'
import { RxCross2 } from 'react-icons/rx'
import './sidebar.css'
import FilterBrands from './FilterBrands/FilterBrands'
import Input from './Input/Input'

interface Model {
	id: number
	model: string
}

interface SidebarProps {
	onFilterChange: (
		selectedModels: string[],
		minPrice: string,
		maxPrice: string
	) => void
}

interface SidebarState {
	brands: Model[]
	searchTerm: string
	selectedModels: string[]
	minPrice: string
	maxPrice: string
}

const API_URL = 'https://backend-production-a524.up.railway.app/'

export class Sidebar extends Component<SidebarProps, SidebarState> {
	constructor(props: SidebarProps) {
		super(props)
		this.state = {
			brands: [],
			searchTerm: '',
			selectedModels: [],
			minPrice: '',
			maxPrice: '',
		}
	}

	componentDidMount() {
		this.fetchModels()
	}

	fetchModels = async () => {
		try {
			const response = await axios.get(`${API_URL}items/`)
			console.log('Ответ от сервера:', response.data)

			const data = Array.isArray(response.data)
				? response.data
				: Array.isArray(response.data.results)
				? response.data.results
				: []

			this.setState({
				brands: data.map((item: any) => ({
					id: item.id,
					model: item.model,
				})),
			})
		} catch (error) {
			console.error('Ошибка при загрузке моделей:', error)
		}
	}

	handleMinPriceChange = (value: string) => {
		this.setState({ minPrice: value }, this.updateFilters)
	}

	handleMaxPriceChange = (value: string) => {
		this.setState({ maxPrice: value }, this.updateFilters)
	}

	handleSearchBrandChange = (value: string) => {
		this.setState({ searchTerm: value })
	}

	handleModelChange = (models: string[]) => {
		this.setState({ selectedModels: models }, this.updateFilters)
	}

	updateFilters = () => {
		const { selectedModels, minPrice, maxPrice } = this.state
		this.props.onFilterChange(selectedModels, minPrice, maxPrice)
	}

	resetFilters = () => {
		this.setState(
			{
				searchTerm: '',
				selectedModels: [],
				minPrice: '',
				maxPrice: '',
			},
			this.updateFilters
		)
	}

	render() {
		const { brands, searchTerm, selectedModels } = this.state
		const filteredBrands = Array.isArray(brands)
			? brands.filter(brand =>
					brand.model.toLowerCase().includes(searchTerm.toLowerCase())
			  )
			: []

		return (
			<div className='sidebar'>
				<div className='sidebar-wrapper'>
					<RxCross2
						className='exit-sidebar'
						onClick={() => {
							const sidebarWrapper = document.querySelector(
								'.sidebar-wrapper'
							) as HTMLElement
							if (sidebarWrapper) {
								sidebarWrapper.style.display = 'none'
							}
						}}
					/>
					<div className='logo'>
						<img src='/search.png' alt='logo' />
					</div>
					<div className='filter'>
						<div className='filter-price'>
							<div className='title-price'>
								<span>Ціна</span>
							</div>
							<div className='search-price-1'>
								<Input
									type='text'
									placeholder='20000'
									value={this.state.minPrice}
									onChange={this.handleMinPriceChange}
									className='price-input1'
								/>
							</div>
							<div className='search-price-2'>
								<Input
									type='text'
									placeholder='100000'
									value={this.state.maxPrice}
									onChange={this.handleMaxPriceChange}
									className='price-input2'
								/>
							</div>
						</div>
						<div className='filter-brand'>
							<div className='title-brand'>Модель</div>
							<div className='search-brand'>
								<Input
									type='text'
									placeholder='Пошук'
									value={searchTerm}
									onChange={this.handleSearchBrandChange}
									className='search-brand-input'
								/>
							</div>
							<FilterBrands
								brands={filteredBrands}
								searchTerm={searchTerm}
								onModelChange={this.handleModelChange}
								activeModels={selectedModels}
							/>
						</div>
					</div>
					<div className='reset-filters'>
						<span onClick={this.resetFilters} className='reset-filters-btn'>
							Скинути фільтри
						</span>
					</div>
				</div>
			</div>
		)
	}
}

export default Sidebar
