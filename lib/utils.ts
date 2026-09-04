import { clsx, type ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatCurrency(amount: number, currency: string): string {
  return `${currency} ${amount.toFixed(2)}`;
}

export function calculateDuration(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays + 1; // inclusive of both start and end days
}

export function generateId(prefix: string = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substr(2, 9)}`;
}

export function generateDateRange(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const dates: string[] = [];
  const current = new Date(start);
  while (current <= end) {
    dates.push(current.toISOString().split('T')[0]);
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

export function calculateBudgetBreakdown(days: any[], totalBudget: number, accommodationType: string): any {
  const totalActivityCost = days.reduce((sum, day) => sum + (day.totalCost || 0), 0);
  const accommodationCost = totalBudget * 0.3;
  return {
    total: totalBudget,
    activities: totalActivityCost,
    accommodation: accommodationCost,
    food: totalBudget * 0.2,
    transportation: totalBudget * 0.1,
    remaining: totalBudget - totalActivityCost - accommodationCost,
  };
}

export function getWeatherIcon(code: number): string {
  const icons: Record<number, string> = {
    0: '☀️',
    1: '🌤️',
    2: '⛅',
    3: '☁️',
    45: '🌫️',
    48: '🌫️',
    51: '🌦️',
    53: '🌦️',
    55: '🌧️',
    61: '🌧️',
    63: '🌧️',
    65: '🌧️',
    71: '🌨️',
    73: '🌨️',
    75: '❄️',
    80: '🌦️',
    81: '🌧️',
    82: '🌧️',
    95: '⛈️',
    96: '⛈️',
    99: '⛈️',
  };
  return icons[code] || '🌈';
}