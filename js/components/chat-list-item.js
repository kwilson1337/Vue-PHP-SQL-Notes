import storeData from '../store/noteStore.js'
const { ref } = Vue;
export default {
    props: {
        noteContent: {
            type: Object 
        },
        listIndex: {
            type: Number
        }
    },
    template: `
    <li
        :class="{goodBye : deleteState[noteContent.note_id]}"
    >
        <div class="d-flex align-items-center action-buttons">
            <button
                class="edit-button -trash bg-danger text-white"  
                :data-list-index="listIndex"
                :class="{isActive : toggleDelete[noteContent.note_id]}"                               
                @click="deleteNote($event,noteContent.note_id)"
            >
                <i  
                    v-if="toggleDelete[noteContent.note_id] == false || toggleDelete[noteContent.note_id] == null"                       
                    class="fa-solid fa-ban"
                ></i>

                <i          
                    v-else               
                    class="fa-solid fa-check"
                ></i>
            </button>            
            <button 
                class="edit-button"
                :class="{isActive : toggleEdit[noteContent.note_id]}"
                @click="editNote(noteContent.note_id)"            
            >
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </div>        
        
        <input 
            class="form-control" 
            type="text" 
            :disabled="toggleEdit[noteContent.note_id] ? false : true" 
            :placeholder="noteContent.note_content" 
            :data-note-id="noteContent.note_id"
            v-model="inputCopy[noteContent.note_id]"
            @keyup.enter="updateNote($event,noteContent.note_id)"
        />                                      
    </li>    
    `,
    setup() {
        const inputCopy = ref([])    
        const toggleEdit = ref([])        
        const toggleDelete = ref([])
        const deleteState = ref([])

        const editNote = (index) => {                       
            toggleEdit.value[index] = !toggleEdit.value[index]
        }
       
        const updateNote = (e, index) => {            
            const form = new FormData();
            form.append('note_content', inputCopy.value[index])
            form.append('note_id', e.currentTarget.dataset.noteId)

            try {
                axios.post(storeData.state.urlBase + 'api/update-notes.php', form)
                toggleEdit.value[index] = !toggleEdit.value[index]

                // toast 
                storeData.mutations.updateToast('success', 1, 'Note has been updated')                
                storeData.methods.showToast()
            }
            catch(err) {
                // toast 
                storeData.mutations.updateToast('error', 1, 'Note has not been updated. Please try again later')               
                storeData.methods.showToast()   
            }
        }  
        
        const deleteNote = (e, index) => {
            toggleDelete.value[index] = !toggleDelete.value[index]
            const listIndex = e.currentTarget.dataset.listIndex;

            if(!toggleDelete.value[index]) {
                const form = new FormData
                form.append('note_id', index)                
                axios.post(storeData.state.urlBase + 'api/delete-notes.php', form)
                deleteState.value[index] = !deleteState.value[index]                                                              

                setTimeout(() => {                    
                    storeData.state.noteList.splice(listIndex, 1)                    
                }, 500)
        
                // toast 
                storeData.mutations.updateToast('success', 1, 'Note has been deleted')               
                storeData.methods.showToast()                 
            } 
        }

        return {
            inputCopy,
            editNote,
            updateNote,
            deleteNote,
            toggleEdit,
            toggleDelete,
            deleteState
        }
    }
}