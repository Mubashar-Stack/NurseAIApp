import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import { Palette } from '@src/utils';

interface DeleteAccountModalProps {
    visible: boolean;
    onClose: () => void;
    onDelete: () => void;
    color: Palette;
}

const DeleteAccountModal = ({ visible, onClose, onDelete, color }: DeleteAccountModalProps) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={[styles.modalContainer, { backgroundColor: color.backgroundColor }]}>
                    <Text preset="h2" style={styles.title}>Delete your Account?</Text>
                    <Text preset="h5" style={styles.message}>
                        Are you sure you want to delete your account?
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonBorder]}
                            onPress={onDelete}
                        >
                            <Text style={[styles.buttonText, { color: color.errorText }]}>Delete</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onClose}
                        >
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    message: {
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'column',
        width: '100%',
        borderTopWidth: 0.5,
        borderTopColor: '#E5E5E5',
    },
    button: {
        paddingVertical: 12,
        alignItems: 'center',
        width: '100%',
    },
    buttonBorder: {
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E5E5',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '500',
    },
});

export default DeleteAccountModal;