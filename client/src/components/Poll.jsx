import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import {  EmailShareButton, FacebookShareButton, WhatsappShareButton,  TwitterShareButton, TelegramShareButton, } from "react-share";
import { EmailIcon, FacebookIcon, WhatsappIcon, TwitterIcon, TelegramIcon } from 'react-share'

import { vote } from '../store/actions';
import { color } from '../services/color';


let appURI = null

if (process.env.NODE_ENV === "production"){
    appURI = process.env.REACT_APP_URL_PRODUCTION
} else {
    appURI = process.env.REACT_APP_URL_DEVELOPMENT
}

const Poll = ({ poll, vote }) => {
  const answers =
    poll.options &&
    poll.options.map(option => (
      <button
        onClick={() => vote(poll._id, { answer: option.option })}
        className="button"
        key={option._id}>
        {option.option}
      </button>
    ));

  const data = {
    labels: poll.options.map(option => option.option),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map(option => color()),
        borderColor: '#323643',
        data: poll.options.map(option => option.votes),
      },
    ],
  };

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>
      <div className="buttons_center">{answers}</div>
      <Pie data={data} />
      <div className="footer" >
      <EmailShareButton
          url={`${appURI}/api/polls/`+ poll._id}
      >
        <EmailIcon size={36} round={true}/>
      </EmailShareButton>
    <FacebookShareButton
         url={`${appURI}/api/polls/`+ poll._id}
    >
      <FacebookIcon size={36} round={true}/>
    </FacebookShareButton>
    <TelegramShareButton
         url={`${appURI}/api/polls/`+ poll._id}
    >
      <TelegramIcon size={36} round={true}/>
    </TelegramShareButton>
    <TwitterShareButton
        url={`${appURI}/api/polls/`+ poll._id}
    >
      <TwitterIcon size={36} round={true}/>
    </TwitterShareButton>
    <WhatsappShareButton
       url={`${appURI}/api/polls/`+ poll._id}
    > 
      <WhatsappIcon size={36} round={true}/>
    </WhatsappShareButton>
      </div>
    </div>
  );
};

export default connect(
  store => ({
    poll: store.currentPoll,
  }),
  { vote },
)(Poll);
