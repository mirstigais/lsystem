import {defineStore} from "pinia";

export const useLocaleStore = defineStore("localeStore", {
    state:() => ({
      locale: 'EN'
    }),
    
    actions: {
        setLocale(locale: string) {
          this.locale = locale;
        }
      }
});