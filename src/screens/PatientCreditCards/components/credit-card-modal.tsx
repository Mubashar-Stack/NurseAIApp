import React, { useEffect, useState } from 'react';
import { View, Modal, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Text } from '@app/blueprints';
import { CreditCardFormData } from '../../../types/credit-card';

interface CreditCardModalProps {
    visible: boolean;
    onClose: () => void;
    onSubmit: (data: CreditCardFormData) => void;
    initialData?: CreditCardFormData;
    color: any;
}

const CreditCardModal = ({ visible, onClose, onSubmit, initialData, color }: CreditCardModalProps) => {
    const [formData, setFormData] = useState<CreditCardFormData>({
        cardholder_name: '',
        card_number: '',
        expiration_month: null,
        expiration_year: null,
        card_type: 'Visa',
        token: `token-${Math.random().toString(36).substr(2, 9)}`,
        is_default: false,
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                cardholder_name: '',
                card_number: '',
                expiration_month: null,
                expiration_year: null,
                card_type: 'Visa',
                token: `token-${Math.random().toString(36).substr(2, 9)}`,
                is_default: false,
            });
        }
    }, [initialData]);

    const handleSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={[styles.modalContainer, { backgroundColor: color.backgroundColor }]}>
                <ScrollView style={styles.modalContent}>
                    <Text style={[styles.modalTitle, { color: color.textColor }]}>
                        {initialData ? 'Edit Card' : 'Add New Card'}
                    </Text>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: color.textColor }]}>Cardholder Name</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                            value={formData.cardholder_name}
                            onChangeText={(text) => setFormData({ ...formData, cardholder_name: text })}
                            placeholder="John Doe"
                            placeholderTextColor="#999"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={[styles.label, { color: color.textColor }]}>Card Number</Text>
                        <TextInput
                            style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                            value={formData.card_number}
                            onChangeText={(text) => setFormData({ ...formData, card_number: text })}
                            placeholder="**** **** **** ****"
                            placeholderTextColor="#999"
                            keyboardType="numeric"
                            maxLength={19}
                        />
                    </View>

                    <View style={styles.row}>
                        <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                            <Text style={[styles.label, { color: color.textColor }]}>Expiry Month</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                                value={formData?.expiration_month?.toString()}
                                onChangeText={(text) => setFormData({ ...formData, expiration_month: parseInt(text) || 1 })}
                                placeholder="MM"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                maxLength={2}
                            />
                        </View>

                        <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                            <Text style={[styles.label, { color: color.textColor }]}>Expiry Year</Text>
                            <TextInput
                                style={[styles.input, { backgroundColor: color.inputBackground, color: color.textColor }]}
                                value={formData?.expiration_year?.toString()}
                                onChangeText={(text) => setFormData({ ...formData, expiration_year: parseInt(text) || new Date().getFullYear() })}
                                placeholder="YYYY"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                maxLength={4}
                            />
                        </View>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={[styles.checkbox, formData.is_default && styles.checkboxChecked]}
                            onPress={() => setFormData({ ...formData, is_default: !formData.is_default })}
                        />
                        <Text style={[styles.checkboxLabel, { color: color.textColor }]}>Set as default card</Text>
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
        maxHeight: '65%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        padding: 12,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
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

export default CreditCardModal;

