import { connect } from 'react-redux';

import TableHeadFilter from './TableHeadFilter';

const mapStateToProps = state => ({
    tableData: state.table.tableData,
    filterParams: state.table.filterParams,
});


export default connect(mapStateToProps, null)(TableHeadFilter);
