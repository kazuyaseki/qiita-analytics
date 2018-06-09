import * as React from 'react';
import './Prototype.scss';

class Prototype extends React.Component<{}, { data: Object[] }> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    fetch('https://qiita.com/api/v2/schema')
      .then(res => res.json())
      .then(res => this.setState({ data: res.required }));
  }

  public render() {
    return (
      <div className="App">
        {this.state.data.map((data, index) => (
          <span key={index}> {data} </span>
        ))}
      </div>
    );
  }
}

export default Prototype;
