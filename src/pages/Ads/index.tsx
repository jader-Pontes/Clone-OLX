import React, { ComponentProps, FormEvent, useEffect, useState } from 'react';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router-dom';


import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';
import AdItem from '../../components/partials/adItem';


import useApi from '../../helpers/OlxApi';



let timer:NodeJS.Timeout;

export const Ads = () => {
  const api = useApi();
  

  const useQueryString = ( ) =>{
    return new URLSearchParams( useLocation().search);
  };

  const query=useQueryString();
  
  const [q,setQ]=useState<any>(query.get('q') != null ? query.get('q'):'')
  const [cat,setCat]=useState(query.get('cat') != null ? query.get('cat'):'');
  const [state,setState]=useState<any>(query.get('state') != null ? query.get('state'):'');

  const [adsTotal,setAdsTotal]=useState(0);
  const [stateList, setStateList] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [adList, setAdList] = useState([]);
  const [pageCount,setPageCount]=useState(0);
  const [currentPage,setCurrentPage]=useState(1);

  const [resultOpacity,setResultOpacity]=useState<number>(1);
  const [warningMessage,setWarningMessage]=useState('Carregando...');
  const [loading,setLoading]=useState(true);

 const getAdsList = async()=>{
   setLoading(true);
    let offset=(currentPage-1)*2;
    const json=await api.getAds({
      sort:'desc',
      limit:9,
      q,
      cat,
      state,
      offset
    });
    setAdList(json.ads);
    setAdsTotal(json.total);
    setResultOpacity(1);
    setLoading(false);
  };

  useEffect(()=>{
      if(adList.length>0){
       setPageCount(Math.ceil(adsTotal/adList.length));
      }else{
        setPageCount(0);
      }
  },[adsTotal])

  useEffect(()=>{
    setResultOpacity(0.3);
    getAdsList();
  },[currentPage])

    const navigate = useNavigate();
 useEffect(()=>{
    let queryString = []

      if(q){
         queryString.push(`q=${q}`)
      }
      if(cat){
         queryString.push(`cat=${cat}`)
      }
      if(state){
         queryString.push(`stateLoca=${state}`)
      }

      if(timer){
        clearTimeout(timer);
      };

      timer=setTimeout(getAdsList,2000);
      setResultOpacity(0.3);
      navigate(`?${queryString.join('&')}`, {replace:true});
      getAdsList();
      setCurrentPage(1); 
  },[q,cat,state]);



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

  let pagination=[];
  for(let i=1; i<=pageCount; i++){
      pagination.push(i);
  };

return (
    <PageContainer>
      <PageArea>
        <div className='leftSide'>
                <form method="GET">
                  <input 
                    type="text"
                    name='q'
                    placeholder='O que você procura?'
                    value={q}
                    onChange={e=>setQ(e.target.value)}
                  />
                  <div className='filterName'>Estado:  </div>
                      <select name="state" value={state} onChange={e=>setState(e.target.value)}>
                        <option></option>  
                        {stateList.map((i:any,k:number)=>
                          <option key={k} value={i.name}>{i.name}</option>
                        )}
                      </select>

                  <div className='filterName'>Categoria:  </div>
                    <ul>
                            {categories.map((i:any,k:React.Key)=>
                                <li key={k} className={cat==i.slug?'categoryItem active':'categoryItem'} onClick={()=>setCat(i.slug)}>
                                  <img src={i.img} alt="#"/>
                                  <span>{i.name}</span>
                                </li>
                            )}
                    </ul>
                </form>
        </div>
        <div className='rightSide'>
            <h2> Resultados</h2>
            {loading && adList.length === 0 &&
              <div className="listwarning">{warningMessage}</div>
            }
            {!loading && adList.length ===0 &&
                <div className="listwarning">Não encontramos resultados</div>
            }
            <div className='list' style={{opacity:resultOpacity}}> 
               {adList.map((i,k)=>
                    <AdItem key={k} data={i}/>
               )}               
            </div>
              <div className='pagination'>
                {pagination.map((i:any,k:React.Key)=>
                  <div onClick={()=>setCurrentPage(i)} className={i===currentPage?'pagItem active':'pagItem' }>{i}</div>
                )}
              </div>
        </div>
      </PageArea>
    </PageContainer>
  );
};

