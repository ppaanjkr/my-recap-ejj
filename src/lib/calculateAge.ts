export function calculateAge(dateString?: string) {
  if (!dateString) return "";

  const birthDate = new Date(dateString);
  if (isNaN(birthDate.getTime())) return "";

  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  // ถ้ายังไม่ถึงวันเกิดปีนี้ → ลบอายุออก 1
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}
