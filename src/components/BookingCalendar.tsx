import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { TimeSlot } from '../types';

interface BookingCalendarProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
}

const generateTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  for (let hour = 8; hour <= 17; hour++) {
    const time24 = `${hour.toString().padStart(2, '0')}:00`;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour > 12 ? hour - 12 : hour;
    const label = `${hour12}:00 ${ampm}`;
    slots.push({ time: time24, available: Math.random() > 0.3, label });
  }
  return slots;
};

export default function BookingCalendar({ selectedDate, selectedTime, onDateChange, onTimeChange }: BookingCalendarProps) {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const timeSlots = useMemo(() => generateTimeSlots(), [selectedDate]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthName = new Date(currentYear, currentMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return date < todayStart;
  };

  const formatDate = (day: number) => {
    return `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Calendar */}
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h4 className="text-white font-semibold text-sm">{monthName}</h4>
          <button onClick={nextMonth} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
            <div key={day} className="text-center text-xs text-gray-500 font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDayOfMonth }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = formatDate(day);
            const disabled = isDateDisabled(day);
            const selected = selectedDate === dateStr;

            return (
              <button
                key={day}
                onClick={() => !disabled && onDateChange(dateStr)}
                disabled={disabled}
                className={`w-full aspect-square rounded-lg text-xs font-medium transition-all duration-200 ${
                  selected
                    ? 'bg-primary-500 text-dark-900 shadow-lg shadow-primary-500/20'
                    : disabled
                    ? 'text-gray-700 cursor-not-allowed'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-primary-500" />
            <h4 className="text-white font-semibold text-sm">Available Times</h4>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.time}
                onClick={() => slot.available && onTimeChange(slot.time)}
                disabled={!slot.available}
                className={`py-2.5 px-3 rounded-lg text-xs font-medium transition-all duration-200 ${
                  selectedTime === slot.time
                    ? 'bg-primary-500 text-dark-900 shadow-lg shadow-primary-500/20'
                    : !slot.available
                    ? 'bg-dark-500/50 text-gray-600 cursor-not-allowed line-through'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                {slot.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}