import { format, isToday, isYesterday } from 'date-fns';

export const formatMessageTime = (dateString: string): string => {
    const date = new Date(dateString);

    if (isToday(date)) {
        return format(date, 'h:mm a');
    } else if (isYesterday(date)) {
        return 'Yesterday';
    } else {
        return format(date, 'MM/dd/yyyy');
    }
};

export const formatDuration = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};