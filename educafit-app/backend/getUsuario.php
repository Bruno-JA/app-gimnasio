<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include 'db.php';

$nombre_usuario = $_GET['nombre_usuario'] ?? '';

if ($nombre_usuario) {
    $stmt = $pdo->prepare("SELECT id, nombre_usuario, nombre, altura_cm, peso_kg FROM usuarios WHERE nombre_usuario = ?");
    $stmt->execute([$nombre_usuario]);

    if ($stmt->rowCount() > 0) {
        echo json_encode($stmt->fetch(PDO::FETCH_ASSOC));
    } else {
        echo json_encode(['error' => 'Usuario no encontrado']);
    }
} else {
    echo json_encode(['error' => 'Falta el parámetro nombre_usuario']);
}