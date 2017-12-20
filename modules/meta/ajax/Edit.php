<?php

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    if ($action == "getData") {
        echo json_encode(getUploadFields());
    } else if ($action == "insert") {
        insert();
    } else if ($action == "edit") {
        edit();
    }
}
function edit()
{
    $db   =& Database::singleton();
    $user =& User::singleton();
    if (!$user->hasPermission('media_write')) {
        header("HTTP/1.1 403 Forbidden");
        exit;
    }

    $idMeta = $_POST['idMeta'] ?? null;
    $test_name = $_POST['test_name'] ?? null;
    if ($test_name == 'null') $test_name = null;
    $min_age    = isset($_POST['min_age']) ? $_POST['min_age'] : null;
    if ($min_age == 'null') $min_age = null;
    $max_age    = $_POST['max_age'] ?? null;
    if ($max_age == 'null') $max_age = null;
    $active     = $_POST['active'] ?? null;
    if ($active == 'null') $active = null;
    $stage = $_POST['stage'] ?? null;
    if ($stage == 'null' or $stage == '') $stage = null;
    $subproject_id   = $_POST['subproject_id'] ?? null;
    if ($subproject_id == 'null') $subproject_id = null;
    $visit_label = $_POST['visit_label'] ?? null;
    if ($visit_label == 'null') $visit_label = null;
    $center_id = $_POST['center_id'] ?? null;
    if ($center_id == 'null') $center_id = null;
    // If required fields are not set, show an error
    if (!isset($test_name) || !isset($min_age) || !isset($max_age) ) {
        showError("Please fill in all required fields!");
        //return;
    } else {
        try {
            $updateValues = [
                'Test_name' => $test_name,
                'AgeMinDays' => $min_age,
                'AgeMaxDays' => $max_age,
                'Active' => $active,
                'Stage' => $stage,
                'SubprojectID' => $subproject_id,
                'Visit_label' => $visit_label,
                'CenterID' => $center_id,
            ];
            $db->update('test_battery', $updateValues, ['ID' => $idMeta]);
        } catch (DatabaseException $e) {
            showError("Could not update the file. Please try again!");
        }
    }

}
function insert()
{
    $db     =& Database::singleton();
    $config = NDB_Config::singleton();
    $user   =& User::singleton();

    $test_name      = $_POST['test_name'] ?? null;
    $min_age    = $_POST['min_age'] ?? null;
    $max_age    = $_POST['max_age'] ?? null;
    $active     = $_POST['active'] ?? null;
    $stage      = $_POST['stage'] ?? null;
    $subproject_id   = $_POST['subproject_id'] ?? null;
    $visit_label = $_POST['visit_label'] ?? null;
    $center_id = $_POST['center_id'] ?? null;
    // If required fields are not set, show an error
    if (!isset($test_name) || !isset($min_age) || !isset($max_age)) {
        showError("Please fill in all required fields!");
        //return;
    } else {
        $query = [
            'Test_name' => $test_name,
            'AgeMinDays' => $min_age,
            'AgeMaxDays' => $max_age,
            'Active' => $active,
            'Stage' => $stage,
            'SubprojectID' => $subproject_id,
            'Visit_label' => $visit_label,
            'CenterID' => $center_id,
        ];

        $db->insert('test_battery', $query);
    }
    return;
}

function getUploadFields(){
    $db     =& Database::singleton();
    $subprojectList = Utility::getSubprojectList();
    //$subprojectList = array_values($subprojectList);
    $instrumentsList = Utility::getAllInstruments();
    $centerList = Utility::getSiteList();
    $visitList = Utility::getVisitList();
    $metaData = null;
    if (isset($_GET['idMeta'])) {
        $idMeta = $_GET['idMeta'];
        $metaData   = $db->pselectRow(
            "SELECT " .
            "Test_name as test_name, " .
            "AgeMinDays, " .
            "AgeMaxDays, " .
            "Active, " .
            "Stage, " .
            "SubprojectID, " .
            "Visit_label as visitLabel, " .
            "CenterID as forSite, " .
            "ID FROM test_battery " .
            "WHERE ID = $idMeta",
            []
        );
    }
    $result = [
        'subprojects' => $subprojectList,
        'instruments' => $instrumentsList,
        'visitlabel' => $visitList,
        'centerID' => $centerList,
        'metaValues' => $metaData,
    ];
    return $result;
}

function showError($message)
{
    if (!isset($message)) {
        $message = 'An unknown error occurred!';
    }
    header('HTTP/1.1 500 Internal Server Error');
    header('Content-Type: application/json; charset=UTF-8');
    die(json_encode(['message' => $message]));
}

function toSelect($options, $item, $item2)
{
    $selectOptions = [];
    $optionsValue = $item;
    if (isset($item2)) {
        $optionsValue = $item2;
    }
    foreach ($options as $key => $value) {
        $selectOptions[$options[$key][$optionsValue]] = $options[$key][$item];
    }
    return $selectOptions;
}