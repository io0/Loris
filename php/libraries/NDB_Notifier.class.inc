<?php
/**
 * PHP Version 7
 *
 * @category Notification
 * @package  Notification
 * @author   Rida Abou-Haidar <rida.loris@gmail.com>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */

/**
 * A class allowing to issue notifications using several services including sms,
 * phone, email and loris in-site notifications.
 *
 * @category Notification
 * @package  Notification
 * @author   Rida Abou-Haidar <rida.loris@gmail.com>
 * @license  http://www.gnu.org/licenses/gpl-3.0.txt GPLv3
 * @link     https://www.github.com/aces/Loris/
 */
class NDB_Notifier extends NDB_Notifier_Abstract
{
    /**
     * NDB_Notifier constructor.
     *
     * @param string $module_name    module issuing notification
     * @param string $operation_type operation triggering notification
     * @param array  $extra_tpl_data additional variables to be sent to the tpl
     * @param bool   $asAdmin        when true, sends notification as if
     *                               triggered by administrator not user. Emails
     *                               are not restricted to sites or permissions
     *
     * @throws LorisException Exception thrown if module is not supported
     *                        by the notifier.
     */
    public function __construct(
        $module_name,
        $operation_type,
        $extra_tpl_data=null,
        $asAdmin=null
    ) {
        parent::__construct(
            $module_name,
            $operation_type,
            $extra_tpl_data,
            $asAdmin
        );
    }

    /**
     * Function to be overridden by module using the notification system
     *
     * @param array  $extra_tpl_data additional variables to be sent to the template.
     * @param string $custom_message message overriding module-defined message
     *
     * @return void
     */
    public function notify(
        $extra_tpl_data=array(),
        $custom_message=null
    ) {
        $this->tpl_data = $this->tpl_data + $extra_tpl_data;

        if (!empty($custom_message)) {
            $this->template ="notifier_custom.tpl";
            $this->tpl_data['custom_message'] =$custom_message;
        }

        // Basic email handler
        if (!empty($this->notified['email_text'])) {
            $this->_sendEmails();
        }

    }

    /**
     * Send emails to concerned users.
     *
     * @return void
     *
     * TODO add validation for email sent/failed
     */
    private function _sendEmails()
    {
        foreach ($this->notified['email_text'] as $name=>$uid) {
            $this->tpl_data['notified_user'] = $name;
            $this->tpl_data['notifier_user']
                = $this->notifier['name'].' <'.$this->notifier['email'].'>';
            $email =$this->getEmail($uid);

            if ($this->notifier['ID'] === $uid) {
                // TODO send confirmation email instead
            } else {
                Email::send(
                    $email,
                    $this->template,
                    $this->tpl_data
                );
                $this->log($this->notifier['ID'], $uid, 'email_text');
            }
        }
    }

    /**
     * Send sms to concerned users.
     *
     * @return void
     *
     * TODO add validation
     */
    private function _sendSMS()
    {

    }

    /**
     * Send phone call to concerned users.
     *
     * @return void
     *
     * TODO add validation
     */
    private function _sendPhone()
    {

    }
}