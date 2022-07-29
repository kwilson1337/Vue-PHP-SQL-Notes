<?php 
// include classes
include_once '../classes/db.php';
include_once '../classes/notes.php';

// start connection
$db = new DB;
$read_notes = new Notes($db::get_connection());

// get data
$all_notes = $read_notes->read_notes();

// format data
$get_data['data'] = [];
if($all_notes->num_rows > 0) {    
    while($row = $all_notes->fetch_assoc()) {   
        extract($row);

        $info = [
            'note_id'       => $note_id,
            'note_content'  => $note_content,
            'note_created'  => $note_created,
            'user_id'       => $user_id
        ];

        array_push($get_data['data'], $info);             
    }
    echo json_encode($get_data);
}