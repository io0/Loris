!function(modules){function __webpack_require__(moduleId){if(installedModules[moduleId])return installedModules[moduleId].exports;var module=installedModules[moduleId]={exports:{},id:moduleId,loaded:!1};return modules[moduleId].call(module.exports,module,module.exports,__webpack_require__),module.loaded=!0,module.exports}var installedModules={};return __webpack_require__.m=modules,__webpack_require__.c=installedModules,__webpack_require__.p="",__webpack_require__(0)}({0:function(module,exports,__webpack_require__){"use strict";function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var _editForm=__webpack_require__(25),_editForm2=_interopRequireDefault(_editForm),args=QueryString.get(document.currentScript.src);$(function(){var metaEditForm=React.createElement("div",{className:"page-edit-form"},React.createElement("div",{className:"row"},React.createElement("div",{className:"col-md-9 col-lg-7"},React.createElement(_editForm2.default,{DataURL:loris.BaseURL+"/meta/ajax/Edit.php?action=getData&idMeta="+args.id,action:loris.BaseURL+"/meta/ajax/Edit.php?action=edit"}))));ReactDOM.render(metaEditForm,document.getElementById("lorisworkspace"))})},25:function(module,exports){"use strict";function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}Object.defineProperty(exports,"__esModule",{value:!0});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),EditForm=function(_React$Component){function EditForm(props){_classCallCheck(this,EditForm);var _this=_possibleConstructorReturn(this,(EditForm.__proto__||Object.getPrototypeOf(EditForm)).call(this,props));return _this.state={Data:{},isLoaded:!1,formData:{}},_this.fetchData=_this.fetchData.bind(_this),_this.handleSubmit=_this.handleSubmit.bind(_this),_this.setFormData=_this.setFormData.bind(_this),_this}return _inherits(EditForm,_React$Component),_createClass(EditForm,[{key:"componentDidMount",value:function(){console.log("mount"),this.fetchData()}},{key:"fetchData",value:function(){$.ajax(this.props.DataURL,{method:"GET",dataType:"json",success:function(data){var formData={active:data.metaValues.Active,max_age:data.metaValues.AgeMaxDays,min_age:data.metaValues.AgeMinDays,stage:data.metaValues.Stage,subproject_id:data.metaValues.SubprojectID,test_name:data.metaValues.test_name,visit_label:data.metaValues.visitLabel,center_id:data.metaValues.forSite};this.setState({Data:data,isLoaded:!0,metaValues:data.metaValues,formData:formData})}.bind(this),error:function(error){console.error(error),console.log("ERROR"),this.setState({error:"An error occurred when loading the form!"})}.bind(this)})}},{key:"render",value:function(){return this.state.isLoaded?(console.log(this.state.Data),console.log(this.state.formData),React.createElement("div",null,React.createElement(FormElement,{name:"flag_form",onSubmit:this.handleSubmit},React.createElement("h3",{className:"text-center"},"Edit Instrument"),React.createElement("br",null),React.createElement(TextboxElement,{name:"id",label:"ID",onUserInput:this.setFormData,ref:"id",required:!0,disabled:!0,value:this.state.metaValues.ID}),React.createElement(SelectElement,{name:"test_name",label:"Instrument",onUserInput:this.setFormData,options:this.state.Data.instruments,value:this.state.formData.test_name}),React.createElement(NumericElement,{name:"min_age",label:"Minimum Age",min:0,max:1e5,onUserInput:this.setFormData,value:this.state.formData.min_age}),React.createElement(NumericElement,{name:"max_age",label:"Maximum Age",min:0,max:1e5,onUserInput:this.setFormData,value:this.state.formData.max_age}),React.createElement(SelectElement,{name:"active",label:"Active",options:{Y:"Y",N:"N"},onUserInput:this.setFormData,value:this.state.formData.active}),React.createElement(SelectElement,{name:"stage",label:"Stage",options:{Screening:"Screening",Visit:"Visit",Complete:"Complete"},onUserInput:this.setFormData,value:this.state.formData.stage}),React.createElement(SelectElement,{name:"subproject_id",label:"Subproject",onUserInput:this.setFormData,options:this.state.Data.subprojects,value:this.state.formData.subproject_id}),React.createElement(SelectElement,{name:"visit_label",label:"Visit Label",options:this.state.Data.visitlabel,onUserInput:this.setFormData,value:this.state.formData.visit_label}),React.createElement(SelectElement,{name:"center_id",label:"Site",options:this.state.Data.centerID,onUserInput:this.setFormData,value:this.state.formData.center_id}),React.createElement(ButtonElement,{label:"Submit"})))):React.createElement("button",{className:"btn-info has-spinner"},"Loading",React.createElement("span",{className:"glyphicon glyphicon-refresh glyphicon-refresh-animate"}))}},{key:"handleSubmit",value:function(e){e.preventDefault(),console.log(this.state.formData),console.log("submit"),console.log(this.props.action),this.submit()}},{key:"submit",value:function(){var formData=this.state.formData,formObj=new FormData;for(var key in formData)""!==formData[key]&&formObj.append(key,formData[key]);console.log(formData),$.ajax({type:"POST",url:this.props.action,data:formObj,cache:!1,contentType:!1,processData:!1,success:function(response){console.log("Success!")},error:function(err){console.error(err);var msg=err.responseJSON?err.responseJSON.message:"Upload error!";swal(msg,"","error")}})}},{key:"setFormData",value:function(formElement,value){var formData=this.state.formData;formData[formElement]=value,this.setState({formData:formData})}}]),EditForm}(React.Component);EditForm.propTypes={DataURL:React.PropTypes.string.isRequired,action:React.PropTypes.string.isRequired},exports.default=EditForm}});
//# sourceMappingURL=editFormIndex.js.map