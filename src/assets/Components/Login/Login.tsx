import React, { useState, useEffect } from 'react'
import { RxCross2 } from 'react-icons/rx'
import './Login.css'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
	user_id: number
}

interface LoginForm {
	username: string
	password: string
}

const API_URL = 'https://backend-production-a524.up.railway.app/'

interface LoginProps {
	onTokenChange: (token: string) => void 
}

const Login: React.FC<LoginProps> = ({ onTokenChange }) => {
	const [loginForm, setLoginForm] = useState<LoginForm>({
		username: '',
		password: '',
	})


	useEffect(() => {
		const savedToken = localStorage.getItem('token')
		if (savedToken) {

			onTokenChange(savedToken)
		}
	}, [onTokenChange])

	const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
	}

	const handleLoginClick = () => {
		const loginWrapper = document.querySelector('.login-wrapper') as HTMLElement
		loginWrapper?.classList.toggle('active')
		const mainWrapper = document.querySelector('.wrapper') as HTMLElement
		mainWrapper?.classList.toggle('active')
	}

	const handleRegistrationClick = () => {
		const loginWrapper = document.querySelector('.login-wrapper') as HTMLElement
		loginWrapper?.classList.toggle('active')
		const registrationWrapper = document.querySelector(
			'.registration-wrapper'
		) as HTMLElement
		registrationWrapper?.classList.toggle('active')
	}

	const login = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await axios.post(`${API_URL}auth/login/`, {
				username: loginForm.username,
				password: loginForm.password,
			})


			localStorage.setItem('token', response.data.access)
			localStorage.setItem('refreshToken', response.data.refresh)


			const decodedToken = jwtDecode<JwtPayload>(response.data.access)
			console.log('Decoded Token:', decodedToken)

			onTokenChange(response.data.access)

			alert('Ви успішно увійшли!') 
		} catch (error) {
			console.error(error)
			alert('Помилка авторизації')
		}
		window.location.reload()
	}

	return (
		<div className='login-wrapper'>
			<div className='upper'>
				<span>Вхід</span>
				<RxCross2 className='exit-button' onClick={handleLoginClick} />
			</div>
			<div className='lower'>
				<form onSubmit={login}>
					<div className='login-case'>
						<div className='login-title'>Логін</div>
						<input
							type='text'
							name='username'
							placeholder='Логін'
							value={loginForm.username}
							onChange={handleLoginChange}
							className='login-holder'
						/>
					</div>
					<div className='password-case'>
						<span className='password-title'>Пароль</span>
						<input
							type='password'
							name='password'
							placeholder='Пароль'
							value={loginForm.password}
							onChange={handleLoginChange}
							className='password-holder'
						/>
					</div>
					<button type='submit' className='login-button'>
						Вхід
					</button>
					<span className='register' onClick={handleRegistrationClick}>
						Немає аккаунту? Зареєструвати!
					</span>
				</form>
			</div>
		</div>
	)
}

export default Login
