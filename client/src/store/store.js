import {create} from "zustand"

const useAuthStore = create((set) => ({
    auth : {
        username : "",
        active : false
    },
    setUsername: (name) => set((state) => ({auth:{...state.auth, username: name}})),
    setActive: (status) => set((state) => ({auth:{...state.auth, active: status}}))
}))

export default useAuthStore;