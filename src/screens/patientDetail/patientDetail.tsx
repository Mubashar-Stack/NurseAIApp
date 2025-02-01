import React, { useState, useEffect } from 'react'
import { View, Image, TouchableOpacity, ScrollView, ActivityIndicator, SafeAreaView, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform } from 'react-native'
import { Text } from '@app/blueprints'
import { BaseLayout } from '@src/components'
import { StyleSheet } from 'react-native'
import { Star, MessageCircle, Home, MessageSquare, ClipboardList, User } from 'lucide-react-native'
import AddReviewModal from './add-review-modal'
import ChatModal from './chat-modal'
import { fetchPatientData, fetchReviews, PatientData, Review } from '../../api/tasks'
import { useSelector } from 'react-redux'
import { Icons } from '@src/assets'
import Header from '@src/components/Header/Header'
import { useAppContext, useColor } from '@src/context'
import EmptyReviews from './empty-reviews'


export default function PatientProfile(props: any) {
    const { taskId } = props?.route?.params;
    console.log("🚀 ~ PatientProfile ~ taskId:", taskId)
    const { navigation } = useAppContext();
    const { color } = useColor();
    const [activeTab, setActiveTab] = useState('about')
    const [reviews, setReviews] = useState<Review[]>([])
    const [patientData, setPatientData] = useState<any | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isReviewModalVisible, setIsReviewModalVisible] = useState(false)
    const [isChatModalVisible, setIsChatModalVisible] = useState(false)
    const nurseId = useSelector((state: any) => state.auth.userInfo?.userId);
    const token = useSelector((state: any) => {
        return state.auth.isToken
    })

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true)
            try {

                if (activeTab === 'about') {
                    const data: any = await fetchPatientData(token, taskId)
                    setPatientData(data?.data)
                }
                if (activeTab === 'reviews') {
                    console.log("🚀 ~ loadData ~ token, nurseId:", token, nurseId)
                    const reviewsData = await fetchReviews(token, nurseId)
                    console.log("🚀 ~ loadData ~ reviewsData:", reviewsData)
                    setReviews(reviewsData)
                }
            } catch (error: any) {
                console.error('Error fetching data:', error.response.data)
            } finally {
                setIsLoading(false)
            }
        }
        loadData()
    }, [taskId, activeTab])

    const renderStars = (rating: number) => {
        return (
            <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                        key={star}
                        size={16}
                        fill={star <= rating ? '#C8102E' : 'transparent'}
                        stroke={star <= rating ? '#C8102E' : '#D1D5DB'}
                    />
                ))}
            </View>
        )
    }

    // if (isLoading) {
    //     return (
    //         <BaseLayout>
    //             <View style={styles.loadingContainer}>
    //                 <ActivityIndicator size="large" color="#C8102E" />
    //             </View>
    //         </BaseLayout>
    //     )
    // }

    return (
        <BaseLayout>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView style={styles.mainView} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <Header onPress={() => navigation.goBack()} title="Patient Detail" />

                    <View style={styles.container}>
                        {/* Profile Header */}
                        <View style={styles.header}>
                            <Image
                                source={{ uri: 'https://technlogics.co/api' + patientData?.patient_photo }}
                                style={styles.avatar}
                            />
                            <Text style={styles.name}>{patientData?.patient_name || 'Patient 1'}</Text>
                            <Text style={styles.age}>{patientData?.age || 18} years</Text>
                        </View>

                        {/* Tabs */}
                        <View style={styles.tabContainer}>
                            <TouchableOpacity
                                style={[styles.tab, activeTab === 'about' && styles.activeTab]}
                                onPress={() => setActiveTab('about')}
                            >
                                <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
                                    About
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
                                onPress={() => setActiveTab('reviews')}
                            >
                                <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
                                    Reviews
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Content */}
                        <ScrollView style={styles.content}>
                            {activeTab === 'about' ? (
                                <View>
                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Medical History</Text>
                                        <Text style={styles.sectionText}>
                                            {patientData?.medical_history?.map((history: any) => history.issue)?.join(', ')}

                                        </Text>
                                    </View>

                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Medication</Text>
                                        <Text style={styles.sectionText}>
                                            {patientData?.medication}
                                        </Text>
                                    </View>

                                    <View style={styles.section}>
                                        <Text style={styles.sectionTitle}>Location</Text>
                                        <Text style={styles.sectionText}>
                                            {patientData?.patient_address}
                                        </Text>
                                    </View>


                                </View>
                            ) : (
                                <View>
                                    {reviews?.length > 0 ? reviews?.map((review, index) => (
                                        <View key={review?.id || index} style={styles.reviewItem}>
                                            <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'center' }}>
                                                <Text style={styles.reviewerName}>
                                                    {review?.nurse?.name || `Nurse ${index + 1}`}
                                                </Text>
                                                <Text style={styles.reviewDate}>
                                                    {`Date: ${new Date().toLocaleDateString('en-US', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}`}
                                                </Text>
                                            </View>
                                            <Text style={styles.reviewText}>
                                                {review?.comment}
                                            </Text>
                                            {renderStars(review?.rating || 4)}
                                        </View>
                                    )) : <EmptyReviews />}

                                </View>
                            )}
                        </ScrollView>

                        <View style={styles.fixedButtonContainer}>
                            {activeTab === 'about' ? (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => setIsChatModalVisible(true)}
                                >
                                    <Text style={styles.actionButtonText}>Chat</Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={styles.actionButton}
                                    onPress={() => setIsReviewModalVisible(true)}
                                >
                                    <Text style={styles.actionButtonText}>Add Review</Text>
                                </TouchableOpacity>
                            )}
                        </View>

                    </View>

                    <AddReviewModal
                        isVisible={isReviewModalVisible}
                        onClose={() => setIsReviewModalVisible(false)}
                        onSuccess={() => fetchReviews(token, patientData?.nurse || 0)}
                        patientId={36}
                    />

                    <ChatModal
                        isVisible={isChatModalVisible}
                        onClose={() => setIsChatModalVisible(false)}
                        receiverId={patientData?.patient || 0}
                    />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </BaseLayout>

    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        // backgroundColor: color.backgroundColor,
        margin: 0,
        height: '100%',
    },
    headerView: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 14,
    },
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F5F5',
    },
    avatar: {
        width: 90,
        height: 90,
        objectFit: 'cover',
        borderRadius: 50,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#E6E6E6',
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    age: {
        fontSize: 16,
        color: '#666',
    },
    tabContainer: {
        flexDirection: 'row',
        padding: 8,
        backgroundColor: '#D9D9D9',
        marginHorizontal: 16,
        marginVertical: 15,
        borderRadius: 25,
    },
    tab: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 20,
    },
    activeTab: {
        backgroundColor: '#C8102E',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#fff',
    },
    content: {
        flex: 1,
        padding: 16,
        backgroundColor: "#E6E6E6",
    },
    section: {
        marginBottom: 24,
    },
    fixedButtonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 16,
        backgroundColor: '#E6E6E6',
        borderTopWidth: 1,
        borderTopColor: '#D9D9D9',
    },
    actionButton: {
        backgroundColor: '#002B49',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#000',
    },
    sectionText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    reviewItem: {
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#E6E6E6',
        width: 800
    },
    reviewerName: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    reviewDate: {
        fontSize: 14,
        color: '#666',
        marginHorizontal: 175,
        marginBottom: 7
    },
    starsContainer: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 4,
    },
    reviewText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addReviewButton: {
        backgroundColor: '#002B49',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 90,
    },
    addReviewButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    chatButton: {
        backgroundColor: '#002B49',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 90,
    },
    chatButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    navItem: {
        padding: 8,
    },
})

