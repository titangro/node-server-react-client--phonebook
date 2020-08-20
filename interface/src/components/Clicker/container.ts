import { ClickerProps } from './Clicker';
import { connect } from 'react-redux';

import { selectCounter } from 'store/reducers/clicker/selectors';
import { increaseCounter, decreaseCounter } from 'store/reducers/clicker/actions';

import { ReduxState } from 'store/typings';

const mapStateToProps = (state: ReduxState) => ({
  count: selectCounter(state),
});

const mapDispatchToProps = {
  increaseCounter,
  decreaseCounter,
};

export default (children: React.FC<ClickerProps>) => connect(mapStateToProps, mapDispatchToProps)(children);
