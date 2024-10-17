// DropdownPicker.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { Text } from '@app/blueprints';
import { useColor } from '@src/context';
import mainStyle from '@src/constants/MainStyles';

type DropdownPickerProps = {
  label: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
};

const DropdownPicker: React.FC<DropdownPickerProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  placeholder = "Select an option",

}) => {
  const { color } = useColor();
  const design = mainStyle(color);
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View>
      <Text preset="h2">{label}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={design.textView}>
        <Text style={design.inputText}>{selectedValue || placeholder}</Text>
        <AntDesign name="down" size={16} color={color.textColor} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>{label}</Text>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => {
                onValueChange(itemValue);
                setModalVisible(false);
              }}>
              {options.map((option, index) => (
                <Picker.Item key={index} label={option.label} value={option.value} />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default DropdownPicker;
