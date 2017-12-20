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
    function edit()
    {
        $db      =& Database::singleton();
        $factory = NDB_Factory::singleton();
        $baseURL = $factory->settings()->getBaseURL();

        $idMediaFile = $_GET['id'];

        // Check if media file exists, if not redirect to /media/ page
        if (isset($idMediaFile)) {
            $result = $db->pselectRow(
                "SELECT id FROM test_battery WHERE id = $idMediaFile",
                []
            );
            if (count($result) < 1) {
                header('Location: ' . $baseURL . '/meta/');
            }
        } else {
            header('Location: ' . $baseURL . '/meta/');
        }
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
             $baseURL . "/meta/js/editFormIndex.js",
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

