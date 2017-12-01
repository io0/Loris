

class InsertForm extends React.Component {
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
        this.fetchData();
    }

    fetchData() {
        $.ajax(this.props.DataURL, {
            method: "GET",
            dataType: 'json',
            success: function(data) {
                this.setState({
                    Data: data,
                    isLoaded: true
                });
            }.bind(this),
            error: function(error) {
                console.error(error);
            }
        });
    }

    render(){
        return (
            <div>
            <FormElement name="flag_form" onSubmit={this.handleSubmit}>
    <h3 className="text-center">New Instrument</h3><br/>
        <SelectElement
        name="instrument"
        label="Instrument"
        options={this.state.Data.instruments}
        onUserInput={this.setFormData}
        ref="instrument"
        value={this.state.formData.instrument}
        />
        <TextboxElement name="test_name" label="Test Name"onUserInput={this.setFormData}value={this.state.formData.test_name}/>
        <NumericElement name="min_age" label="Minimum Age" max={1000} onUserInput={this.setFormData}value={this.state.formData.min_age}/>
        <NumericElement name="max_age" label="Maximum Age"max={1000} onUserInput={this.setFormData} value={this.state.formData.max_age}/>
        <SelectElement name="active" label="Active" options={"YN"}onUserInput={this.setFormData} value={this.state.formData.active} />
        <TextboxElement name="stage" label="Stage" onUserInput={this.setFormData} value={this.state.formData.stage} />
        <TextboxElement name="subproject_id" label="Subproject ID"onUserInput={this.setFormData} value={this.state.formData.subproject_id} />
        <TextboxElement name="visit_label" label="Visit Label" onUserInput={this.setFormData} value={this.state.formData.visit_label} />
        <TextboxElement name="center_id" label="Center ID" onUserInput={this.setFormData} value={this.state.formData.center_id} />
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
                console.log(key);
                formObj.append(key, formData[key]);
            }
        }
        $.ajax({
            type: 'POST',
            url: this.props.action,
            data: formObj,
            cache: false,
            contentType: false,
            processData: false,
            success: function(response){
                console.log(response.action);
                console.log(response);
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

InsertForm.propTypes = {
    DataURL: React.PropTypes.string.isRequired,
    action: React.PropTypes.string.isRequired
};
export default InsertForm;