<?php

require_once 'routes.php';

?>

<!DOCTYPE html>
<html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pharmatri+ | Administration</title>

        <!-- Bootstrap CSS -->
        <link href="assets/css/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="assets/css/fontawesome.min.css">
        <!-- DataTables CSS -->
        <link rel="stylesheet" href="assets/css/dataTables.bootstrap5.min.css">
        <!-- Custom CSS -->
        <link rel="stylesheet" href="assets/css/style.css">
    </head>

    <body>
        <div class="wrapper">
            <!-- ======== Sidebar =========== -->
            <nav id="sidebar" class="active">
                <div class="sidebar-header">
                    <img src="assets/images/logo.png" alt="Pharmatri+ Logo" class="logo">
                    <h3>Pharmatri+</h3>
                </div>

                <ul class="list-unstyled components">
                    <li class="active">
                        <a href="index.php?view=dashboard">
                            <i class="fas fa-home"></i> 
                            <span class="menu-text">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="index.php?view=pharmacie">
                            <i class="fas fa-plus-circle"></i> 
                            <span class="menu-text">Pharmacies</span>
                        </a>
                    </li>
                    <li>
                        <a href="index.php?view=all_medicament">
                            <i class="fas fa-capsules"></i> 
                            <span class="menu-text">Tous les Medicaments</span>
                        </a>
                    </li>
                    <li>
                        <a href="index.php?view=medicament">
                            <i class="fas fa-capsules"></i> 
                            <span class="menu-text">Medicaments</span>
                        </a>
                    </li>
                    <li>
                        <a href="index.php?view=user">
                            <i class="fas fa-users"></i> 
                            <span class="menu-text">Utilisateurs</span>
                        </a>
                    </li>
                    <li>
                        <a href="index.php?view=coupon">
                            <i class="fas fa-ticket"></i> 
                            <span class="menu-text">Coupons</span>
                        </a>
                    </li>

                    <li>
                        <a href="index.php?view=settings">
                            <i class="fas fa-cog"></i> 
                            <span class="menu-text">Paramètres</span>
                        </a>
                    </li>
                </ul>
            </nav>
            <!-- ======== End Sidebar =========== -->











            <!-- Page Content -->
            <div id="content">
                <!-- ======== Top NavBar =========== -->
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                    <div class="container-fluid">
                        <button aria-label="Ouvrir le menu" type="button" id="sidebarCollapse" class="btn btn-info">
                            <i class="fas fa-align-left"></i>
                        </button>

                        <div class="search-bar">
                            <form class="d-flex">
                                <div class="input-group">
                                    <input class="form-control" type="search" placeholder="Rechercher..."
                                        aria-label="Search">
                                    <button aria-label="Rechercher" class=" btn btn-outline-secondary" type="submit">
                                        <i class="fas fa-search"></i>
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div class="user-profile ms-auto">
                            <div class="dropdown">
                                <a href="#" class="dropdown-toggle" id="dropdownMenuButton" data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    <img src="assets/images/Marshadow.jpg" alt="User" class="avatar">
                                    <span class="user-name">Admin</span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                    <li>
                                        <a class="dropdown-item" href="index.php?view=settings">
                                            <i class="fas fa-cog me-2"></i>
                                            Paramètres
                                        </a>
                                    </li>
                                    <li>
                                        <hr class="dropdown-divider">
                                    </li>
                                    <li><a class="dropdown-item" href="#"><i
                                                class="fas fa-sign-out-alt me-2"></i>Déconnexion</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
                <!-- ======== End Top NavBar =========== -->







                <!-- =========== Main Content =========== -->
                <div class="container-fluid">
                    <?php include($view); ?>
                </div>
                <!-- =========== End Main Content =========== -->
            </div>
        </div>





        <!-- jQuery -->
        <script src="assets/js/jquery-3.6.0.min.js"></script>
        <!-- DataTables JS -->
        <script src="assets/js/jquery.dataTables.min.js"></script>
        <script src="assets/js/dataTables.bootstrap5.min.js"></script>
        <!-- Bootstrap JS Bundle with Popper -->
        <script src="assets/js/bootstrap.bundle.min.js"></script>
        <!-- Custom JS -->
        <script src="assets/js/script.js"></script>
    </body>

</html>