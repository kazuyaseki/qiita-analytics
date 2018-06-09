import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.scss';
import Prototype from './prototype/Prototype';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Prototype />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
