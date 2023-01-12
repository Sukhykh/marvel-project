import '../assets/css/Menu.scss';

import List from './MenuList';

function Menu() {
	return (
		<ul className='menu'>
			<List type='heroes' />
			<List type='comics' />
		</ul>
	);
}

export default Menu;
