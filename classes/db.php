<?php 
class DB {
    /**
     * Creates connection to DB
    */
    public static function get_connection() {
        include_once '../conn.php';
        $conn = db_connect();

        return $conn;
    }

     /**
     * Update/Insert helper
     * great info here to build more helpers
     * https://phpdelusions.net/mysqli/simple
     */
    public static function prepared_query($sql, $params, $types = "") {        
        $conn = self::get_connection();
        $types = $types ?: str_repeat("s", count($params));
        $stmt = $conn->prepare($sql);
        $stmt->bind_param($types, ...$params);
        $stmt->execute();
        $stmt->close();

        return $stmt;
    }

    /**
     * Select Query
     */
    public static function prepared_select($sql, $params = [], $types = "") {               
        $conn = self::get_connection();
        $types = $types ?: str_repeat("s", count($params));
        $stmt = $conn->prepare($sql);
        $stmt->bind_param($types, ...$params);
        $stmt->execute();       

        return $stmt->get_result();
    }    
}
?>