import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { handleAnswer } from '../actions/shared'
import { 
	Box, Button, Avatar } from '@material-ui/core';

class QuestionDetails extends Component{

	handleClick = (answer) => {
		const { dispatch, question} = this.props;
		dispatch(handleAnswer(question.id, answer));
	}

	render() {
		const { question, authedUser, users, qExist } = this.props;

		if (!qExist) {
			return (<h1>Page Not Found, 404!</h1>);
		}

		const answered = (question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)) ? true : false; 
		const votesOne = question.optionOne.votes.length;
		const votesTwo = question.optionTwo.votes.length;
		const totalVotes = votesOne + votesTwo;
		const percVotesOne = (votesOne/totalVotes)*100
		const percVotesTwo = (votesTwo/totalVotes)*100
		const colorOne = question.optionOne.votes.includes(authedUser) ? "primary": "default"
		const colorTwo = question.optionTwo.votes.includes(authedUser) ? "primary": "default"
		const variantOne = question.optionOne.votes.includes(authedUser) ? "contained": "outlined"
		const variantTwo = question.optionTwo.votes.includes(authedUser) ? "contained": "outlined"

		return(
		<div>
			{answered ? (
				<Box component="div" m={1} >
					<span><strong><i>{users[question.author]["name"]}</i></strong> asked, Would You Rather: </span>
					<br />
					<Avatar alt={users[question.author]["name"]} src={users[question.author].avatarURL}/>
					<br />
					<Button variant={variantOne} size="medium" color={colorOne} >{question.optionOne.text}</Button>
					<br />
					<i><span>{votesOne} vote(s) over {totalVotes}, {percVotesOne}%</span></i>
					<br />
					<br />
					<Button variant={variantTwo} size="medium" color={colorTwo} >{question.optionTwo.text}</Button>
					<br />
					<i><span>{votesTwo} vote(s) over {totalVotes}, {percVotesTwo}%</span></i>
				</Box>
				) : (
				<Box component="div" m={1}>
					<span><strong><i>{users[question.author]["name"]}</i></strong> asks, Would You Rather: </span>
					<br />
					<Avatar alt={users[question.author]["name"]} src={users[question.author]["avatarURL"]}/>
					<br />

            		<NavLink to='/' exact activeClassName='active'>
						<Button 
							onClick={() => this.handleClick('optionOne')}
							variant="outlined" 
							size="medium" 
							color="secondary" 
							>
							{question.optionOne.text} ? 
							</Button>
					</NavLink>
					<br />
            		<Button siz="small">Or...</Button>
					<br />
					<NavLink to='/' exact activeClassName='active'>
						<Button 
							onClick={() => this.handleClick('optionTwo')}
							variant="outlined" 
							size="medium" 
							color="secondary" 
							>
							{question.optionTwo.text} ? 
						</Button>
					</NavLink>
					<br />
				</Box>
			)}
		</div> 
		);
	}
}

const mapStateToProps = ({ authedUser, users, questions}, props) => {
	const { question_id } = props.match.params;
	let question = null;
	let qExist = false ;
	if (Object.keys(questions).includes(question_id) === true){
		question = questions[question_id];
		qExist = true;
	}
	return {
		qid : question_id,
		question,
		authedUser,
		users,
		qExist,
	};
}

export default connect(mapStateToProps)(QuestionDetails);