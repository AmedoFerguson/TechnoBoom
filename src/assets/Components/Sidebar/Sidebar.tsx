import React, { Component } from 'react'
import './sidebar.css'
import FilterBrands from './FilterBrands/FilterBrands'
import Input from './Input/Input'

interface Brand {
	id: number
	brand: string
}

interface SidebarState {
	brands: Brand[]
	priceInput: string
}

export class Sidebar extends Component<object, SidebarState> {
	constructor(props: object) {
		super(props)
		this.state = {
			brands: [
				{ id: 1, brand: 'MSI' },
				{ id: 2, brand: 'Lenovo' },
				{ id: 3, brand: 'Acer' },
				{ id: 4, brand: 'Gigabyte' },
			],
			priceInput: '',
		}
	}

	handlePriceChange = (value: string) => {
		this.setState({ priceInput: value })
	}

	render() {
		return (
			<div className='sidebar'>
				<div className='wrapper'>
					<div className='logo'></div>
					<div className='filter'>
						<div className='filter-price'>
							<div className='title-price'>
								<span>Ціна</span>
							</div>
							<div className='search-price-1'>
								<Input
									type='text'
									placeholder='20000'
									value={this.state.priceInput}
									onChange={this.handlePriceChange}
									className='price-input1'
								/>
							</div>
							<div className='search-price-2'>
								<Input
									type='text'
									placeholder='100000'
									value={this.state.priceInput}
									onChange={this.handlePriceChange}
									className='price-input2'
								/>
							</div>
							<div className='holder'></div>
							<div className='brands'></div>
						</div>
						<div className='filter-brand'>
							<div className='title-brand'>Бренди</div>
							<div className='search-brand'>
								<Input
									type='text'
									placeholder='Пошук'
									value={this.state.priceInput}
									onChange={this.handlePriceChange}
									className='price-input1'
								/>
							</div>
							<FilterBrands brands={this.state.brands} />
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Sidebar
