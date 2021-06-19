import classNames from 'classnames';
import React from 'react';
import styles from './LinkModal.module.scss';
import useLinkModal from './useLinkModal';

const LinkModal = () => {
    const {
        onInput,
        close,
        modalStyles,
        inputs,
        focusedInput,
        setFocusedInput,
        onSubmit,
        withBack,
    } = useLinkModal();

    return (
        <div onClick={close} className={styles.substrate} id="modalSubstrate">
            <div className={styles.modal} style={modalStyles}>
                <div className={styles.header}>
                    {withBack ? (
                        <button
                            className={styles.button}
                        >
                            <i className="ri-arrow-left-line" />
                        </button>
                    ) : null}
                    <button className={styles.button}>
                        <i className={'ri-search-line'} />
                        <i className="ri-arrow-down-s-fill" />
                    </button>
                </div>
                <div className={styles.body}>
                    {inputs.map(({name, value, label}) => (
                        <div
                            key={name}
                            className={classNames(styles.formGroup, {
                                [styles.formGroupActive]: focusedInput === name,
                            })}
                        >
                            <label className={classNames(styles.label, {
                                [styles.labelActive]: value || focusedInput === name,
                            })}>
                                {label}
                            </label>
                            <input
                                name={name}
                                value={value}
                                onInput={onInput}
                                className={styles.input}
                                onFocus={() => setFocusedInput(name)}
                                onBlur={() => setFocusedInput(null)}
                                placeholder={focusedInput !== name ? label : null}
                            />
                        </div>
                    ))}
                    <div className={styles.actions}>
                        <button
                            className={classNames(styles.button, styles.buttonSubmit)}
                            onClick={onSubmit}
                        >
                            Insert
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkModal;
