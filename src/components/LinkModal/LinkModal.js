import {useDispatch} from '@statirjs/react';
import React from 'react';
import styles from './LinkModal.module.scss';

const LinkModal = () => {
    const dispatchLinkModal = useDispatch(dispatch => dispatch.linkModalForm.toggle);
    console.log(styles);
    return (
        <div onClick={dispatchLinkModal}>
            link modal
        </div>
    );
};

export default LinkModal;
