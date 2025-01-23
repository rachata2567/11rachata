<?php

    include('config.php');
    $table = "CREATE TABLE products (
        id INT(6) AUTO_INCREMENT COMMENT 'รหัสสินค้า',
        name VARCHAR(100) COMMENT 'ชื่อสินค้า',
        price VARCHAR(100) COMMENT 'ราคา',
        image VARCHAR(100) COMMENT 'รูปภาพ',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT 'วันที่สร้าง',
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'วันที่อัพเดท',
        PRIMARY KEY (id)
    );";
    
    if ($conn->query($table) === TRUE) {
        echo "สร้างตารางสินค้าเรียบร้อยแล้ว";
    } else {
        echo "ไม่สามารถสร้างตารางได้: " . $conn->error;
    }

    $conn->close();

?>
