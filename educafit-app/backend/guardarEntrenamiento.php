<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'db.php'; // Asegúrate de que este archivo establece correctamente $pdo

$datos = json_decode(file_get_contents("php://input"), true);

if (
    !isset($datos['usuario_id']) ||
    !isset($datos['fecha']) ||
    !isset($datos['series']) ||
    !isset($datos['repeticiones_por_serie']) ||
    !isset($datos['peso_utilizado'])
) {
    echo json_encode(["success" => false, "message" => "Faltan datos"]);
    exit;
}

$usuario_id = $datos['usuario_id'];
$fecha = $datos['fecha'];
$series = intval($datos['series']);
$repeticiones = intval($datos['repeticiones_por_serie']);
$peso = floatval($datos['peso_utilizado']);

// Cálculo automático del peso total levantado
$peso_total = $series * $repeticiones * $peso;

try {
    $stmt = $pdo->prepare("
        INSERT INTO entrenamientos (usuario_id, fecha, series, repeticiones_por_serie, peso_utilizado, peso_total_levantado)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([$usuario_id, $fecha, $series, $repeticiones, $peso, $peso_total]);

    echo json_encode(["success" => true, "message" => "Entrenamiento guardado"]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error al guardar entrenamiento"]);
}
