/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { ChangeEventHandler, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldValues,
} from 'react-hook-form';
import { DayPicker } from 'react-day-picker';
import toast from 'react-hot-toast';

import { useAppDispatch } from '@redux/hook';
import { addMeeting } from '@redux/schedule/actions';
import { setCloseCreatedFormModal } from '@redux/schedule/reducer';

import useCreateFormModal from '@hooks/useCreateFormModal';

import Modal from '@components/Modal';
import Input from '@components/Input';

import styles from './createFormModal.module.scss';

interface IValues {
  task: string;
  date: Date;
  time: string;
}

const CreateFormModal = () => {
  const [selected, setSelected] = useState<Date | undefined>();
  const [timeValue, setTimeValue] = useState<string>('00:00');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const createFormModal = useCreateFormModal();
  const actionLabel = 'Add';
  const title = 'Create new task';

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FieldValues> = (values) => {
    setIsLoading(true);
    const { date, task, time } = values as IValues;
    const fullDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${time}`;

    dispatch(addMeeting({ date: fullDate, task }));

    setTimeout(() => {
      setIsLoading(false);
      dispatch(setCloseCreatedFormModal());
      toast.success('Successfully created!');
      reset();
    }, 1500);
  };

  const handleTimeChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const time = e.target.value;
    if (!selected) {
      setTimeValue(time);
      return;
    }
    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10));
    const newSelectedDate = new Date(
      selected.getFullYear(),
      selected.getMonth(),
      selected.getDate(),
      hours,
      minutes
    );
    setSelected(newSelectedDate);
    setTimeValue(time);
  };

  const handleDaySelect = (date: Date | undefined) => {
    if (!timeValue || !date) {
      setSelected(date);
      return;
    }
    const [hours, minutes] = timeValue
      .split(':')
      .map((str) => parseInt(str, 10));

    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes
    );
    setSelected(newDate);
  };

  const bodyContent = (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          id="task"
          placeholder="Enter a task name..."
          disabled={isLoading}
          register={register}
          errors={errors}
          maxLengthValue={25}
          required
        />
        {errors.task && (
          <span className={styles.errorText}>Task name is required</span>
        )}
        {errors.task && errors.task.type === 'maxLength' && (
          <p className={styles.errorText}>Max length exceeded</p>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          name="date"
          render={({ field: { onChange } }) => (
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={handleDaySelect}
              onDayClick={onChange}
              disabled={isLoading}
              required
              disableNavigation={isLoading}
              modifiersClassNames={{
                selected: styles.selected,
                today: styles.today,
              }}
            />
          )}
        />
        {errors.date && (
          <span className={styles.errorText}>Pick date is required</span>
        )}
        <p className={styles.text}>
          Pick a time:{' '}
          <input
            type="time"
            {...register('time')}
            value={timeValue}
            onChange={handleTimeChange}
            disabled={isLoading}
          />
        </p>
        <p className={styles.text}>
          Selected date: {selected ? selected.toLocaleString() : 'none'}
        </p>
      </form>
    </div>
  );

  return (
    <Modal
      isOpen={createFormModal.isOpenCreatedFormModal}
      onClose={createFormModal.onClose}
      actionLabel={actionLabel}
      disabled={isLoading}
      onSubmit={handleSubmit(onSubmit)}
      title={title}
      body={bodyContent}
    />
  );
};

export default CreateFormModal;
