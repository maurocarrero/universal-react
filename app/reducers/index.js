export const getDetail = id => state => state.list.filter(item => item.id === +id).pop();
export default (state = {}) => state;
