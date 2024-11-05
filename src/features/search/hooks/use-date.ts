import { format, parse } from "date-fns";
import { useQueryState } from "nuqs";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const serializeDate = (date: Date | null) => date ? format(date, "yyyy-MM-dd") : "";
const deserializeDate = (date: string | null) => date ? parse(date, "yyyy-MM-dd", new Date()) : null;

export const useDate = () => {
  const [to, setTo] = useQueryState("to", {
    parse: deserializeDate,
    serialize: serializeDate,
    defaultValue: null,
  });
  const [from, setFrom] = useQueryState("from", {
    parse: deserializeDate,
    serialize: serializeDate,
    defaultValue: null,
  });
  const [type, setType] = useQueryState("type", { defaultValue: "create" });

  const [date, setDate] = useState<DateRange | undefined>(
    from && to ? { from, to } : undefined
  );

  const onClear = () => {
    setDate(undefined);
    setFrom(null);
    setTo(null);
  };

  const onPreset = (range: { from: Date; to: Date | undefined  }) => {
    setDate(range);
    setFrom(range.from);
    setTo(range.to || null);
  };

  const onDate = (newDate: DateRange | undefined) => {
    setDate(newDate);

    if (newDate) {
      setFrom(newDate.from || null);
      setTo(newDate.to || null);
    } else {
      setFrom(null);
      setTo(null);
    }

    if (!newDate) {
      setDate(undefined);
    }
  };

  const onReset = () => setType(null);
  const onEdit = () => setType("edit");
  const onCreate = () => setType("create");

  const isDate = from !== null;

  return {
    date,
    type,
    isDate,
    onClear,
    onPreset,
    onDate,
    onEdit,
    onCreate,
    onReset
  }
}