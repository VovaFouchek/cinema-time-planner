/* eslint-disable react/jsx-props-no-spreading */
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

import styles from './input.module.scss';

interface InputProps {
  id: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  placeholder,
  type = 'text',
  disabled,
  register,
  required,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        placeholder={placeholder}
        type={type}
        className={`${styles.field} ${errors.task && styles.error}`}
      />
    </div>
  );
};

export default Input;
