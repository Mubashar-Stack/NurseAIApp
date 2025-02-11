import React from "react"
import { View, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native"
import { Text } from "@app/blueprints"
import useMedicalHistory from "./useMedicalHistory"
import Feather from "react-native-vector-icons/Feather"
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicatorWrapper,
  ActionsheetDragIndicator,
  ActionsheetItem,
  ActionsheetItemText,
} from "@gluestack-ui/themed"

const MedicalHistoryScreen = () => {
  const {
    styles,
    navigation,
    healthDetails,
    setHealthDetails,
    handleDocumentSelect,
    handleImagePicker,
    handleSave,
    isLoading,
    showActionsheet,
    setShowActionsheet,
    document,
    handleActionSheet
  } = useMedicalHistory()

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.title}>Medical History</Text>
      </View>

      <ScrollView style={styles.content}>
        <TextInput
          style={styles.textInput}
          placeholder="Please mention all details related to your health issue here."
          placeholderTextColor="#999999"
          multiline
          value={healthDetails}
          onChangeText={setHealthDetails}
        />

        <Text style={styles.sectionTitle}>Medical Report</Text>
        <TouchableOpacity
          //@ts-ignore
          style={[styles.uploadContainer, document.uri && styles.uploadContainerSuccess]}
          onPress={handleActionSheet}
          activeOpacity={0.7}
        >
          {document.uri ? (
            <Feather name="check-circle" size={28} color="#4CAF50" />
          ) : (
            <Feather name="upload" size={35} color="#002A65" style={styles.uploadIcon} />
          )}
          <Text style={styles.uploadText}>{document.uri ? "Document uploaded" : "Upload your medical report"}</Text>
        </TouchableOpacity>
      </ScrollView>

      <TouchableOpacity
        style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        {isLoading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.saveButtonText}>Save</Text>}
      </TouchableOpacity>

      <Actionsheet isOpen={showActionsheet} onClose={() => setShowActionsheet(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <ActionsheetItem onPress={() => handleImagePicker("camera")}>
            <Feather name="camera" size={20} color="#000000" />
            <ActionsheetItemText>Take Picture</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => handleImagePicker("gallery")}>
            <Feather name="image" size={20} color="#000000" />
            <ActionsheetItemText>Choose from gallery</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem onPress={handleDocumentSelect}>
            <Feather name="file" size={20} color="#000000" />
            <ActionsheetItemText>Pick Document</ActionsheetItemText>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>
    </View>
  )
}

export default React.memo(MedicalHistoryScreen)

