import storeData from '../store/noteStore.js'
export default {   
    template: `
        <div 
            class="note-toast"
            :class="{ isActive : storeData.state.toast.show }"
        >
            <p class="m-0">{{ storeData.state.toast.message }}</p>
        </div>
    `,
    setup() {

        return {
            storeData
        }
    }
}