<?php

class NDB_Form_Meta extends NDB_Form
{
public $hasWritePermission = false;
     /**
     * Override default behaviour, since the page is loaded from index.js
     *
     * @return void
     * @access public
     */
    function display()
    {
        return null;
    }

    function meta(){
    }

    /**
     * Build a list of media to display in Data Table
     *
     * @return bool
     * @throws DatabaseException
     */

    function _setupVariables()
    {
        $user =& User::singleton();
        // the base query
        $query = " FROM test_battery";

        // set the class variables
        $this->columns
            = [
            'Test_name',
            'AgeMinDays',
            'AgeMaxDays',
            'Active',
            'Stage',
            'SubprojectID',
            'Visit_label',
            'CenterID'
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
            'CenterID',
            'Edit Metadata'
        ];

        // Add Edit field if user has permissions
        /*if ($this->hasWritePermission) {
            array_push($this->headers, 'Edit Metadata');
        }*/

        $this->validFilters = [
            'Test_name'
        ];
    }
    function toJSON()
    {
        $result         = $this->toArray();
        $result['form'] = $this->form->form;
        return json_encode($result);
    }
        /**
     * Include the Tabs.js and index.js (entry point of the module)
     *
     * @return array of javascript to be inserted
     */
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
/*function meta()
{
       $this->form = new HTML_QuickForm('test_form');
	$DB     = Database::singleton();
        $user   = User::singleton();
        $config = NDB_Config::singleton();
        $site   = explode(';', $user->getSiteNames());
        $userID     = $user->getUsername();
        $last_login = $DB->pselectOne(
            "SELECT MAX(Login_timestamp)
             FROM user_login_history
             WHERE Login_timestamp < (SELECT MAX(Login_timestamp)
                FROM user_login_history
                WHERE userID=:UserID AND Success='Y')
             AND userID=:UserID AND Success='Y'",
            array('UserID' => $userID)
        );
	$this->tpl_data['username'] = $user->getFullname();
	        $this->addBasicText('pSCID', 'PSCID', ["size" => 9, "maxlength" => 7]);
*/
//echo "hi";

