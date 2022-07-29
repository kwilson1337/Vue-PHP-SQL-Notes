
import ChatForm from './components/chat-form.js';
import ChatList from './components/chat-list.js';
import Toast from './components/toast.js';
const { createApp } = Vue;

createApp({
    components: {
        'chat-form': ChatForm,
        'chat-list': ChatList,
        'toast': Toast
    },        
}).mount('#app')