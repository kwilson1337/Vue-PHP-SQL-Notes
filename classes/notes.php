<?php 
class Notes {
    private $conn;
    private $table = 'notes';
    
    public $note_content;  
    public $note_id;

    /**
     * Connect to DB
    */
    public function __construct($db) {
        $this->conn = $db;
    }

    /**
     * Read Notes
     */
    public function read_notes() {        

        $sql = 'SELECT * from '. $this->table .'
        WHERE user_id=?';

        return DB::prepared_select($sql, [1]);            
    }

    /**
     * Post Notes
     */
    public function post_note() {
        $sql = 'INSERT into '. $this->table .'
                (note_content,note_created)
                VALUES (?, current_timestamp())';

        return DB::prepared_query($sql, [
                $this->note_content
            ],'s');
    }

    /**
     * Delete Notes
     */
    public function delete_notes() {
        $sql = 'DELETE FROM notes WHERE note_id=?';

        return DB::prepared_query($sql, [
            $this->note_id
        ],'s');
    }

    /**
     * Update Notes
     */
    public function update_notes() {
        $sql = 'UPDATE '. $this->table .'
                SET note_content=?
                WHERE note_id=?';

        return DB::prepared_query($sql, [
                $this->note_content, 
                $this->note_id
            ],'ss');
    }
}