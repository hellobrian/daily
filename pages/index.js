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
  state = {
    isLoading: true,
    habits: []
  };

  componentDidMount() {
    axios
      .get(`/api/habits`)
      .then((response) =>
        this.setState({ isLoading: false, habits: response.data })
      )
      .catch((err) => {
        console.error(err);
      });
  }

  markCompleted = (id) => {
    return axios
      .patch(`/api/habits/${id}`, {
        title: `new title ${Date.now()}`,
        completedDates: Date.now()
      })
      .then((res) => console.log(res.data));
  };

  render() {
    const { isLoading, habits } = this.state;
    return isLoading ? (
      <p>Loading...</p>
    ) : (
      <Fragment>
        <pre>
          <code>{JSON.stringify(habits, null, 2)}</code>
        </pre>
        <h1>hi</h1>
        <ul>
          {habits.map((habit) => (
            <Habit
              key={habit._id}
              onClick={() => this.markCompleted(habit._id)}
            >
              {habit.title}
            </Habit>
          ))}
        </ul>
      </Fragment>
    );
  }
}

export default Index;
