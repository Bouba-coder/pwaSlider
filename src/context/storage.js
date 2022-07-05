import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = {
  async getItem(key) {
    try {
      return JSON.parse(await AsyncStorage.getItem(key));
    } catch (e) {
      console.error(e);
    }
  },
  async setItem(key, data) {
    try {
      const state = JSON.parse(await AsyncStorage.getItem(key));
      if (state) {
        await AsyncStorage.setItem(key, JSON.stringify({ ...state, ...data }));
      } else {
        await AsyncStorage.setItem(key, JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
    }
  },
  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error(e);
    }
  },
};

export default storage;
