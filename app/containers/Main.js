import List from '../components/List';
import { connect } from 'react-redux';

const s2p = state => ({
  list: state.list || []
});

export default connect(s2p)(List);
