import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import './Prototype.scss';

const query = gql`
  query qiita {
    schemaInfo @rest(type: "Person", path: "schema") {
      required
    }
  }
`;

const Prototype = () => (
  <Query query={query}>
    {({ loading, data }) => {
      if (loading) {
        return <p>...loading</p>;
      }

      return (
        <div className="App">
          {data.schemaInfo.required.map((d: any, index: number) => (
            <span key={index}> {d} </span>
          ))}
        </div>
      );
    }}
  </Query>
);

export default Prototype;
