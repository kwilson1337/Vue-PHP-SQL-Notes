<?php 
//include classes
include_once '../classes/db.php';
include_once '../classes/notes.php';

// get form content
echo file_get_contents('php://input');
echo json_decode(file_get_contents('php://input'), true);

// start db connection
$db = new DB;
$delete_note = new Notes($db::get_connection());

// Get data
$delete_note->note_id = $_POST['note_id'];

if($delete_note->delete_notes()) {
    echo json_encode(['message' => 'Note Deleted']);
} else {
    echo json_encode(['message' => 'Note Note Deleted']);
}