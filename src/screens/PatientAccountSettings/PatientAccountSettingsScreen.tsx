import React, { useState } from "react"
import {
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native"
import { Formik } from "formik"
import { Text } from "@app/blueprints"
import Header from "@src/components/Header/Header"
import usePatientAccountSettings from "./usePatientAccountSettings"
import DeleteAccountModal from "./Components/DeleteAccountModal"
import CountryPicker from "react-native-country-picker-modal"


const PatientAccountSettingsScreen = () => {
  const {
    styles,
    navigation,
    isLoading,
    profileData,
    profilePhoto,
    fieldValidation,
    handleSave,
    handleImagePicker,
    color,
    showDeleteModal,
    setShowDeleteModal,
    handleDeletePress,
    handleDeleteConfirm,
    countryCode,
    setCountryCode,
    callingCode,
    setCallingCode,
  } = usePatientAccountSettings()
  console.log("🚀 ~ PatientAccountSettingsScreen ~ profilePhoto:", profilePhoto)
  const [showCountryPicker, setShowCountryPicker] = useState(false)

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <Header title="Account Settings" onPress={() => navigation.goBack()} />
      {isLoading && !profileData ? (
        <View style={[styles.container, styles.centerContent]}>
          <ActivityIndicator size="large" color={color.primaryColor} />
        </View>
      ) : (
        <ScrollView style={styles.contentContainer}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handleImagePicker}>
              {profilePhoto ? (
                <Image
                  source={{ uri: profilePhoto }}
                  style={styles.avatar}
                  defaultSource={require("@src/assets/images/placeholder.webp")}
                />
              ) : (
                <View style={styles.avatar} />
              )}
              <Text style={styles.editText}>Edit your Account</Text>
            </TouchableOpacity>
          </View>

          {profileData && (
            <Formik
              initialValues={{ ...profileData, countryCode: profileData.countryCode || "+1" }}
              validationSchema={fieldValidation}
              onSubmit={handleSave}
              enableReinitialize
            >
              {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }: any) => (
                <View>
                  <View style={styles.nameContainer}>
                    <View style={styles.halfWidth}>
                      <Text preset="h2">First name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="First name"
                        placeholderTextColor={color.Tertiary}
                        value={values.firstName}
                        onChangeText={handleChange("firstName")}
                        onBlur={handleBlur("firstName")}
                      />
                      {touched.firstName && errors.firstName && (
                        <Text style={{ color: color.errorText }}>{errors?.firstName}</Text>
                      )}
                    </View>

                    <View style={styles.halfWidth}>
                      <Text preset="h2">Last name</Text>
                      <TextInput
                        style={styles.input}
                        placeholder="Last name"
                        placeholderTextColor={color.Tertiary}
                        value={values.lastName}
                        onChangeText={handleChange("lastName")}
                        onBlur={handleBlur("lastName")}
                      />
                      {touched.lastName && errors.lastName && (
                        <Text style={{ color: color.errorText }}>{errors.lastName}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text preset="h2">Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="youremail@gmail.com"
                      placeholderTextColor={color.Tertiary}
                      keyboardType="email-address"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                    />
                    {touched.email && errors.email && <Text style={{ color: color.errorText }}>{errors.email}</Text>}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text preset="h2">Phone Number</Text>
                    <View style={[styles.input, { flexDirection: "row", alignItems: "center", padding: 0, paddingLeft: 8, }]}>
                      <TouchableOpacity
                        onPress={() => setShowCountryPicker(true)}
                        style={{ flexDirection: "row", alignItems: "center", marginRight: 8 }}
                      >
                        <CountryPicker
                          //@ts-ignore
                          countryCode={countryCode}
                          withFilter
                          withFlag
                          withCallingCode
                          withCountryNameButton={false}
                          onSelect={(country: any) => {
                            setCountryCode(country.cca2)
                            setCallingCode(country.callingCode[0])
                          }}
                          visible={showCountryPicker}
                          onClose={() => setShowCountryPicker(false)}
                        />
                        <Text style={{ marginLeft: -4, fontSize: 14 }}>+{callingCode}</Text>
                      </TouchableOpacity>
                      <TextInput
                        style={{ flex: 1 }}
                        placeholder="452 23445 5"
                        placeholderTextColor={color.Tertiary}
                        keyboardType="phone-pad"
                        value={values.phone}
                        onChangeText={handleChange("phone")}
                        onBlur={handleBlur("phone")}
                      />
                    </View>
                    {touched.phone && errors.phone && <Text style={{ color: color.errorText }}>{errors.phone}</Text>}
                  </View>

                  <TouchableOpacity
                    style={[styles.saveButton, isLoading && styles.disabledButton]}
                    onPress={() => handleSubmit()}
                    disabled={isLoading}
                  >
                    {isLoading ? <ActivityIndicator color="white" /> : <Text style={styles.saveButtonText}>Save</Text>}
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePress}>
                    <Text style={styles.deleteButtonText}>Delete your Account</Text>
                  </TouchableOpacity>

                  <DeleteAccountModal
                    visible={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    onDelete={handleDeleteConfirm}
                    color={color}
                  />
                </View>
              )}
            </Formik>
          )}
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  )
}

export default React.memo(PatientAccountSettingsScreen)

