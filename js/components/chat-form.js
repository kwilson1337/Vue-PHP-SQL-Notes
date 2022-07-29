import storeData from '../store/noteStore.js'
const { ref } = Vue;
export default {   
    template: `        
        <div class="note-form">
            <textarea v-model="textInfo" name="note_content" placeholder="Add Note" class="form-control" rows="5" /> 
            <button            
                @click.prevent="submitInfo" 
                class="btn btn-primary d-block w-100 mt-4"
                >
                    Submit
            </button>        
        </div>
    `,
    setup(){         
        const textInfo = ref(null)

        const submitInfo = () => {      
            const form = new FormData()
            form.append("note_content",textInfo.value)

            if(textInfo.value !== null) {
                try {
                    axios.post(storeData.state.urlBase + 'api/post-notes.php', form)

                    setTimeout(() => {
                        // notes
                        storeData.state.noteList = []
                        storeData.methods.getLists()

                        // toast 
                        storeData.mutations.updateToast('success', 1, 'Note has been added')
                        storeData.methods.showToast()
                    }, 200)

                    textInfo.value = ''
                } catch(err) {
                    // toast
                    storeData.mutations.updateToast('error', 1, 'Something went wrong. Please try again later')
                    storeData.methods.showToast()
                }
            }
        }

        return {
            textInfo,
            submitInfo,
            storeData
        }
    }
}
