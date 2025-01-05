import React from 'react';
import { View, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Image } from 'react-native';
import { Formik } from 'formik';
import { Text } from '@app/blueprints';
import Header from '@src/components/Header/Header';
import useAccountSettings from './useAccountSetting';
import DeleteAccountModal from './Components/DeleteAccountModal';
import DropdownPicker from '@src/components/Dropdown/DropdownPicker';

const specialityOptions = [
  { label: 'Pediatrics', value: 'Pediatrics' },
  { label: 'Geriatrics', value: 'Geriatrics' },
  { label: 'Critical Care', value: 'Critical Care' },
  { label: 'Surgical Nursing', value: 'Surgical Nursing' },
  { label: 'Oncology Nursing', value: 'Oncology Nursing' },
];

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
  } = useAccountSettings();


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header
        title="Account Settings"
        onPress={() => navigation.goBack()}
      />
      {isLoading && !profileData ? <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={color.primaryColor} />
      </View> : <ScrollView style={styles.contentContainer}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleImagePicker}>
            {profilePhoto ? (
              <Image
                source={{ uri: profilePhoto }}
                style={styles.avatar}
                defaultSource={require('@src/assets/images/placeholder.webp')}
              />
            ) : (
              <View style={styles.avatar} />
            )}
            <Text style={styles.editText}>Edit your Account</Text>
          </TouchableOpacity>
        </View>

        {profileData && (
          <Formik
            initialValues={profileData}
            validationSchema={fieldValidation}
            onSubmit={handleSave}
            enableReinitialize
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }: any) => (
              <View>
                <View style={styles.nameContainer}>
                  <View style={styles.halfWidth}>
                    <Text preset="h2">First name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="First name"
                      placeholderTextColor={color.Tertiary}
                      value={values.firstName}
                      onChangeText={handleChange('firstName')}
                      onBlur={handleBlur('firstName')}
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
                      onChangeText={handleChange('lastName')}
                      onBlur={handleBlur('lastName')}
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
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {touched.email && errors.email && (
                    <Text style={{ color: color.errorText }}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <Text preset="h2">Phone Number</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="00 452 23445 5"
                    placeholderTextColor={color.Tertiary}
                    keyboardType="phone-pad"
                    value={values.phone}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                  />
                  {touched.phone && errors.phone && (
                    <Text style={{ color: color.errorText }}>{errors.phone}</Text>
                  )}
                </View>

                <View style={{ marginBottom: 16 }}>
                  <DropdownPicker
                    label="Specialty"
                    options={specialityOptions}
                    selectedValue={values.speciality}
                    onValueChange={(itemValue) => setFieldValue('speciality', itemValue)}
                  />
                  {touched.speciality && errors.speciality && (
                    <Text style={{ color: color.errorText }}>{errors.speciality}</Text>
                  )}
                </View>

                <TouchableOpacity
                  style={[styles.saveButton, isLoading && styles.disabledButton]}
                  onPress={() => handleSubmit()}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text style={styles.saveButtonText}>Save</Text>
                  )}
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
      </ScrollView>}
    </KeyboardAvoidingView>
  );
};

export default React.memo(PatientAccountSettingsScreen);

