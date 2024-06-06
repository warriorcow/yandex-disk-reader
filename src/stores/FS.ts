import { defineStore } from 'pinia'
import { useToastStore } from './Toast';
import { getTypesFiles, getUniqueResolutions } from "../helpers";

export const useFSStore = defineStore('FSStore', {
    state: () => ({
        token: '',
        currentPath: "",
        nestedFilesPath: '',
        isLoadingFS: false,
        isLoadingNestedFiles: false,
        FSData: [],
        nestedFiles: [],
        controller: new AbortController()
    }),
    getters: {
        getFolderName: (state) => state.currentPath.split('/').pop(),
        getNestedFolderName: (state) => state.nestedFilesPath.split('/').pop(),
        getNavigationPath: (state) => state.currentPath?.split('/'),
        getUniqueResolutionsCurrentFolder: (state) => getUniqueResolutions(state.FSData),
        getTypeFilesCurrentFolder: (state) => getTypesFiles(state.FSData),
        getCountFilesCurrentFolder: (state) => {
            return state.FSData.filter(item => item.type === 'file').length || 0
        },
        getCountDirCurrentFolder: (state) => {
            return state.FSData.filter(item => item.type === 'dir').length || 0
        },
        getUniqueResolutionsNestedFolders: (state) => getUniqueResolutions(state.nestedFiles),
        getTypeFilesNestedFolders: (state) => getTypesFiles(state.nestedFiles),
        getFilteredCurrentFolder: (state) => {
            const object = {};
            state.FSData.forEach((file) => {
                if (file.type === 'dir') return false
                const typeFile = file.name.split('.')[file.name.split('.').length - 1];

                if (!object[typeFile]) {
                    object[typeFile] = [];
                }

                object[typeFile].push(file);
            });
            return object;
        },
        getFilteredNestedData: (state) => {
            const object = {};
            state.nestedFiles.forEach((file) => {
                const folderName = file.path.split('/').slice(-2, -1)[0];
                const typeFile = file.name.split('.')[file.name.split('.').length - 1];

                if (!object[folderName]) {
                    object[folderName] = {};
                }

                if (!object[folderName][typeFile]) {
                    object[folderName][typeFile] = [];
                }

                object[folderName][typeFile].push(file);
            });
            return object;
        },
    },
    actions: {
        async getData(folderParam) {
            const params = new URLSearchParams({
                limit: '2000',
                path: folderParam === 'disk:' ? 'disk:/' : folderParam || 'disk:/'
            })
            try {
                const response = await fetch(`https://cloud-api.yandex.net/v1/disk/resources?${params}`, {
                    headers: {
                        'Authorization' : `OAuth ${this.token}`
                    },
                    signal: this.controller.signal
                })

                const { _embedded } = await response.json();

                return _embedded?.items;
            } catch (e) {
                const ToastStore = useToastStore();
                if (e.name !== 'AbortError') {
                    console.log(e)
                    ToastStore.addToast({
                        text: e.message,
                        title: e.name,
                        status: "danger"
                    })
                    throw new Error(e)
                }
            }

        },
        async getYaDiskData(folderParam: string): Promise<void> {
            if (this.isLoadingFS) {
                this.abortActiveFetches();
            }
            this.FSData = [];
            this.nestedFiles = [];
            this.isLoadingFS = true;
            this.FSData = await this.getData(folderParam);
            localStorage.setItem('folder', folderParam);
            this.currentPath = folderParam;
            this.isLoadingFS = false;
        },
        async goBack() {
            let currentPath = this.currentPath.split('/')
            currentPath.pop();
            this.getYaDiskData(currentPath.join('/'))
        },
        async getNestedStats(path: string) {
            const ToastStore = useToastStore();
            // Остановка запросов по повторном запросе, пока идут запросы
            if (path === this.nestedFilesPath && this.isLoadingNestedFiles) {
                this.clearNestedData();
                this.abortActiveFetches();
                this.isLoadingNestedFiles = false;
                ToastStore.addToast({
                    text: 'Отменено!',
                    status: 'success'
                })
                return
            }
            // Остановка выполняемых запросов при другом запросе
            if (this.isLoadingNestedFiles) {
               this.abortActiveFetches();
                ToastStore.addToast({
                    text: 'Отменено!',
                    status: 'success'
                })
            }
            this.isLoadingNestedFiles = true;
            this.nestedFilesPath = path;
            let files = [];
            const findFilesInFolderReq = async (path: string) => {
                const folder: Array<any> = await this.getData(path);

                await Promise.all(folder.map(async item => {
                    if (item.type !== 'dir') {
                        files.push(item);
                    } else {
                        await findFilesInFolderReq(item.path);
                    }
                }))
            }

            await findFilesInFolderReq(path);
            this.nestedFiles = files;
            this.isLoadingNestedFiles = false;
        },
        setSavedToken(): void {
            if (localStorage.getItem('token') !== null) {
                this.token = localStorage.getItem('token');
                this.setPrevioslyFolder()
            } else {
                this.token = 'Введите API-ключ'
            }
        },
        async setPrevioslyFolder() {
            if (localStorage.getItem('folder') !== null) {
                this.currentPath = localStorage.getItem('folder');
                await this.getYaDiskData(this.currentPath);
            } else {
                this.currentPath = ''
            }
        },
        setNewToken(token: string): void {
            localStorage.setItem('token', token);
            this.token = token;
            this.getYaDiskData(this.currentPath)
        },
        clearNestedData() {
            // this.nestedFilesPath = '';
            this.nestedFiles = [];
            this.isLoadingNestedFiles = false;
        },
        abortActiveFetches() {
            this.controller.abort();
            this.controller = new AbortController();
        }
    }
})
