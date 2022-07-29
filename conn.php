<?php 
function db_connect() {
    $dbhost = "localhost";
    $dbname = "kw-notes";
    $username = "root";
    $password = "root";

    $link = new mysqli($dbhost, $username, $password, $dbname);

    if ($link->connect_error) {
        echo "Not connected, error: " . $mysqli_connection->connect_error;
    }
    else {
        return $link;
    }
}
?>