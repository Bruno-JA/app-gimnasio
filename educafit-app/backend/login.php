<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['nombre_usuario'], $data['contraseña'])) {
    echo json_encode(["success" => false, "message" => "Faltan datos"]);
    exit;
}

$nombre_usuario = trim($data['nombre_usuario']);
$contraseña = $data['contraseña'];

// Buscar usuario
$stmt = $pdo->prepare("SELECT id, nombre_usuario, contraseña, nombre FROM usuarios WHERE nombre_usuario = ?");
$stmt->execute([$nombre_usuario]);

if ($stmt->rowCount() === 0) {
    echo json_encode(["success" => false, "message" => "Usuario no encontrado"]);
    exit;
}

$usuario = $stmt->fetch(PDO::FETCH_ASSOC);

// Verificar contraseña
if (password_verify($contraseña, $usuario['contraseña'])) {
    echo json_encode([
        "success" => true,
        "message" => "Inicio de sesión correcto",
        "usuario" => [
            "id" => $usuario['id'],
            "nombre_usuario" => $usuario['nombre_usuario'],
            "nombre" => $usuario['nombre']
        ]
    ]);
} else {
    echo json_encode(["success" => false, "message" => "Contraseña incorrecta"]);
}