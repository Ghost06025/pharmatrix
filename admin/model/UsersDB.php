<?php
require_once 'Database.php';

class UsersDB {
    private $db;
    private $tablename;
    private $tableid;

    public function __construct() {
        $this->db = new Database();
        $this->tablename = 'users';
        $this->tableid = 'users_id';
    }
}