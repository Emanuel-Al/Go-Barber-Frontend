import React from 'react';
import styles from './barberInput.module.scss';

interface BarberInputProps {
  type: string;
  label: string;
  size?: 'small' | 'medium' | 'large';
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  error?: string | false;
  disabled?: any;
}

const BarberInput: React.FC<BarberInputProps> = ({
  type,
  label,
  size = 'medium',
  name,
  value,
  onChange,
  onBlur,
  error,
  disabled
}) => {
  const inputClassName = `${styles[type]} ${styles[size]} ${error ? styles.error : ''}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'number' ? Number(value) : value;
    onChange({ target: { name, value: newValue } } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={inputClassName}
        type={type}
        name={name}
        value={type === 'number' ? value : value.toString()}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default BarberInput;
