import { connect } from 'react-redux';

import TableHeadSort from './TableHeadSort';

const mapStateToProps = state => ({
    filterParams: state.table.filterParams,
});


export default connect(mapStateToProps, null)(TableHeadSort);
