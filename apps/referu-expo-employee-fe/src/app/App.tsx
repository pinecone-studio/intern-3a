import React from 'react';
import RootLayout from './_layout';

export default function App() {
  return <RootLayout />;
}

// /* eslint-disable jsx-a11y/accessible-emoji */
// 'use client';
// import React, { useRef, useState } from 'react';
// import { Linking, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import Svg, { G, Path } from 'react-native-svg';

// export const App = () => {
//   // const [whatsNextYCoord, setWhatsNextYCoord] = useState<number>(1);
//   // const scrollViewRef = useRef<null | ScrollView>(null);

//   return (
//     <View style={styles.container}>
//       <StatusBar barStyle="dark-content" />
//       <ScrollView
//         // ref={(ref) => {
//         //   scrollViewRef.current = ref;
//         // }}
//         contentInsetAdjustmentBehavior="automatic"
//         style={styles.scrollView}
//       >
//         <View style={styles.section}>
//           <Text style={styles.textLg}>Hello there,</Text>
//           <Text style={[styles.textXL, styles.appTitleText]} testID="heading" role="heading">
//             test test{' '}
//           </Text>
//         </View>
//         <View style={styles.section}>
//           <View style={styles.hero}>
//             <View style={styles.heroTitle}>
//               <Svg width={32} height={32} stroke="hsla(162, 47%, 50%, 1)" fill="none" viewBox="0 0 24 24">
//                 <Path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
//                 />
//               </Svg>
//               <Text style={[styles.textLg, styles.heroTitleText]}>You're up and running</Text>
//             </View>
//             <TouchableOpacity
//               style={styles.whatsNextButton}
//               // onPress={() => {
//               //   scrollViewRef.current?.scrollTo({
//               //     x: 0,
//               //     y: whatsNextYCoord,
//               //   });
//               // }}
//             >
//               <Text style={[styles.textMd, styles.textCenter]}>What's next?</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <View style={styles.section}>
//           <View style={[styles.shadowBox]}>
//             <Text style={[styles.marginBottomMd, styles.textLg]}>Learning materials</Text>
//             <TouchableOpacity style={[styles.listItem, styles.learning]} onPress={() => Linking.openURL('https://nx.dev/getting-started/intro?utm_source=nx-project')}>
//               <Svg width={24} height={24} stroke="#000000" fill="none" viewBox="0 0 24 24">
//                 <Path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                 />
//               </Svg>
//               <View style={styles.listItemTextContainer}>
//                 <Text style={[styles.textMd]}>Documentation</Text>
//                 <Text style={[styles.text2XS, styles.textSubtle]}>Everything is in there</Text>
//               </View>
//               <Svg width={18} height={18} stroke="#000000" fill="none" viewBox="0 0 24 24">
//                 <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
//               </Svg>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View
//           style={styles.section}
//           // onLayout={(event) => {
//           //   const layout = event.nativeEvent.layout;
//           //   setWhatsNextYCoord(layout.y);
//           // }}
//         ></View>
//       </ScrollView>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   scrollView: {
//     backgroundColor: '#ffffff',
//   },
//   codeBlock: {
//     backgroundColor: 'rgba(55, 65, 81, 1)',
//     marginVertical: 12,
//     padding: 12,
//     borderRadius: 4,
//   },
//   monospace: {
//     color: '#ffffff',
//     fontFamily: 'Courier New',
//     marginVertical: 4,
//   },
//   comment: {
//     color: '#cccccc',
//   },
//   marginBottomSm: {
//     marginBottom: 6,
//   },
//   marginBottomMd: {
//     marginBottom: 18,
//   },
//   marginBottomLg: {
//     marginBottom: 24,
//   },
//   textLight: {
//     fontWeight: '300',
//   },
//   textBold: {
//     fontWeight: '500',
//   },
//   textCenter: {
//     textAlign: 'center',
//   },
//   text2XS: {
//     fontSize: 12,
//   },
//   textXS: {
//     fontSize: 14,
//   },
//   textSm: {
//     fontSize: 16,
//   },
//   textMd: {
//     fontSize: 18,
//   },
//   textLg: {
//     fontSize: 24,
//   },
//   textXL: {
//     fontSize: 48,
//   },
//   textContainer: {
//     marginVertical: 12,
//   },
//   textSubtle: {
//     color: '#6b7280',
//   },
//   section: {
//     marginVertical: 12,
//     marginHorizontal: 12,
//   },
//   shadowBox: {
//     backgroundColor: 'white',
//     borderRadius: 24,
//     shadowColor: 'black',
//     shadowOpacity: 0.15,
//     shadowOffset: {
//       width: 1,
//       height: 4,
//     },
//     shadowRadius: 12,
//     padding: 24,
//     marginBottom: 24,
//   },
//   listItem: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   listItemTextContainer: {
//     marginLeft: 12,
//     flex: 1,
//   },
//   appTitleText: {
//     paddingTop: 12,
//     fontWeight: '500',
//   },
//   hero: {
//     borderRadius: 12,
//     backgroundColor: '#143055',
//     padding: 36,
//     marginBottom: 24,
//   },
//   heroTitle: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   heroTitleText: {
//     color: '#ffffff',
//     marginLeft: 12,
//   },
//   heroText: {
//     color: '#ffffff',
//     marginVertical: 12,
//   },
//   whatsNextButton: {
//     backgroundColor: '#ffffff',
//     paddingVertical: 16,
//     borderRadius: 8,
//     width: '50%',
//     marginTop: 24,
//   },
//   learning: {
//     marginVertical: 12,
//   },
//   love: {
//     marginTop: 12,
//     justifyContent: 'center',
//   },
// });

// export default App;
