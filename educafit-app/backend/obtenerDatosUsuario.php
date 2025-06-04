<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
header("Content-Type: application/json");

include 'db.php';

$id_usuario = $_GET['id_usuario'] ?? null;

if (!$id_usuario) {
    echo json_encode(["success" => false, "message" => "Falta ID de usuario"]);
    exit;
}

$stmt = $pdo->prepare("SELECT fecha_nacimiento, altura_cm, peso_kg FROM datos_usuario WHERE usuario_id = ?");
$stmt->execute([$id_usuario]);
$datos = $stmt->fetch(PDO::FETCH_ASSOC);

if ($datos) {
    echo json_encode(["success" => true, "datos" => $datos]);
} else {
    echo json_encode(["success" => false, "message" => "Datos no encontrados"]);
}
