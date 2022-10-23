import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserItem from './UserItem'

class Leader extends Component{
	render() {
		const { users, questions } = this.props

		let stats = []
		for (let user of Object.values(users)) {
			let authored = 0;
			let answered = 0;
			for (let question of Object.values(questions)) {
				if (question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id)){
					answered++;
				}

				if (question.author === user.id){
					authored++;
				}
			}
			
			stats = stats.concat([{
				id: user.id,
				authored: authored,
				answered: answered,
				total: authored + answered,
			}])
		}

		let objStats = {};

		function obj(id,authored,answered,total){
			return {
				id,
				authored,
				answered,
				total,
			};
		}

		let objj={};
		for (let stat of stats){
			objj = new obj(stat.id, stat.authored, stat.answered, stat.total);
			objStats = {
				...objStats,
				[stat.id]: objj
			}
		}

		const statsSorted = Object.keys(objStats).sort((a,b)=> objStats[b].total - objStats[a].total)

		return(
			<div>
				<h3>LeaderBoard</h3>
				{statsSorted.map( id => (
					<div key={users[id].id}>
						<UserItem 
						name={users[id].name} 
						wrote={stats.filter(stat=> stat.id === id)[0].authored} 
						answered={stats.filter(stat=> stat.id === id)[0].answered} 
						total={stats.filter(stat=> stat.id === id)[0].total} 
						users={users}
						user={users[id]}
						/>
						<br />
					</div>
				))}
			</div>
		);
	}
}

function mapStateToProps ({ users, questions }) {
	return {
		users,
		questions
	}
}

export default connect(mapStateToProps)(Leader);