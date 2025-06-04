<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
include 'db.php';

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
$series = $datos['series'];
$repeticiones = $datos['repeticiones_por_serie'];
$peso = $datos['peso_utilizado'];
$notas = isset($datos['notas']) ? $datos['notas'] : null;

// Calculamos el peso total levantado
$peso_total = $series * $repeticiones * $peso;

try {
    $consulta = $pdo->prepare("INSERT INTO entrenamientos (usuario_id, fecha, series, repeticiones_por_serie, peso_utilizado, peso_total_levantado, notas)
                               VALUES (?, ?, ?, ?, ?, ?, ?)");
    $consulta->execute([$usuario_id, $fecha, $series, $repeticiones, $peso, $peso_total, $notas]);

    echo json_encode(["success" => true]);
} catch (PDOException $e) {
    echo json_encode(["success" => false, "message" => "Error al guardar en la base de datos"]);
}