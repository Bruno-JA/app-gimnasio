<?php
// este fichero realiza la consulta de un entrenamiento por fecha y usuario y devuelve los datos del entrenamiento como por ejemplo el tipo de entrenamiento, ejercicios, series, repeticiones, etc.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
include 'db.php';

$datos = json_decode(file_get_contents("php://input"), true);

if (!isset($datos['usuario_id']) || !isset($datos['fecha'])) {
    echo json_encode(["success" => false, "message" => "Faltan datos"]);
    exit;
}

$usuario_id = $datos['usuario_id'];
$fecha = $datos['fecha'];

try {
    $consulta = $pdo->prepare("SELECT * FROM entrenamientos WHERE usuario_id = ? AND fecha = ?");
    $consulta->execute([$usuario_id, $fecha]);
    $entrenamiento = $consulta->fetch(PDO::FETCH_ASSOC);

    if ($entrenamiento) {
        echo json_encode(["success" => true, "entrenamiento" => $entrenamiento]);
    } else {
        echo json_encode(["success" => false, "message" => "Sin entrenamiento"]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error en la base de datos"]);
}
