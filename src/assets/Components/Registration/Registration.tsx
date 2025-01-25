import React, { useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import './Registration.css'
import axios from 'axios'

interface RegisterForm {
	username: string
	password: string
	email: string
}

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
	const [registerForm, setRegisterForm] = useState<RegisterForm>({
		username: '',
		password: '',
		email: '',
	})

	const API_URL = 'http://127.0.0.1:8000/'

	const handleRegisterChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
	}

	const handleRegistrationClick = () => {
		const regWrapper = document.querySelector(
			'.registration-wrapper'
		) as HTMLElement
		regWrapper?.classList.toggle('active')
		const mainWrapper = document.querySelector('.wrapper') as HTMLElement
		mainWrapper?.classList.toggle('active')
	}

	const register = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		try {
			const response = await axios.post(`${API_URL}auth/register/`, {
				username: registerForm.username,
				password: registerForm.password,
				email: registerForm.email,
			})
			console.log('Пользователь зарегистрирован', response.data)
			alert('Регистрация прошла успешно! Теперь вы можете войти в систему.')
		} catch (error) {
			console.error('Ошибка регистрации', error)
		}
		window.location.reload()
	}

	return (
		<div className='registration-wrapper'>
			<div className='upper'>
				<span>Реєстрація</span>
				<RxCross2 className='exit-button' onClick={handleRegistrationClick} />
			</div>
			<div className='lower'>
				<form onSubmit={register}>
					<div className='login-case'>
						<div className='login-title'>Логін</div>
						<input
							type='text'
							name='username'
							placeholder='Логін'
							value={registerForm.username}
							onChange={handleRegisterChange}
							className='login-holder'
						/>
					</div>
					<div className='password-case'>
						<span className='password-title'>Пароль</span>
						<input
							type='password'
							name='password'
							placeholder='Пароль'
							value={registerForm.password}
							onChange={handleRegisterChange}
							className='password-holder'
						/>
					</div>
					<div className='password-case'>
						<span className='password-title'>Пошта</span>
						<input
							type='email'
							name='email'
							placeholder='E-mail'
							value={registerForm.email}
							onChange={handleRegisterChange}
							className='password-holder'
						/>
					</div>
					<button type='submit' className='reg-button'>
						Зареєструватися
					</button>
				</form>
			</div>
		</div>
	)
}

export default Register
