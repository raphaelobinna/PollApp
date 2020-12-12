import React from 'react';
import { Redirect } from 'react-router-dom';

import Poll from '../components/Poll';
import ErrorMessage from '../components/ErrorMessage';

const PollPage = ({ match, getPoll, poll, isAuthenticated }) => {
  if (!isAuthenticated) return <Redirect to="/login" />;
  getPoll(match.params.id);

  return (
    <div>
      <ErrorMessage />
      <Poll />
    </div>
  );
};

export default PollPage;
