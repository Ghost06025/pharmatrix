<?php 
session_start();

require_once 'model/All_medicamentDB.php';
require_once 'model/Coupon_medicamentDB.php';
require_once 'model/CouponDB.php';
require_once 'model/MedicamentDB.php';
require_once 'model/PharmacieDB.php';
require_once 'model/Users_pharmacieDB.php';
require_once 'model/UsersDB.php';

$all_medicamentdb= new All_medicamentDB();
$coupon_medicamentdb= new Coupon_medicamentDB();
$coupondb= new CouponDB();
$medicamentdb= new MedicamentDB();
$pharmaciedb= new PharmacieDB();
$users_pharmacie= new Users_pharmacieDB();
$usersdb= new UsersDB();


?>
