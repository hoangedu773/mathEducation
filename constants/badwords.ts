const BADWORDS = [
  "địt", "đụ", "cặc", "lồn", "buồi", "dái", "đéo",
  "chó", "óc chó", "ngu", "đần", "khốn", "khốn nạn",
  "cút", "biến", "xéo", "đi chết đi",
  "mẹ mày", "bố mày", "ông nội mày", "bà nội mày",
  "thằng chó", "con chó", "đồ chó",
  "clgt", "vcl", "vl", "đcm", "đmm", "đkm", "vãi",
  "cave", "đĩ", "phò",
  "tiên sư", "tổ sư", "cha mày", "tổ cha mày",
  "súc vật", "đồ bỏ", "phế vật", "rác rưởi",
  "đập chết", "giết", "chém",
  "lừa đảo", "lừa gạt",
  "chửi", "xúc phạm",
  "loz", "lol", "cc", "dm", "vl",
];

export function normalize(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

export function validateName(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length < 2) return "Tên phải có ít nhất 2 ký tự";
  if (trimmed.length > 30) return "Tên không được quá 30 ký tự";
  if (!/^[\p{L}\p{N}\s]+$/u.test(trimmed)) return "Tên không được chứa ký tự đặc biệt";

  const norm = normalize(trimmed);
  for (const bad of BADWORDS) {
    if (norm.includes(bad)) return "Tên chứa từ ngữ không phù hợp, vui lòng chọn tên khác";
  }

  return null;
}
