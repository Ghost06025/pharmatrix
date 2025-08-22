<?php
require_once '../service.php';

$email= $_POST['email'];
$password= $_POST['password'];

$user= $usersdb->readConnexion($email, $password);
if($user == false) {
    $_SESSION['erreur']= array('type'=> 'danger',
    'message'=> 'Echec de connexion'
);
    header('Location:../../login.php');
}
else {
     $_SESSION['erreur']= array('type'=> 'success',
    'message'=> "Bienvenue $user->first_name",
);
  $_SESSION['profil']= $user;
  header('Location:index.php?view=dashboard');
}

?>
