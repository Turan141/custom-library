import * as React from 'react';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import { TextField } from '@mui/material';
import PickersDay from '@mui/lab/PickersDay';
import styles from './DateTimePicker.module.scss';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
dayjs.extend(utc);

export interface DateTimePickerProps {
    hasTime?: boolean;
    label?: string;
    weekendDisabled?: boolean;
    error?: string;
    onChange: (value: string) => void;
    value?: string;
    toDisableDateMin?: string;
    toDisableTimeMin?: string;
    toDisableTimeMax?: string;
}
const isWeekend = (day: number) => day === 6 || day === 0;
const DateTimePicker: React.FC<DateTimePickerProps> = ({
    hasTime = false,
    label = 'Введите дату',
    weekendDisabled = false,
    error,
    onChange,
    value,
    toDisableDateMin,
    toDisableTimeMin,
    toDisableTimeMax,
}) => {
    const MASK = hasTime?'__.__.____ __:__': '__.__.____';
    const hoursToMilliseconds = (x: number) => (x / 60) * 3600 * 1000
    const withoutTimezoneOffset = (value: dayjs.Dayjs) => value.valueOf() - hoursToMilliseconds(value.utcOffset())
    const changeFormatDateIn = (date: string | undefined) => {
        const value = dayjs(date);
        return dayjs(date ? withoutTimezoneOffset(value) : null)
    };
    const disableDays = (data:number) => weekendDisabled && isWeekend(data);
    const change = (value: any) => {
        if (!value) return '';
        const isDate = dayjs(
            value.valueOf() + hoursToMilliseconds(value.utcOffset()));
        return onChange(isDate.utc().format().toString());
    };
    return (
        <div>
            {hasTime ?
                <DesktopDateTimePicker
                    shouldDisableDate={(data) => disableDays(data.day())}
                    minDate={changeFormatDateIn(toDisableDateMin)}
                    minTime={dayjs(`0000-00-00T${toDisableTimeMin}`)}
                    maxTime={dayjs(`0000-00-00T${toDisableTimeMax}`)}
                    mask={MASK}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            inputProps={{
                                ...props.inputProps,
                                placeholder: MASK,
                            }}
                        />
                    )}
                    label={label}
                    value={value ? changeFormatDateIn(value) : null}
                    renderDay={(day: dayjs.Dayjs, _, DayComponentProps) => {
                        return (
                            <PickersDay
                                {...DayComponentProps}
                                className={
                                    isWeekend(day.day()) &&
                                    styles.weekend
                                }
                            />
                        );
                    }}
                    onChange={(value) => {
                        change(value);
                    }}
                />
            :
                <DesktopDatePicker
                    shouldDisableDate={(data) => disableDays(data.day())}
                    minDate={changeFormatDateIn(toDisableDateMin)}
                    mask={MASK}
                    renderInput={(props) => (
                        <TextField
                            {...props}
                            inputProps={{
                                ...props.inputProps,
                                placeholder: MASK,
                            }}
                        />
                    )}
                    label={label}
                    value={value ? changeFormatDateIn(value) : null}
                    renderDay={(day: dayjs.Dayjs, _, DayComponentProps) => {
                        return (
                            <PickersDay
                                {...DayComponentProps}
                                className={
                                    isWeekend(day.day()) &&
                                    styles.weekend
                                }
                            />
                        );
                    }}
                    onChange={(value) => {
                        value && change(value.hour(0));
                    }}
                />
            }
            {error && (
                <div>
                    <p className={styles.error}>{error}</p>
                </div>
            )}
        </div>
    );
};

export default DateTimePicker;
