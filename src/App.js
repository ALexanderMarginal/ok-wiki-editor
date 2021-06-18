import './App.css';
import {Provider, useSelect} from '@statirjs/react';
import Tiptap from './components/Tiptap';
import store from './store';

function App() {
    const {isOpen, link, text} = useSelect(root => root.linkModalForm);
    console.log(isOpen, link, text);
    return (
        <Provider store={store}>
            <div className="App">
                <Tiptap />
            </div>
        </Provider>
    );
}

export default App;
