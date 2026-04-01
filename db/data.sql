-- ============================================================
-- Ecommerce DB - Complete init script
-- Run once before starting backend (Docker Compose)
-- ============================================================

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;


CREATE DATABASE IF NOT EXISTS ecommerce_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE ecommerce_db;

-- ------------------------------------------------------------
-- Table: users
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id         BIGINT       NOT NULL AUTO_INCREMENT,
    full_name  VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL UNIQUE,
    password   VARCHAR(255) NOT NULL,
    role       VARCHAR(50)  NOT NULL DEFAULT 'USER',
    created_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: products
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    id          BIGINT         NOT NULL AUTO_INCREMENT,
    name        VARCHAR(255)   NOT NULL,
    description TEXT,
    price       DECIMAL(12,0)  NOT NULL,
    image_url   VARCHAR(1000)  NOT NULL,
    category    VARCHAR(255)   NOT NULL,
    color       VARCHAR(255),
    stock       INT            DEFAULT 100,
    created_at  DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: orders
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    id               BIGINT         NOT NULL AUTO_INCREMENT,
    user_id          BIGINT         NOT NULL,
    total_amount     DECIMAL(15,0)  NOT NULL,
    status           VARCHAR(50)    NOT NULL DEFAULT 'PENDING',
    shipping_address VARCHAR(1000)  NOT NULL,
    phone            VARCHAR(50)    NOT NULL,
    created_at       DATETIME       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_orders_user FOREIGN KEY (user_id) REFERENCES users (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: order_items
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
    id         BIGINT        NOT NULL AUTO_INCREMENT,
    order_id   BIGINT        NOT NULL,
    product_id BIGINT        NOT NULL,
    quantity   INT           NOT NULL,
    price      DECIMAL(12,0) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_orderitems_order   FOREIGN KEY (order_id)   REFERENCES orders   (id),
    CONSTRAINT fk_orderitems_product FOREIGN KEY (product_id) REFERENCES products (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------
-- Table: cart_items
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS cart_items (
    id         BIGINT NOT NULL AUTO_INCREMENT,
    user_id    BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    quantity   INT    NOT NULL DEFAULT 1,
    PRIMARY KEY (id),
    CONSTRAINT fk_cartitems_user    FOREIGN KEY (user_id)    REFERENCES users    (id),
    CONSTRAINT fk_cartitems_product FOREIGN KEY (product_id) REFERENCES products (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- add user
INSERT IGNORE INTO users (full_name, email, password, role, created_at) VALUES
('hieu', 'hieu@gmail.com', '123456', 'USER', NOW());

-- ============================================================
-- Seed: products
-- ============================================================
INSERT IGNORE INTO products (name, description, price, image_url, category, color, stock, created_at) VALUES
('ULTRABOOST 5',
 'Giày chạy bộ Ultraboost 5 với công nghệ BOOST hoàn trả năng lượng tối ưu. Thiết kế Primeknit ôm chân thoải mái.',
 4500000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68af29b2d7054e2088d20480fa44da67_9366/Giay_Ultraboost_5_DJen_ID3719_01_standard.jpg',
 'Running', 'Core Black', 50, NOW()),

('ADIZERO ADIOS PRO 3',
 'Giày chạy đỉnh cao Adizero Adios Pro 3 với plate carbon ENERGYRODS 2.0. Dành cho vận động viên chuyên nghiệp.',
 7500000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3272319cf6e94b1f9692af5a015a269c_9366/Giay_Adizero_Adios_Pro_3_DJen_IG6439_01_standard.jpg',
 'Running', 'Core Black', 30, NOW()),

('SAMBA OG',
 'Giày Samba OG huyền thoại - phong cách retro vượt thời gian. Chất liệu da premium với đế gum truyền thống.',
 3200000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Giay_Samba_OG_Trang_B75806_01_standard.jpg',
 'Originals', 'Cloud White', 80, NOW()),

('GAZELLE INDOOR',
 'Giày Gazelle Indoor phong cách street style. Upper da lộn mềm mại, đế trong nhà truyền thống.',
 3000000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/75584dd7f82b4ba9acb9af3b0112d0a9_9366/Giay_Gazelle_Indoor_Xanh_da_troi_IG1640_01_standard.jpg',
 'Originals', 'Blue', 60, NOW()),

('STAN SMITH',
 'Giày Stan Smith biểu tượng với chất liệu Primegreen tái chế. Phong cách tối giản, dễ phối đồ.',
 2800000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68af29b2d7054e2088d20480fa44da67_9366/Giay_Stan_Smith_Trang_FX5502_01_standard.jpg',
 'Originals', 'Cloud White', 100, NOW()),

('FORUM LOW',
 'Giày Forum Low phong cách bóng rổ retro. Quai dán cổ điển, đế cupsole thoải mái cả ngày.',
 2900000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5ee9b3ea2bff437f892aacbb00cc0b7e_9366/Giay_Forum_Low_Trang_FY7755_01_standard.jpg',
 'Originals', 'Cloud White', 70, NOW()),

('PREDATOR ACCURACY.1 FG',
 'Giày đá bóng Predator Accuracy.1 với công nghệ Facet Frame tăng độ chính xác. Bề mặt Hybridtouch cao cấp.',
 6500000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fafe0624dc7442c1a3a5af5a015d61e1_9366/Giay_Predator_Accuracy.1_Firm_Ground_DJen_GW4574_01_standard.jpg',
 'Football', 'Core Black', 25, NOW()),

('COPA PURE II ELITE FG',
 'Giày đá bóng Copa Pure II Elite với upper da kangaroo cao cấp. Cảm giác bóng vượt trội.',
 7000000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e8ca75d2f9094ad98a1caf2400c1c4f9_9366/Copa_Pure_II_Elite_Firm_Ground_Boots_DJen_IE4896_01_standard.jpg',
 'Football', 'Core Black', 20, NOW()),

('NMD_R1',
 'Giày NMD R1 với đệm BOOST toàn bàn chân. Thiết kế đường phố hiện đại kết hợp công nghệ chạy bộ.',
 3800000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2fe8ab3f3b4f47b4975cad3200db71cd_9366/Giay_NMD_R1_DJen_GZ9256_01_standard.jpg',
 'Originals', 'Core Black', 45, NOW()),

('SUPERSTAR',
 'Giày Superstar huyền thoại với mũi vỏ sò đặc trưng. Biểu tượng vượt thời gian từ thập niên 70.',
 2600000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7ed0855435194229a525aad6009a0497_9366/Giay_Superstar_Trang_EG4958_01_standard.jpg',
 'Originals', 'Cloud White', 90, NOW()),

('ADILETTE COMFORT',
 'Dép Adilette Comfort với đệm Cloudfoam êm ái. Thiết kế 3 sọc kinh điển, lý tưởng cho sau tập luyện.',
 900000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68af29b2d7054e2088d20480fa44da67_9366/Dep_Adilette_Comfort_DJen_AP9971_01_standard.jpg',
 'Slides', 'Core Black', 120, NOW()),

('TERREX FREE HIKER 2',
 'Giày leo núi Terrex Free Hiker 2 với đệm BOOST. Chống nước GORE-TEX, bám đường Continental.',
 5800000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2fe8ab3f3b4f47b4975cad3200db71cd_9366/Giay_Terrex_Free_Hiker_2_DJen_HP7492_01_standard.jpg',
 'Outdoor', 'Core Black', 35, NOW()),

('CAMPUS 00s',
 'Giày Campus 00s phong cách Y2K. Da lộn premium, thiết kế chunky, đế dày xu hướng.',
 3100000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/75584dd7f82b4ba9acb9af3b0112d0a9_9366/Giay_Campus_00s_Xam_HQ8707_01_standard.jpg',
 'Originals', 'Grey', 55, NOW()),

('DURAMO SPEED',
 'Giày chạy bộ Duramo Speed với đệm LIGHTMOTION nhẹ. Phù hợp tập luyện hàng ngày.',
 2200000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fafe0624dc7442c1a3a5af5a015d61e1_9366/Giay_Duramo_Speed_DJen_IE7267_01_standard.jpg',
 'Running', 'Core Black', 75, NOW()),

('HANDBALL SPEZIAL',
 'Giày Handball Spezial từ sân bóng ném đến đường phố. Da lộn vintage, đế gum, phong cách thể thao cổ điển.',
 3000000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/e8ca75d2f9094ad98a1caf2400c1c4f9_9366/Giay_Handball_Spezial_Xanh_la_IF8913_01_standard.jpg',
 'Originals', 'Green', 40, NOW()),

('ADIZERO SL',
 'Giày chạy bộ Adizero SL siêu nhẹ với đệm LIGHTSTRIKE PRO. Thiết kế cho tốc độ.',
 3500000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/3272319cf6e94b1f9692af5a015a269c_9366/Giay_Adizero_SL_Trang_HQ1348_01_standard.jpg',
 'Running', 'Cloud White', 40, NOW()),

('OZWEEGO',
 'Giày Ozweego phong cách chunky retro-futuristic. Đệm Adiprene+ thoải mái, thiết kế lớp chồng lớp.',
 3300000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/5ee9b3ea2bff437f892aacbb00cc0b7e_9366/Giay_Ozweego_Trang_EE6464_01_standard.jpg',
 'Originals', 'Cloud White', 50, NOW()),

('X SPEEDPORTAL.1 FG',
 'Giày đá bóng X Speedportal.1 siêu nhẹ cho tốc độ tối đa. Bề mặt Speedskin, khung Speedframe.',
 6800000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/68af29b2d7054e2088d20480fa44da67_9366/Giay_X_Speedportal.1_DJo_GW8425_01_standard.jpg',
 'Football', 'Solar Red', 20, NOW()),

('RESPONSE SUPER 3.0',
 'Giày chạy bộ Response Super 3.0 với đệm BOUNCE. Giá tốt, chất lượng ổn định cho người mới.',
 1900000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/2fe8ab3f3b4f47b4975cad3200db71cd_9366/Giay_Response_Super_3.0_Navy_GW1374_01_standard.jpg',
 'Running', 'Navy', 85, NOW()),

('GALAXY 6',
 'Giày chạy bộ Galaxy 6 dành cho người mới bắt đầu. Êm ái với đệm Cloudfoam, giá hợp lý.',
 1500000,
 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/fafe0624dc7442c1a3a5af5a015d61e1_9366/Giay_Galaxy_6_DJen_GW3848_01_standard.jpg',
 'Running', 'Core Black', 100, NOW());
