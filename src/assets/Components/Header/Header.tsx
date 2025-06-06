import { Component } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { FaRegUser } from 'react-icons/fa'
import { CiCirclePlus } from 'react-icons/ci'
import { IoIosLogOut } from 'react-icons/io'
import './header.css'
import SearchBar, { Laptop } from './SearchBar'
import searchImg from '../../../../public/search.png'

interface HeaderState {
	searchInput: string
	isFixed: boolean
	lastScrollTop: number
}

interface HeaderProps {
	searchInput: string
	wrapperRef: React.RefObject<HTMLDivElement>
	token: string
	onLogout: () => void
	laptops: Laptop[]
	onLaptopClick: React.Dispatch<React.SetStateAction<Laptop | null>>
	onSearchChange: React.Dispatch<React.SetStateAction<string>>
}

export class Header extends Component<HeaderProps, HeaderState> {
	constructor(props: HeaderProps) {
		super(props)
		this.state = {
			searchInput: '',
			isFixed: false,
			lastScrollTop: 0,
		}
	}

	handleSearchChange = (value: string) => {
		this.setState({ searchInput: value })
		this.props.onSearchChange(value)
	}

	handleLoginClick = () => {
		const mainWrapper = document.querySelector('.wrapper') as HTMLElement
		mainWrapper?.classList.toggle('active')
		const loginWrapper = document.querySelector('.login-wrapper') as HTMLElement
		loginWrapper?.classList.toggle('active')
	}

	handleRegistrationClick = () => {
		const loginWrapper = document.querySelector(
			'.registration-wrapper'
		) as HTMLElement
		loginWrapper?.classList.toggle('active')
		const mainWrapper = document.querySelector('.wrapper') as HTMLElement
		mainWrapper?.classList.toggle('active')
	}

	handleBurgerClick = () => {
		const sidebarWrapper = document.querySelector(
			'.sidebar-wrapper'
		) as HTMLElement
		if (sidebarWrapper) {
			sidebarWrapper.style.display = 'block'
		}
	}

	handleLogout = () => {
		localStorage.removeItem('token')
		localStorage.removeItem('refreshToken')
		this.props.onLogout()
	}

	handleNewAdClick = () => {
		const AdWrapper = document.querySelector('.add-ad') as HTMLElement
		if (AdWrapper) {
			AdWrapper.style.display = 'block'
		}
		const mainWrapper = document.querySelector('.wrapper') as HTMLElement
		mainWrapper?.classList.toggle('active')
	}

	handleScroll = () => {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop
		const { lastScrollTop } = this.state

		if (scrollTop > lastScrollTop && scrollTop > 100) {
			this.setState({ isFixed: false })
		} else if (scrollTop < lastScrollTop) {
			this.setState({ isFixed: true })
		}

		this.setState({ lastScrollTop: scrollTop <= 0 ? 0 : scrollTop })
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll)
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll)
	}

	render() {
		const { token, laptops, onLaptopClick } = this.props
		const { isFixed, searchInput } = this.state

		return (
			<header className={isFixed ? 'fixed-header' : ''}>
				<div className='search'>
					<RxHamburgerMenu
						className='burger-menu'
						onClick={this.handleBurgerClick}
					/>
					<div className='search-button' color='#fff'></div>
				</div>
				<nav className='navigation'>
					{!token && (
						<>
							<div className='login'>
								<div className='bg-nav' onClick={this.handleLoginClick}>
									Вхід
								</div>
							</div>
							<div className='registration'>
								<div className='bg-nav' onClick={this.handleRegistrationClick}>
									Реєстрація
								</div>
							</div>
						</>
					)}
					{token && (
						<div className='auth-nav'>
							<div className='logout'>
								<span className='bg-nav' onClick={this.handleLogout}>
									Вихід
								</span>
							</div>
							<div className='new-ad'>
								<span className='bg-nav' onClick={this.handleNewAdClick}>
									Додати Об'яву
								</span>
							</div>
						</div>
					)}
					<div className='nav-logo'></div>
				</nav>
				<div className='mobile-header'>
					{!token && (
						<FaRegUser
							className='profile-icon'
							onClick={this.handleLoginClick}
						/>
					)}
					{token && (
						<CiCirclePlus
							className='new-ad-mobile'
							onClick={this.handleNewAdClick}
						/>
					)}
					{token && (
						<IoIosLogOut className='logout' onClick={this.handleLogout} />
					)}
				</div>
			</header>
		)
	}
}

export default Header
