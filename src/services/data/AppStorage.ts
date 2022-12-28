import AsyncStorage from '@react-native-async-storage/async-storage'

export default class AppStorage {
    static getData = async (tag: string) => {
        try {
            const value = await AsyncStorage.getItem(tag)
            if (value !== null) {
                return JSON.parse(value)
            }
            return false
        } catch (e) {
            
        }
    }

    static storeData = async (tag: string, value: any) => {
        try {
            await AsyncStorage.setItem(tag, JSON.stringify(value))
        } catch (e) {
            
        }
    }

    static storageDataAccess = async (tag: any, value = null) => {
        if (value == null) {
            const item = await this.getData(tag)
            return item
        }

        await this.storeData(tag, value)
    }

    static remove = async (tag: string) => {
        try {
            await AsyncStorage.removeItem(tag)
        } catch (e) {
            
        }
    }

    // #endregion

    // #region Properties

    static async ApiToken(value = null) {
        const token = await this.storageDataAccess('ApiToken', value)
        return token
    }

    static async ApiTokenValidate(value = null) {
        const validate = await this.storageDataAccess('ApiTokenValidate', value)
        return validate
    }

    static async User(value = null) {
        const user = await this.storageDataAccess('User', value)
        return user
    }

    static async setKey(key: any, value: any) {
        await AsyncStorage.setItem(key, JSON.stringify(value))
            .then(() => {})
            .catch((error: any) => {
                throw error
            })
    }
}
