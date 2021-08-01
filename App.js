import React, { useState } from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { Ionicons } from '@expo/vector-icons';
import { Text, Image } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";
import Gate from './components/Gate';
import store, { persistor } from './redux/store';


const cacheImages = images => images.map(image =>{
if(typeof image === "string"){
    return Image.prefetch(image);
} else {                          
    return Asset.fromModule(image).downloadAsync();
}
});

const cacheFonts = fonts => fonts.map(font => Font.loadAsync(font))     // fonts를 인자로 갖는 cacheFonts 함수를 만들자, Highly efficient method for loading fonts from static or remote resources which can then be used with the platform's native text elements. In the browser this generates a @font-face block in a shared style sheet for fonts. No CSS is needed to use this method.
                                                                        // cacheFonts는 font array를 return 한다.
export default function App() {
const [isReady, setIsReady] = useState(false);          // hooks
const handleFinish = () => setIsReady(true);
const loadAssets = async () => {
    const images = [
    require("./assets/loginBg.jpg"),
    "https://www.google.com/url?sa=i&url=https%3A%2F%2Febenezersuites.com%2Fhome%2Fairbnb-logo%2F&psig=AOvVaw1nvmxtozHJBe-U0j7iYZey&ust=1626415945104000&source=images&cd=vfe&ved=0CAoQjRxqFwoTCND24de15PECFQAAAAAdAAAAABAI"
    ];
    const fonts = [Ionicons.font]
    const imagePromises = cacheImages(images);                  // array 임
    const fontPromises = cacheFonts(fonts);                     // array 임 , console.log(cacheFonts(fonts)); 를 해보면 Promise Array임을 알 수 있다.
    
    return Promise.all([...fontPromises, ...imagePromises])     // cacheImages(images), cacheFonts(fonts) 모두 Promise를 갖는 Array 따라서 왼족과 같이 Promise.all()이 가능한 듯, ... : 3개의 점을 찍으면 배열(array) 안의 내용물을 가져온다는 것
};
return isReady ? (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Gate />
        </PersistGate> 
    </Provider>
    ) : (
    <AppLoading 
    onError={console.error} 
    onFinish={handleFinish} 
    startAsync={loadAssets} />
    );
}