// Core
import * as React from 'react';
import classNames from 'classnames';

// Utils
import withReduxForm from '@helpers/withReduxForm';

// Styles
import styles from './SearchField.module.scss';
import Icon from "@components/Icons";

export interface SearchFieldInterface
  extends React.FC<React.InputHTMLAttributes<HTMLInputElement>> {
  Redux: typeof SearchFieldRedux;
}

const SearchField: SearchFieldInterface = ({
  className,
  id,
  value,
  placeholder,
  name,
  type = "text",
  disabled,
  onChange,
  onFocus,
  onBlur,
  onMouseEnter,
  onMouseLeave,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus && onFocus(event);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur && onBlur(event);
  };

  const handleMouseEnter = (event: React.MouseEvent<HTMLInputElement>) => {
    setHovered(true);
    onMouseEnter && onMouseEnter(event);
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLInputElement>) => {
    setHovered(false);
    onMouseLeave && onMouseLeave(event);
  };

  return (
    <div
      className={classNames(
        styles.root,
        {
          [styles.focused]: focused,
          [styles.hovered]: hovered,
          [styles.disabled]: disabled,
        },
        className,
      )}
    >
      <label className={styles.control} htmlFor={id}>
        <Icon name='search'/>

        <input
          {...props}
          className={styles.input}
          id={id}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </label>
    </div>
  );
};

const SearchFieldRedux = withReduxForm(SearchField);

SearchField.Redux = SearchFieldRedux;

// Exports
export default  SearchField;
