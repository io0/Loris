<?php
/**
 * Created by PhpStorm.
 * User: mxiong
 * Date: 01/12/17
 * Time: 3:54 PM
 */

class NDB_Menu_Filter_Meta extends NDB_Menu_Filter
{
    public $hasWritePermission = false;

    function _hasAccess()
    {
        //create user object
        $user =& User::singleton();

        // Set global permission to control access to different modules of page
        $this->hasWritePermission = $user->hasPermission('superuser');

        return $user->hasPermission('media_read');
    }

    function display()
    {
        return null;
    }

    function _setFilterForm()
    {
        $user =& User::singleton();
        $db   = Database::singleton();

        $visitList = Utility::getVisitList();
        $siteList = Utility::getSiteList();
        $subprojectList = Utility::getSubprojectList();
        $instrumentList   = [];
        $instrumentsQuery = $db->pselect(
            "SELECT Test_name FROM test_battery ORDER BY Test_name",
            []
        );
        foreach ($instrumentsQuery as $instrument) {
            $instrumentList[$instrument['Test_name']] = $instrument['Test_name'];
        }
        $activeList = [];
        $activeQuery = $db->pselect(
            "SELECT Active FROM test_battery ORDER BY Active",
            []
        );
        foreach ($activeQuery as $active){
            $activeList[$active['Active']] = $active['Active'];
        }
        $stageList = [];
        $stageQuery = $db->pselect(
            "SELECT Stage FROM test_battery ORDER BY Stage",
            []
        );
        foreach ($stageQuery as $stage){
            $stageList[$stage['Stage']] = $stage['Stage'];
        }
        $this->addSelect('testName', 'Test Name', $instrumentList);
        $this->addSelect('active', 'Active', $activeList);
        $this->addSelect('stage', 'Stage', $stageList);
        $this->addSelect('subprojectID', 'Subproject', $subprojectList);
        $this->addSelect('visitLabel', 'Visit Label', $visitList);
        $this->addSelect('site', 'Site', $siteList);
        return true;
    }
    /**
     * Build a list of media to display in Data Table
     *
     * @return boolmetaI
     * @throws DatabaseException
     */

    function _setupVariables()
    {
        $user =& User::singleton();
        // the base query
        $query = " FROM test_battery t";

        // set the class variables
        $this->columns
            = [
            't.Test_name as test_name',
            't.AgeMinDays',
            't.AgeMaxDays',
            't.Active',
            't.Stage',
            't.SubprojectID',
            't.Visit_label as visit_label',
            't.CenterID',
            't.ID'
        ];

        $this->query = $query;

        /*if (!$user->hasPermission('access_all_profiles')) {
            $site_arr     = implode(",", $user->getCenterIDs());
            $this->query .= " AND c.CenterID IN (" . $site_arr . ")";
        }

        if (!$user->hasPermission("superuser")) {
            $this->query .= " AND m.hide_file = FALSE";
        }*/

        $this->group_by = '';
        $this->order_by = 'Test_name';
        $this->headers = [
            'Test_name',
            'AgeMinDays',
            'AgeMaxDays',
            'Active',
            'Stage',
            'SubprojectID',
            'Visit_label',
            'Site',
        ];
        if ($this->hasWritePermission) {
            array_push($this->headers, 'Edit Metadata');
        }

        // Add Edit field if user has permissions
        /*if ($this->hasWritePermission) {
            array_push($this->headers, 'Edit Metadata');
        }*/


        return true;
    }
    function toJSON()
    {
        $result         = $this->toArray();
        $result['form'] = $this->form->form;
        return json_encode($result);
    }

    function getJSDependencies()
    {
        $factory = NDB_Factory::singleton();
        $baseURL = $factory->settings()->getBaseURL();
        $deps    = parent::getJSDependencies();
        return array_merge(
            $deps,
            array(
                $baseURL . "/meta/js/index.js",
            )
        );
    }
}