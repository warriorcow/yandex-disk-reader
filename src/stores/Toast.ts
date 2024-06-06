import {defineStore} from 'pinia'

export const useToastStore = defineStore('ToastStore', {
    state: () => ({
        timeout: null,
        items: [],
    }),
    getters: {
    },
    actions: {
        addToast(params: {
            text: string
            title?: string | null
            status?: 'success' | 'danger'
        } = {
            text: '',
            title: null,
            status: null
        }) {
            this.items.push(params)
            this.clearToasts()
        },

        clearToasts() {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.items = []
            }, 4000)
        }
    }
})
