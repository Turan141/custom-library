// Core
import React, { ChangeEvent } from 'react';

// Styles
import styles from './FileUploader.module.scss';
import withReduxForm from '@helpers/withReduxForm';

export type FileType = FileList | File | null | undefined;

export interface FileUploaderProps {
    multiple?: boolean;
    id?: string;
    onChange?: (files: FileType) => void;
    fileTypes?: string[];
    clearer?: number;
    name?: string;
    defaultValue?: FileType;
}

interface FileUploaderInterface extends React.FC<FileUploaderProps> {
    Redux: typeof fileUploaderRedux;
}

const FileUploader: FileUploaderInterface = ({
    children,
    multiple,
    id: idProp,
    onChange,
    fileTypes,
    clearer,
    name,
    defaultValue,
}) => {
    const $fileInput = React.useRef<HTMLInputElement>(null);

    const [, setFiles] = React.useState<FileType>();

    const id = React.useMemo(() => idProp ?? 'files', []);

    React.useEffect(() => {
        setFiles(null);
        onChange?.(null);
    }, [clearer]);

    React.useEffect(() => {
        defaultValue && onChange?.(defaultValue);
    }, [defaultValue]);

    const handleClick = React.useCallback(() => {
        $fileInput.current?.click();
    }, [$fileInput.current]);

    const handleUpload = React.useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            if (multiple) {
                setFiles(() => {
                    const newValue = event.target.files;

                    for (let i = 0; i < (newValue?.length || 0) - 1; i++) {
                        fileTypes &&
                            fileTypes.every(
                                (type) => type !== newValue?.[i].type,
                            ) &&
                            delete newValue?.[i];
                    }

                    onChange?.(newValue);
                    return (newValue?.length || 0) > 0 ? newValue : null;
                });
            } else {
                setFiles(() => {
                    const newValue = event.target.files?.[0];

                    if (
                        fileTypes &&
                        fileTypes.every((type) => type !== newValue?.type)
                    ) {
                        onChange?.(newValue);
                        return null;
                    }
                    onChange?.(newValue);
                    return newValue;
                });
            }
        },
        [],
    );

    return (
        <>
            <input
                type="file"
                ref={$fileInput}
                className={styles.input}
                multiple={multiple}
                name={name}
                onChange={handleUpload}
                id={id}
            />

            {React.isValidElement(children) &&
                React.cloneElement(children, {
                    ...children.props,
                    onClick: (...args: unknown[]) => {
                        children.props.onClick?.(args);
                        handleClick();
                    },
                })}
        </>
    );
};

const fileUploaderRedux = withReduxForm(FileUploader);
FileUploader.Redux = fileUploaderRedux;

// Exports
export default FileUploader;
