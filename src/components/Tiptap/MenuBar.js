import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import './Tiptap.scss';
import useMenuBar from './hooks/useMenuBar';
import buttonStyles from './Button.module.scss';

const Button = ({
    editor,
    id,
    title,
    action,
    icon,
}) => {
    return (
        <button
            onClick={action}
            className={classNames(buttonStyles.button, {
                [buttonStyles.isActive]: editor.isActive(id),
            })}
        >
            {icon ? <i className={icon} title={title}/> : title }
        </button>
    )
};

Button.propTypes = {
    editor: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    icon: PropTypes.string,
};

Button.defaultProps = {
    icon: null,
};

const MenuBar = ({editor}) => {
    const {buttons} = useMenuBar(editor);

    if (!editor) {
        return null;
    }

    return (
        <>
            {buttons.map(button => <Button key={button.key} editor={editor} {...button} />)}
        </>
    );
};

MenuBar.propTyoes = {
    editor: PropTypes.object.isRequired,
};

export default MenuBar;
