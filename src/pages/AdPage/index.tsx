import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';

import { PageArea,Fake,OthersArea,BreadChumb } from './styled';
import { PageContainer } from '../../components/MainComponents';

import useApi from '../../helpers/OlxApi';
import AdItem from '../../components/partials/adItem';



const AdPage = () => {

  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(true);
  const [adInfo, setAdInfo] = useState<any>([]);

    useEffect(()=>{
      const getAdInfo=async(id:string)=>{
          const json=await api.getAd(id,true);
          setAdInfo(json);
          setLoading(false);
      }
      getAdInfo(id!);
    },[])

   const formDate= (date:number) => {
      let cDate:Date=new Date(date);

      let months=['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
      let cDay=cDate.getDate();
      let cMonth=cDate.getMonth();
      let cYear= cDate.getFullYear();

    return`${cDay} de ${months[cMonth]} de ${cYear}}`;
};

  return (
    <PageContainer>
    {adInfo.categories &&  
          <BreadChumb>
              Você está aqui:
              <Link to='/'>Home</Link>
                /
              <Link to={`/ads?state=${adInfo.stateName}`}>{adInfo.stateName}</Link>  
                /
                <Link to={`/ads?state=${adInfo.stateName}&cat=${adInfo.categories.slug}`}>{adInfo.categories.name}</Link>
                /{adInfo.title}
          </BreadChumb>
    }
      <PageArea>
          <div className='leftSide'>
              <div className='box'>
                <div className='adImage'>
                      {loading && <Fake height={300}/>}
                      {adInfo &&
                          <Slide>
                            {adInfo.images.map((img:string,k:number)=>
                                  <div key={k} className='each-slide'>
                                        <img src={img} alt="" />
                                  </div>
                            )}
                          </Slide>
                      }
                </div>
                <div className='adInfo'>
                    <div className='adName'>
                        {loading && <Fake height={20}/>}
                        {adInfo.title &&
                          <h2>{adInfo.title}</h2>
                        }
                        {adInfo.dateCreated &&
                            <small>Criado em {formDate(adInfo.dateCreated)}</small>
                        }
                    </div>
                    <div className='adDescription'>
                        {loading && <Fake height={100}/>}
                        {adInfo.description}
                        <hr />
                        {adInfo.views &&
                          <small> Visualizações:{adInfo.views}</small>
                        }
                    </div>
                </div>
              </div>
          </div>
          <div className='rightSide'>
              <div className='box box--pading'>
                  {loading && <Fake height={20}/>}
                  {adInfo.priceNegotiable &&
                    "Preço Negociavel"
                  }
                  {!adInfo.priceNegotiable && adInfo.price &&
                    <div className='price'>Preço:<span>R${adInfo.price}</span></div>
                  }
              </div>
                {loading && <Fake height={50}/>}
                {adInfo.userInfo && 
                  <>
                        <a href={`mailto:${adInfo.userInfo.email}`} target='_blank' className='contactSellerLink'>Fale com o vendedor</a>
                      <div className='createdBy box box--padding'>
                       <strong>{adInfo.userInfo.name}</strong>
                        <small>E-mail: {adInfo.userInfo.email}</small>
                        <small>Estado: {adInfo.stateName}</small>
                      </div>
                  </>
                }              
          </div>
      </PageArea>
        <OthersArea>
            {adInfo.others &&
              <>             
                  <h2>Outras ofertas do vendedor</h2>
                  <div className='list'>
                      {adInfo.others.map((i:object,k:number)=>
                            <AdItem key={k} data={i}/>
                      )}
                  </div>

              </>         
            }         
        </OthersArea>
    </PageContainer>

  );

};

export default AdPage;