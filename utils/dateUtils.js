import { formatDistanceToNow, parseISO } from 'date-fns';

/**
 * Format a date to a relative time string (e.g., "5 minutes ago")
 * @param {String|Date} date - Date to format
 * @returns {String} - Formatted relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  try {
    return formatDistanceToNow(parsedDate, { addSuffix: true });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format a date to a simple date string (e.g., "Nov 15, 2023")
 * @param {String|Date} date - Date to format
 * @returns {String} - Formatted date string
 */
export const formatSimpleDate = (date) => {
  if (!date) return '';
  
  const parsedDate = typeof date === 'string' ? parseISO(date) : date;
  
  try {
    return parsedDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};