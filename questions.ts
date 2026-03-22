export interface Answer {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  explanation: string;
}

const a = (text: string, isCorrect: boolean) => ({ id: Math.random().toString(), text, isCorrect });

// Level 1: Phá băng tư duy (The Mindset)
export const level1Questions: Question[] = [
  {
    id: 6, // Moved to first because "Yêu cầu: Phải chọn phong cách "Tư vấn tự nhiên" thay vì "Quảng cáo chuyên nghiệp" để nhận điểm cộng đầu tiên."
    text: "Chọn phong cách giao tiếp hiệu quả để thiết lập Profile:",
    answers: [
      a("Quảng cáo chuyên nghiệp", false),
      a("Tư vấn tự nhiên, gần gũi", true),
      a("Dùng thuật ngữ khó", false),
      a("Không nói", false),
    ],
    explanation: "Khách hàng trên TikTok thích sự chân thật. Tư vấn tự nhiên, gần gũi sẽ ăn điểm hơn quảng cáo chuyên nghiệp cứng nhắc.",
  },
  {
    id: 1,
    text: "Sự khác biệt cốt lõi của Social Selling là gì?",
    answers: [
      a("Tập trung quảng cáo trả phí", false),
      a("Chào bán trực tiếp", false),
      a("Xây dựng giá trị & niềm tin trước khi bán", true),
      a("Loại bỏ tư vấn", false),
    ],
    explanation: "Social Selling là xây dựng niềm tin trước khi bán (Value First), không phải chạy ads hay chào bán trực tiếp.",
  },
  {
    id: 7,
    text: "Thuật toán TikTok ưu tiên:",
    answers: [
      a("Follower", false),
      a("Completion rate & tương tác", true),
      a("Video cũ", false),
      a("Ads", false),
    ],
    explanation: "Thuật toán TikTok phân phối video dựa trên Trải nghiệm người dùng (Completion rate) và các tương tác (Like, Share, Comment).",
  },
  {
    id: 9,
    text: "Vai trò của phụ đề là gì?",
    answers: [
      a("Bắt buộc pháp lý", false),
      a("Tăng chất lượng 4K", false),
      a("Che lỗi", false),
      a("Tăng khả năng hiểu & xem không cần âm thanh", true),
    ],
    explanation: "Hơn 70% người dùng xem video ở chế độ tắt âm thanh ban đầu. Phụ đề giúp truyền tải thông điệp trọn vẹn.",
  },
  {
    id: 10,
    text: "Cách tăng click bio link:",
    answers: [
      a("Spam link", false),
      a("Không nhắc", false),
      a("CTA rõ ràng + kích thích tò mò", true),
      a("Bắt tự tìm", false),
    ],
    explanation: "Khách hàng cần lý do để thoát video vào Bio. Kêu gọi hành động (CTA) rõ ràng + Quà tặng/Sự tò mò là chìa khóa.",
  }
];

// Content for Level 2 and Level 3 will be handled inside their specialized components or added here later.
