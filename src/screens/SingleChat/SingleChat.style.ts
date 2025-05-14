import { StyleSheet } from "react-native"
import type { Palette } from "@src/utils"

export const SingleChatStyles = ({ textColor, backgroundColor, Tertiary }: Palette) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F9F9F9",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F9F9F9",
      borderBottomWidth: 1,
      borderBottomColor: "#F2F2F2",
    },
    backButton: {
      marginRight: 12,
    },
    userInfo: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "#E1E1E1",
      marginRight: 12,
    },
    userName: {
      fontSize: 16,
      fontWeight: "600",
      color: textColor,
    },
    headerActions: {
      flexDirection: "row",
      gap: 20,
    },
    headerOptionsButton: {
      padding: 8,
    },
    chatContainer: {
      flex: 1,
      padding: 16,
      backgroundColor: "#F9F9F9",
    },
    messageWrapper: {
      marginBottom: 16,
      maxWidth: "75%",
      flexDirection: "row",
      alignItems: "flex-end",
    },
    userMessage: {
      alignSelf: "flex-end",
    },
    receiverMessage: {
      alignSelf: "flex-start",
    },
    messageBubble: {
      padding: 12,
      borderRadius: 20,
    },
    userBubble: {
      backgroundColor: "#002A65",
      borderBottomRightRadius: 4,
    },
    receiverBubble: {
      backgroundColor: "#F2F2F2",
      borderBottomLeftRadius: 4,
    },
    userText: {
      color: "#FFFFFF",
      fontSize: 14,
    },
    receiverText: {
      color: textColor,
      fontSize: 14,
    },
    inputContainer: {
      padding: 8,
      backgroundColor: "#F9F9F9",
      borderTopWidth: 1,
      borderTopColor: "#F2F2F2",
    },
    inputWrapper: {
      width: "99%",
      marginTop: 10,
      flexDirection: "row",
      alignSelf: "center",
      borderRadius: 16,
      backgroundColor: Tertiary,
      paddingHorizontal: 10,
      height: 52,
      alignItems: "center",
      justifyContent: "space-between",
    },
    input: {
      flex: 1,
      marginHorizontal: 8,
      fontSize: 16,
      color: textColor,
      maxHeight: 100,
    },
    inputActions: {
      flexDirection: "row",
      alignItems: "center",
      gap: 16,
    },
    sendButton: {
      backgroundColor: "#002A65",
      borderRadius: 24,
      padding: 10,
    },
    attachmentBubble: {
      padding: 16,
      backgroundColor: "#666666",
      borderRadius: 20,
    },
    attachmentText: {
      color: "#FFFFFF",
      fontSize: 14,
    },
    messageTime: {
      fontSize: 12,
      color: "#8E8E93",
      marginTop: 4,
      alignSelf: "flex-end",
    },
    modal: {
      justifyContent: "flex-end",
      margin: 0,
    },
    modalContent: {
      backgroundColor: "white",
      padding: 22,
      justifyContent: "center",
      alignItems: "center",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    modalItem: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10,
    },
    modalItemText: {
      marginLeft: 10,
      fontSize: 16,
      color: "#000000",
    },
    recordingContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#7C3AED",
      borderRadius: 24,
      padding: 12,
      margin: 8,
    },
    recordingIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: "#FF0000",
      marginRight: 8,
    },
    recordingWaveform: {
      flex: 1,
      height: 40,
      marginHorizontal: 12,
    },
    recordingDuration: {
      color: "#FFFFFF",
      fontSize: 16,
      marginHorizontal: 12,
    },
    stopRecordingButton: {
      padding: 8,
    },
    audioPlayerContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#1F2937",
      borderRadius: 24,
      padding: 12,
      margin: 8,
    },
    audioProgress: {
      flex: 1,
      height: 4,
      backgroundColor: "#4B5563",
      borderRadius: 2,
      marginHorizontal: 12,
    },
    audioProgressFill: {
      height: "100%",
      backgroundColor: "#7C3AED",
      borderRadius: 2,
    },
    audioControls: {
      flexDirection: "row",
      alignItems: "center",
    },
    playButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "#7C3AED",
      justifyContent: "center",
      alignItems: "center",
      marginRight: 8,
    },
    audioDuration: {
      color: "#FFFFFF",
      fontSize: 14,
      marginHorizontal: 8,
    },
    audioActions: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 12,
    },
    deleteButton: {
      padding: 8,
      marginRight: 8,
    },
    sendAudioButton: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: "#7C3AED",
      justifyContent: "center",
      alignItems: "center",
    },
    waveformContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 8,
    },
    waveformBar: {
      width: 3,
      backgroundColor: "#FFFFFF",
      marginHorizontal: 1,
    },
    // Loading overlay styles
    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    loadingContainer: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 20,
      alignItems: "center",
      width: "80%",
    },
    loadingText: {
      marginTop: 12,
      fontSize: 16,
      color: textColor,
      textAlign: "center",
    },
    // Patient info modal styles
    patientInfoModalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    patientInfoModal: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 20,
      width: "90%",
      maxHeight: "80%",
    },
    patientInfoTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: "#002A65",
      marginBottom: 16,
      textAlign: "center",
    },
    patientInfoContent: {
      marginBottom: 20,
    },
    patientInfoRow: {
      flexDirection: "row",
      marginBottom: 12,
    },
    patientInfoLabel: {
      fontSize: 16,
      fontWeight: "600",
      color: textColor,
      width: "35%",
    },
    patientInfoValue: {
      fontSize: 16,
      color: textColor,
      flex: 1,
    },
    patientInfoButtons: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    patientInfoButton: {
      borderRadius: 8,
      padding: 12,
      flex: 1,
      marginHorizontal: 8,
      alignItems: "center",
    },
    patientInfoCancelButton: {
      backgroundColor: "#F2F2F2",
    },
    patientInfoCancelButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#000000",
    },
    patientInfoConfirmButton: {
      backgroundColor: "#002A65",
    },
    patientInfoButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#FFFFFF",
    },
    // Medication modal styles
    medicationModalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    medicationModal: {
      backgroundColor: "#FFFFFF",
      borderRadius: 12,
      padding: 20,
      width: "90%",
      maxHeight: "80%",
    },
    medicationModalHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 16,
    },
    medicationModalTitle: {
      fontSize: 20,
      fontWeight: "600",
      color: "#002A65",
    },
    medicationCloseButton: {
      padding: 5,
    },
    medicationContent: {
      maxHeight: "70%",
    },
    medicationButtons: {
      marginTop: 20,
      alignItems: "center",
    },
    medicationCopyButton: {
      backgroundColor: "#002A65",
      borderRadius: 8,
      padding: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
    },
    medicationButtonText: {
      fontSize: 16,
      fontWeight: "600",
      color: "#FFFFFF",
      marginLeft: 8,
    },
    // Markdown styles
    markdownStyles: {
      body: {
        color: textColor,
        fontSize: 16,
      },
      heading1: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#002A65",
      },
      heading2: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 8,
        color: "#002A65",
      },
      heading3: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 6,
        color: "#002A65",
      },
      paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 4,
      },
      strong: {
        fontWeight: "bold",
      },
      em: {
        fontStyle: "italic",
      },
      bullet_list: {
        marginLeft: 10,
      },
      ordered_list: {
        marginLeft: 10,
      },
      list_item: {
        marginBottom: 6,
      },
    },
  })
