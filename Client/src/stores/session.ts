import myFetch from "@/services/myFetch";
import { computed, reactive } from "vue";

const session = reactive( {
    user: null as User | null,
    loading: 0,
    error: null as string | null,
    messages: [] as Message[],
});
export default session;

    //reactive function, doent need t have a compo which is whywe were able to access our session, now we can export session can can be notified
   // special case reactive, we never ever change the session...that works well, sess obj repe a pretty complex object...
   //what if we wanted to store an actual value? where did that get and set go?? spec recar creat an object with value.... instead of rect we use ref...
    //get token() { 
    // return this.user?.token; //?. means optional },
    //set token (token: string | undefined){
    //  if (this.user) {
    // this.user.token=token;  } }
    

    export function setError(error: string | null) {
        session.error = error;
        if(error){
            session.messages.push({ type: 'danger', text: error});
        }
    }
    
    export const isLoading = computed(() => !! session.loading);
    
    export async function api<T>(url: string, data: any = null, method?: string ){
        session.loading++;
        setError(null);
        try {
            return await myFetch<T>(url, data, method);
        } catch (error) {
            setError(error as string);
        }finally{
            session.loading--;
        }
        return {} as T;
    }
    
    
    export function login(name: string, email: string, password: string) {
        session.user = {
            name,
            email,
            password,
        };
    }
    
    export function logout() {
        session.user = null;
    }
    
    export interface User {
        name: string;
        email: string;
        password?: string;
    }
    
    export interface Message {
        text: string;
        type: 'danger' | 'warning' | 'success' | 'info';
    }