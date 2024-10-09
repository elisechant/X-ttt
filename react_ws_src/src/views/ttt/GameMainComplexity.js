import React, {Component} from 'react'

import TweenMax from 'gsap'

import TicTacToeEngine, {Player, GameStatus} from 'tic-tac-toe-minimax-engine';

const cell_map = [
	{ x: 0, y: 0 },
	{ x: 1, y: 0 },
	{ x: 2, y: 0 },
	{ x: 0, y: 1 },
	{ x: 1, y: 1 },
	{ x: 2, y: 1 },
	{ x: 0, y: 2 },
	{ x: 1, y: 2 },
	{ x: 2, y: 2 },
]

function selectRandomNullIndex(arr) {
	// Create an array of indices where the value is null
	const nullIndices = arr.reduce((indices, value, index) => {
		if (value === null) {
			indices.push(index);
		}
		return indices;
	}, []);

	// If there are no null values, return null
	if (nullIndices.length === 0) {
		return null;
	}

	// Select a random index from the nullIndices array
	const randomIndex = Math.floor(Math.random() * nullIndices.length);

	// Return the randomly selected null index
	return nullIndices[randomIndex];
}


/*

 Game Complexity ABC TEST

 Level "easy" = Computer move is based on Math.random (same as current live behaviour)
 Level "normal" = Computer move has 50/50 chance to be "hard" or "easy"
 Level "hard" = Computer move is decided through the minimax algorithm

 */

export default class GameMainComplexity extends Component {

	constructor (props) {
		super(props)

		console.log('** Starting Game - COMPLEXITY Variation **')

		const engine = new TicTacToeEngine(Player.PLAYER_ONE);

		this.state = {
			engine,
			gameStatus: GameStatus.ONGOING,
			boardReset: false,
			difficulty: props.difficulty, // 'easy', 'hard', 'normal'

			cell_vals: [
				[null, null, null],
				[null, null, null],
				[null, null, null]
			],
		}
	}

	resetGame() {
		this.setState({
			engine: new TicTacToeEngine(Player.PLAYER_ONE),
			gameStatus: GameStatus.ONGOING,
			boardReset: true
		})
	}

	updateGameStatus(gameStatus) {
		this.setState({gameStatus});
	}

	toggleBoardReset(value) {
		this.setState({boardReset: value});
	}

//	------------------------	------------------------	------------------------

	componentDidMount () {
    	TweenMax.from('#game_stat', 1, {display: 'none', opacity: 0, scaleX:0, scaleY:0, ease: Power4.easeIn})
    	TweenMax.from('#game_board', 1, {display: 'none', opacity: 0, x:-200, y:-200, scaleX:0, scaleY:0, ease: Power4.easeIn})
	}

	componentWillUnmount () {
		this.toggleBoardReset()
	}

//	------------------------	------------------------	------------------------

	cell_cont (x, y) {
		const { cell_vals } = this.state

		return (
			<div>
				{cell_vals && cell_vals[y][x] === 'x' && <i className="fa fa-times fa-5x"></i>}
				{cell_vals && cell_vals[y][x] === 'o' && <i className="fa fa-circle-o fa-5x"></i>}
			</div>
		)
	}

//	------------------------	------------------------	------------------------

	render () {
		const { engine, gameStatus, difficulty } = this.state

		return (
			<div id='GameMain' className={gameStatus === GameStatus.ONGOING ? 'is-playing' : 'is-complete'}>

				<h1>Play {this.props.game_type} - Difficulty: {difficulty}</h1>

				<div id="game_stat">
					{engine.isTerminated
						? <div id="game_turn_msg">
								{gameStatus === GameStatus.DRAW ? 'It\'s a draw' : engine.currentPlayer === Player.PLAYER_ONE ? 'You lost!' : 'You won!'}
							</div>
						: <div id="game_turn_msg">{engine.currentPlayer === Player.PLAYER_ONE ? 'Your turn' : 'Opponent turn'}</div>
					}
				</div>

				<div id="game_board">
					<table>
					<tbody>
						<tr>
							<td ref='00' onClick={() => this.click_cell(0, 0)}>{this.cell_cont(0, 0)} </td>
							<td ref='10' onClick={() => this.click_cell(1, 0)} className="vbrd"> {this.cell_cont(1, 0)} </td>
							<td ref='20' onClick={() => this.click_cell(2, 0)}> {this.cell_cont(2, 0)} </td>
						</tr>
						<tr>
							<td ref='01' onClick={() => this.click_cell(0, 1)} className="hbrd"> {this.cell_cont(0, 1)} </td>
							<td ref='11' onClick={() => this.click_cell(1, 1)} className="vbrd hbrd"> {this.cell_cont(1, 1)} </td>
							<td ref='21' onClick={() => this.click_cell(2, 1)} className="hbrd"> {this.cell_cont(2, 1)} </td>
						</tr>
						<tr>
							<td ref='02' onClick={() => this.click_cell(0, 2)}> {this.cell_cont(0, 2)} </td>
							<td ref='12' onClick={() => this.click_cell(1, 2)} className="vbrd"> {this.cell_cont(1, 2)} </td>
							<td ref='22' onClick={() => this.click_cell(2, 2)}> {this.cell_cont(2, 2)} </td>
						</tr>
					</tbody>
					</table>
				</div>

				<button type='submit' onClick={this.end_game.bind(this)} className='button'><span>End Game <span className='fa fa-caret-right'></span></span></button>

			</div>
		)
	}

//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------

	click_cell (x, y) {
		const { engine, gameStatus, cell_vals } = this.state

		// console.log({ board: JSON.stringify(engine.board) })
		console.log('You selected', { x, y })

		if (gameStatus !== GameStatus.ONGOING) {
			return
		}

		// selected existing
		if (engine.board[y][x] !== 0) {
			return
		}

		const newCallVals = [...cell_vals]
		newCallVals[y][x] = 'x'

		this.setState({ cell_vals: newCallVals })
		TweenMax.from(this.refs[String(y) + String(x)], 0.7, {opacity: 0, scaleX:0, scaleY:0, ease: Power4.easeOut})

		// player move
		const gameStatusNext = engine.makeNextMove(x, y)
		this.updateGameStatus(gameStatusNext)

		setTimeout(() => {
			// computer move
			this.turn_ply_comp()
		}, 200)
	}

//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------

	turn_ply_comp () {
		const { engine, cell_vals, difficulty } = this.state

		// calculate next move
		let x,y;

		if (difficulty === 'normal' && Math.random() < 0.5 || difficulty === 'hard') {
			const move = engine.getBestMove()
			x = move.x
			y = move.y

			console.log('Computer calculated hard move', { x, y })
		} else {
			const randomNullIndex = selectRandomNullIndex([...cell_vals].flat());

			const move = cell_map[randomNullIndex]
			x = move.x
			y = move.y

			console.log('Computer calculated easy move', { x, y })
		}

		// computer move
		try {
			const gameStatusNext = engine.makeNextMove(x, y)
			this.updateGameStatus(gameStatusNext)
		} catch (err) {
			console.log('Game ended')
		}

		const newCallVals = [...cell_vals]
		newCallVals[y][x] = 'o'
		this.setState({ cell_vals: newCallVals })
		TweenMax.from(this.refs[String(y) + String(x)], 0.7, {opacity: 0, scaleX:0, scaleY:0, ease: Power4.easeOut})
	}

	end_game () {
		this.props.onEndGame()
	}

}
