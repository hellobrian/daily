import React, { Fragment } from 'react';
import axios from 'axios';

const Habit = ({ onClick, children, ...other }) => {
  return (
    <li {...other}>
      {children}
      <button onClick={onClick}>Completed Today!</button>
    </li>
  );
};

class Index extends React.Component {
  static getInitialProps = async ({ req, res }) => {
    // check if https or http from request headers
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    // get host from request headers
    const host = req.headers.host;

    const habits = await axios
      .get(`${protocol}://${host}/api/habits`)
      .then((response) => response.data)
      .catch((err) => {
        console.error(err);
      });

    return { habits, host, protocol };
  };

  markCompleted = (id) => {
    return axios
      .patch(`${this.props.protocol}://${this.props.host}/api/habits/${id}`, {
        completedDates: Date.now()
      })
      .then((res) => console.log(res.data));
  };

  render() {
    return (
      <Fragment>
        <pre>
          <code>{JSON.stringify(this.props.habits, null, 2)}</code>
        </pre>
        <h1>hi</h1>
        <ul>
          {this.props.habits.map((habit) => (
            <Habit
              key={habit._id}
              onClick={() => this.markCompleted(habit._id)}
            >
              {habit.name}
            </Habit>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default Index;
