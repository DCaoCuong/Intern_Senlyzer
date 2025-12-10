## Data Fetching & Mutations

1. Data fetching
-  Tìm hiểu các phương pháp tìm nạp dữ liệu mặc định trong Server Components, hiểu rõ nơi dữ liệu nên được lấy (Layouts, Pages, Components)

2. Cơ chế caching
- Tìm hiểu về việc mở rộng fetch API, các chiến lược bộ nhớ cache, bao gồm Full Route Cache, Data Cache, và Request Memoization (tránh fetch trùng lặp trong cùng request)

3. Revalidation
- Tìm hiểu cơ chế xác thực lại dữ liệu: 
+ Time-based Revalidation (tự động xác thực lại sau khoảng thời gian)
+ On-demand Revalidation (xác thực lại theo yêu cầu).

4. Server Actions
- Khái niệm, cách định nghĩa
- Vai trò của Server Actions như là một giải pháp mới cho việc xử lý các thay đổi dữ liệu (mutations) trên server.

5. Form Submissions (Mutations)
- Tìm hiểu việc áp dụng Server Actions để xử lý form submissions một cách hiệu quả và an toàn (progressive enhancement)
- Thực hành việc gọi Server Action trực tiếp từ một thẻ <form>

6. Quản lý Trạng thái UI (Pending/Error)
- Học cách kết hợp Server Actions với các hooks của React như useTransition (từ Client Components) để xử lý trạng thái đang tải (pending) và useState để quản lý UI Feedback sau khi hành động hoàn tất.

### Thực hành: my-first-app project