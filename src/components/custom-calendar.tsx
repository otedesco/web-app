"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { ScrollArea } from "~/components/ui/scroll-area";

const CustomCalendar = () => {
  const [date, setDate] = React.useState<Date>(new Date());

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 101 }, (_, i) => currentYear - 100 + i);

  // Generate an array of month names
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleYearChange = (year: string) => {
    const newDate = new Date(date);
    newDate.setFullYear(parseInt(year));
    setDate(newDate);
  };

  const handleMonthChange = (month: string) => {
    const newDate = new Date(date);
    newDate.setMonth(months.indexOf(month));
    setDate(newDate);
  };

  const handlePrevMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() - 1);
    setDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth() + 1);
    setDate(newDate);
  };

  return (
    <div className="mx-auto my-4 max-w-72 space-y-4">
      <div className="flex items-center justify-between">
        <Select
          onValueChange={handleYearChange}
          value={date.getFullYear().toString()}
        >
          <SelectTrigger className="w-16 p-1">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent className="bg-background">
            <ScrollArea className="h-[200px]">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </ScrollArea>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <Button
            className="px-1"
            variant="outline"
            size="sm"
            onClick={handlePrevMonth}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Select
            onValueChange={handleMonthChange}
            value={months[date.getMonth()]}
          >
            <SelectTrigger className="w-28 px-1">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="px-1"
            variant="outline"
            size="sm"
            onClick={handleNextMonth}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Calendar
        mode="single"
        showOutsideDays={false}
        classNames={{
          caption: "hidden",
          caption_label: "hidden",

          //   caption_end: "hidden",
          //   caption_start: "hidden",
          nav: "hidden",
        }}
        hideHead
        selected={date}
        onSelect={(newDate) => newDate && setDate(newDate)}
        month={date}
        onMonthChange={setDate}
        className="!mt-0 border-none p-0"
      />
    </div>
  );
};

export default CustomCalendar;
