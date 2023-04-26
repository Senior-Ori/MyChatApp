import React, { useState, useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import MailItem from "./components/MailInput";
import MailInput from "./components/MailInput";

const GOALS_STORAGE_KEY = "MY_APP_GOALS_STORAGE_KEY";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(true);
  const [dataMail, setDataMail] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMailsFromStorage = async () => {
      try {
        const storedMails = await AsyncStorage.getItem(GOALS_STORAGE_KEY);
        if (storedMails !== null && Array.isArray(JSON.parse(storedMails))) {
          setDataMail(JSON.parse(storedMails));
          console.log(storedMails);
          if (storedMails !== "[]") {
            setModalIsVisible(false);
          }
        }
      } catch (e) {
        console.log("Failed to load mails from storage: ", e);
      }
      setIsLoading(false);
    };
    loadMailsFromStorage();
  }, []);
  useEffect(() => {
    const saveMailsToStorage = async () => {
      try {
        await AsyncStorage.setItem(GOALS_STORAGE_KEY, JSON.stringify(dataMail));
      } catch (e) {
        console.log("Failed to save mails to storage: ", e);
      }
    };
    saveMailsToStorage();
  }, [dataMail]);

  function startAtMailHandler() {
    setModalIsVisible(true);
  }

  function endAddMailHandler() {
    setModalIsVisible(false);
  }

  function addMailHandler(enteredMailText) {
    setDataMail((currentDataMail) => [
      ...currentDataMail,
      { text: enteredMailText, id: Math.random().toString() },
    ]);
    endAddMailHandler();
  }

  function deleteMailHandler(id) {
    setDataMail((currentDataMail) => {
      return currentDataMail.filter((mail) => mail.id !== id);
    });
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5e0acc" />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="📩 הוסף תיבת דואר חדשה"
          color="#5e0acc"
          onPress={startAtMailHandler}
        />
        <MailInput
          visible={modalIsVisible}
          onCancel={endAddMailHandler}
          onAddMail={addMailHandler}
        />
        <View style={styles.mailsContainer}>
          <FlatList
            data={dataMail}
            renderItem={(itemData) => {
              return (
                <MailItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteItem={deleteMailHandler}
                />
              );
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 50,
    paddingHorizontal: 16,
    backgroundColor: "#E9C46A",
  },

  mailsContainer: {
    flex: 4,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9C46A",
  },

  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },

  emptyListContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E9C46A",
  },

  emptyListText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  emptyListButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#5e0acc",
    borderRadius: 8,
  },

  emptyListButtonText: {
    color: "white",
    fontSize: 16,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    width: "80%",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },

  modalInputContainer: {
    marginBottom: 16,
  },

  modalInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 4,
    fontSize: 16,
  },

  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },

  modalButtonCancel: {
    backgroundColor: "#ccc",
  },

  modalButtonSave: {
    backgroundColor: "#5e0acc",
  },

  modalButtonText: {
    color: "white",
    fontSize: 16,
  },
});
