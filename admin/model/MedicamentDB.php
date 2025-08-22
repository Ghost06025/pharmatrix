<?php
require_once 'Database.php';

class MedicamentDB {
    private $db;
    private $tablename;
    private $tableid;

    public function __construct() {
        $this->db= new Database();
        $this->tablename= 'medicament';
        $this->tableid= 'medicament_id';
    }

    public function create($all_medicament_id, $pharmacie_id, $price, $quantite) {
        $sql= "insert into $this->tablename set all_medicament_id=?, pharmacie_id=?, price=?, quantite=?";
        $params= array($all_medicament_id, $pharmacie_id, $price, $quantite);
        $this->db->prepare($sql, $params);
    }

    public function update($id, $all_medicament_id, $pharmacie_id, $price, $quantite) {
        $sql= "update $this->tablename set all_medicament_id=?, pharmacie_id=?, price=?, quantite=? where $this->tableid=?";
        $params= array($all_medicament_id, $pharmacie_id, $price, $quantite, $id);
        $this->db->prepare($sql, $params);
    }

    public function delete($id) {
        $sql= "delete from $this->tablename where $this->tableid=?";
        $params= array($id);
        $this->db->prepare($sql, $params);
    }

    public function read($id) {
        $sql= "select * from $this->tablename where $this->tableid=?";
        $params= array($id);
        $req= $this->db->prepare($sql, $params);
        return $this->db->getDatas($req, true);
    }

    public function readAll() {
        $sql= "select * from $this->tablename order by $this->tableid desc";
        $params= null;
        $req= $this->db->prepare($sql, $params);
        return $this->db->getDatas($req, false);
    }
}

?>