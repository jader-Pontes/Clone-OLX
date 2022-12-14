import React from 'react'
import { Link } from 'react-router-dom';


import { isLogger, doLogout } from '../../../helpers/authHandler';

//css
import { HeaderArea } from './styled';

const Header = () => {
  let logged: boolean = isLogger();

  const handleLogout = () => {
    doLogout();
    window.location.href = '/';
  };


  return (
    <HeaderArea>
      <div className='container'>
        <div className='logo'>
          <Link to='/'>
            <span className='logo-1'>O</span>
            <span className='logo-2'>L</span>
            <span className='logo-3'>X</span>
          </Link>
        </div>
        <nav>
          <ul>

            {logged &&
              <>
                <li>
                  <Link to='/my-account' className='button'>Minha Conta</Link>
                </li>
                <li>
                  <button onClick={handleLogout}>Sair</button>
                </li>
                <li>
                  <Link to='/post-an-ad' className='button'>Poste um anúncio</Link>
                </li>
              </>
            }

            {!logged &&
              <>

                <li>
                  <Link to='/signin'>Login</Link>
                </li>
                <li>
                  <Link to='/signup'>Cadastrar</Link>
                </li>
                <li>
                  <Link to='/signin' className='button'>Poste um anúncio</Link>
                </li>
              </>
            }

          </ul>
        </nav>
      </div>
    </HeaderArea>

  );

};

export default Header;