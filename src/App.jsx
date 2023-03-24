import { useState } from 'react'
import './App.css'
import { getRandomArbitrary } from './utils';
import Game from './game';

function App() {

	const [gameRun, setGameRun] = useState({ start: true, diff: 18 });
	const [theme, setTheme] = useState(true)

	const titleText = "MATCH TILES";

	const title = titleText.split("").map((letter, i) => <span className='game-title-letter' style={{ animation: `flip-title ${getRandomArbitrary(0.25, 0.75)}s ${getRandomArbitrary(0.5, 1.5)}s forwards` }} key={letter + i}>{letter}</span>)


	function startGame(diff) {
		setGameRun({ start: true, diff: diff });
	}

	function swTheme() {

		setTheme(prevTheme => !prevTheme);
		const root = document.querySelector(":root");

		const rootStyle = getComputedStyle(root);

		let rootBg = rootStyle.getPropertyValue("--color-bg");
		let rootTheme = rootStyle.getPropertyValue("--color-theme");

		root.style.setProperty("--color-theme", rootBg);
		root.style.setProperty("--color-bg", rootTheme);
	}


	return (
		<div className="App">
			<div className='theme-sw' onClick={swTheme}>
				{
					theme ?
					<svg className='theme-sw-icon' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<g id="Lager_94" data-name="Lager 94" transform="translate(0)">
							<path id="Path_70" data-name="Path 70" d="M12.516,4.509A12,12,0,0,0,22.3,19.881,12.317,12.317,0,0,0,24,20a11.984,11.984,0,0,0,3.49-.514,12.1,12.1,0,0,1-9.963,8.421A12.679,12.679,0,0,1,16,28,12,12,0,0,1,12.516,4.509M16,0a16.5,16.5,0,0,0-2.212.15A16,16,0,0,0,16,32a16.526,16.526,0,0,0,2.01-.123A16.04,16.04,0,0,0,31.85,18.212,16.516,16.516,0,0,0,32,15.944,1.957,1.957,0,0,0,30,14a2.046,2.046,0,0,0-1.23.413A7.942,7.942,0,0,1,24,16a8.35,8.35,0,0,1-1.15-.08,7.995,7.995,0,0,1-5.264-12.7A2.064,2.064,0,0,0,16.056,0Z"/>
						</g>
					</svg>
					:
					<svg className='theme-sw-icon' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M13 3.49792C13 2.94564 12.5523 2.49792 12 2.49792C11.4477 2.49792 11 2.94564 11 3.49792V4C11 4.55229 11.4477 5 12 5C12.5523 5 13 4.55229 13 4V3.49792ZM18.719 6.69519C19.1095 6.30466 19.1095 5.6715 18.719 5.28097C18.3285 4.89045 17.6953 4.89045 17.3048 5.28097L16.9497 5.63605C16.5592 6.02658 16.5592 6.65974 16.9497 7.05027C17.3402 7.44079 17.9734 7.44079 18.3639 7.05027L18.719 6.69519ZM6.69516 5.28103C6.30464 4.89051 5.67147 4.89051 5.28095 5.28103C4.89043 5.67156 4.89043 6.30472 5.28095 6.69525L5.63597 7.05027C6.0265 7.44079 6.65966 7.44079 7.05019 7.05027C7.44071 6.65974 7.44071 6.02658 7.05019 5.63605L6.69516 5.28103ZM3.49792 11C2.94564 11 2.49792 11.4477 2.49792 12C2.49792 12.5523 2.94564 13 3.49792 13H3.99998C4.55226 13 4.99998 12.5523 4.99998 12C4.99998 11.4477 4.55226 11 3.99998 11H3.49792ZM20 11C19.4477 11 19 11.4477 19 12C19 12.5523 19.4477 13 20 13H20.5021C21.0544 13 21.5021 12.5523 21.5021 12C21.5021 11.4477 21.0544 11 20.5021 11H20ZM7.05019 18.364C7.44071 17.9735 7.44071 17.3403 7.05019 16.9498C6.65966 16.5592 6.0265 16.5592 5.63597 16.9498L5.28097 17.3048C4.89044 17.6953 4.89044 18.3285 5.28096 18.719C5.67149 19.1095 6.30465 19.1095 6.69518 18.719L7.05019 18.364ZM18.3639 16.9498C17.9734 16.5592 17.3402 16.5592 16.9497 16.9498C16.5592 17.3403 16.5592 17.9735 16.9497 18.364L17.3047 18.719C17.6953 19.1096 18.3284 19.1096 18.719 18.719C19.1095 18.3285 19.1095 17.6954 18.719 17.3048L18.3639 16.9498ZM13 20C13 19.4477 12.5523 19 12 19C11.4477 19 11 19.4477 11 20V20.5021C11 21.0544 11.4477 21.5021 12 21.5021C12.5523 21.5021 13 21.0544 13 20.5021V20ZM8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12ZM12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6Z"/>
					</svg>
				}
			</div>

			<div className='game-title'>
				{title}
			</div>

			{gameRun.start && <Game diff={gameRun.diff} />}

			<div className='diff-sel'>
				<h1 className='diff-sel-prompt'>Select Your Difficulty</h1>
				<div className='diff-sel-levels'>
					<span className='diff-sel-level' onClick={() => startGame(18)}>Easy</span>
					<span className='diff-sel-level' onClick={() => startGame(36)}>Normal</span>
					<span className='diff-sel-level' onClick={() => startGame(54)}>Hard</span>
				</div>
			</div>
		</div>
	)
}

export default App
