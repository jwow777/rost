import { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { authorize } from './Api';

function Login({handleLogin, history}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  function handleChange(e) {
    e.target.name === 'username' ? setUsername(e.target.value) : setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) {
      return
    }
    authorize(username, password)
      .then(data => {
        if (data.auth_token) {
          setUsername('');
          setPassword('');
          handleLogin();
          history.push('/');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div className='sign'>
      <h2 className='sign__title'>Вход</h2>
      <form className='sign__form' onSubmit={handleSubmit}>
        <input className='sign__input' type='text' name='username' placeholder='Логин' value={username || ''} onChange={handleChange}/>
        <input className='sign__input' type='password' name='password' placeholder='Пароль' value={password || ''} onChange={handleChange}/>
        <button className='sign__button btn' type='submit'>Войти</button>
      </form>
    </div>
  );
}

export default withRouter(Login);