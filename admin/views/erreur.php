<?php
if (session_status() != PHP_SESSION_ACTIVE) {
session_start();
}

if (isset($_SESSION['erreur']) == true) {
    $erreur= $_SESSION['erreur'];
    echo '<script type= "text/javascript">';
    echo 'alert("'. $erreur['message'] . '")';
    echo '</script>';
    unset($_SESSION['erreur']);
    }


?>