import React, { useState, useEffect } from 'react'
import "./game.css"
import { getRandomArbitrary, convertToHHMMSS } from './utils'


import questionMark from "./assets/questionMark.png"


export default function Game(props) {
	const tileImages = ["chat", 'clock', 'coffeeCup', 'coin', 'cold', 'dead', 'dollar', 'freeze', 'ghost', 'hailing', 'heart', 'humidity', 'loss', 'mobile', 'monitor', 'photoCamera', 'pixel', 'rainbow', 'send', 'star', 'starryNight', 'storm', 'sunglasses', 'sunrise', 'thermometer', 'thunder', 'tornado', 'trash', 'trophy', 'twitter', 'web', 'zoom'];
	const [tilePos, setTilePos] = useState([]);
	

	function GameData(props)
	{
		return(
			<div className='game-stats'>
				<div className='game-stat'>
					<h1 className='game-stat-header'>Moves</h1>
					<p className='game-stat-data'>{props.moves}</p>
				</div>
				<div className='game-stat'>
					<h1 className='game-stat-header'>Time</h1>
					<p className='game-stat-data'>{convertToHHMMSS(props.time)}</p>
				</div>
			</div>
		)
	}

	useEffect(() => {
		let tilePosTemp = [];
		for (let j = 1; j <= 2; j++) {
			let tileImageCopy = tileImages.slice();
			tileImageCopy.length = props.diff / 2;
			for (let i = 0; i < (props.diff / 2); i++) {
				let randIndex;
				if (tileImageCopy.length === 0) randIndex = 0;
				else randIndex = Math.floor(getRandomArbitrary(0, tileImageCopy.length));
				tilePosTemp.push({ id: tileImages.indexOf(tileImageCopy[randIndex]), img: `../src/assets/${tileImageCopy[randIndex]}.png`});
				tileImageCopy.splice(randIndex, 1);
			}
		}
		setTilePos(tilePosTemp);
	}, [props.diff])


	function Tile(props) {
		function revealTile(e) {
			if(props.tiles.flipped.length === 2 || props.tiles.flipped.includes(props.index) || props.tiles.matched.includes(tilePos[props.index].id)) return;
			e.target.classList.contains("game-tile") ? e.target.classList.add("tile-flip") : e.target.parentNode.classList.add("tile-flip");
			props.setTiles(prevTiles => {return{...prevTiles, flipped: [...prevTiles.flipped, props.index]}});
			props.setTileFlipHist(prevTiles => [...prevTiles, props.index]);
		}

		if(props.tiles.flipped.length === 2)
		{
			setTimeout(() => {
				(props.tiles.flipped[0] && (tilePos[props.tiles.flipped[0]].id === tilePos[props.tiles.flipped[1]].id)) ? props.setTiles(prevTiles => {return{matched: [...prevTiles.matched, tilePos[props.tileFlipHist[props.tileFlipHist.length-1]].id], flipped:[]}}) : props.setTiles(prevTiles => {return{...prevTiles, flipped:[]}});
				props.setTiles(prevTiles => {return{...prevTiles, matched: [...new Set(prevTiles.matched)]}});
			}, 600)
		}

		return (
			<div className='game-tile' key={props.index} onClick={revealTile}>
				<img src={(props.tiles.flipped.includes(props.index) || props.tiles.matched.includes(tilePos[props.index].id)) ? tilePos[props.index].img : questionMark} className="tile-img" />
			</div>
		)
	}


	const GameTiles = () => {
		let gameTiles = [];
		const [tiles, setTiles] = useState({
			flipped: [],
			matched: []
		});
		const [tileFlipHist, setTileFlipHist] = useState([]);
		const [game, setGame] = useState({
			start: false,
			time: {
				h: 0,
				m: 0,
				s: 0
			},
			comp: false
		});

		if(tiles.matched.length === props.diff / 2 && !game.comp) setGame(prevState => {return{...prevState, comp: true}});
		!game.start && tileFlipHist.length > 0 && setGame(prevState => {return{...prevState, start: true}});

		useEffect(() => {
			let startTimer;
			if(game.start && !game.comp)
			{
				startTimer = setInterval(() => 
				{
						let curTime = game.time;
						curTime.s += 1;
						if(curTime.s >= 60) {curTime.m += 1; curTime.s = 0};
						if(curTime.m >= 60) {curTime.h += 1; curTime.m = 0};
						setGame(prevState => {return{...prevState, time: curTime}});
						clearInterval(startTimer)
					}, 1000)
			}
			
		}, [game])


		for (let i = 0; i < tilePos.length; i++) gameTiles.push(<Tile index={i} key={i} tiles={tiles} setTiles={setTiles} tileFlipHist={tileFlipHist} setTileFlipHist={setTileFlipHist}/>);
		return (
			<>
				<GameData moves={tileFlipHist.length} time={game.time}/>
				<div id='game'>
					{gameTiles}
				</div>
				{
					game.comp && <h2 className='game-comp-msg'>Game completed in <span className='game-comp-msg-dt'>{convertToHHMMSS(game.time)}</span> using <span className='game-comp-msg-dt'>{tileFlipHist.length} moves</span>.</h2>
				}
			</>
		);
	}	
	


	return <GameTiles/>
}
