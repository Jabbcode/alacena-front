// Función para capitalizar la primera letra de una cadena
export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const format = (
  date: Date,
  locale: string,
  options?: Record<string, string>
) => new Intl.DateTimeFormat(locale, options).format(date);
