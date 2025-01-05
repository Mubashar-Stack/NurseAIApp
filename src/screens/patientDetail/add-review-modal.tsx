import React, { useState } from 'react'
import { View, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Text } from '@app/blueprints'
import { Star, X } from 'lucide-react-native'
import { useSelector } from 'react-redux'
import { addReview } from '../../api/tasks'

interface AddReviewModalProps {
    isVisible: boolean
    onClose: () => void
    onSuccess: () => void
    patientId: number
}

export default function AddReviewModal({ isVisible, onClose, onSuccess, patientId }: AddReviewModalProps) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState('')
    const token = useSelector((state: any) => {
        console.log("🚀 ~ useMedicalHistory ~ state:", state.auth)
        return state.auth.isToken
    })

    const handleSubmit = async () => {
        if (rating === 0) {
            setError('Please select a rating')
            return
        }

        if (!comment.trim()) {
            setError('Please enter a comment')
            return
        }

        setIsSubmitting(true)
        setError('')

        try {
            await addReview(token,
                {
                    patient: patientId,
                    rating,
                    comment
                })

            onSuccess()
            onClose()
            setRating(0)
            setComment('')
        } catch (err: any) {
            setError(err?.response?.data?.message)
            console.error('Error submitting review:', err.response.data)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add Review</Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <X size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ratingContainer}>
                        <Text style={styles.label}>Rating</Text>
                        <View style={styles.starsContainer}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <TouchableOpacity
                                    key={star}
                                    onPress={() => setRating(star)}
                                >
                                    <Star
                                        size={32}
                                        fill={star <= rating ? '#BE0B31' : 'transparent'}
                                        color={star <= rating ? '#BE0B31' : '#D1D5DB'}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Comment</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Write your review here..."
                            placeholderTextColor="#666"
                            value={comment}
                            onChangeText={setComment}
                            multiline
                            numberOfLines={4}
                        />
                    </View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity
                        style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
                        onPress={handleSubmit}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.submitButtonText}>
                            {isSubmitting ? 'Submitting...' : 'Submit Review'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 24,
        width: '90%',
        maxWidth: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    closeButton: {
        padding: 4,
    },
    ratingContainer: {
        marginBottom: 24,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    starsContainer: {
        flexDirection: 'row',
        gap: 8,
    },
    inputContainer: {
        marginBottom: 24,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E5E7EB',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#000',
        textAlignVertical: 'top',
        minHeight: 100,
    },
    errorText: {
        color: '#BE0B31',
        marginBottom: 16,
    },
    submitButton: {
        backgroundColor: '#BE0B31',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonDisabled: {
        opacity: 0.5,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
})

