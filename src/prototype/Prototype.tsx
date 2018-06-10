import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import './Prototype.scss';

import Chart from './Chart';
import LikeStatTable from './LikeStatTable';

const query = gql`
  query qiita {
    items @rest(type: "Item", path: "users/seya/items?per_page=100") {
      id
      title
      created_at
      likes_count
    }
  }
`;

const chartData = [
  {
    name: 'a',
    value: 3
  },
  {
    name: 'a',
    value: 5
  }
];

const Prototype = () => (
  <Query query={query}>
    {({ loading, data }) => {
      if (loading) {
        return <p>...loading</p>;
      }

      const items: any[] = data.items;
      return (
        <React.Fragment>
          <Chart data={chartData} />
          <LikeStatTable items={items} />
        </React.Fragment>
      );
    }}
  </Query>
);

export default Prototype;
