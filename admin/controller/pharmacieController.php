<?php
require_once '../service.php';

$action= $_GET['action'];

if ($action == 'create') {
    try {
        $name= $_POST['name'];
        $phone= $_POST['phone'];
        $location= $_POST['location'];


        $pharmaciedb->create($name, $location, $phone);
        $_SESSION['erreur']= array(
            'type'=> 'success',
            'message'=> "La pharmacie $name a été ajoutée avec succès");
    } catch (Exception $ex) {
        $_SESSION['erreur']= array(
        'type'=> 'danger',
        'message' => "ERROR REQUEST : $ex->$getMessage()"
        );
    }
    


finally {
    header('Location:../index.php?view=pharmacie');

}
}

if ($action == 'read') {
    header('Content-Type: application/json');
    try {
        $pharmacie_id= $_GET['pharmacie_id'];
        $ph= $pharmaciedb->read($pharmacie_id);
        http_response_code(200);
        echo json_encode($ph);
       
    } catch (Exception $ex) {
        http_response_code(500);
       echo json_encode(array('type' => 'danger',
        'message' => "ERROR REQUEST : $ex->$getMessage()"));
    }
    


finally {
    header('Location:../index.php?view=pharmacie');

}

}


if ($action == 'update') {
    try {
        $pharmacie_id= $_POST['pharmacie_id'];
        $name= $POST['name'];
        $phone= $_POST['phone'];
        $location= $_POST['location'];


        $pharmaciedb->update($pharmacie_id, $name, $location, $phone);
        $_SESSION['erreur']= array(
            'type'=> 'success',
            'message'=> "La pharmacie $name a été ajoutée avec succès");
    } catch (Exception $ex) {
        $_SESSION['erreur']= array(
        'type'=> 'danger',
        'message' => "ERROR REQUEST : $ex->$getMessage()"
        );
    }
    finally {
        header('Location:../index.php?view=pharmacie');

}
}


if ($action == 'delete') {
    try {
        $pharmacie_id= $_GET['pharmacie_id'];
    
        $pharmaciedb->delete($pharmacie_id);
        $_SESSION['erreur']= array(
            'type'=> 'success',
            'message'=> "La pharmacie $name a été ajoutée avec succès");
    } catch (Exception $ex) {
        $_SESSION['erreur']= array(
            'type'=> 'danger',
            'message' => "ERROR REQUEST : $ex->$getMessage()");
    }
    finally {
        header('Location:../index.php?view=pharmacie');

}
}

?>