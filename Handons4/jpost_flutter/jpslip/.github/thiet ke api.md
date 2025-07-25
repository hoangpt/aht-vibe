# Thiết kế API Backend cho Flutter Frontend (SlipScan)

## 1. Tổng quan
API phục vụ cho ứng dụng Flutter để nhận dữ liệu đã extract từ shipping slip (thông tin người gửi/nhận).

## 2. Endpoint

### 2.1. POST `/api/v1/slip/extract`
- **Mô tả:** Nhận ảnh slip, trả về thông tin extract.
- **Request:**
    - `Content-Type: multipart/form-data`
    - Body:
        - `image`: file ảnh slip (jpg/png)
        - `mode`: `online` (tùy chọn)
- **Response:**
    ```json
    {
        "success": true,
        "data": {
            "sender": {
                "name": "Nguyễn Văn A",
                "phone": "0901234567",
                "address": "123 Đường ABC, Quận 1, TP.HCM",
                "postalcode": "700000"
            },
                "name": "Nguyễn Văn A",
                "phone": "0901234567",
                "address": "123 Đường ABC, Quận 1, TP.HCM"
            },
            "receiver": {
                "name": "Trần Thị B",
                "phone": "0912345678",
                "address": "456 Đường XYZ, Quận 2, TP.HCM"
            },
            "tracking_number": "VN123456789"
        },
        "message": "Extract thành công"
    }
    ```
- **Error:**
    ```json
    {
        "success": false,
        "message": "Không nhận diện được slip"
    }
    ```

## 3. Authentication
- Sử dụng JWT hoặc API Key (tùy chọn).

## 4. Lưu ý
- Đảm bảo hỗ trợ tiếng Việt Unicode.
- Trả về dữ liệu dạng JSON, dễ parse trên Flutter.

---

openapi: 3.0.0
info:
  title: SlipScan API
  version: 1.0.0
  description: API phục vụ extract thông tin từ shipping slip cho ứng dụng Flutter.
servers:
  - url: /api/v1
paths:
  /slip/extract:
    post:
      summary: Nhận ảnh slip, trả về thông tin extract
      requestBody:
        required: true
        content:
          multipart/form-data:
            schema:
              type: object
              properties:
                image:
                  type: string
                  format: binary
                  description: File ảnh slip (jpg/png)
                mode:
                  type: string
                  enum: [online, offline]
                  description: Chế độ nhận diện
      responses:
        '200':
          description: Extract thành công
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  data:
                    type: object
                    properties:
                      sender:
                        $ref: '#/components/schemas/PersonInfo'
                      receiver:
                        $ref: '#/components/schemas/PersonInfo'
                      tracking_number:
                        type: string
                  message:
                    type: string
        '400':
          description: Không nhận diện được slip
          content:
            application/json:
              schema:
                type: object
                properties:
                  success:
                    type: boolean
                  message:
                    type: string
components:
  schemas:
    PersonInfo:
      type: object
      properties:
        name:
          type: string
        phone:
          type: string
        address:
          type: string
        postalcode:
          type: string
