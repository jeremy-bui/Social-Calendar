<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization');
header('Access-Control-Max-Age: 86400');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}


require_once("connect.php");

// Retrieve all persons
function getPersons() {
    global $conn;
    $sql = "SELECT * FROM person";
    $result = mysqli_query($conn, $sql);
    $rows = mysqli_fetch_all($result, MYSQLI_ASSOC);
    mysqli_free_result($result);
    return $rows;
}

// Retrieve the last person by ID
function getLastPerson() {
    global $conn;
    $sql = "SELECT * FROM person ORDER BY USER_ID DESC LIMIT 1";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    mysqli_free_result($result);
    return $row;
}

// Retrieve a specific person by ID
function getPersonById($id) {
    global $conn;
    $sql = "SELECT * FROM person WHERE USER_ID = $id";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_assoc($result);
    mysqli_free_result($result);
    return $row;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Handle GET request
    if (isset($_GET['id'])) {
        $id = $_GET['id'];
        $person = getPersonById($id);
        header('Content-Type: application/json');
        echo json_encode($person);
    } else if (isset($_GET['last'])) {
        $lastPersonId = getLastPerson();
        header('Content-Type: application/json');
        echo json_encode(['USER_ID' => $lastPersonId]);
    } else {
        $persons = getPersons();
        header('Content-Type: application/json');
        echo json_encode($persons);
    }
}elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Handle POST request
    $data = json_decode(file_get_contents('php://input'), true);
    $result = addPerson($data);
    if ($result) {
        header('Content-Type: application/json');
        echo json_encode(array('message' => 'Person added successfully'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to add person'));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Handle PUT request
    $id = $_GET['id'];
    $data = json_decode(file_get_contents('php://input'), true);
    $result = updatePerson($id, $data);
    if ($result) {
        header('Content-Type: application/json');
        echo json_encode(array('message' => 'Person updated successfully'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to update person'));
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Handle DELETE request
    $id = $_GET['id'];
    $result = deletePerson($id);
    if ($result) {
        header('Content-Type: application/json');
        echo json_encode(array('message' => 'Person deleted successfully'));
    } else {
        http_response_code(500);
        echo json_encode(array('message' => 'Failed to delete person'));
    }
} else {
    http_response_code(405);
    echo json_encode(array('message' => 'Method not allowed'));
}

// Add a new person
function addPerson($person) {
    global $conn;
    $lastPerson = getLastPerson();
    $newUserId = $lastPerson['USER_ID'] + 1;
    $username = $person['USER_NAME'];
    $password = $person['PASSWORD'];
    $usertype = $person['USER_TYPE'];
    $fname = $person['USER_FNAME'];
    $lname = $person['USER_LNAME'];
    $sql = "INSERT INTO person (USER_ID, USER_NAME, PASSWORD, USER_TYPE, USER_FNAME, USER_LNAME) VALUES ('$newUserId', '$username', '$password', '$usertype', '$fname', '$lname')";
    if (mysqli_query($conn, $sql)) {
        return true;
    } else {
        return false;
    }
}

// Update an existing person
function updatePerson($id, $person) {
    global $conn;
    $username = $person['USER_NAME'];
    $password = $person['PASSWORD'];
    $usertype = $person['USER_TYPE'];
    $fname = $person['USER_FNAME'];
    $lname = $person['USER_LNAME'];
    $sql = "UPDATE person SET USER_NAME='$username', PASSWORD='$password', USER_TYPE='$usertype', USER_FNAME='$fname', USER_LNAME='$lname' WHERE USER_ID=$id";
    if (mysqli_query($conn, $sql)) {
        return true;
    } else {
        return false;
    }
}

// Delete a person by ID
function deletePerson($id) {
    global $conn;
    $sql = "DELETE FROM person WHERE USER_ID = $id";
    if (mysqli_query($conn, $sql)) {
        return true;
    } else {
        return false;
    }
}
?>
