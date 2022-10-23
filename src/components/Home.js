import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Question from './Question';
import { 
  Box, 
  Button, 
  Container 
} from '@material-ui/core';

class Home extends Component{
	state = {
		answered: false,
	}

	handleSwitch = (e) => {
		this.setState( (prev) => ({
			...prev,
			answered: e,
			redirect: false,
		}));
	}

	handleClick = (e) => {
		this.setState( (prev) => ({
			...prev,
			redirect: true,
		}));
	}

	render() {
		const { authedUser, users, questions, qUn, qAn } = this.props;
		if (authedUser === null) {
			return (<Redirect to='/' />);
		}

		let questF = [];
		for (let question of Object.values(questions)) {
			let answered = false;
			if (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)){
				answered = true;
			} else {
				answered = false;
			}

			questF = questF.concat([{
				...question,
				answered
			}])
		}

		const { answered } = this.state;
		const qIds = answered ? qAn : qUn;
		const qIdsSort = qIds.sort( (a,b) => b.timestamp - a.timestamp);

		return(
			<Container maxWidth="sm">					
				<Box component="div">
					<Button variant={!answered ? "contained" : "outlined"} size="medium" color={!answered ? "secondary" : "default"} onClick={(e) => this.handleSwitch(false)}>Unanswered</Button>
					<Button variant={ answered ? "contained" : "outlined"} size="medium" color={ answered ? "primary"   : "default"} onClick={(e) => this.handleSwitch(true)}>Answered</Button>
				</Box>

				<ul>
				{qIdsSort.map( (question) => (
					<Question key={question.id} click={(e) => this.handleClickq(e)} question={question} users={users} answered={answered}/>
					) 
				)}
				</ul>
			</Container>
		);
	}
}

function mapStateToProps({ authedUser, users, questions }){
	const question_values = Object.values(questions);
	const qUn = question_values.filter( (q) => (
		!q.optionOne.votes.includes(authedUser) && !q.optionTwo.votes.includes(authedUser)));
	const qAn = question_values.filter( (q) => (
		q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser)));

	return {
		authedUser,
		users,
		questions,
		qUn,
		qAn,
	};
}

export default connect(mapStateToProps)(Home);