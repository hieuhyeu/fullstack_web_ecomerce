# Fullstack E-Commerce

Ứng dụng thương mại điện tử fullstack được container hóa bằng Docker. Dự án bao gồm frontend React, backend Spring Boot và cơ sở dữ liệu MySQL — tất cả được quản lý bởi Docker Compose.

## Công nghệ sử dụng

- **Frontend:** React, Nginx
- **Backend:** Spring Boot 3.2, Java 17, Spring Security, JWT
- **Cơ sở dữ liệu:** MySQL 9
- **Hạ tầng:** Docker, Docker Compose

## Cấu trúc dự án

```
fullstack-ecomerce/
├── fe/                  # Frontend React + Nginx
│   ├── Dockerfile
│   └── nginx.conf
├── be/                  # REST API Spring Boot
│   ├── Dockerfile
│   └── src/
├── db/                  # Script khởi tạo MySQL
│   ├── Dockerfile
│   └── data.sql
└── docker-compose.yml
```

## Yêu cầu

- Đã cài [Docker](https://www.docker.com/) và Docker Compose

## Hướng dẫn chạy

Clone repository và khởi động toàn bộ service bằng một lệnh duy nhất:

```bash
git clone https://github.com/<your-username>/fullstack-ecomerce.git
cd fullstack-ecomerce
docker compose up --build -d
```

Sau khi khởi động, truy cập tại:

| Service   | URL                   |
|-----------|-----------------------|
| Frontend  | http://localhost      |
| Backend   | http://localhost:8080 |



## Dừng ứng dụng

```bash
# Dừng container (giữ nguyên dữ liệu)
docker compose down

# Dừng container và xóa toàn bộ dữ liệu
docker compose down -v
```

## Cấu hình mặc định

Thông tin mặc định dùng cho môi trường local:

| Biến                  | Giá trị        |
|-----------------------|----------------|
| MySQL root password   | `1234`         |
| MySQL database        | `ecommerce_db` |
| Backend port          | `8080`         |
| Frontend port         | `80`           |

## Lưu ý

- Cơ sở dữ liệu được khởi tạo tự động từ `db/data.sql` trong lần chạy đầu tiên.
- Nếu thay đổi `data.sql`, cần chạy `docker compose down -v` để xóa volume cũ trước khi khởi động lại.
