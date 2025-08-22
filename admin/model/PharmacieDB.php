<?php
require_once 'Database.php';

class PharmacieDB {
    private $db;
    private $tablename;
    private $tableid;

    public function __construct() {
        $this->db = new Database();
        $this->tablename = 'pharmacie';
        $this->tableid = 'pharmacie_id';
    }

    public function create($nom, $location, $phone) {
        $sql= "insert into $this->tablename set first_name=?, last_name=?, phone=?, location=?, email=?, password=?, role=?, photo=?";
        $params= array($nom, $location, $phone);
        $this->db->prepare($sql, $params);
    }

     public function update($id, $nom, $location, $phone) {
        $sql= "update $this->tablename set nom=?, location=?, phone=? where $this->tableid=?";
        $params= array($nom, $location, $phone, $id);
        $this->db->prepare($sql, $params);
    }

    public function delete($id) {
        $sql= "delete $this->tablename where $this->tableid=?";
        $params= array($id);
        $this->db->prepare($sql, $params);
    }

    public function read($id) {
        $sql= "select * from $this->tablename where $this->tableid=?";
        $params= array($id);
        $this->db->prepare($sql, $params);
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