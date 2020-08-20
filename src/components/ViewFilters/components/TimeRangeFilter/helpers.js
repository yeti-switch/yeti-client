export const getLocalePartOfSettings = (localeObject, language) => ({
  firstDay: 1,
  format: 'DD-MM-YYYY HH:mm:ss',
  applyLabel: localeObject.messages[language].message.applyLabel,
  cancelLabel: localeObject.messages[language].message.cancelLabel,
  daysOfWeek: localeObject.messages[language].message.daysOfWeek,
  monthNames: localeObject.messages[language].message.monthNames,
});

export const getLocaleRanges = (localeObject, language) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);
  const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const thisMonthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

  return {
    [localeObject.messages[language].message.today]: [today, today],
    [localeObject.messages[language].message.yesterday]: [yesterday, yesterday],
    [localeObject.messages[language].message.thisMonth]: [thisMonthStart, thisMonthEnd],
    [localeObject.messages[language].message.thisYear]:
      [new Date(today.getFullYear(), 0, 1), new Date(today.getFullYear(), 11, 31)],
    [localeObject.messages[language].message.lastMonth]:
      [
        new Date(today.getFullYear(), today.getMonth() - 1, 1),
        new Date(today.getFullYear(), today.getMonth(), 0),
      ],
  };
};
