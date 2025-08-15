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
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <!-- DataTables CSS -->
        <link rel="stylesheet" href="https://cdn.datatables.net/1.10.25/css/dataTables.bootstrap5.min.css">
        <script src="https://cdn.datatables.net/1.10.25/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.25/js/dataTables.bootstrap5.min.js"></script>
        <!-- Custom CSS -->
        <link rel="stylesheet" href="css/style.css">
        <link rel="stylesheet" href="css/1.css">
    </head>

    <body>
        <div class="wrapper">
            <!-- ====== Sidebar ====== -->
            <nav id="sidebar" class="active">
                <div class="sidebar-header">
                    <img src="assets/image/logo.png" alt="Pharmatri+ Logo" class="logo">
                    <h3>Pharmatri+</h3>
                </div>

                <ul class="list-unstyled components">
                    <li class="active">
                        <a href="index.php?view=dashboard"><i class="fas fa-home"></i> <span class="menu-text">Dashboard</span></a>
                    </li>
                    <li>
                        <a href="index.php?view=commandes"><i class="fas fa-shopping-cart"></i> <span class="menu-text">Commandes</span></a>
                    </li>
                    <li>
                        <a href="index.php?view=medicaments"><i class="fas fa-capsules"></i> <span class="menu-text">Medicament</span></a>
                    </li>
                    <li>
                        <a href="index.php?view=users"><i class="fas fa-users"></i> <span class="menu-text">Utilisation</span></a>
                    </li>
                    <!-- <li>
                        <a href="#"><i class="fas fa-chart-bar"></i> <span class="menu-text">Statistiques</span></a>
                    </li> -->
                    <li>
                        <a href="index.php?view=settings"><i class="fas fa-cog"></i> <span class="menu-text">Paramètres</span></a>
                    </li>
                </ul>
            </nav>
             <!-- ====== End Sidebar ====== -->

            <!-- Page Content -->
            <div id="content">
                <!-- ===== Top Navbar ====== -->
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
                                    <img src="assets/image/Marshadow.jpg" alt="User" class="avatar">
                                    <span class="user-name">Admin</span>
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-user me-2"></i>Profil</a></li>
                                    <li><a class="dropdown-item" href="#"><i class="fas fa-cog me-2"></i>Paramètres</a></li>
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
                <!-- ===== End Top Navbar ====== -->

                <!-- ====== Main Content ====== -->
                <div class="container-fluid">
                   <?php include($view); ?>
                </div>
                <!-- ====== End Main Content ====== -->
            </div>
        </div>

        <!-- Bootstrap JS Bundle with Popper -->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
        <!-- jQuery -->
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <!-- Custom JS -->
        <script src="js/script.js"></script>
        <script src="js/1.js"></script>
    </body>

</html>