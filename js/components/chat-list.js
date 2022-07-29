const { onMounted } = Vue;
import storeData from '../store/noteStore.js'
import chatListItem from './chat-list-item.js';

export default {    
    components: {
        'chat-list-item': chatListItem
    }, 
    template: `          
        <ul 
            class="the-list"
            v-if="storeData.state.noteList.length"            
        >                        
            <chat-list-item 
                v-for="(single, i) in storeData.state.noteList"
                :key="single.note_id"
                :note-content="single"
                :list-index="i"
            >
            </chat-list-item>
        </ul>       
        <h1 
            v-else
            class="text-center mb-4"
        >
            No Notes
        </h1>
    `,
    setup() {

        onMounted(() => {         
            storeData.methods.getLists()
        })       

        return {
            storeData
        }
    }
}