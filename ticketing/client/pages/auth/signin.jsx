import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form className="mb-3 " onSubmit={onSubmit}>
      <h1> Sign In</h1>
      <div className="form-group">
        <label htmlFor="">Email Address</label>
        <input
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          type="text"
        />
      </div>
      <div className="form-group">
        <label htmlFor="">Password</label>
        <input
          className="form-control"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Sign In</button>
    </form>
  );
};

export default Signin;
