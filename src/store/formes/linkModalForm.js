import {createForme} from '@statirjs/core';

const linkModalForm = createForme({
    isOpen: false,
    link: '',
    text: '',
    target: null,
    withBack: false,
    cb: () => {
    },
}, () => ({
    actions: {
        toggle(state, {
            isOpen = false,
            link = '',
            text = '',
            target = null,
            withBack = false,
            cb = () => {
            },
        } = {}) {
            return {
                isOpen,
                link,
                text,
                target,
                withBack,
                cb,
            };
        },
    },
}));

export default linkModalForm;
