import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';


import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/authHandler';

const SignIn = () => {

  const api = useApi();
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rememberPassword, setRememberPassword] = useState<boolean>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setError('');

    const json = await api.login(email, password);
    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token, rememberPassword);
      navigate('/');
    }
    setDisabled(false);
  };


  return (
    <PageContainer>
      <PageTitle>Login</PageTitle>
      <PageArea>

        {error &&
          <ErrorMessage>{error}</ErrorMessage>
        }
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className='area--title'>E-mail</div>
            <div className='area--input'>
              <input
                type="email"
                disabled={disabled}
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className='area--title'>Senha</div>
            <div className='area--input'>
              <input
                type="password"
                disabled={disabled}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className='area--title'>Lembrar Senha</div>
            <div className='area--input'>
              <input
                type="checkbox"
                disabled={disabled}
                checked={rememberPassword}
                onChange={() => setRememberPassword(!rememberPassword)}

              />
            </div>
          </label>
          <label className="area">
            <div className='area--title'></div>
            <div className='area--input'>
              <button disabled={disabled}>Fazer Login</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>

  );

};

export default SignIn;