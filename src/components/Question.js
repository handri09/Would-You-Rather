import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { 
	Box, 
	Button, 
	Typography,
	Avatar,
	Grid, 
	Paper
} from '@material-ui/core';

class Question extends Component {
	render() {
		const {question, users, answered } = this.props;

		return (
			<Box>
				<br />
				<br />
				<Paper>
					<Grid container wrap="nowrap" spacing={2}>
						<Grid item>
		        	<Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
		        </Grid>
		        <Grid item xs zeroMinWidth>
		        	<Typography noWrap><i>{users[question.author]["name"]} asks, Would you Rather: </i></Typography>
		        	<Typography noWrap>{question.optionOne.text}, <i>Or ...</i></Typography>
		        	<Button 
		        		variant="outlined"
		        		size="medium" 
		        		color={ answered ? "primary" : "secondary" }
		        		component={Link}
		        		to={`/question/${question.id}`}
		        		fullWidth
		        		>
		        		{answered ? "View" : "Poll"}
                    </Button>
				</Grid>
				</Grid>
				</Paper>
			</Box>
		);
	}
}

export default Question;