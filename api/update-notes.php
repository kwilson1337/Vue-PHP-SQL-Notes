<?php 
// include classes
include_once '../classes/db.php';
include_once '../classes/notes.php';

// get form content
echo file_get_contents('php://input');
echo json_decode(file_get_contents('php://input'), true);

// start db connection
$db = new DB;
$update_note = new Notes($db::get_connection());

// get Data
$update_note->note_content = $_POST['note_content'];
$update_note->note_id = $_POST['note_id'];

if($update_note->update_notes()) {
    echo json_encode(['message' => 'Note Update']);
} else {
    echo json_encode(['message' => 'Note Note Updated']);
}
