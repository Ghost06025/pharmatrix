<?php
    class Database {
        private $dsn;
        private $username;
        private $password;
        // PDO permet de contenir l'objet qui va permettre de communiquer avec la BD
        private $pdo;

        public function __construct() {
            $this->dsn= 'mysql:host=localhost;dbname=pharmatrixdb;port=3306;charset=utf-8';
            $this->username= 'root';
            $this->password= 'GhostPlayer18';
        }


        // Création de la chaine de connexion
        public function getConnect() {
            if($this->pdo === null) {
                try {
                    $this->pdo= new PDO($this->dsn, $this->username, $this->password
                );
                // Paramétrage de la chaine de connexion
                    $this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
                    // fait en sorte que les erreurs ne soient pas silencieuses.
                    
                    $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_OBJ);
                    // Permet de définir la façon dont les données seront recupérées

                } catch (\Exception $ex) {
                    die('Echec de connexion : ' .$ex->getMessage());
                }
            }
            return $this->pdo;

        }

        // Fonction pour préparer la requete
        public function prepare($sql,        $params= null) {
            $req= $this->getConnect()->prepare($sql);
            if (is_null($params)) {
                $req->execute();
            }
            else {
                $req->execute($params);
            }
            return $req;
        }

        // Fonction pour récupérer les informations

        public function getDatas($req, $one= true) {
            $datas= null;
            if ($one == true) {
                $datas= $req->fetch();
            }
            else {
                $datas= $req->fetchAll();
            }
            return $datas;
        }

    }
    ?>