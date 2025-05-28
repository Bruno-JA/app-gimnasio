<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db.php';

$datos = json_decode(file_get_contents("php://input"), true);

if (!isset($datos['usuario_id']) || !isset($datos['fecha'])) {
    echo json_encode(["success" => false, "message" => "Faltan datos"]);
    exit;
}

$usuario_id = $datos['usuario_id'];
$fecha = $datos['fecha'];

try {
    $consulta = $pdo->prepare("DELETE FROM entrenamientos WHERE usuario_id = ? AND fecha = ?");
    $consulta->execute([$usuario_id, $fecha]);

    if ($consulta->rowCount() > 0) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "No se encontró entrenamiento para eliminar."]);
    }
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error en la base de datos"]);
}
