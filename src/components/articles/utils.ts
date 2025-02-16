const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

export const formatDate = (datetime: string) => {
    if (!datetime) {
        throw new Error('Invalid date format');
    }

    const [year, month, day] = datetime.split('T')[0].split('-').map(Number);

    if (isNaN(year) || isNaN(month) || isNaN(day) || month < 1 || month > 12 || day < 1 || day > 31) {
        throw new Error('Invalid date format');
    }

    return `${months[month - 1]} ${day}, ${year}`;
};
