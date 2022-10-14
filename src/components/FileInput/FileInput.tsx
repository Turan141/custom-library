// Core
import React from 'react';

// Components
import Input from '@components/Input';
import FileUploader, { FileType } from '@components/FileUploader';

import styles from './FileInput.module.scss';
// Helpers
import withReduxForm from '@helpers/withReduxForm';

interface FileInputProps {
    label?: string;
    id?: string;
    name?: string;
    onChange?: (file: File) => void;
    defaultValue?: File;
    placeholder?: string;
    error?: boolean | string | null;
}

interface FileInputInterface extends React.FC<FileInputProps> {
    Redux: typeof fileInputWithRedux;
}

const FileInput: FileInputInterface = ({
    label,
    id,
    name,
    onChange,
    defaultValue,
    placeholder,
    error,
}) => {
    const [file, setFile] = React.useState<FileType>(defaultValue);
    const [, clear] = React.useReducer((c) => c + 1, 0);

    const clearHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault();
        e.stopPropagation();
        onChange?.(undefined as unknown as File);
        clear();
    };

    const postfix = React.useMemo(
        () => (
            <span onClick={clearHandler} className={styles.postfix}>
                <i className="icon-closed" />
            </span>
        ),
        [],
    );

    React.useEffect(() => {
        setFile(defaultValue);
    }, [defaultValue]);

    const handleChange = React.useCallback((file: FileType) => {
        setFile(file);
        onChange?.(file as File);
    }, []);

    const displayValue = React.useMemo(() => {
        return (file as File)?.name || '';
    }, [file]);

    return (
        <FileUploader
            id={id}
            onChange={handleChange}
            name={name}
            defaultValue={defaultValue}
        >
            <Input
                prefix={<i className="icon-attachment" />}
                suffix={file && postfix}
                label={label}
                value={displayValue}
                placeholder={placeholder}
                error={error}
            />
        </FileUploader>
    );
};

const fileInputWithRedux = withReduxForm(FileInput);
FileInput.Redux = fileInputWithRedux;

// Exports
export default FileInput;
