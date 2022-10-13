import React, { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import { PageArea } from './styled';
import { PageContainer, PageTitle, ErrorMessage } from '../../components/MainComponents';

import useApi from '../../helpers/OlxApi';
import { doLogin } from '../../helpers/authHandler';
import { IndexInfo } from 'typescript';


export const SignUp = () => {

  const api = useApi();
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [stateLoc, setStateLoc] = useState('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [stateList, setStateList] = useState([]);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const getState = async () => {
      const sList = await api.getState();
      setStateList(sList);
    }
    getState();

  }, []);


  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    setError('');

    if (password !== confirmPassword) {
      setError('Senhas não batem');
      setDisabled(false);
      return;
    }

    const json = await api.register(name, email, password, stateLoc);
    if (json.error) {
      setError(json.error);
    } else {
      doLogin(json.token);
      navigate('/');
    }
    setDisabled(false);
  };


  return (
    <PageContainer>
      <PageTitle>Cadastro</PageTitle>
      <PageArea>

        {error &&
          <ErrorMessage>{error}</ErrorMessage>
        }
        <form onSubmit={handleSubmit}>
          <label className="area">
            <div className='area--title'>Nome Completo</div>
            <div className='area--input'>
              <input
                type="email"
                disabled={disabled}
                value={email}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className='area--title'>Estado</div>
            <div className='area--input'>
              <select value={stateLoc} onChange={(e) => setStateLoc(e.target.value)} required>
                <option></option>
                {
                  stateList.map((i: any, k: number) =>
                    <option key={k} value={i.id}>{i.name}</option>
                  )}
              </select>
            </div>
          </label>
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
            <div className='area--title'>Confirmar Senha</div>
            <div className='area--input'>
              <input
                type="password"
                disabled={disabled}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </label>
          <label className="area">
            <div className='area--title'></div>
            <div className='area--input'>
              <button disabled={disabled}>Fazer Cadastro</button>
            </div>
          </label>
        </form>
      </PageArea>
    </PageContainer>

  );

};

