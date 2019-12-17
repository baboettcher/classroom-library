import React from 'react';

const MovieForm = ({ match, history }) => {
  const { id } = match
  return (
    <React.Fragment>
      <h1>MovieForm {id}</h1>
      <button className="btn btn-primary" onClick={
        () => {
          history.push("/movies")
        }

      }>Save</button>
    </React.Fragment >

  );
}


export default MovieForm;
