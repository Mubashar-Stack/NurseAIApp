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
    navigation
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
              <Text preset="h1" style={styles.sectionTitle}>Address Details</Text>
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit}
                enableReinitialize
              >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                  <View>
                    {/* <View style={styles.inputContainer}>
                      <View style={styles.textView}>
                        <TextInput
                          style={styles.input}
                          placeholder="Building number"
                          value={values.buildingNumber}
                          onChangeText={handleChange('buildingNumber')}
                          onBlur={handleBlur('buildingNumber')}
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.buildingNumber && errors.buildingNumber && (
                        <Text style={styles.errorText}>{errors.buildingNumber}</Text>
                      )}
                    </View>

                    <View style={styles.inputContainer}>
                      <View style={styles.textView}>
                        <TextInput
                          style={styles.input}
                          placeholder="Apartment number"
                          value={values.apartmentNumber}
                          onChangeText={handleChange('apartmentNumber')}
                          onBlur={handleBlur('apartmentNumber')}
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.apartmentNumber && errors.apartmentNumber && (
                        <Text style={styles.errorText}>{errors.apartmentNumber}</Text>
                      )}
                    </View>

                    <View style={styles.inputContainer}>
                      <View style={styles.textView}>
                        <TextInput
                          style={styles.input}
                          placeholder="Floor number"
                          value={values.floorNumber}
                          onChangeText={handleChange('floorNumber')}
                          onBlur={handleBlur('floorNumber')}
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.floorNumber && errors.floorNumber && (
                        <Text style={styles.errorText}>{errors.floorNumber}</Text>
                      )}
                    </View> */}


                    {/* <View style={styles.inputContainer}>
                      <View style={styles.textView}>
                        <TextInput
                          style={styles.input}
                          placeholder="Address"
                          value={values.address}
                          onChangeText={handleChange('address')}
                          onBlur={handleBlur('address')}
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.address && errors.address && (
                        <Text style={styles.errorText}>{errors.address}</Text>
                      )}
                    </View> */}

                    <View style={styles.inputContainer}>
                      <View style={styles.textView}>
                        <TextInput
                          style={styles.input}
                          placeholder="City"
                          value={values.city}
                          onChangeText={handleChange('city')}
                          onBlur={handleBlur('city')}
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
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
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
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
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
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
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
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

