import "dotenv/config";

export default {
  expo: {
    name: "MyChatApp",
    slug: "MyChatApp",
    description:
      "this is app in development and it's a part of my final essay project, Created by Ori.L",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.Orilober.MyChatApp",
      versionCode: 1,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      eas: { projectId: "3264395e-fcad-4278-86c1-7f7cb10a9fdb" },
    },
  },
};
