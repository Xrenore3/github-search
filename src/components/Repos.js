import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts';
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  const languages = repos.reduce((total, item) => {
    const { language, stargazers_count } = item;
    if (!language) {
      return total
    }
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count }
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count
      }
    }
    return total
  }, {})
  const mostUsedLanguage = Object.values(languages);

  const mostPorularLanguage = Object.values(languages).map(item=>{
    const {label,stars} = item;
    return {label,value:stars}
  })
  console.log(mostUsedLanguage)
  console.log(mostPorularLanguage)
  return <section className='section'>
    <Wrapper className='section-center'>
      <Pie3D data={mostUsedLanguage} />
      <Column3D data={mostUsedLanguage}/>
      <Doughnut2D data={mostPorularLanguage} />
    </Wrapper>
  </section>;
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
