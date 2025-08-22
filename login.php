<?php

include('admin/views/erreur.php');
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>login</title>
        <link rel="stylesheet" href="./assets/css/login.css">
        <link rel="stylesheet" href="./assets/fontawesome-free-6.7.2-web/css/all.min.css">
    </head>
    <body>
        <section id="app_connexion">
            <div id="connexion_img">
            </div>

            <div id="connexion_form">
                <form name="form" method="POST" action="admin/controller/connexionController.php">
                    <div class="logo_form">
                        <img src="./assets/images/logo.png" alt="photo">
                    </div>

                    <h1>Connexion</h1>

                    <div class="field">
                        <i class="fas fa-envelope"></i>
                        <input type="email" name="email" id="email" placeholder="Adresse email" required>
                    </div>

                    <div class="field">
                        <i class="fas fa-lock"></i>
                        <input type="password" name="password" id="password" placeholder="Mot de passe" required>
                    </div>

                    <div class="button">
                        <input type="submit" name="connexion" id="connexion" name="Je me connecte" />
                        <br />
                        <span>Je n'ai pas de compte</span>
                        &nbsp; | &nbsp; 
                        <a href="register.php">S'inscrire</a>
                    </div>
                </form>


                <div id="connexion_footer">
                    <h3>Retrouvez-nous sur</h3>
                    <div class="icon">
                        <span><i class="fab fa-google"></i></span>
                        <span><i class="fab fa-facebook-f"></i></span>
                        <span><i class="fab fa-instagram"></i></span>
                    </div>
                </div> 
            </div> 
        </section>    
                
    </body>
</html>