import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Text } from '@app/blueprints';
import { BaseLayout } from '@src/components';
import useAddTask from './useAddTasks';
import { AddTaskStyles } from './AddTask.style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropdownPicker from '@src/components/Dropdown/DropdownPicker';

const AddTaskScreen = () => {
  const {
    color,
    navigation,
    initialValues,
    fieldValidation,
    handleSubmit,
    completeTask,
    isLoading,
    searchPatients,
    searchResults,
    isSearching,
    setSearchResults
  } = useAddTask();

  const styles = AddTaskStyles(color);

  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <AntDesign name="left" size={24} color={color.textColor} />
              </TouchableOpacity>
              <View style={styles.shiftInfo}>
                <Feather name="clock" color={color.textColor} size={24} />
                <View style={styles.shiftDetails}>
                  <Text style={{ fontSize: 12, color: color.textColor }}>
                    Shift timing
                  </Text>
                  <Text style={{ fontSize: 12, fontWeight: '500', color: color.textColor }}>
                    09:00 AM - 05:00 PM
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              style={styles.completeTaskButton}
              onPress={completeTask}
            >
              <Text style={styles.completeTaskText}>Complete Task</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Formik
              initialValues={initialValues}
              validationSchema={fieldValidation}
              onSubmit={handleSubmit}
            >
              {({
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View>
                  <Text style={styles.title}>Add Task</Text>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Patient Name</Text>
                    <View style={[styles.inputWrapper, { zIndex: 1 }]}>
                      <TextInput
                        style={styles.input}
                        placeholder="Type patient name"
                        placeholderTextColor="#999999"
                        value={values.patientName}
                        onChangeText={(text) => {
                          setFieldValue('patientName', text);
                          searchPatients(text);
                        }}
                        onBlur={handleBlur('patientName')}
                      />
                      <TouchableOpacity style={styles.micButton}>
                        <Ionicons name="mic-outline" color={color.textColor} size={24} />
                      </TouchableOpacity>
                    </View>
                    {isSearching && (
                      <ActivityIndicator style={styles.searchLoader} color={color.textColor} />
                    )}
                    {searchResults.length > 0 && (
                      <View style={styles.searchResults}>
                        {searchResults.map((patient) => (
                          <TouchableOpacity
                            key={patient.id}
                            style={styles.searchResultItem}
                            onPress={() => {
                              setFieldValue('patientName', patient.name);
                              setFieldValue('patient', 36);
                              // setFieldValue('sex', patient.gender);
                              setSearchResults([]);
                            }}
                          >
                            <Text style={styles.patientName}>{patient.name}</Text>
                            <Text style={styles.patientInfo}>
                              {patient.email} • {patient.mobile_no}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}
                    {touched.patientName && errors.patientName && (
                      <Text style={styles.errorText}>{errors.patientName}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Issue</Text>
                    <View style={{ marginTop: -30 }}>
                      <DropdownPicker
                        label=""
                        options={[
                          { label: 'Kidney issue', value: 'Kidney issue' },
                          { label: 'Stomach issue', value: 'Stomach issue' },
                          { label: 'Liver issue', value: 'Liver issue' },
                        ]}
                        selectedValue={values.issue}
                        onValueChange={(value) => setFieldValue('issue', value)}
                      />
                    </View>

                    {touched.issue && errors.issue && (
                      <Text style={styles.errorText}>{errors.issue}</Text>
                    )}
                  </View>

                  <View style={styles.rowContainer}>
                    <View style={styles.halfWidth}>
                      <Text style={styles.label}>Age</Text>
                      <View style={{ marginTop: -30 }}>
                        <DropdownPicker
                          label=""
                          options={[
                            { label: '10-20', value: '10-20' },
                            { label: '20-30', value: '20-30' },
                            { label: '30-40', value: '30-40' },
                          ]}
                          selectedValue={values.age}
                          onValueChange={(value) => setFieldValue('age', value)}
                        />
                      </View>
                      {touched.age && errors.age && (
                        <Text style={styles.errorText}>{errors.age}</Text>
                      )}
                    </View>

                    <View style={styles.halfWidth}>
                      <Text style={styles.label}>Sex</Text>
                      <View style={{ marginTop: -30 }}>
                        <DropdownPicker
                          label=""
                          options={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                            { label: 'Other', value: 'Other' },
                          ]}
                          selectedValue={values.sex}
                          onValueChange={(value) => setFieldValue('sex', value)}
                        />
                      </View>
                      {touched.sex && errors.sex && (
                        <Text style={styles.errorText}>{errors.sex}</Text>
                      )}
                    </View>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Medication</Text>
                    <View style={styles.inputWrapper}>
                      <TextInput
                        style={styles.input}
                        placeholder="Medication1, Medication2, Medication3"
                        placeholderTextColor="#999999"
                        value={values.medication}
                        onChangeText={handleChange('medication')}
                        onBlur={handleBlur('medication')}
                      />
                      <TouchableOpacity style={styles.micButton}>
                        <Ionicons name="mic-outline" color={color.textColor} size={24} />
                      </TouchableOpacity>
                    </View>
                    {touched.medication && errors.medication && (
                      <Text style={styles.errorText}>{errors.medication}</Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Describe in detail</Text>
                    <View style={[styles.inputWrapper, { height: 120, alignItems: 'flex-start' }]}>
                      <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Type here..."
                        placeholderTextColor="#999999"
                        value={values.describe}
                        onChangeText={handleChange('describe')}
                        onBlur={handleBlur('describe')}
                        multiline
                      />
                      <TouchableOpacity style={[styles.micButton, { alignSelf: 'flex-start' }]}>
                        <Ionicons name="mic-outline" color={color.textColor} size={24} />
                      </TouchableOpacity>
                    </View>
                    {touched.describe && errors.describe && (
                      <Text style={styles.errorText}>{errors.describe}</Text>
                    )}
                  </View>

                  <TouchableOpacity
                    style={[styles.addButton, isLoading && styles.addButtonDisabled]}
                    onPress={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator color="#FFFFFF" />
                    ) : (
                      <Text style={styles.addButtonText}>Add</Text>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseLayout>
  );
};

export default React.memo(AddTaskScreen);

