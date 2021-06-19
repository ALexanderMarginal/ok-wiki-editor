import styles from './LinkContextMenu.module.scss';
import useLinkContextMenu from './useLinkContextMenu';
import PropTypes from 'prop-types';

const LinkContextMenu = ({editor, editorRef}) => {
    const {buttons, modalStyles} = useLinkContextMenu(editor, editorRef);

    return (
        <div
            className={styles.menu} id="linkContextMenu"
            style={modalStyles}
        >
            {buttons.map(({title, icon, action}) => (
                <button
                    key={title}
                    onClick={action}
                    className={styles.button}
                >
                    <span className={icon} />
                    <div className={styles.label}>{title}</div>
                </button>
            ))}
        </div>
    );
};

LinkContextMenu.propTypes = {
    editor: PropTypes.object.isRequired,
    editorRef: PropTypes.object.isRequired,
};


export default LinkContextMenu;
