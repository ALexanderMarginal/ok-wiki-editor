import { initStore } from "@statirjs/core";
import linkModalForm from './formes/linkModalForm';

const store = initStore({
    formes: {
        linkModalForm,
    }
})

export default store;
