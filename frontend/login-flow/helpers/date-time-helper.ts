export function getCurrentDateFormatted(): string {
    const today = new Date();
    const formatted = new Intl.DateTimeFormat('en-US', { month: 'short', day: '2-digit', year: 'numeric' }).format(today);
    return formatted;
}