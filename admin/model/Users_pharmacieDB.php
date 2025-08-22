<?php
require_once 'Database.php';

class Users_pharmacieDB {
    private $db;
    private $tablename;
    private $tableid;

    public function __construct() {
        $this->db= new Database();
        $this->tablename= 'users_pharmacie';
        $this->tableid= array('users_id', 'pharmacie_id');
    }

    public function create($users_id, $pharmacie_id) {
        $sql= "insert into $this->tablename set users_id=?, pharmacie_id=?";
        $params= array($users_id, $pharmacie_id);
        $this->db->prepare($sql, $params);
    }

    public function update($users_id, $pharmacie_id) {
        $sql= "update $this->tablename set users_id=?, pharmacie_id=? where $this->tableid[0]=?";
        $params= array($users_id, $pharmacie_id, $users_id);
        $this->db->prepare($sql, $params);
    }

    public function delete($users_id, $pharmacie_id) {
        $sql= "delete from $this->tablename where $this->tableid[0]=? and $this->tableid[1]=?";
        $params= array($users_id, $pharmacie_id);
        $this->db->prepare($sql, $params);
    }

    public function read($users_id, $pharmacie_id) {
        $sql= "select * from $this->tablename where $this->tableid[0]=? and $this->tableid[1]=?";
        $params= array($users_id, $pharmacie_id);
        $req= $this->db->prepare($sql, $params);
        return $this->db->getDatas($req, true);
    }

    public function readAll() {
        $sql= "select * from $this->tablename order by $this->tableid[0] desc";
        $params= null;
        $req= $this->db->prepare($sql, $params);
        return $this->db->getDatas($req, false);
    }
}

?>