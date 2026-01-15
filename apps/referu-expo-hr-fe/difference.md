# Next.js → React Native: Key Differences

> For full-stack JS developers transitioning from Next.js to React Native + Expo

## 🎯 Mental Model Shift

| Concept        | Next.js (Web)                   | React Native (Mobile)                |
| -------------- | ------------------------------- | ------------------------------------ |
| **Runtime**    | Browser (DOM)                   | iOS/Android (Native)                 |
| **Routing**    | File-based (`/pages` or `/app`) | File-based (`/app` with Expo Router) |
| **Navigation** | URL changes                     | Screen transitions                   |
| **Styling**    | CSS/Tailwind/CSS-in-JS          | StyleSheet (CSS-in-JS only)          |
| **Deployment** | Vercel/hosting → browser        | EAS Build → App Store/Play Store     |

---

## 1. Components: HTML → Native

React Native doesn't use HTML elements. It renders **native UI components**.

### Component Mapping

| Next.js/Web             | React Native                          | Notes                               |
| ----------------------- | ------------------------------------- | ----------------------------------- |
| `<div>`                 | `<View>`                              | Container/box                       |
| `<p>`, `<span>`, `<h1>` | `<Text>`                              | All text must be in `<Text>`        |
| `<img>`                 | `<Image>`                             | From `expo-image` or `react-native` |
| `<button>`              | `<Pressable>` or `<TouchableOpacity>` | Touchable components                |
| `<input>`               | `<TextInput>`                         | Form inputs                         |
| `<a>`                   | `<Link>`                              | From `expo-router`                  |

### Example Comparison

**Next.js:**

```tsx
<div className="container">
  <h1>Hello World</h1>
  <button onClick={() => alert("Hi")}>Click me</button>
</div>
```

**React Native:**

```tsx
<View style={styles.container}>
  <Text style={styles.title}>Hello World</Text>
  <Pressable onPress={() => Alert.alert("Hi")}>
    <Text>Click me</Text>
  </Pressable>
</View>
```

---

## 2. Routing: The Good News!

**Expo Router** uses file-based routing just like Next.js App Router!

### Direct Comparison

| Feature            | Next.js                | Expo Router          |
| ------------------ | ---------------------- | -------------------- |
| File-based routing | ✅ `app/page.tsx`      | ✅ `app/index.tsx`   |
| Dynamic routes     | ✅ `app/[id]/page.tsx` | ✅ `app/[id].tsx`    |
| Layouts            | ✅ `app/layout.tsx`    | ✅ `app/_layout.tsx` |
| Route groups       | ✅ `app/(group)/`      | ✅ `app/(group)/`    |
| Nested routes      | ✅                     | ✅                   |

### Routing Example

**Next.js:**

```
app/
├── page.tsx              → /
├── about/page.tsx        → /about
├── posts/[id]/page.tsx   → /posts/:id
└── layout.tsx
```

**Expo Router:**

```
app/
├── index.tsx             → Home screen
├── about.tsx             → /about (modal/screen)
├── posts/[id].tsx        → /posts/:id
└── _layout.tsx
```

### Navigation

**Next.js:**

```tsx
import Link from "next/link";
import { useRouter } from "next/navigation";

<Link href="/about">About</Link>;

const router = useRouter();
router.push("/profile");
```

**Expo Router:**

```tsx
import { Link, router } from "expo-router";

<Link href="/about">About</Link>;

router.push("/profile");
```

---

## 3. Styling: CSS → StyleSheet

React Native uses **JavaScript objects** for styling, not CSS files.

### Key Differences

| CSS (Next.js)           | StyleSheet (React Native)              |
| ----------------------- | -------------------------------------- |
| `className="container"` | `style={styles.container}`             |
| CSS files               | `StyleSheet.create()`                  |
| `display: grid`         | ❌ Not available                       |
| `display: flex`         | ✅ Default (Flexbox everywhere)        |
| Media queries           | ❌ Use `Dimensions` or platform checks |
| Hover states            | ❌ Use `Pressable` states instead      |

### Example

**Next.js (CSS Modules):**

```tsx
// styles.module.css
.container {
  display: flex;
  padding: 20px;
  background-color: #fff;
}

// component
<div className={styles.container}>...</div>
```

**React Native:**

```tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1, // flexbox is default
    padding: 20,
    backgroundColor: "#fff",
  },
});

<View style={styles.container}>...</View>;
```

### Layout: Flexbox Only

- **No CSS Grid** in React Native
- Everything uses **Flexbox** by default
- `flexDirection: 'column'` is the default (not `row` like on web!)

```tsx
<View style={{ flexDirection: "row", gap: 10 }}>
  <View style={{ flex: 1 }} />
  <View style={{ flex: 2 }} />
</View>
```

---

## 4. No Browser APIs

| Web API                 | React Native Alternative                                        |
| ----------------------- | --------------------------------------------------------------- |
| `localStorage`          | `AsyncStorage` from `@react-native-async-storage/async-storage` |
| `sessionStorage`        | State or context (no direct equivalent)                         |
| `window.location`       | `expo-router` navigation                                        |
| `fetch`                 | ✅ Still works!                                                 |
| `document`, `window`    | ❌ Not available                                                |
| `navigator.geolocation` | `expo-location`                                                 |
| File input              | `expo-image-picker`, `expo-document-picker`                     |

### Storage Example

**Next.js:**

```tsx
localStorage.setItem("token", "abc123");
const token = localStorage.getItem("token");
```

**React Native:**

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

await AsyncStorage.setItem("token", "abc123");
const token = await AsyncStorage.getItem("token");
```

---

## 5. Native Features with Expo

Expo provides **managed native APIs** — no need to touch Xcode or Android Studio!

| Feature       | Expo Package                       |
| ------------- | ---------------------------------- |
| Camera        | `expo-camera`, `expo-image-picker` |
| Location      | `expo-location`                    |
| Notifications | `expo-notifications`               |
| File system   | `expo-file-system`                 |
| Sensors       | `expo-sensors`                     |
| Share         | `expo-sharing`                     |

### Example: Image Picker

```tsx
import * as ImagePicker from "expo-image-picker";

const pickImage = async () => {
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
  });

  if (!result.canceled) {
    console.log(result.assets[0].uri);
  }
};
```

---

## 6. Platform-Specific Code

Handle iOS vs Android differences:

### Option 1: Platform API

```tsx
import { Platform, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 50 : 20,
  },
});

if (Platform.OS === "ios") {
  // iOS-specific logic
}
```

### Option 2: Platform-Specific Files

```
components/
├── Button.tsx          // Shared code
├── Button.ios.tsx      // iOS-specific
└── Button.android.tsx  // Android-specific
```

```tsx
import Button from "./Button"; // Auto-selects correct file
```

---

## 7. Deployment

### Next.js Deployment

```bash
git push              # Push to GitHub
# Auto-deployed to Vercel
# Users visit URL in browser
```

### React Native Deployment

```bash
eas build --platform ios     # Build iOS app
eas build --platform android # Build Android app
eas submit                   # Submit to App Store/Play Store
# Users download from app stores
```

| Aspect       | Next.js               | React Native                               |
| ------------ | --------------------- | ------------------------------------------ |
| Build output | Static/server files   | `.ipa` (iOS) / `.apk` (Android)            |
| Hosting      | Vercel, Netlify, etc. | App Store, Google Play                     |
| Updates      | Instant (just deploy) | App Store review (unless using EAS Update) |
| Distribution | URL                   | Store download                             |

---

## 8. Development Workflow

### Next.js

```bash
npm run dev           # Start dev server
# Open http://localhost:3000
# Edit code → auto refresh
```

### React Native + Expo

```bash
npx expo start        # Start Metro bundler
# Scan QR code with Expo Go app
# Edit code → Fast Refresh on device
```

**Testing:**

- **iOS Simulator** (Mac only)
- **Android Emulator** (any OS)
- **Physical device** via Expo Go (easiest!)

---

## 9. Common Folder Structure

### Next.js App Router

```
my-next-app/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── api/
├── components/
├── lib/
└── public/
```

### Expo Router

```
my-expo-app/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── (tabs)/          # Route groups
├── components/
├── constants/
├── hooks/
└── assets/
    ├── images/
    └── fonts/
```

---

## 10. Key Takeaways for Next.js Developers

✅ **What's the Same:**

- React hooks, components, props, state
- TypeScript support
- File-based routing (with Expo Router)
- Fast Refresh / Hot Module Replacement
- Component-driven architecture

⚠️ **What's Different:**

- No HTML/CSS → Use native components + StyleSheet
- No browser APIs → Use Expo/React Native APIs
- Flexbox-only layout (no Grid)
- Deployment to app stores (not web hosting)
- Platform-specific considerations (iOS/Android)

🎓 **Pro Tips:**

1. Think "screens" not "pages"
2. All text must be wrapped in `<Text>`
3. Use `Pressable` for any touchable element
4. Debug with React Native Debugger or Expo dev tools
5. Test on real devices early and often
