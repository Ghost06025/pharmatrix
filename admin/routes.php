<?php
// Mapping des vues
$folder_views= "views";

$views= array(
    "dashboard" => "$folder_views/dashboard.php",
    "user" => "$folder_views/users.php",
    "pharmacie" => "$folder_views/pharmacies.php",
    "medicament" => "$folder_views/medicaments.php",
    "settings" => "$folder_views/settings.php",
    "all_medicament" => "$folder_views/all_medicaments.php",
    "coupon" => "$folder_views/coupons.php"
);

$view= null;
if (isset($_GET['view']) == true) {
    if (array_key_exists($_GET['view'], $views) == true) {
        $view = $views[$_GET['view']];
    }
    else {
    $view = "$folder_views/404.php";
    }
}
else {
    // header("Location:../index.php");
    header("Location:index.php?view=dashboard");
}


?>