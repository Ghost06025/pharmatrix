<?php
require_once 'Database.php';

class Coupon_medicamentDB {
    private $db;
    private $tablename;
    private $tableid;

    public function __construct() {
        $this->db= new Database();
        $this->tablename= 'Coupon_medicament';
        $this->tableid= array('coupon_id', 'medicament_id');
    }

    public function create($coupon_id, $medicament_id) {
        $sql= "insert into $this->tablename set coupon_id=?, medicament_id=?";
        $params= array($coupon_id, $medicament_id);
        $this->db->prepare($sql, $params);
    }

    public function update($coupon_id, $medicament_id) {
        $sql= "update $this->tablename set coupon_id=?, medicament_id=? where $this->tableid[0]=?";
        $params= array($coupon_id, $medicament_id, $coupon_id);
        $this->db->prepare($sql, $params);
    }

    public function delete($coupon_id, $medicament_id) {
        $sql= "delete from $this->tablename where $this->tableid[0]=? and $this->tableid[1]=?";
        $params= array($coupon_id, $medicament_id);
        $this->db->prepare($sql, $params);
    }

    public function read($coupon_id, $medicament_id) {
        $sql= "select * from $this->tablename where $this->tableid[0]=? and $this->tableid[1]=?";
        $params= array($coupon_id, $medicament_id);
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