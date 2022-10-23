import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/shared';
import { Redirect, NavLink } from 'react-router-dom';

class New extends Component {
	state = {
		redirect: false,
		optionOneText: "",
		optionTwoText: "",
	}

	handleChangeOne = (e) => {
		this.setState( (prev) => ({
			...prev,
			optionOneText: e.target.value,
		}))
	}

	handleChangeTwo = (e) => {
		this.setState( (prev) => ({
			...prev,
			optionTwoText: e.target.value,
		}))
	}
	handleSubmit = (e) => {
		e.preventDefault();
		const { dispatch } = this.props;
		const { optionOneText, optionTwoText } = this.state;
		dispatch(handleSaveQuestion(optionOneText, optionTwoText));
		this.setState(() => ({
			optionOneText: '',
			optionTwoText: '',
			redirect: true
		}));
	}
	render() {
		if (this.state.redirect || (this.props.authedUser === null) ) {
			return <Redirect to='/' />
		}		

		return (
			<div>
				<h1>Add New Question</h1>
				<h3><i>Would you rather:</i></h3>
				<form>
					<TextField 
						placeholder="Option One"
						onChange={this.handleChangeOne}
						value= {this.state.optionOne}
						/>
					<br />
					<br />
					<TextField 
						placeholder="Option Two"
						onChange={this.handleChangeTwo}
						value= {this.state.optionTwo}
						/>
					<br />
					<br />
					<NavLink to='/leaderboard'>
						<Button onClick={this.handleSubmit}>Submit</Button>
					</NavLink>
				</form>
			</div>
		);
	}
}


export default connect()(New);