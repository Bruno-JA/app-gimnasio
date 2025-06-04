<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$id_usuario = $data['id_usuario'] ?? null;

if (!$id_usuario) {
    echo json_encode(["success" => false, "message" => "Falta ID de usuario"]);
    exit;
}

$fecha = $data['fecha_nacimiento'] ?? null;
$altura = $data['altura_cm'] ?? null;
$peso = $data['peso_kg'] ?? null;

$stmt = $pdo->prepare("
  INSERT INTO datos_usuario (usuario_id, fecha_nacimiento, altura_cm, peso_kg)
  VALUES (?, ?, ?, ?)
  ON DUPLICATE KEY UPDATE
    fecha_nacimiento = VALUES(fecha_nacimiento),
    altura_cm = VALUES(altura_cm),
    peso_kg = VALUES(peso_kg)
");

$stmt->execute([$id_usuario, $fecha, $altura, $peso]);

echo json_encode(["success" => true, "message" => "Datos actualizados correctamente"]);
