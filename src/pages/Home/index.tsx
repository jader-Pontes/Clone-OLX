import React, { ComponentProps, FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


import { PageArea, SearchArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/adItem';

import useApi from '../../helpers/OlxApi';
import { IndexInfo } from 'typescript';


export const Home = () => {
  const api = useApi();

  const [stateList, setStateList] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [adList, setAdList] = useState([]);


  useEffect(() => {
    const getStates = async () => {
      const sList = await api.getState()
      setStateList(sList);
    }
    getStates();

  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const cats = await api.getCategories();
      setCategories(cats);
    }
    getCategories();

  }, []);

  useEffect(() => {
    const getRecentAds = async () => {
      const json = await api.getAds({
        sort: 'desc',
        limit: 8
      });
      setAdList(json.ads);
    }
    getRecentAds();

  }, []);

  return (

    <>
      <SearchArea>
        <PageArea>
          <div className='searchBox'>
            <form method='Get' action='/ads'>
              <input type="text" name='q' placeholder='O que você procura?' />
              <select name="state">
                {stateList.map((i: any, k: number) =>
                  <option key={k} value={i.name}>{i.name}</option>
                )}
              </select>
              <button>Pesquisar</button>
            </form>
          </div>
          <div className='categoryList'>
            {categories.map((i: any, k: number) =>
              <Link key={k} to={`/ads?cats=${i.slug}`} className='CategoryItem'>
                <img src={i.img} alt='' />
                <span>{i.name}</span>
              </Link>
            )}
          </div>
        </PageArea>
      </SearchArea>
      <PageContainer>
        <PageArea>
          <h2>Anúncios Recentes</h2>
          <div className='list'>
            {adList.map((i: string, k: number) =>
              <AdItem key={k} data={i} />
            )}
          </div>
          <Link to='/ads' className='seeAllLink'>Ver todos</Link>
          <hr />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi, soluta dolorum commodi architecto laborum, harum ipsum voluptas numquam odio, incidunt magni blanditiis et sit fugit porro deserunt magnam rem in.
        </PageArea>
      </PageContainer>
    </>

  );

};

