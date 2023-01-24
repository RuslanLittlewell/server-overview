import {
  connect
} from 'react-redux';
import {
  fetchTableData,
  setFilterParams,
} from '@actions/tableActions';
import { 
  sortTable,
  filterTable,
} from '@actions/utilsActions';
import Main from './components';

const mapStateToProps = state => ({
  filterParams: state.table.filterParams,
  filteredTableData: state.table.filteredTableData,
});

const mapDispatchToProps = dispatch => ({
  sortTable: () => dispatch(sortTable()),
  filterTable: () => dispatch(filterTable()),
  fetchTableData: params => dispatch(fetchTableData(params)),
  setFilterParams: data => dispatch(setFilterParams(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);