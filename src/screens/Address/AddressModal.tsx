import React, { useEffect } from 'react';
import { View, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Fonts, Text } from '@app/blueprints';
import { AddressFormData } from '../../types/address';

interface AddressModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: AddressFormData) => void;
    initialData?: AddressFormData;
    color: any;
}

const AddressModal = ({ visible, onClose, onSubmit, initialData, color }: AddressModalProps) => {
    const [formData, setFormData] = React.useState<AddressFormData>({
        title: '',
        address: '',
        city: '',
        state: '',
        postal_code: '',
        country: '',
        is_default: false,
    });

    // Update form data when initialData changes
    useEffect(() => {
        if (initialData == undefined || initialData == null) {
            setFormData({
                title: '',
                address: '',
                city: '',
                state: '',
                postal_code: '',
                country: '',
                is_default: false,
            });
        } else {
            setFormData({
                title: initialData.title || '',
                address: initialData.address || '',
                city: initialData.city || '',
                state: initialData.state || '',
                postal_code: initialData.postal_code || '',
                country: initialData.country || '',
                is_default: initialData.is_default || false,
            });

        }
    }, [initialData]);

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={[styles.modalContainer, { backgroundColor: color.backgroundColor }]}>
                <ScrollView style={styles.modalContent}>
                    <Text style={[styles.modalTitle, { color: color.textColor }]}>
                        {initialData ? 'Edit Address' : 'Add New Address'}
                    </Text>

                    <Text style={[styles.label, { color: color.textColor }]}>Title</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                            value={formData.title}
                            onChangeText={(text) => setFormData({ ...formData, title: text })}
                            placeholder="Home, Work, etc."
                            placeholderTextColor="#999"
                        />
                    </View>

                    <Text style={[styles.label, { color: color.textColor }]}>Address</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                            value={formData.address}
                            onChangeText={(text) => setFormData({ ...formData, address: text })}
                            placeholder="Street address"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <Text style={[styles.label, { color: color.textColor }]}>City</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                            value={formData.city}
                            onChangeText={(text) => setFormData({ ...formData, city: text })}
                            placeholder="City"
                            placeholderTextColor="#999"
                        />
                    </View>

                    {/* <View style={styles.row}> */}
                    <Text style={[styles.label, { color: color.textColor }]}>State</Text>
                    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                        <TextInput
                            style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                            value={formData.state}
                            onChangeText={(text) => setFormData({ ...formData, state: text })}
                            placeholder="State"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <Text style={[styles.label, { color: color.textColor }]}>Postal Code</Text>
                    <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                        <TextInput
                            style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                            value={formData.postal_code}
                            onChangeText={(text) => setFormData({ ...formData, postal_code: text })}
                            placeholder="Postal Code"
                            placeholderTextColor="#999"
                        />
                    </View>
                    {/* </View> */}

                    <Text style={[styles.label, { color: color.textColor }]}>Country</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                            value={formData.country}
                            onChangeText={(text) => setFormData({ ...formData, country: text })}
                            placeholder="Country"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[styles.checkbox, formData.is_default && styles.checkboxChecked]}
                            onPress={() => setFormData({ ...formData, is_default: !formData.is_default })}
                        />
                        <Text style={[styles.checkboxLabel, { color: color.textColor }]}>Set as default address</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.cancelButton]}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.submitButton]}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        width: '99%',
        marginTop: 10,
        flexDirection: 'row',
        alignSelf: 'center',
        borderRadius: 16,
        backgroundColor: '#E6E6E6',
        paddingHorizontal: 10,
        height: 52,
        alignItems: 'center', justifyContent: 'space-between'
    },
    label: {
        fontSize: 16,
    },
    input: {
        fontSize: 14,
        fontWeight: '400',
        color: '#000',
        width: '90%',
        fontFamily: Fonts.Roboto_Light
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: '#002A65',
        borderRadius: 4,
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: '#002A65',
    },
    checkboxLabel: {
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#E0E0E0',
    },
    submitButton: {
        backgroundColor: '#002A65',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddressModal;