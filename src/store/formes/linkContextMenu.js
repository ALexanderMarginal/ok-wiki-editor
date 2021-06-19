import {createForme} from '@statirjs/core';

const linkContextMenu = createForme({
    isShow: false,
    target: null,
}, () => ({
    actions: {
        toggle(state, {
            isShow = false,
            target = null,
        } = {}) {
            return {
                isShow,
                target,
            };
        },
    },
}));

export default linkContextMenu
