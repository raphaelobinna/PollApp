import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { getUserPolls } from '../store/actions'
import DeleteIcon from '@material-ui/icons/Delete';

import { createPoll } from '../store/actions';
import Axios from 'axios';

let appURI = null

if (process.env.NODE_ENV === "production"){
    appURI = process.env.REACT_APP_URL_PRODUCTION
} else {
    appURI = process.env.REACT_APP_URL_DEVELOPMENT
}


class CreatePoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      options: ['', ''],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addAnswer = this.addAnswer.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

    componentDidMount(){
      const { getUserPolls } = this.props;
      getUserPolls()
    }

    handleSelect(id) {
      const { history } = this.props;
      history.push(`/poll/${id}`);
    }

    handleDelete(id) {
      Axios.delete(`${appURI}/api/polls/`+ id)
          .then(res =>  alert(res.data.message))
    }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addAnswer() {
    this.setState({ options: [...this.state.options, ''] });
  }

  handleAnswer(e, index) {
    const options = [...this.state.options];
    options[index] = e.target.value;
    this.setState({ options });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPoll(this.state);
    alert('Poll sucessfully created !!')
  }

  render() {

    const polls = this.props.polls.map(poll => (
      <li onClick={() => this.handleSelect(poll._id)} key={poll._id}>
        {poll.question}
        <DeleteIcon style={{ color: "red", marginLeft: '5px' }} fontSize="small" onClick={() => this.handleDelete(poll._id)} key={poll._id} />
      </li>
    ));    

    const options = this.state.options.map((option, i) => (
      <Fragment key={i}>
        <label className="form-label">option</label>
        <input
          className="form-input"
          type="text"
          value={options}
          key={i}
          onChange={e => this.handleAnswer(e, i)}
        />
      </Fragment>
    ));

    return (
      <Fragment>
             <form className="form" onSubmit={this.handleSubmit}>
        <label className="form-label" htmlFor="question">
          question
        </label>
        <input
          className="form-input"
          type="text"
          name="question"
          value={this.state.question}
          onChange={this.handleChange}
        />
        <div className="container">{options}</div>
        <div className="buttons_center">
          <button className="button" type="button" onClick={this.addAnswer}>
            Add options
          </button>
          <button className="button" type="submit">
            Submit
          </button>
        </div>
      </form>
      <hr/>
      <br/>
      <div>
      <ul className="polls">{polls}</ul>
      </div>
      </Fragment>
    );
  }
}

export default connect((store) => ({
  auth: store.auth,
  polls: store.polls,
}), { createPoll, getUserPolls })(CreatePoll);
