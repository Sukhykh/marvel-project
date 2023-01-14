import Header from './components/Header';
import Heroes from './components/Heroes';
import Comics from './components/Comics';
import Footer from './components/Footer';

import './assets/css/App.scss';

import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Header />
			<div className='main'>
				<div className='main__container'>
					<div className='main__wrapper'>
						<Routes>
							<Route path='/' element={<Heroes />}></Route>
							<Route path='/comics' element={<Comics />}></Route>
						</Routes>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default App;
