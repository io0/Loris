<?php
ini_set('display_errors', 'On');

if (isset($_GET['action'])) {
    $action = $_GET['action'];
    if ($action == "getData") {
        echo json_encode(getUploadFields());
    } else if ($action == "upload") {
        //$a = $_POST;
        //echo json_encode(array("action" => "upload"));
        upload();
    } else if ($action == "edit") {
        echo json_encode("EDEIT");
    }
}

function upload()
{
    $db     =& Database::singleton();
    $config = NDB_Config::singleton();
    $user   =& User::singleton();

    $test_name      = isset($_POST['test_name']) ? $_POST['test_name'] : null;
    $min_age    = isset($_POST['min_age']) ? $_POST['min_age'] : null;
    $max_age    = $_POST['max_age'] ?? null;
    $active     = isset($_POST['active']) ? $_POST['active'] : null;
    $stage      = isset($_POST['stage']) ? $_POST['stage'] : null;
    $subproject_id   = isset($_POST['subproject_id']) ? $_POST['subproject_id'] : null;
    $visit_label = isset($_POST['visit_label']) ? $_POST['visit_label'] : null;
    $center_id = isset($_POST['center_id']) ? $_POST['center_id'] : null;
    // If required fields are not set, show an error
    if (!isset($test_name) || !isset($min_age) || !isset($max_age) || !isset($active) || !isset($stage) || !isset($subproject_id) || !isset($visit_label) || !isset($center_id) ) {
        if (!isset($test_name)) {
            showError("Please fill in all required fields!");
        }
        //return;
    }
    if ($active == 0) {
        $active = 'Y';
    } else if ($active == 1){
        $active = 'N';
    }
    $query = [
        'Test_name' => $test_name,
        'AgeMinDays'=> $min_age,
        'AgeMaxDays'=> $max_age,
        'Active'    => $active,
        'Stage'     => $stage,
        'SubprojectID'=> $subproject_id,
        'Visit_label'=> $visit_label,
        'CenterID'  => $center_id,
    ];

    echo json_encode($query);
    return;
}

function getUploadFields(){
    $db     =& Database::singleton();
    $instruments = $db->pselect(
        "SELECT Test_name FROM test_battery ORDER BY Test_name",
        []
    );
    $active = $db->pselect(
        "SELECT Active FROM test_battery ORDER BY Active",
        []
    );
    $stage = $db->pselect(
        "SELECT Stage FROM test_battery ORDER BY Stage",
        []
    );
    $instrumentsList = toSelect($instruments, "Test_name", null);
    $activeList = toSelect($active, "Active", null);
    $stageList = toSelect($stage, "Stage", null);
    $visitList = Utility::getVisitList();

    $result = [
        'instruments' => $instrumentsList,
        'active' => $activeList,
        'stage' => $stageList,
        'visitlabel' => $visitList,
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