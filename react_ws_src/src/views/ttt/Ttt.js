import React, { Component} from 'react'
import { Link } from 'react-router'

import SetName from './SetName'
import SetGameType from './SetGameType'

import GameMain from './GameMain'
import GameMainComplexity from './GameMainComplexity'


export default class Ttt extends Component {

	constructor (props) {
		super(props)

		// TODO - Get from Feature Flag Service
		const flag_game_engine_enabled = true

		this.state = {
			flag_game_engine_enabled,
			game_step: this.set_game_step()
		}
	}

//	------------------------	------------------------	------------------------

	render () {

		const { game_step, flag_game_engine_enabled } = this.state

		console.log(game_step)

		return (
			<section id='TTT_game'>
				<div id='page-container'>
					{game_step == 'set_name'
						? <SetName
								onSetName={this.saveUserName.bind(this)}
							/>
						: <div>
								<h2>Welcome, {app.settings.curr_user.name}</h2>
							</div>
					}

					{game_step == 'set_game_type' && <SetGameType
														onSetType={this.saveGameType.bind(this)}
													/>}

					{game_step == 'start_game'
					 	? flag_game_engine_enabled && this.state.game_type === 'comp'
							? <GameMainComplexity
									game_type={this.state.game_type}
									onEndGame={this.gameEnd.bind(this)}
									difficulty={'hard'} // 'easy', 'normal' // TODO - access from feature flag data
								/>
							: <GameMain
									game_type={this.state.game_type}
									onEndGame={this.gameEnd.bind(this)}
								/>
						: null
					}

				</div>
			</section>
		)
	}

//	------------------------	------------------------	------------------------

	saveUserName (n) {
		app.settings.curr_user = {}
		app.settings.curr_user.name = n

		this.upd_game_step()
	}

//	------------------------	------------------------	------------------------

	saveGameType (t) {
		this.state.game_type = t

		this.upd_game_step()
	}

//	------------------------	------------------------	------------------------

	gameEnd (t) {
		this.state.game_type = null

		this.upd_game_step()
	}

//	------------------------	------------------------	------------------------
//	------------------------	------------------------	------------------------

	upd_game_step () {

		this.setState({
			game_step: this.set_game_step()
		})
	}

//	------------------------	------------------------	------------------------

	set_game_step () {

		if (!app.settings.curr_user || !app.settings.curr_user.name)
			return 'set_name'
		else if (!this.state.game_type)
			return 'set_game_type'
		else
			return 'start_game'
	}

}

//	------------------------	------------------------	------------------------

Ttt.propTypes = {
	params: React.PropTypes.any
}

Ttt.contextTypes = {
  router: React.PropTypes.object.isRequired
}
