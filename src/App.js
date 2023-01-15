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
			<main className='main'>
				<div className='main__container'>
					<div className='main__wrapper'>
						<Routes>
							<Route
								path='marvel-project/'
								element={<Heroes />}
							></Route>
							<Route
								path='marvel-project/comics'
								element={<Comics />}
							></Route>
						</Routes>
					</div>
				</div>
			</main>
			<Footer />
		</>
	);
}

export default App;
