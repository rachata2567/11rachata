<?php
include('config.php');

$messages = array();
try {
    if (!isset($_FILES['image']) || $_FILES['image']['error'] != UPLOAD_ERR_OK) {
        throw new Exception('รูปภาพไม่ถูกต้อง');
    }

    $image = $_FILES['image'];
    $imagePath = 'img/' . basename($image['name']);

    if (!move_uploaded_file($image['tmp_name'], $imagePath)) {
        throw new Exception('ไม่สามารถอัพโหลดรูปภาพได้');
    }

    $dataJson = $_POST;
    $name = $dataJson['name'];
    $price = $dataJson['price'];

    $sql = "INSERT INTO products (name, price, image, created_at, updated_at) VALUES ('$name', '$price', '$imagePath', NOW(), NOW());";

    $qr_insert = mysqli_query($conn, $sql);
    if ($qr_insert) { 
        http_response_code(201);
        $messages['status'] = 'เพิ่มข้อมูลสำเร็จ';
    } else {
        throw new Exception('ไม่สามารถเพิ่มข้อมูลได้: ' . mysqli_error($conn));
    }
} catch (Exception $e) {
    http_response_code(422);
    $messages['status'] = 'เกิดข้อผิดพลาด';
    $messages['error'] = $e->getMessage(); 
}

header('Content-Type: application/json');
echo json_encode($messages);
?>
