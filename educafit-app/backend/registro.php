<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

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

try {
    // Iniciar transacción
    $pdo->beginTransaction();

    // Insertar nuevo usuario
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre_usuario, contraseña, nombre) VALUES (?, ?, ?)");
    $stmt->execute([$nombre_usuario, $contraseña, $nombre]);

    // Obtener el ID del nuevo usuario
    $usuario_id = $pdo->lastInsertId();

    // Crear entrada vacía en datos_usuario (puedes modificar si deseas valores por defecto)
    $stmtDatos = $pdo->prepare("INSERT INTO datos_usuario (usuario_id) VALUES (?)");
    $stmtDatos->execute([$usuario_id]);

    // Confirmar transacción
    $pdo->commit();

    echo json_encode(["success" => true, "message" => "Usuario registrado correctamente"]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["success" => false, "message" => "Error al registrar usuario", "error" => $e->getMessage()]);
}
