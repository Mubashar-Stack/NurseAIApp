import { BaseLayout } from '@src/components';
import React from 'react';
import { View, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native';
import useAddTasks from './useAddTasks';
import mainStyle from '@src/constants/MainStyles';
import { Fonts, Text } from '@app/blueprints';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { scaleWidth } from '@src/utils';
import Feather from 'react-native-vector-icons/Feather';
import { Formik } from 'formik';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropdownPicker from '@src/components/Dropdown/DropdownPicker';

const AddTaskScreen = () => {
  const { navigation, color, initialValues, fieldValidation, handleSubmit, completeTask } = useAddTasks();
  const design = mainStyle(color);

  return (
    <BaseLayout>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <View style={{ ...design.listView, width: '90%', alignSelf: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <AntDesign size={18} name={"left"} color={color?.textColor} />
              </TouchableOpacity>
              <View style={{ marginLeft: scaleWidth(10), flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="clock" color={color.textColor} size={24} />
                <View style={{ marginLeft: scaleWidth(10) }}>
                  <Text preset='h5'>Shift timing</Text>
                  <Text preset='h4'>09:00 AM - 05:00 PM</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => completeTask()}
              style={{ ...design.footerBtn, marginBottom: 0, marginVertical: 0, height: 30, width: '30%' }}
            >
              <Text preset='h4' style={{ color: color.secondaryColor, fontFamily: Fonts.Roboto_Bold }}>
                Complete Task
              </Text>
            </TouchableOpacity>
          </View>
          <View style={design.subView}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false} >
              <Formik
                initialValues={initialValues}
                validationSchema={fieldValidation}
                onSubmit={handleSubmit}
              >
                {({ handleChange, handleBlur, setFieldValue, handleSubmit, values, errors, touched }) => (
                  <TouchableOpacity activeOpacity={1} style={{ flex: 1 }}>
                    <Text preset='h1' style={{ marginBottom: 16 }}>Add Task</Text>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h2">Patient Name</Text>
                      <View style={design.textView}>
                        <TextInput
                          style={design.inputText}
                          placeholder="Type patient name"
                          placeholderTextColor={color?.textColor}
                          editable={true}
                          value={values.patientName}
                          onChangeText={handleChange('patientName')}
                          onBlur={handleBlur('patientName')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.patientName && errors.patientName && (
                        <Text style={design.errorText}>{errors.patientName}</Text>
                      )}
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <DropdownPicker
                        label="Issue"
                        options={[
                          { label: "Kidney issue", value: "Kidney issue" },
                          { label: "Stomach issue", value: "Stomach issue" },
                          { label: "Liver issue", value: "Liver issue" }
                        ]}
                        selectedValue={values.issue}
                        onValueChange={(itemValue) => setFieldValue('issue', itemValue)}
                      />
                      {touched.issue && errors.issue && (
                        <Text style={design.errorText}>{errors.issue}</Text>
                      )}
                    </View>
                    <View style={{ marginBottom: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
                      <View style={{ width: '48%' }}>
                        <DropdownPicker
                          label="Age"
                          options={[
                            { label: "10-20", value: "10-20" },
                            { label: "20-30", value: "20-30" },
                            { label: "30-40", value: "30-40" }
                          ]}
                          selectedValue={values.age}
                          onValueChange={(itemValue) => setFieldValue('age', itemValue)}
                        />
                        {touched.age && errors.age && (
                          <Text style={design.errorText}>{errors.age}</Text>
                        )}
                      </View>
                      <View style={{ width: '48%' }}>
                        <DropdownPicker
                          label="Sex"
                          options={[
                            { label: "Male", value: "Male" },
                            { label: "Female", value: "Female" },
                            { label: "Other", value: "Other" }
                          ]}
                          selectedValue={values.sex}
                          onValueChange={(itemValue) => setFieldValue('sex', itemValue)}
                        />
                        {touched.sex && errors.sex && (
                          <Text style={design.errorText}>{errors.sex}</Text>
                        )}
                      </View>
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h2">Medication</Text>
                      <View style={design.textView}>
                        <TextInput
                          style={design.inputText}
                          placeholder="Medication1, Medication2, Medication3"
                          placeholderTextColor={color?.textColor}
                          editable={true}
                          value={values.medication}
                          onChangeText={handleChange('medication')}
                          onBlur={handleBlur('medication')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.medication && errors.medication && (
                        <Text style={design.errorText}>{errors.medication}</Text>
                      )}
                    </View>
                    <View style={{ marginBottom: 16 }}>
                      <Text preset="h2">Describe in detail</Text>
                      <View style={{ ...design.textView, height: 100, padding: 10, alignItems: 'flex-start' }}>
                        <TextInput
                          style={design.inputText}
                          placeholder="Type here..."
                          placeholderTextColor={color?.textColor}
                          editable={true}
                          value={values.describe}
                          onChangeText={handleChange('describe')}
                          onBlur={handleBlur('describe')}
                          blurOnSubmit={false}
                          underlineColorAndroid="transparent"
                          multiline
                        />
                        <TouchableOpacity>
                          <Ionicons name="mic-outline" color={color.textColor} size={24} />
                        </TouchableOpacity>
                      </View>
                      {touched.describe && errors.describe && (
                        <Text style={design.errorText}>{errors.describe}</Text>
                      )}
                    </View>
                    <TouchableOpacity style={design.footerBtn}
                      //@ts-ignore
                      onPress={handleSubmit}>
                      <Text style={design.footerBtnTxt}>Add</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              </Formik>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </BaseLayout>
  );
}
export default AddTaskScreen;