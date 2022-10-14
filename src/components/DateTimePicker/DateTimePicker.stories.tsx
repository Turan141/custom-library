import { Meta, Story } from '@storybook/react';
import * as React from 'react';
import DateTimePicker from './DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDayjs';
import ruLocal from 'dayjs/locale/ru';
export default {
    title: 'DateTimePicker',
    component: DateTimePicker,
    parameters: {
        docs: {
            description: {
                component: 'Компонент для выбора даты и времени',
            },
        },
    },
} as Meta;

const Template: Story<any> = () => {
    const weekendDisabled = true;
    const disableTimeMax = '17:59';
    const disableTimeMin = '08:00';
    const disableDateMin = '2021-11-20T00:00:00+00:00';
    const [value, setValue] = React.useState(
        '2021-11-13T10:15:00+00:00' || undefined,
    );
    const handleChange = (value: string) => {
        console.log(value);
        setValue(value);
    };
    return (
        <LocalizationProvider dateAdapter={DateAdapter} locale={ruLocal}>
            <DateTimePicker
                weekendDisabled={weekendDisabled}
                hasTime={true}
                error={'Введены неверные данные'}
                onChange={handleChange}
                toDisableTimeMax={disableTimeMax}
                toDisableTimeMin={disableTimeMin}
                toDisableDateMin={disableDateMin}
                value={value}
            />
        </LocalizationProvider>
    );
};

export const Base = Template.bind({});
Base.args = { label: 'DateTimePicker' };
