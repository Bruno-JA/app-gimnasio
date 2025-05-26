<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';

// Recoger datos del JSON enviado
$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['nombre_usuario'], $data['contraseña'], $data['nombre'])) {
    echo json_encode(["success" => false, "message" => "Faltan datos obligatorios"]);
    exit;
}

$nombre_usuario = trim($data['nombre_usuario']);
$nombre = trim($data['nombre']);
$contraseña = password_hash($data['contraseña'], PASSWORD_DEFAULT);

// Verificar si el nombre de usuario ya existe
$check = $pdo->prepare("SELECT id FROM usuarios WHERE nombre_usuario = ?");
$check->execute([$nombre_usuario]);

if ($check->rowCount() > 0) {
    echo json_encode(["success" => false, "message" => "El nombre de usuario ya está registrado"]);
    exit;
}

// Insertar nuevo usuario
$stmt = $pdo->prepare("INSERT INTO usuarios (nombre_usuario, contraseña, nombre) VALUES (?, ?, ?)");
$stmt->execute([$nombre_usuario, $contraseña, $nombre]);

echo json_encode(["success" => true, "message" => "Usuario registrado correctamente"]);