import {createForme} from '@statirjs/core';

const linkModalForm = createForme({
    isOpen: false,
    link: '',
    text: '',
    target: null,
    cb: () => {
    },
}, () => ({
    actions: {
        toggle(state, {
            isOpen = false, link = '', text = '', target = null, cb = () => {
            },
        } = {}) {
            return {
                isOpen,
                link,
                text,
                target,
                cb,
            };
        },
    },
}));

export default linkModalForm;
