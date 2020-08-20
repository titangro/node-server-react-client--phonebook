import { compose } from 'redux';
import { withRedux } from './withRedux';

export const withAppData = (Component: React.FC) => compose(withRedux)(Component);
