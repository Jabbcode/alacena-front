export const format = (
  date: Date,
  locale: string,
  options?: Record<string, string>
) => new Intl.DateTimeFormat(locale, options).format(date);
