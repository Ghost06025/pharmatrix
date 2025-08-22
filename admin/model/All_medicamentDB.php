<?php
require_once 'Database.php';

class All_medicamentDB {
    private $db;
    private $tablename;
    private $tableid;

    public function __construct() {
        $this->db= new Database();
        $this->tablename= 'all_medicament';
        $this->tableid= 'all_medicament_id';
    }

    public function create($name, $description, $photo) {
        $sql= "insert into $this->tablename set name=?, description=?, photo=?";
        $params= array($name, $description, $photo);
        $this->db->prepare($sql, $params);
    }

    public function update($id, $name, $description, $photo) {
        $sql= "update $this->tablename set name=?, description=?, photo=? where $this->tableid=?";
        $params= array($name, $description, $photo, $id);
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