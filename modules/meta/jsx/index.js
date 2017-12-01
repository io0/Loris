import FilterForm from 'FilterForm';
import {Tabs, TabPane} from 'Tabs';
import InsertForm from './insertForm';
import EditForm from './editForm';
import formatColumn from './columnFormatter';

class MetaIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: {},
            isLoaded: false,
            formData: {}
        };
        this.fetchData = this.fetchData.bind(this);
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
            }.bind(this),
            error: function (error) {
                console.error(error);
            }
        });
    }

    render() {
        let insertTab;
        let tabList = [{id: "insert", label: "Insert"}, {id:"edit", label:"Edit"}];
        insertTab = (
            < TabPane
       		 TabId = {tabList[0].id} >
            < InsertForm
	        DataURL = {`${loris.BaseURL}/meta/ajax/Edit.php?action=getData`}
    	    action = {`${loris.BaseURL}/meta/ajax/Edit.php?action=upload`}
        	/>
        < /TabPane>
    	);
        return (
            <Tabs
        	tabs = {tabList}
        	defaultTab = "insert"
        	updateURL = {true}>
            	{insertTab}
				<TabPane TabId = {tabList[1].id}>
					<EditForm
						DataURL = {`${loris.BaseURL}/meta/ajax/Edit.php?action=getData`}
						action = {`${loris.BaseURL}/meta/ajax/Edit.php?action=upload`}
					/>
                    <StaticDataTable
                        Headers={['ID', 'First Name', 'Last Name']}
                        Data={[[1, 'Ted', 'Mosby'], [2, 'Barney', 'Stinson'], [3, 'Robin', 'Scherbatsky']]}
                        getFormattedCell={formatColumn}
                        freezeColumn="ID"
                    />
				</TabPane>
            </Tabs>
		);
    }
}


$(function() {
const metaIndex = (
<div className="page-meta">
<MetaIndex DataURL={`${loris.BaseURL}/media/?format=json`}/>
</div>
);

ReactDOM.render(metaIndex, document.getElementById("lorisworkspace"));
});
