/* global ReactDOM */

import EditForm from './editForm';
const args = QueryString.get(document.currentScript.src);

$(function() {
    const metaEditForm = (
        <div className="page-edit-form">
        <div className="row">
        <div className="col-md-9 col-lg-7">
        <EditForm
    DataURL={`${loris.BaseURL}/meta/ajax/Edit.php?action=getData&idMeta=${args.id}`}
    action={`${loris.BaseURL}/meta/ajax/Edit.php?action=edit`}
    />
    </div>
    </div>
    </div>
);
    ReactDOM.render(metaEditForm, document.getElementById("lorisworkspace"));
});
