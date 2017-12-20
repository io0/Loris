import FilterForm from 'FilterForm';
import {Tabs, TabPane} from 'Tabs';
import InsertForm from './insertForm';
import EditForm from './editForm';
import formatColumn from './columnFormatter';

class MetaIndex extends React.Component {
    constructor(props) {
        super(props);
        loris.hiddenHeaders = ['Cand ID', 'Session ID', 'Hide File', 'File Type'];
        this.state = {
            Data: {},
            isLoaded: false,
            formData: {},
            filter: {}
        };
        this.fetchData = this.fetchData.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.resetFilters = this.resetFilters.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        $.ajax(this.props.DataURL, {
            method: "GET",
            dataType: 'json',
            success: function (data) {
                this.setState({
                    Data: data,
                    isLoaded: true
                });
                console.log(data);
            }.bind(this),
            error: function (error) {
                console.error(error);
            }
        });
    }
    updateFilter(filter) {
        this.setState({filter});
    }

    resetFilters() {
        this.refs.metaFilter.clearFilter();
    }
    render() {
        let insertTab;
        let tabList = [{id:"browse", label:"Browse"}, {id: "insert", label: "Insert"} ];
        insertTab = (
            < TabPane
       		 TabId = {tabList[1].id} >
            < InsertForm
	        DataURL = {`${loris.BaseURL}/meta/ajax/Edit.php?action=getData`}
    	    action = {`${loris.BaseURL}/meta/ajax/Edit.php?action=insert`}
        	/>
        < /TabPane>
    	);
        return (
            <Tabs tabs = {tabList} defaultTab = "browse" updateURL = {true}>
				<TabPane TabId = {tabList[0].id}>

                    <FilterForm
                        Module="meta"
                        name="meta_filter"
                        id="meta_filter_form"
                        ref="metaFilter"
                        columns={3}
                        formElements={this.state.Data.form}
                        onUpdate={this.updateFilter}
                        filter={this.state.filter}
                    >
                        <br/>
                        <ButtonElement label="Clear Filters" type="reset" onUserInput={this.resetFilters}/>
                    </FilterForm>
                    <StaticDataTable
                        Data={this.state.Data.Data}
                        Headers={this.state.Data.Headers}
                        Filter={this.state.filter}
                        getFormattedCell={formatColumn}
                       // freezeColumn="File Name"
                    />
				</TabPane>
                {insertTab}
            </Tabs>
		);
    }
}


$(function() {
const metaIndex = (
<div className="page-meta">
<MetaIndex DataURL={`${loris.BaseURL}/meta/?format=json`}/>
</div>
);

ReactDOM.render(metaIndex, document.getElementById("lorisworkspace"));
});
