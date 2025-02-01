import React from 'react';
import {
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableWithoutFeedback,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { BaseLayout } from '@src/components';
import { Text } from '@app/blueprints';
import Header from '@src/components/Header/Header';
import { Formik } from 'formik';
import usePatientLocationSetup from './usePatientLocationSetup';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PatientLocationSetupScreen = ({ route }: any) => {
  const locationId = route.params?.locationId;
  const {
    color,
    styles,
    disabled,
    loading,
    fieldValidation,
    initialValues,
    handleSubmit,
    navigation,
    handleVoiceInput,
    isListening,
    activeField,
  } = usePatientLocationSetup(locationId);

  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.mainView}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <Header onPress={() => navigation.goBack()} title="Location" />
          <View style={styles.subView}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <Text preset="h1" style={styles.sectionTitle}>Address Detail</Text> */}
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View>
                    <View style={styles.inputContainer}>
                      <View style={styles.textView}>
                        <TextInput
                          style={styles.input}
                          placeholder="City"
                          value={values.city}
                          onChangeText={handleChange('city')}
                          onBlur={handleBlur('city')}
                        />
                        <TouchableOpacity onPress={() => handleVoiceInput('city')}>
                          <Ionicons
                            name={isListening && activeField === 'city' ? "mic" : "mic-outline"}
                            color={color.textColor}
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.city && errors.city && (
                        <Text style={styles.errorText}>{errors.city}</Text>
                      )}
                    </View>

                    <View style={styles.inputContainer}>
                      <View style={styles.textView}>
                        <TextInput
                          style={styles.input}
                          placeholder="State"
                          value={values.state}
                          onChangeText={handleChange('state')}
                          onBlur={handleBlur('state')}
                        />
                        <TouchableOpacity onPress={() => handleVoiceInput('state')}>
                          <Ionicons
                            name={isListening && activeField === 'state' ? "mic" : "mic-outline"}
                            color={color.textColor}
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.state && errors.state && (
                        <Text style={styles.errorText}>{errors.state}</Text>
                      )}
                    </View>

                    <View style={styles.inputContainer}>
                      <View style={styles.textView}>
                        <TextInput
                          style={styles.input}
                          placeholder="Postal Code"
                          value={values.postalCode}
                          onChangeText={handleChange('postalCode')}
                          onBlur={handleBlur('postalCode')}
                        />
                        <TouchableOpacity onPress={() => handleVoiceInput('postalCode')}>
                          <Ionicons
                            name={isListening && activeField === 'postalCode' ? "mic" : "mic-outline"}
                            color={color.textColor}
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.postalCode && errors.postalCode && (
                        <Text style={styles.errorText}>{errors.postalCode}</Text>
                      )}
                    </View>

                    <View style={styles.inputContainer}>
                      <View style={styles.textView}>
                        <TextInput
                          style={styles.input}
                          placeholder="Country"
                          value={values.country}
                          onChangeText={handleChange('country')}
                          onBlur={handleBlur('country')}
                        />
                        <TouchableOpacity onPress={() => handleVoiceInput('country')}>
                          <Ionicons
                            name={isListening && activeField === 'country' ? "mic" : "mic-outline"}
                            color={color.textColor}
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                      {touched.country && errors.country && (
                        <Text style={styles.errorText}>{errors.country}</Text>
                      )}
                    </View>

                    <TouchableOpacity
                      style={[styles.saveButton, disabled && { opacity: 0.5 }]}
                      //@ts-ignore
                      onPress={handleSubmit}
                      disabled={disabled}
                    >
                      {loading ? <ActivityIndicator size="small" color="#FFF" /> : <Text style={styles.saveButtonText}>Save</Text>}
                    </TouchableOpacity>
                  </View>
                )}
              </Formik>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseLayout>
  );
};

export default React.memo(PatientLocationSetupScreen);

