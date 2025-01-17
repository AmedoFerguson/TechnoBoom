import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Sidebar from './assets/Components/Sidebar/Sidebar'
import Header from './assets/Components/Header/Header'
import Content from './assets/Components/Content/Content'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<div className='wrapper'>
			<Sidebar />
			<Header />
			<Content />
		</div>
	</StrictMode>
)
