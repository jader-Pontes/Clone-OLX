import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { PageArea } from './styled';
import { PageContainer } from '../../components/MainComponents';

import useApi from '../../helpers/OlxApi';


const AdPage = () => {

  const api = useApi();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [adInfo, setAdInfo] = useState([]);

  return (
    <PageContainer>
      <PageArea>


      </PageArea>
    </PageContainer>

  );

};

export default AdPage;