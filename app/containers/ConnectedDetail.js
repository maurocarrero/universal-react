import Detail from '../components/Detail';
import { connect } from 'react-redux';
import { getDetail } from '../reducers';

const s2p = (state, { params }) => {
  return {
    item: getDetail(params.id)(state)
  }
};

export default connect(s2p)(Detail);
