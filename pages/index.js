import React, { Fragment } from 'react';
import axios from 'axios';

class Index extends React.Component {
  static getInitialProps = async ({ req, res }) => {
    const habits = await axios
      .get(`http://${req.headers.host}/api/habits`)
      .then((response) => response.data)
      .catch((err) => {
        console.error({ status: err.response.status });
        res.send(err.response.data);
      });

    return {
      habits
    };
  };

  render() {
    return (
      <Fragment>
        <h1>hi</h1>
        <pre>
          <code>{JSON.stringify(this.props, null, 2)}</code>
        </pre>
      </Fragment>
    );
  }
}

export default Index;
