## Route Handlers & Middleware

1. Nghiên cứu Middleware—một hàm cho phép chạy logic trước khi yêu cầu hoàn tất.
+ Ở bản Next.js 16+ thì middleware.ts đã được chuyển sang proxy.ts
+ 

2. Áp dụng Middleware để Viết lại (Rewrite) yêu cầu (ví dụ: map URL nội bộ) và Chuyển hướng (Redirect) người dùng dựa trên điều kiện.

3. Sử dụng Middleware để thêm Headers hoặc thực hiện logic Xác thực (Authentication) cơ bản (ví dụ: kiểm tra token)

-- Phần còn lại của ngày 4

## Configuration & Advanced Routing

1. Cấu hình Nâng cao Tổng quan: Đọc qua tài liệu về các tùy chọn cấu hình chính trong next.config.js (ví dụ: headers, redirects, cấu hình hình ảnh cho các domain bên ngoài).

2. Cấu hình Biên dịch & Runtime: Nghiên cứu các tùy chọn liên quan đến biên dịch (compilation) như SWC, và các tùy chọn server/runtime (ví dụ: output: 'standalone'), cũng như cách xử lý biến môi trường.

<!-- 3. Tính năng Thử nghiệm (Experimental): Tìm hiểu và thực hành cách bật/tắt các tính năng thử nghiệm của Next.js, hiểu rõ mục đích và cảnh báo khi sử dụng chúng. -->

4. Concept: Parallel Routes (Tuyến Song song): Nghiên cứu sâu về Parallel Routes và cách chúng được sử dụng để hiển thị các trang hoặc vùng UI độc lập trong cùng một layout (ví dụ: các khu vực trong Dashboard) bằng cách sử dụng cú pháp slots (@folder).

5. Thực hành Parallel Routes: Code: Xây dựng một Layout phức tạp có hai hoặc ba slots song song để kiểm tra cách chúng duy trì trạng thái và hoạt động độc lập với nhau.

6. Concept & Practice: Interception Routes (Tuyến Chặn): Nghiên cứu Interception Routes và cách chúng cho phép bạn "chặn" một URL để hiển thị một modal/lightbox mà không làm mới trang, giúp cải thiện trải nghiệm người dùng (UX) khi đóng modal.

### Thực hành: my-first-app project

### Deploy: https://intern-senlyzer-day5.vercel.app/