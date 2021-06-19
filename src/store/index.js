import {initStore} from '@statirjs/core';
import linkModalForm from './formes/linkModalForm';
import linkContextMenu from './formes/linkContextMenu';

const store = initStore({
    formes: {
        linkModalForm,
        linkContextMenu,
    },
});

export default store;
