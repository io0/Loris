
function formatColumn(column, cell, rowData, rowHeaders) {
    // If a column if set as hidden, don't display it
    if (loris.hiddenHeaders.indexOf(column) > -1) {
        return null;
    }
    //console.log(rowHeaders);
    // Create the mapping between rowHeaders and rowData in a row object.
    var row = {};
    rowHeaders.forEach(function(header, index) {
        row[header] = rowData[index];
    }, this);
    // create array of classes to be added to td tag
    var classes = [];
    if (row['Hide File'] === '1') {
        classes.push("bg-danger");
    }
    // convert array to string, with blank space separator
    classes = classes.join(" ");

    if (column === 'Edit Metadata') {
        var editURL = loris.BaseURL + "/meta/edit/?id=" + row['Edit Metadata'];
        return <td className={classes}><a href={editURL}>Edit</a></td>;
    }

    return <td className={classes}>{cell}</td>;
}

export default formatColumn;
