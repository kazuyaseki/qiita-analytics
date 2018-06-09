import gql from 'graphql-tag';
import * as moment from 'moment';
import * as React from 'react';
import { Query } from 'react-apollo';
import './Prototype.scss';

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

const itemQuery = gql`
  query($id: ID!) {
    item(id: $id) @rest(type: "Item", path: "items/:id") {
      page_views_count
    }
  }
`;

const roundFloat = (num: number, n: number) => {
  const pow = Math.pow(10, n);
  return Math.round(num * pow) / pow;
};

const Prototype = () => (
  <Query query={query}>
    {({ loading, data }) => {
      if (loading) {
        return <p>...loading</p>;
      }

      const items: any[] = data.items;

      return (
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>日付</th>
              <th>いいね数</th>
              <th>PV数</th>
              <th>いいね率</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr>
                <td>{item.title}</td>
                <td>{moment(item.created_at).format('YYYY/MM/DD')}</td>
                <td>{item.likes_count}</td>
                <Query query={itemQuery} variables={{ id: item.id }}>
                  {({ loading: itemLoading, data: itemData }) => {
                    if (!itemLoading && itemData) {
                      const pageViewsCount = itemData.item.page_views_count;
                      return (
                        <React.Fragment>
                          <td>{pageViewsCount}</td>
                          <td>
                            {roundFloat(
                              (item.likes_count / pageViewsCount) * 100,
                              2
                            )}{' '}
                            %
                          </td>
                        </React.Fragment>
                      );
                    }
                    return null;
                  }}
                </Query>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }}
  </Query>
);

export default Prototype;
