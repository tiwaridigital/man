import client from '../../client';
import gql from 'graphql-tag';

const fetchSlugs = async () => {
  console.log('fetchSlugs called');
  const mangaSlugsQuery = gql`
    query getSlugs {
      singleMang {
        slug
        createdAt
      }
    }
  `;
  const result = await client.query({
    query: mangaSlugsQuery,
  });
  console.log('result', result);
  return result.data.singleMang;
};

export default fetchSlugs;
