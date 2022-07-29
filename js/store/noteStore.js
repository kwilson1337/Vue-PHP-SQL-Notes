const { reactive } = Vue;

const state = reactive({
    noteList: [],
    urlBase: 'http://localhost:8888/crud-notes/',    
    toast: {
        state: 'success',
        show: 0,
        message: 'Success'
    },    
})

const methods = {
    async getLists() {
        try {
            const notes = await axios.get(state.urlBase + 'api/read-notes.php')                                    
            let data = await notes.data      
                                          
            if(data.data.length) {
                state.noteList = [...data.data]             
            }            
        }   
        catch(err) {
            console.log(err)
        }                 
    },    
    showToast() {
        setTimeout(() => {
           mutations.resetToast()
        }, 1500)
    },     
}

const mutations = {
    updateToast(toastState, toastShow, toastMessage) {
        if(toastState) {
            state.toast.state = toastState
        }
        if(toastShow) {
            state.toast.show = toastShow
        }
        if(toastMessage) {
            state.toast.message = toastMessage
        }        
    },
    resetToast() {        
        state.toast.show = 0        
    }     
}

export default {
    state,
    methods,
    mutations
}