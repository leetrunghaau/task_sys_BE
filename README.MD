Đặc tả Chức năng Hệ thống Quản lý Công việc Nhóm

1.	Tổng quan hệ thống
Hệ thống Quản lý Công việc Nhóm là một ứng dụng web cho phép người dùng quản lý các công việc trong một dự án nhóm. Hệ thống cung cấp các tính năng như tạo, chỉnh sửa, xóa và phân công công việc, đồng thời hỗ trợ bình luận và gửi thông báo qua email khi có cập nhật. Ứng dụng sẽ bao gồm các thành phần chính sau: giao diện người dùng (UI), API RESTful, và cơ sở dữ liệu.
2.	Công nghệ sử dụng
- Front-end: React.js
- Back-end: Node.js, Express.js
- Cơ sở dữ liệu: MySQL
3.	Chức năng chính
3.1.	Quản lý Người dùng
- Đăng ký: Cho phép người dùng mới tạo tài khoản bằng địa chỉ email và mật khẩu.
- Đăng nhập: Xác thực người dùng qua email và mật khẩu.
- Quản lý Hồ sơ: Cung cấp chức năng cập nhật thông tin cá nhân và thay đổi mật khẩu.
- Quản lý quyền: Phân quyền người dùng (quản trị viên, thành viên nhóm).
3.2.	Quản lý Dự án
- Tạo Dự án: Cho phép người dùng tạo một dự án mới, bao gồm tên dự án, mô tả, ngày bắt đầu, ngày kết thúc.
- Chỉnh sửa Dự án: Cung cấp chức năng chỉnh sửa thông tin của dự án.
- Xóa Dự án: Cho phép xóa dự án, với xác nhận trước khi thực hiện.
3.3.	Quản lý Công việc
- Tạo Công việc: Người dùng có thể tạo công việc mới với thông tin bao gồm tên công việc, mô tả, ngày bắt đầu, ngày kết thúc, và mức độ ưu tiên.
- Chỉnh sửa Công việc: Cung cấp chức năng chỉnh sửa các thông tin công việc đã tồn tại.
- Xóa Công việc: Cho phép xóa công việc, với xác nhận trước khi thực hiện.
- Phân công Công việc: Cho phép phân công công việc cho các thành viên trong nhóm.
- Ghi chú Công việc: Cung cấp chức năng thêm ghi chú hoặc tài liệu đính kèm cho công việc.
3.4.	Quản lý Bình luận
- Thêm Bình luận: Người dùng có thể thêm bình luận cho các công việc hoặc dự án.
- Chỉnh sửa Bình luận: Cho phép chỉnh sửa bình luận đã tạo.
- Xóa Bình luận: Cho phép xóa bình luận, với xác nhận trước khi thực hiện.
3.5.	Thông báo
- Thông báo Email: Gửi email thông báo khi có cập nhật quan trọng như thay đổi trạng thái công việc, bình luận mới, hoặc phân công công việc mới.
- Thông báo Trong Ứng Dụng: Hiển thị thông báo trong ứng dụng về các cập nhật, bình luận, hoặc thay đổi trạng thái công việc.
3.6.	Tìm kiếm và Lọc
- Tìm kiếm Công việc: Cung cấp chức năng tìm kiếm công việc theo từ khóa.
- Lọc Công việc: Cho phép lọc công việc theo các tiêu chí như trạng thái, ngày hết hạn, mức độ ưu tiên.
4.	Giao diện người dùng
- Trang Chủ: Hiển thị danh sách dự án và công việc liên quan.
- Trang Dự án: Hiển thị chi tiết thông tin dự án và danh sách công việc thuộc dự án.
- Trang Công việc: Hiển thị chi tiết công việc, bao gồm thông tin công việc, bình luận, và tài liệu đính kèm.
- Trang Hồ sơ: Cho phép người dùng quản lý thông tin cá nhân và thay đổi mật khẩu.
5.	Bảo mật
- Xác thực: Sử dụng JWT (JSON Web Tokens) cho xác thực người dùng.
- Mã hóa Mật khẩu: Mật khẩu người dùng sẽ được mã hóa bằng bcrypt.
- Phân quyền: Cung cấp phân quyền để đảm bảo chỉ người dùng có quyền mới có thể thực hiện các hành động nhất định.


