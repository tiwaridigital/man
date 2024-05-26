import client from '../../client';
import gql from 'graphql-tag';

const fetchSlugs = async () => {
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
  return result.data.singleMang;
};

export default fetchSlugs;
