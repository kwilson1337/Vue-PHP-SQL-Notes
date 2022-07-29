<?php 
//include classes
include_once '../classes/db.php';
include_once '../classes/notes.php';

// get form content
echo file_get_contents('php://input');
echo json_decode(file_get_contents('php://input'), true);

// start db connection
$db = new DB;
$post_note = new Notes($db::get_connection());

// gather variables
$post_note->note_content = $_POST['note_content'];

// post note
if($post_note->post_note()) {
    echo json_encode(['message' => 'Note Posted']);
} else {
    echo json_encode(['message' => 'Note Note Posed']);
}
?>