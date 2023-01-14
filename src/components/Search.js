import '../assets/css/Search.scss';

export default function Search() {
	return (
		<div className='search'>
			<div className='search__wrapper'>
				<textarea
					className='search__input'
					name='search'
					id='search'
					rows='1'
				></textarea>
				<div className='search__btn'>Lets find some information</div>
			</div>
		</div>
	);
}
