"use client"

import { useAppContext } from "@src/context"
import { SingleChatStyles } from "./SingleChat.style"
import { useState, useEffect, useCallback, useRef } from "react"
import { fetchChatMessages, type ChatMessage, sendMessage, deleteMessage, markAsUnread } from "../../api/chat"
import { showErrorToast, showSuccessToast } from "@src/utils"
import { useSelector } from "react-redux"
import { PermissionsAndroid, Platform } from "react-native"
import Clipboard from "@react-native-clipboard/clipboard"

import AudioRecorderPlayer from "react-native-audio-recorder-player"
import axios from "axios"
import { Screen } from "../../navigation/appNavigation.type"

// import { uploadFile } from '../../api/upload';

const audioRecorderPlayer = new AudioRecorderPlayer()

// Define the patient info interface based on the API response
interface PatientInfo {
  patient_name: string
  gender: string
  age: number
  issue: string
  medication: string
  task_details: string
}

const useSingleChat = (chatroom: any) => {
  const { color, navigation } = useAppContext()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAttachmentSheet, setShowAttachmentSheet] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [audioFile, setAudioFile] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackDuration, setPlaybackDuration] = useState(0)
  const [currentPlaybackTime, setCurrentPlaybackTime] = useState(0)
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null)
  const [showMessageOptions, setShowMessageOptions] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})
  const scrollViewRef = useRef(null)
  const userId = useSelector((state: any) => state.auth.userInfo?.userId)
  const token = useSelector((state: any) => state.auth.isToken)
  const [showHeaderOptions, setShowHeaderOptions] = useState(false)
  const [isNurse, setIsNurse] = useState(false)
  const [isExtractingInfo, setIsExtractingInfo] = useState(false)
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null)
  const [showPatientInfoModal, setShowPatientInfoModal] = useState(false)
  const [isLoadingMedication, setIsLoadingMedication] = useState(false)
  const [medicationContent, setMedicationContent] = useState<string>("")
  const [showMedicationModal, setShowMedicationModal] = useState(false)

  // Fetch user info outside of useEffect to avoid conditional hook call
  const userInfo = useSelector((state: any) => state.auth.userInfo)

  const markAllMessagesAsRead = useCallback(async () => {
    try {
      await axios.post(`https://technlogics.co/api/mark-all-read/${chatroom.id}`, null, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      console.log("All messages marked as read")
    } catch (error: any) {
      console.error("Error marking messages as read:", error)
    }
  }, [token, chatroom.id])

  useEffect(() => {
    // Check if user is a nurse
    if (userInfo?.role === "nurse") {
      setIsNurse(true)
    } else {
      setIsNurse(false)
    }
  }, [userInfo])

  const loadMessages = useCallback(async () => {
    try {
      const response = await fetchChatMessages(token, chatroom.id)
      if (response.results.status) {
        setMessages(response.results.data.reverse())
      }
    } catch (error: any) {
      console.error("Error fetching messages:", error)
      showErrorToast(error?.message || "Failed to load messages", 2000)
    } finally {
      setIsLoading(false)
    }
  }, [chatroom.id, token])

  useEffect(() => {
    loadMessages()
    markAllMessagesAsRead()
  }, [loadMessages, markAllMessagesAsRead])

  const handleSend = async () => {
    if (message.trim() || audioFile) {
      try {
        let response
        if (audioFile) {
          // const uploadResponse = await uploadFile(token, audioFile, 'audio');
          // response = await sendMessage(token, {
          //   receiver_id: chatroom.other_user.id,
          //   content: uploadResponse.url,
          //   message_type: 'audio',
          // });
          setAudioFile(null)
        } else {
          response = await sendMessage(token, {
            receiver_id: chatroom.other_user.id,
            content: message.trim(),
            message_type: "text",
          })
        }
        if (response.status) {
          setMessage("")
          await loadMessages()
        }
      } catch (error: any) {
        console.error("Error sending message:", error)
        showErrorToast(error?.message || "Failed to send message", 2000)
      }
    }
  }

  const handleAttachment = () => {
    setShowAttachmentSheet(true)
  }

  const handleImagePicker = async (type: "camera" | "gallery") => {
    setShowAttachmentSheet(false)
    // Implement image picking logic here
    // After picking the image:
    // try {
    //   const uploadResponse = await uploadFile(token, imagePath, 'image', (progress) => {
    //     setUploadProgress({ ...uploadProgress, [imagePath]: progress });
    //   });
    //   await sendMessage(token, {
    //     receiver_id: chatroom.other_user.id,
    //     content: uploadResponse.url,
    //     message_type: 'image',
    //   });
    //   await loadMessages();
    // } catch (error: any) {
    //   console.error('Error uploading image:', error);
    //   showErrorToast(error?.message || 'Failed to upload image', 2000);
    // }
  }

  const startRecording = async () => {
    if (Platform.OS === "android") {
      try {
        //@ts-ignore
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ])

        if (
          grants["android.permission.WRITE_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.READ_EXTERNAL_STORAGE"] === PermissionsAndroid.RESULTS.GRANTED &&
          grants["android.permission.RECORD_AUDIO"] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log("Permissions granted")
        } else {
          console.log("All required permissions not granted")
          return
        }
      } catch (err) {
        console.warn(err)
        return
      }
    }

    const result = await audioRecorderPlayer.startRecorder()
    audioRecorderPlayer.addRecordBackListener((e) => {
      setRecordingDuration(e.currentPosition)
    })
    console.log(result)
    setIsRecording(true)
  }

  const stopRecording = async () => {
    if (!isRecording) return
    const result = await audioRecorderPlayer.stopRecorder()
    audioRecorderPlayer.removeRecordBackListener()
    setIsRecording(false)
    setAudioFile(result)
    setPlaybackDuration(recordingDuration)
    setRecordingDuration(0)
  }

  const playAudio = async () => {
    if (!audioFile) return
    if (isPlaying) {
      await audioRecorderPlayer.pausePlayer()
    } else {
      await audioRecorderPlayer.startPlayer(audioFile)
      audioRecorderPlayer.addPlayBackListener((e) => {
        setCurrentPlaybackTime(e.currentPosition)
        if (e.currentPosition === e.duration) {
          audioRecorderPlayer.stopPlayer()
          setIsPlaying(false)
        }
      })
    }
    setIsPlaying(!isPlaying)
  }

  const deleteAudio = () => {
    setAudioFile(null)
    setPlaybackDuration(0)
    setCurrentPlaybackTime(0)
  }

  const sendAudio = async () => {
    if (!audioFile) return
    try {
      // const uploadResponse = await uploadFile(token, audioFile, 'audio', (progress) => {
      //   setUploadProgress({ ...uploadProgress, [audioFile]: progress });
      // });
      // await sendMessage(token, {
      //   receiver_id: chatroom.other_user.id,
      //   content: uploadResponse.url,
      //   message_type: 'audio',
      // });
      deleteAudio()
      await loadMessages()
    } catch (error: any) {
      console.error("Error uploading audio:", error)
      showErrorToast(error?.message || "Failed to upload audio", 2000)
    }
  }

  const handleVoiceMessage = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  const handleLongPress = (message: ChatMessage) => {
    setSelectedMessage(message)
    setShowMessageOptions(true)
  }

  const handleDeleteMessage = async () => {
    if (selectedMessage) {
      try {
        await deleteMessage(token, selectedMessage.id)
        await loadMessages()
        showSuccessToast("Message deleted", 2000)
      } catch (error: any) {
        console.error("Error deleting message:", error)
        showErrorToast(error?.message || "Failed to delete message", 2000)
      }
    }
    setShowMessageOptions(false)
  }

  const handleMarkAsUnread = async () => {
    if (selectedMessage) {
      try {
        await markAsUnread(token, selectedMessage.id)
        showSuccessToast("Message marked as unread", 2000)
      } catch (error: any) {
        console.error("Error marking message as unread:", error)
        showErrorToast(error?.message || "Failed to mark message as unread", 2000)
      }
    }
    setShowMessageOptions(false)
  }

  const isUserMessage = (senderId: number) => {
    return senderId === userId
  }

  const handleGetDocument = async () => {
    try {
      //@ts-ignore
      navigation.navigate(Screen.DETAIL_RESPONSE_SCREEN, { message: selectedMessage?.content })
    } catch (error: any) {
      console.error("Error marking messages as read:", error)
    }
  }

  const handleHeaderOptionsPress = () => {
    setShowHeaderOptions(true)
  }

  const handleAddTask = async () => {
    try {
      setIsLoadingMedication(true)
      setShowHeaderOptions(false)

      const response = await axios.post(`https://technlogics.co/api/medication-recommendations/${chatroom.id}`, null, {
        headers: {
          Authorization: `Token ${token}`,
          Accept: "application/json",
        },
      })

      if (response.data.status) {
        // Store the markdown content
        setMedicationContent(response.data.data || "No recommendations available.")
        // Show the medication modal
        console.log("🚀 ~ handleAddTask ~ response.data.data:", response.data.data)
        setShowMedicationModal(true)
        showSuccessToast(response.data.message, 2000)
      } else {
        showErrorToast("Failed to get medication recommendations", 2000)
      }
    } catch (error: any) {
      console.error("Error getting medication recommendations:", error)
      showErrorToast(error?.message || "Failed to get medication recommendations", 2000)
    } finally {
      setIsLoadingMedication(false)
    }
  }

  // Function to copy medication content to clipboard
  const copyMedicationContent = () => {
    try {
      Clipboard.setString(medicationContent?.recommendation)
      showSuccessToast("Text copied to clipboard", 2000)
    } catch (error) {
      showErrorToast("Failed to copy text", 2000)
    }
    showSuccessToast("Content copied to clipboard", 2000)
  }

  // Add a new function to handle extracting patient info from a message
  const handleExtractPatientInfo = async () => {
    if (selectedMessage) {
      try {
        setIsExtractingInfo(true)
        setShowMessageOptions(false)

        // Create form data for the API request
        const formData = new FormData()
        formData.append("text", selectedMessage.content)

        const response = await axios.post("https://technlogics.co/api/extract-patient-info", formData, {
          headers: {
            Authorization: `Token ${token}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        })

        if (response.data.status) {
          // Store the extracted patient info
          setPatientInfo(response.data.data)
          // Show the patient info modal
          setShowPatientInfoModal(true)
        } else {
          showErrorToast("Failed to extract patient information", 2000)
        }
      } catch (error: any) {
        console.error("Error extracting patient info:", error)
        showErrorToast(error?.message || "Failed to extract patient information", 2000)
      } finally {
        setIsExtractingInfo(false)
      }
    }
  }

  // Function to navigate to AddTask screen with extracted patient info
  const navigateToAddTask = () => {
    if (patientInfo) {
      setShowPatientInfoModal(false)
      navigation.navigate(Screen.ADD_TASK_LIST, { patientInfo })
    }
  }

  // Add the new function to the return object
  return {
    color,
    navigation,
    styles: SingleChatStyles(color),
    messages,
    message,
    setMessage,
    handleSend,
    handleAttachment,
    handleVoiceMessage,
    isLoading,
    scrollViewRef,
    isUserMessage,
    otherUser: chatroom.other_user,
    showAttachmentSheet,
    setShowAttachmentSheet,
    handleImagePicker,
    isRecording,
    recordingDuration,
    audioFile,
    playAudio,
    isPlaying,
    playbackDuration,
    currentPlaybackTime,
    deleteAudio,
    sendAudio,
    handleLongPress,
    showMessageOptions,
    setShowMessageOptions,
    handleDeleteMessage,
    handleMarkAsUnread,
    uploadProgress,
    handleGetDocument,
    showHeaderOptions,
    setShowHeaderOptions,
    handleHeaderOptionsPress,
    handleAddTask,
    isNurse,
    handleExtractPatientInfo,
    isExtractingInfo,
    patientInfo,
    showPatientInfoModal,
    setShowPatientInfoModal,
    navigateToAddTask,
    isLoadingMedication,
    medicationContent,
    showMedicationModal,
    setShowMedicationModal,
    copyMedicationContent,
  }
}

export default useSingleChat
