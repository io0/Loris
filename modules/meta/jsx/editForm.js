

class EditForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Data: {},
            isLoaded: false,
            formData: {}
        };
        this.fetchData = this.fetchData.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.setFormData = this.setFormData.bind(this);
    }
    componentDidMount() {
        console.log("mount");
        this.fetchData()
    }

    fetchData() {
        $.ajax(this.props.DataURL, {
            method: "GET",
            dataType: 'json',
            success: function(data) {
                var formData = {
                    active: data.metaValues.Active,
                    max_age: data.metaValues.AgeMaxDays,
                    min_age: data.metaValues.AgeMinDays,
                    stage: data.metaValues.Stage,
                    subproject_id: data.metaValues.SubprojectID,
                    test_name: data.metaValues.test_name,
                    visit_label: data.metaValues.visitLabel,
                    center_id: data.metaValues.forSite
                };
                this.setState({
                    Data: data,
                    isLoaded: true,
                    metaValues: data.metaValues,
                    formData: formData
                });
            }.bind(this),
            error: function(error) {
                console.error(error);
                console.log("ERROR");
                this.setState({
                    error: 'An error occurred when loading the form!'
                });
            }.bind(this)
        });;
    }

    render(){
        // Waiting for data to load
        if (!this.state.isLoaded) {
            return (
                <button className="btn-info has-spinner">
                Loading
                <span
            className="glyphicon glyphicon-refresh glyphicon-refresh-animate">
                </span>
                </button>
        );
        }
        console.log(this.state.Data);
        console.log(this.state.formData);
        return (
            <div>
            <FormElement name="flag_form" onSubmit={this.handleSubmit}>
        <h3 className="text-center">Edit Instrument</h3><br/>
        <TextboxElement name="id" label="ID" onUserInput={this.setFormData} ref="id" required={true} disabled={true} value={this.state.metaValues.ID}/>
        <SelectElement name="test_name" label="Instrument" onUserInput={this.setFormData} options={this.state.Data.instruments} value={this.state.formData.test_name}/>
        <NumericElement name="min_age" label="Minimum Age" min={0} max={100000} onUserInput={this.setFormData}value={this.state.formData.min_age}/>
        <NumericElement name="max_age" label="Maximum Age"min={0} max={100000} onUserInput={this.setFormData} value={this.state.formData.max_age}/>
        <SelectElement name="active" label="Active" options={{Y: "Y", N: "N"}}onUserInput={this.setFormData} value={this.state.formData.active} />
        <SelectElement name="stage" label="Stage" options={{Screening: "Screening", Visit: "Visit", Complete: "Complete"}}onUserInput={this.setFormData} value={this.state.formData.stage} />
        <SelectElement name="subproject_id" label="Subproject"onUserInput={this.setFormData} options={this.state.Data.subprojects}value={this.state.formData.subproject_id} />
        <SelectElement name="visit_label" label="Visit Label" options={this.state.Data.visitlabel}onUserInput={this.setFormData} value={this.state.formData.visit_label} />
        <SelectElement name="center_id" label="Site" options={this.state.Data.centerID} onUserInput={this.setFormData} value={this.state.formData.center_id} />
        <ButtonElement label="Submit"/>
            </FormElement>
            </div>
    );
    }

    handleSubmit(e){
        e.preventDefault();
        console.log(this.state.formData);
        console.log("submit");
        console.log(this.props.action);
        this.submit();
    }





    submit(){
        let formData = this.state.formData;
        let formObj = new FormData();
        for (let key in formData) {
            if (formData[key] !== "") {
                formObj.append(key, formData[key]);
            }
        }
        console.log(formData);
        $.ajax({
            type: 'POST',
            url: this.props.action,
            data: formObj,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response){
                console.log("Success!");
            },
            error: function(err) {
                console.error(err);
                let msg = err.responseJSON ? err.responseJSON.message : "Upload error!";
                swal(msg, "", "error");
            }
        });
    }


    setFormData(formElement, value){
        var formData = this.state.formData;
        formData[formElement] = value;
        this.setState({
            formData: formData
        });
    }

}

EditForm.propTypes = {
    DataURL: React.PropTypes.string.isRequired,
    action: React.PropTypes.string.isRequired
};

export default EditForm;