<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include 'db.php';

// Obtener los datos del cuerpo de la solicitud
$datos = json_decode(file_get_contents("php://input"), true);

// Validación mínima
if (!isset($datos['usuario_id']) || !isset($datos['fecha_inicio']) || !isset($datos['fecha_fin'])) {
    echo json_encode(["success" => false, "message" => "Faltan datos requeridos"]);
    exit;
}

$usuario_id = $datos['usuario_id'];
$fecha_inicio = $datos['fecha_inicio'];
$fecha_fin = $datos['fecha_fin'];

try {
    $consulta = $pdo->prepare("SELECT fecha FROM entrenamientos
                               WHERE usuario_id = ? AND fecha BETWEEN ? AND ?");
    $consulta->execute([$usuario_id, $fecha_inicio, $fecha_fin]);
    $fechas = $consulta->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode([
        "success" => true,
        "fechas_entrenamiento" => $fechas
    ]);
} catch (PDOException $e) {
    echo json_encode([
        "success" => false,
        "message" => "Error al consultar entrenamientos: " . $e->getMessage()
    ]);
}
