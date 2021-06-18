import {createForme} from '@statirjs/core';

const linkModalForm = createForme({
    isOpen: false,
    link: '',
    text: '',
}, () => ({
    actions: {
        toggle(state, {isOpen = false, link = '', text = ''}) {
            return {
                isOpen,
                link,
                text,
            };
        },
    },
}));

export default linkModalForm;
