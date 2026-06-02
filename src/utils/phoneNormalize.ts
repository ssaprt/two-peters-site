export function normalizePhone(input: string): string | null {
  if (!input) return null;

  // Убираем всё, кроме цифр
  let digits = input.replace(/\D/g, "");

  // Если номер начинается с 9 и длина 10 → это мобильный РФ
  if (digits.length === 10 && digits.startsWith("9")) {
    digits = "7" + digits;
  }

  // Если 11 цифр
  if (digits.length === 11) {
    // 8XXXXXXXXXX → 7XXXXXXXXXX
    if (digits.startsWith("8")) {
      digits = "7" + digits.slice(1);
    }
    // 7XXXXXXXXXX → ок
    else if (digits.startsWith("7")) {
      // ничего не делаем
    } else {
      return null;
    }
  }

  // Если после всех преобразований не 11 цифр — невалидно
  if (digits.length !== 11 || !digits.startsWith("7")) {
    return null;
  }

  return `+${digits}`;
}
