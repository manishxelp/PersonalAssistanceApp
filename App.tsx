// import React, { useState, useEffect } from 'react';
// import {
//   SafeAreaView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
//   Button,
//   Alert,
//   PermissionsAndroid,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import Voice from '@react-native-voice/voice';
// import Tts from 'react-native-tts';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
// import Spinner from 'react-native-loading-spinner-overlay';

// interface Message {
//   role: 'user' | 'assistant';
//   text: string;
// }

// const App = (): React.ReactElement => {
//   const isDarkMode = useColorScheme() === 'dark';

//   const [recognizedText, setRecognizedText] = useState<string>('');
//   const [submittedText, setSubmittedText] = useState<string>('');
//   const [isListening, setIsListening] = useState<boolean>(false);
//   const [apiResponse, setApiResponse] = useState<string>('');
//   const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   // const [chatHistory, setChatHistory] = useState<Message[]>([]);
//   const [chatHistory, setChatHistory] = useState<Message[]>([
//     {
//       role: 'user',
//       text: 'On Sunday Night what are the available options?',
//     },
//     {
//       role: 'assistant',
//       text: 'For Sunday night, the available dinner options include:\n1. Vegetable Biryani with boondi raita and papad\n2. Paneer Tikka Masala with butter naan (made with less butter)\n3. Methi Malai Matar (Fenugreek and Peas Curry) with jeera rice\n4. Mixed Vegetable Curry with soft roti and salad\n5. Stuffed Capsicum with soft chapati and dal.',
//     },
//     {
//       role: 'user',
//       text: 'On Monday Night what are available options?',
//     },
//     {
//       role: 'assistant',
//       text: 'I have provided the available dinner options for Monday night in the previous response. Here are the options again:\n1. Dal Khichdi with a side of steamed vegetables (carrot, beans, peas)\n2. Plain Curd with cucumber slices and a sprinkle of cumin powder\n3. Vegetable Pulao with soft cooked vegetables\n4. Aloo Methi (Potato with Fenugreek) with soft roti\n5. Masoor Dal with rice and papad.',
//     },
//   ]);

//   const backgroundStyle = {
//     flex: 1,
//     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
//     padding: 16,
//   };

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       requestMicrophonePermission();
//     }

//     Voice.onSpeechStart = onSpeechStart;
//     Voice.onSpeechResults = onSpeechResults;
//     Voice.onSpeechError = onSpeechError;

//     return () => {
//       Voice.destroy().then(Voice.removeAllListeners);
//     };
//   }, []);

//   const requestMicrophonePermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
//         {
//           title: 'Microphone Permission',
//           message: 'This app needs access to your microphone to recognize your speech.',
//           buttonNeutral: 'Ask Me Later',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         Alert.alert('Permission Denied', 'Cannot use microphone without permission.');
//       }
//     } catch (err) {
//       console.warn(err);
//     }
//   };

//   const onSpeechStart = (e: any) => {
//     console.log('Speech started:', e);
//   };

//   const onSpeechResults = (e: any) => {
//     if (e.value && e.value.length > 0) {
//       const recognized = e.value[0];

//       setRecognizedText(recognized);
//       setChatHistory(prev => [...prev, { role: 'user', text: recognized }]);
//       callApi(recognized);
//       setIsListening(false);
//     }
//   };

//   const onSpeechError = (e: any) => {
//     setIsListening(false);
//   };

//   const startListening = async () => {
//     try {
//       setIsListening(true);
//       await Voice.start('en-US');
//     } catch (e) {
//       setIsListening(false);
//     }
//   };

//   const stopListening = async () => {
//     try {
//       await Voice.stop();
//       setIsListening(false);
//     } catch (e) {
//       // Handle error
//     }
//   };

// const callApi = async (question: string) => {
//   // const apiUrl = 'https://xelpflow.xelpmoc.in/api/v1/internal-prediction/58daa9a6-5efd-40c6-9730-8c8f151d909c';
//   // const chatId = '4caf5c5b-514d-478e-95b0-ec59f08dfec2';

//   // const headers = {
//   //   'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
//   //   'Authorization': 'Basic YWRtaW46RnwwVyEkM3hFbFBAMjAyNA==',
//   //   'Connection': 'keep-alive',
//   //   'Content-Type': 'application/json',
//   //   'Origin': 'https://xelpflow.xelpmoc.in',
//   //   'Referer': 'https://xelpflow.xelpmoc.in/canvas/58daa9a6-5efd-40c6-9730-8c8f151d909c',
//   //   'Sec-Fetch-Dest': 'empty',
//   //   'Sec-Fetch-Mode': 'cors',
//   //   'Sec-Fetch-Site': 'same-origin',
//   //   'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
//   //   'accept': 'text/event-stream',
//   //   'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
//   //   'sec-ch-ua-mobile': '?0',
//   //   'sec-ch-ua-platform': '"Windows"',
//   //   'x-request-from': 'internal',
//   // };

//   // const body = {
//   //   question: question,
//   //   chatId: chatId,
//   //   streaming: false,
//   // };

//   // setLoading(true);

//   const response = {
//     "text": "For Sunday night, the available dinner options include:\n1. Vegetable Biryani with boondi raita and papad\n2. Paneer Tikka Masala with butter naan (made with less butter)\n3. Methi Malai Matar (Fenugreek and Peas Curry) with jeera rice\n4. Mixed Vegetable Curry with soft roti and salad\n5. Stuffed Capsicum with soft chapati and dal.",
//     "assistant": {
//       "assistantId": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
//       "threadId": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//       "runId": "run_TA1rI2sQTMqlrpPdS8WGx3tj",
//       "messages": [
//         {
//           "id": "msg_tayT4TDnFBnoNjbtqPZJUeLY",
//           "object": "thread.message",
//           "created_at": 1727886127,
//           "assistant_id": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
//           "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//           "run_id": "run_TA1rI2sQTMqlrpPdS8WGx3tj",
//           "role": "assistant",
//           "content": [
//             {
//               "type": "text",
//               "text": {
//                 "value": "For Sunday night, the available dinner options include:\n1. Vegetable Biryani with boondi raita and papad\n2. Paneer Tikka Masala with butter naan (made with less butter)\n3. Methi Malai Matar (Fenugreek and Peas Curry) with jeera rice\n4. Mixed Vegetable Curry with soft roti and salad\n5. Stuffed Capsicum with soft chapati and dal.",
//                 "annotations": []
//               }
//             }
//           ],
//           "attachments": [],
//           "metadata": {}
//         },
//         {
//           "id": "msg_cmy2rQc781Eg7SGO1i2e2zFD",
//           "object": "thread.message",
//           "created_at": 1727886121,
//           "assistant_id": null,
//           "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//           "run_id": null,
//           "role": "user",
//           "content": [
//             {
//               "type": "text",
//               "text": {
//                 "value": "On Sunday Night what are avialable options?",
//                 "annotations": []
//               }
//             }
//           ],
//           "attachments": [],
//           "metadata": {}
//         },
//         {
//           "id": "msg_jXRcgAuo0rmmgboWbWXuLpqF",
//           "object": "thread.message",
//           "created_at": 1727885903,
//           "assistant_id": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
//           "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//           "run_id": "run_4cOWzFUGmHGQtTzmAiCWG4io",
//           "role": "assistant",
//           "content": [
//             {
//               "type": "text",
//               "text": {
//                 "value": "I have provided the available dinner options for Monday night in the previous response. Here are the options again:\n1. Dal Khichdi with a side of steamed vegetables (carrot, beans, peas)\n2. Plain Curd with cucumber slices and a sprinkle of cumin powder\n3. Vegetable Pulao with soft cooked vegetables\n4. Aloo Methi (Potato with Fenugreek) with soft roti\n5. Masoor Dal with rice and papad.",
//                 "annotations": []
//               }
//             }
//           ],
//           "attachments": [],
//           "metadata": {}
//         },
//         {
//           "id": "msg_GxaWPo4spUdmgkPMNr2EebZw",
//           "object": "thread.message",
//           "created_at": 1727885901,
//           "assistant_id": null,
//           "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//           "run_id": null,
//           "role": "user",
//           "content": [
//             {
//               "type": "text",
//               "text": {
//                 "value": "On Monday Night what are avialable options?",
//                 "annotations": []
//               }
//             }
//           ],
//           "attachments": [],
//           "metadata": {}
//         },
//         {
//           "id": "msg_DXqMrGw2qYJGxwCCllYXcJsC",
//           "object": "thread.message",
//           "created_at": 1727885808,
//           "assistant_id": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
//           "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//           "run_id": "run_dVgawQbv4oE3rhdVz0q3kQJV",
//           "role": "assistant",
//           "content": [
//             {
//               "type": "text",
//               "text": {
//                 "value": "On Monday night, the available dinner options are:\n1. Dal Khichdi with a side of steamed vegetables (carrot, beans, peas)\n2. Plain Curd with cucumber slices and a sprinkle of cumin powder\n3. Vegetable Pulao with soft cooked vegetables\n4. Aloo Methi (Potato with Fenugreek) with soft roti\n5. Masoor Dal with rice and papad.",
//                 "annotations": []
//               }
//             }
//           ],
//           "attachments": [],
//           "metadata": {}
//         },
//         {
//           "id": "msg_W1Ib4TQnhVz9Z9lYbbocGu9L",
//           "object": "thread.message",
//           "created_at": 1727885802,
//           "assistant_id": null,
//           "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//           "run_id": null,
//           "role": "user",
//           "content": [
//             {
//               "type": "text",
//               "text": {
//                 "value": "On Monday Night what are avialable options?",
//                 "annotations": []
//               }
//             }
//           ],
//           "attachments": [],
//           "metadata": {}
//         },
//         {
//           "id": "msg_e9uYGfxFEzRbUxlbBdxu1Ejk",
//           "object": "thread.message",
//           "created_at": 1727885703,
//           "assistant_id": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
//           "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//           "run_id": "run_gHqL8QQ3CsDpTZZZcizq2Plq",
//           "role": "assistant",
//           "content": [
//             {
//               "type": "text",
//               "text": {
//                 "value": "On Monday morning, the available breakfast options are:\n1. Ragi Porridge with almond slices and honey\n2. Banana Pancakes made with whole wheat flour\n3. Oats Idli with coconut chutney and sambar\n4. Besan (Gram Flour) Chilla with grated vegetables\n5. Poha with peanuts, curry leaves, and lemon .",
//                 "annotations": []
//               }
//             }
//           ],
//           "attachments": [],
//           "metadata": {}
//         },
//         {
//           "id": "msg_3uX1W2d9jtARgWVrgRFgne4u",
//           "object": "thread.message",
//           "created_at": 1727885698,
//           "assistant_id": null,
//           "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//           "run_id": null,
//           "role": "user",
//           "content": [
//             {
//               "type": "text",
//               "text": {
//                 "value": "On Monday monrning what are avialable options?",
//                 "annotations": []
//               }
//             }
//           ],
//           "attachments": [],
//           "metadata": {}
//         }
//       ]
//     }
//   }

//   const data = response.json();




//   const apiAnswer = JSON.stringify(data.text);

//   setApiResponse(apiAnswer);

//   const assistantMessages = data?.assistance?.messages || [];

//   assistantMessages.forEach((message: any) => {
//     const apiMessage = {
//       role: message.role,
//       text: message.content[0]?.text?.value || 'No message content'
//     };

//     setChatHistory(prev => [...prev, apiMessage]);

//   });
//   Tts.speak(apiAnswer);


//   try {
//     // const response = await fetch(apiUrl, {
//     //   method: 'POST',
//     //   headers: headers,
//     //   body: JSON.stringify(body),
//     // });

//     // if (!response.ok) {
//     //   throw new Error(`HTTP error! Status: ${response.status}`);
//     // }

//     // const data = await response.json();
//     // const apiAnswer = data.answer || JSON.stringify(data.text);
//     // setApiResponse(apiAnswer);

//     // const assistant = data?.assistance?.messages

//     // setChatHistory(prev => [...prev, { role: 'assistant', text: apiAnswer }]);
//     // const assistantMessages = data?.assistance?.messages || [];

//     // assistantMessages.forEach((message: any) => {
//     //   const apiMessage = {
//     //     role: message.role,
//     //     text: message.content[0]?.text?.value || 'No message content'
//     //   };

//     //   setChatHistory(prev => [...prev, apiMessage]);

//     // });
//     // Tts.speak(apiAnswer);
//   } catch (error) {
//     console.error('API call error:', error);
//     Alert.alert('API Error', 'Failed to get response from the server.');
//   } finally {
//     setLoading(false);
//   }
// };

//   const callApi = async (question: string) => {
//     const response = {
//       "text": "For Sunday night, the available dinner options include:\n1. Vegetable Biryani with boondi raita and papad\n2. Paneer Tikka Masala with butter naan (made with less butter)\n3. Methi Malai Matar (Fenugreek and Peas Curry) with jeera rice\n4. Mixed Vegetable Curry with soft roti and salad\n5. Stuffed Capsicum with soft chapati and dal.",
//       "assistant": {
//         "assistantId": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
//         "threadId": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//         "runId": "run_TA1rI2sQTMqlrpPdS8WGx3tj",
//         "messages": [
//           {
//             "id": "msg_tayT4TDnFBnoNjbtqPZJUeLY",
//             "object": "thread.message",
//             "created_at": 1727886127,
//             "assistant_id": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
//             "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
//             "run_id": "run_TA1rI2sQTMqlrpPdS8WGx3tj",
//             "role": "assistant",
//             "content": [
//               {
//                 "type": "text",
//                 "text": {
//                   "value": "For Sunday night, the available dinner options include:\n1. Vegetable Biryani with boondi raita and papad\n2. Paneer Tikka Masala with butter naan (made with less butter)\n3. Methi Malai Matar (Fenugreek and Peas Curry) with jeera rice\n4. Mixed Vegetable Curry with soft roti and salad\n5. Stuffed Capsicum with soft chapati and dal.",
//                   "annotations": []
//                 }
//               }
//             ],
//             "attachments": [],
//             "metadata": {}
//           }
//         ]
//       }
//     };

//     // Use the static response as the data
//     const data = response;

//     const apiAnswer = data.text;

//     setApiResponse(apiAnswer);

//     const assistantMessages = data.assistant.messages || [];

//     assistantMessages.forEach((message: any) => {
//       const apiMessage = {
//         role: message.role,
//         text: message.content[0]?.text?.value || 'No message content'
//       };

//       setChatHistory(prev => [...prev, apiMessage]);
//     });

//     Tts.speak(apiAnswer);
//   };


//   const stopSpeaking = () => {
//     Tts.stop();
//     setIsSpeaking(false);
//   };

//   return (
//     <SafeAreaView style={backgroundStyle}>
//       <Spinner visible={loading} textContent={'Loading...'} textStyle={styles.spinnerText} />
//       <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />

//       <View style={styles.container}>
//         <Text style={[styles.title, { color: isDarkMode ? Colors.white : Colors.black }]}>
//           Voice Recognition Chat
//         </Text>

//         <View style={styles.buttonContainer}>
//           <Button
//             title={isListening ? 'Stop Listening' : 'Start Listening'}
//             onPress={isListening ? stopListening : startListening}
//             color={isListening ? '#d9534f' : '#5cb85c'}
//           />
//         </View>

//         <ScrollView style={styles.chatContainer}
//           showsVerticalScrollIndicator={false}
//           showsHorizontalScrollIndicator={false}
//         >

//           {chatHistory.map((msg, index) => (
//             <View key={index} style={styles.messageContainer}>
//               {msg.role === 'assistant' && (
//                 <View style={[styles.messageBubble, styles.userBubble]}>
//                   <Text style={styles.userText}>{msg.text}</Text>
//                 </View>
//               )}
//               {msg.role === 'user' && (
//                 <View style={[styles.messageBubble, styles.assistantBubble]}>
//                   <Text style={styles.assistantText}>{msg.text}</Text>
//                 </View>
//               )}
//             </View>
//           ))}

//         </ScrollView>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 0,
//     width: '100%',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: '700',
//     marginBottom: 30,
//   },
//   buttonContainer: {
//     marginVertical: 10,
//     width: '80%',
//   },
//   chatContainer: {
//     flex: 1,
//     width: '100%',
//     paddingHorizontal: 10,
//     marginTop: 20,
//   },
//   messageBubble: {
//     padding: 10,
//     borderRadius: 15,
//     marginVertical: 5,
//     maxWidth: '80%',
//   },
//   userBubble: {
//     backgroundColor: '#5cb85c',
//     alignSelf: 'flex-start',
//   },
//   assistantBubble: {
//     backgroundColor: '#007bff',
//     alignSelf: 'flex-end',
//   },
//   userText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   assistantText: {
//     color: '#fff',
//     fontSize: 16,
//   },
//   spinnerText: {
//     color: '#FFF',
//   },
//   messageContainer: {
//     marginVertical: 5,
//   },
// });
// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     alignItems: 'center',
// //     padding: 0,
// //     width: '100%',
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: '700',
// //     marginBottom: 30,
// //   },
// //   buttonContainer: {
// //     marginVertical: 10,
// //     width: '80%',
// //   },
// //   chatContainer: {
// //     flex: 1,
// //     padding: 10,
// //     backgroundColor: '#f5f5f5', // Light background for better contrast
// //   },
// //   messageBubble: {
// //     maxWidth: '75%', // Limit the width of the bubbles
// //     padding: 10,
// //     borderRadius: 15,
// //     marginVertical: 5,
// //   },
// //   userBubble: {
// //     backgroundColor: '#0084ff', // User message color (e.g., blue)
// //     alignSelf: 'flex-end', // Align user messages to the right
// //   },
// //   assistantBubble: {
// //     backgroundColor: '#e5e5ea', // Assistant message color (e.g., light gray)
// //     alignSelf: 'flex-start', // Align assistant messages to the left
// //   },
// //   userText: {
// //     color: '#ffffff', // Text color for user messages
// //   },
// //   assistantText: {
// //     color: '#000000', // Text color for assistant messages
// //   },
// //   messageContainer: {
// //     marginVertical: 5,
// //   },
// //   spinnerText: {
// //     color: '#FFF',
// //   },
// // });

// export default App;


import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
  Alert,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Voice from '@react-native-voice/voice';
import Tts from 'react-native-tts';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/Ionicons';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

const App = (): React.ReactElement => {
  const isDarkMode = useColorScheme() === 'dark';

  const [recognizedText, setRecognizedText] = useState<string>('');
  const [submittedText, setSubmittedText] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false);
  const [apiResponse, setApiResponse] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [inputText, setInputText] = useState<string>(''); // New state for input text

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 16,
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestMicrophonePermission();
    }

    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const requestMicrophonePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        {
          title: 'Microphone Permission',
          message: 'This app needs access to your microphone to recognize your speech.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permission Denied', 'Cannot use microphone without permission.');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const onSpeechStart = (e: any) => {
    console.log('Speech started:', e);
  };

  const onSpeechResults = (e: any) => {
    if (e.value && e.value.length > 0) {
      const recognized = e.value[0];
      setRecognizedText(recognized);
      setChatHistory(prev => [...prev, { role: 'user', text: recognized }]);
      callApi(recognized);
      setIsListening(false);
    }
  };

  const onSpeechError = (e: any) => {
    setIsListening(false);
  };

  const startListening = async () => {
    try {
      setIsListening(true);
      await Voice.start('en-US');
    } catch (e) {
      setIsListening(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
    } catch (e) {
      // Handle error
    }
  };

  const callApi = async (question: string) => {
    const response = {
      "text": "For Sunday night, the available dinner options include:\n1. Vegetable Biryani with boondi raita and papad\n2. Paneer Tikka Masala with butter naan (made with less butter)\n3. Methi Malai Matar (Fenugreek and Peas Curry) with jeera rice\n4. Mixed Vegetable Curry with soft roti and salad\n5. Stuffed Capsicum with soft chapati and dal.",
      "assistant": {
        "assistantId": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
        "threadId": "thread_bq7sYI9sPyP8siFUImUOnMY5",
        "runId": "run_TA1rI2sQTMqlrpPdS8WGx3tj",
        "messages": [
          {
            "id": "msg_tayT4TDnFBnoNjbtqPZJUeLY",
            "object": "thread.message",
            "created_at": 1727886127,
            "assistant_id": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
            "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
            "run_id": "run_TA1rI2sQTMqlrpPdS8WGx3tj",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "For Sunday night, the available dinner options include:\n1. Vegetable Biryani with boondi raita and papad\n2. Paneer Tikka Masala with butter naan (made with less butter)\n3. Methi Malai Matar (Fenugreek and Peas Curry) with jeera rice\n4. Mixed Vegetable Curry with soft roti and salad\n5. Stuffed Capsicum with soft chapati and dal.",
                  "annotations": []
                }
              }
            ],
            "attachments": [],
            "metadata": {}
          },
          {
            "id": "msg_cmy2rQc781Eg7SGO1i2e2zFD",
            "object": "thread.message",
            "created_at": 1727886121,
            "assistant_id": null,
            "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
            "run_id": null,
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "On Sunday Night what are avialable options?",
                  "annotations": []
                }
              }
            ],
            "attachments": [],
            "metadata": {}
          },
          {
            "id": "msg_jXRcgAuo0rmmgboWbWXuLpqF",
            "object": "thread.message",
            "created_at": 1727885903,
            "assistant_id": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
            "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
            "run_id": "run_4cOWzFUGmHGQtTzmAiCWG4io",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "I have provided the available dinner options for Monday night in the previous response. Here are the options again:\n1. Dal Khichdi with a side of steamed vegetables (carrot, beans, peas)\n2. Plain Curd with cucumber slices and a sprinkle of cumin powder\n3. Vegetable Pulao with soft cooked vegetables\n4. Aloo Methi (Potato with Fenugreek) with soft roti\n5. Masoor Dal with rice and papad.",
                  "annotations": []
                }
              }
            ],
            "attachments": [],
            "metadata": {}
          },
          {
            "id": "msg_GxaWPo4spUdmgkPMNr2EebZw",
            "object": "thread.message",
            "created_at": 1727885901,
            "assistant_id": null,
            "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
            "run_id": null,
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "On Monday Night what are avialable options?",
                  "annotations": []
                }
              }
            ],
            "attachments": [],
            "metadata": {}
          },
          {
            "id": "msg_DXqMrGw2qYJGxwCCllYXcJsC",
            "object": "thread.message",
            "created_at": 1727885808,
            "assistant_id": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
            "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
            "run_id": "run_dVgawQbv4oE3rhdVz0q3kQJV",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "On Monday night, the available dinner options are:\n1. Dal Khichdi with a side of steamed vegetables (carrot, beans, peas)\n2. Plain Curd with cucumber slices and a sprinkle of cumin powder\n3. Vegetable Pulao with soft cooked vegetables\n4. Aloo Methi (Potato with Fenugreek) with soft roti\n5. Masoor Dal with rice and papad.",
                  "annotations": []
                }
              }
            ],
            "attachments": [],
            "metadata": {}
          },
          {
            "id": "msg_W1Ib4TQnhVz9Z9lYbbocGu9L",
            "object": "thread.message",
            "created_at": 1727885802,
            "assistant_id": null,
            "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
            "run_id": null,
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "On Monday Night what are avialable options?",
                  "annotations": []
                }
              }
            ],
            "attachments": [],
            "metadata": {}
          },
          {
            "id": "msg_e9uYGfxFEzRbUxlbBdxu1Ejk",
            "object": "thread.message",
            "created_at": 1727885703,
            "assistant_id": "asst_ZfMuOSvtbaOd87e6IsNZVMZp",
            "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
            "run_id": "run_gHqL8QQ3CsDpTZZZcizq2Plq",
            "role": "assistant",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "On Monday morning, the available breakfast options are:\n1. Ragi Porridge with almond slices and honey\n2. Banana Pancakes made with whole wheat flour\n3. Oats Idli with coconut chutney and sambar\n4. Besan (Gram Flour) Chilla with grated vegetables\n5. Poha with peanuts, curry leaves, and lemon .",
                  "annotations": []
                }
              }
            ],
            "attachments": [],
            "metadata": {}
          },
          {
            "id": "msg_3uX1W2d9jtARgWVrgRFgne4u",
            "object": "thread.message",
            "created_at": 1727885698,
            "assistant_id": null,
            "thread_id": "thread_bq7sYI9sPyP8siFUImUOnMY5",
            "run_id": null,
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": {
                  "value": "On Monday monrning what are avialable options?",
                  "annotations": []
                }
              }
            ],
            "attachments": [],
            "metadata": {}
          }
        ]
      }
    };

    const data = response;
    const apiAnswer = data.text;
    setApiResponse(apiAnswer);

    const assistantMessages = data.assistant.messages || [];
    const newMessages = assistantMessages.map((message: any) => ({
      role: message.role,
      text: message.content[0]?.text?.value || 'No message content'
    }));
    // Update chat history state
    setChatHistory(prev => [...prev, ...newMessages]);

    Tts.speak(apiAnswer);
  };


  // const callApi = async (question: string) => {
  //   const apiUrl = 'https://xelpflow.xelpmoc.in/api/v1/internal-prediction/58daa9a6-5efd-40c6-9730-8c8f151d909c';
  //   const chatId = '4caf5c5b-514d-478e-95b0-ec59f08dfec2';

  //   const headers = {
  //     'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',
  //     'Authorization': 'Basic YWRtaW46RnwwVyEkM3hFbFBAMjAyNA==',
  //     'Connection': 'keep-alive',
  //     'Content-Type': 'application/json',
  //     'Origin': 'https://xelpflow.xelpmoc.in',
  //     'Referer': 'https://xelpflow.xelpmoc.in/canvas/58daa9a6-5efd-40c6-9730-8c8f151d909c',
  //     'Sec-Fetch-Dest': 'empty',
  //     'Sec-Fetch-Mode': 'cors',
  //     'Sec-Fetch-Site': 'same-origin',
  //     'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
  //     'accept': 'text/event-stream',
  //     'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
  //     'sec-ch-ua-mobile': '?0',
  //     'sec-ch-ua-platform': '"Windows"',
  //     'x-request-from': 'internal',
  //   };

  //   const body = {
  //     question: question,
  //     chatId: chatId,
  //     streaming: false,
  //   };

  //   setLoading(true);
  //   try {
  //     const response = await fetch(apiUrl, {
  //       method: 'POST',
  //       headers: headers,
  //       body: JSON.stringify(body),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     const apiAnswer = data.answer || JSON.stringify(data.text);
  //     setApiResponse(apiAnswer);

  //     const assistant = data?.assistance?.messages

  //     setChatHistory(prev => [...prev, { role: 'assistant', text: apiAnswer }]);
  //     const assistantMessages = data?.assistance?.messages || [];

  //     assistantMessages.forEach((message: any) => {
  //       const apiMessage = {
  //         role: message.role,
  //         text: message.content[0]?.text?.value || 'No message content'
  //       };

  //       setChatHistory(prev => [...prev, apiMessage]);

  //     });

  //     Tts.speak(apiAnswer);

  //   } catch (error) {
  //     console.error('API call error:', error);
  //     Alert.alert('API Error', 'Failed to get response from the server.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleTextSubmit = () => {
    if (inputText.trim() === '') return; // Prevent empty submission
    setChatHistory(prev => [...prev, { role: 'user', text: inputText }]);
    callApi(inputText); // Call the API with the input text
    setInputText(''); // Clear the input after submission
  };

  const stopSpeaking = () => {
    Tts.stop();
    setIsSpeaking(false);
  };

  const [isVoiceActive, setIsVoiceActive] = useState(false); // Track voice status

  const handleStopVoice = () => {
    setIsVoiceActive(false);
    setIsSpeaking(false);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <Spinner visible={loading} textContent={'Loading...'} textStyle={styles.spinnerText} />
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} backgroundColor={backgroundStyle.backgroundColor} />

      <View style={styles.container}>
        <Text style={[styles.title, { color: isDarkMode ? Colors.white : Colors.black }]}>
          Your Personal Assistant
        </Text>

        <ScrollView style={styles.chatContainer}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {chatHistory.map((msg, index) => (
            <View key={index} style={styles.messageContainer}>
              {msg.role === 'assistant' && (
                <View style={[styles.messageBubble, styles.userBubble]}>
                  <Text style={styles.userText}>{msg.text}</Text>
                </View>
              )}
              {msg.role === 'user' && (
                <View style={[styles.messageBubble, styles.assistantBubble]}>
                  <Text style={styles.assistantText}>{msg.text}</Text>
                </View>
              )}
            </View>
          ))}
        </ScrollView>
        {chatHistory.length > 0 && chatHistory[chatHistory.length - 1].role === 'user' && isVoiceActive && (
          <Button title="Stop Voice" onPress={handleStopVoice} />
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={handleTextSubmit} // Handle submit on pressing enter
          />
          <TouchableOpacity style={styles.button} onPress={handleTextSubmit}>
            <Icon name="send" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={isListening ? stopListening : startListening}>
            <Icon name={isListening ? "mic-off" : "mic"} size={24} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 0,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30,
  },
  chatContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  messageContainer: {
    marginVertical: 5,
  },
  messageBubble: {
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  userBubble: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  assistantBubble: {
    backgroundColor: '#007AFF',
    alignSelf: 'flex-end',
  },
  userText: {
    color: '#000',
  },
  assistantText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginRight: 10,
    backgroundColor: '#fff',
    color: "black",
  },
  button: {
    padding: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinnerText: {
    color: '#FFF',
  },
});

export default App;
