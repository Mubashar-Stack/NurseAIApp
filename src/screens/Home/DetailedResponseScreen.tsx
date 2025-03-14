"use client"

import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image } from "react-native"
import { BaseLayout } from "@src/components"
import AntDesign from "react-native-vector-icons/AntDesign"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import axios from "axios"
import { useAppContext } from "@src/context"
import Clipboard from "@react-native-clipboard/clipboard"
import { showSuccessToast, showErrorToast } from "@src/utils"
import { Images } from "@src/assets"
import ConversationManager from "./ConversationManager"

const DetailedResponseScreen = ({ route }: any) => {
    const { navigation } = useAppContext()
    const [response, setResponse] = useState<string>("")
    const [isLoading, setIsLoading] = useState(true)
    const [selectedNurse, setSelectedNurse] = useState("Template")
    const message = route.params?.message

    return (
        <BaseLayout>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Image source={Images.NURSE_IMAGE} style={styles.userAvatar} />
                </View>

                {/* Nurse Selector */}
                {/* <View style={styles.nurseSelector}>
                    <Text style={styles.nurseLabel}>Nurse Name</Text>
                    <TouchableOpacity style={styles.dropdownButton}>
                        <Text style={styles.dropdownText}>{selectedNurse}</Text>
                        <MaterialIcons name="keyboard-arrow-down" size={24} color="#002B49" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.infoButton}>
                        <MaterialIcons name="info-outline" size={24} color="#002B49" />
                    </TouchableOpacity>
                </View> */}

                {/* Conversation Manager */}
                <ConversationManager initialQuestion={message} />
            </View>
        </BaseLayout>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F9FA",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#002B49",
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    backButton: {
        padding: 4,
    },
    userAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    nurseSelector: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#FFF",
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
    },
    nurseLabel: {
        fontSize: 16,
        color: "#333",
        marginRight: 12,
    },
    dropdownButton: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F8F9FA",
        padding: 8,
        borderRadius: 8,
        marginRight: 12,
    },
    dropdownText: {
        fontSize: 16,
        color: "#333",
    },
    infoButton: {
        padding: 4,
    },
    contentContainer: {
        flex: 1,
    },
    messageWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    messageContainer: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        padding: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 2,
        elevation: 1,
    },
    messageContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 12,
    },
    messageText: {
        flex: 1,
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
        marginRight: 8,
    },
    responseText: {
        fontSize: 14,
        color: "#333",
        lineHeight: 20,
    },
    timestamp: {
        fontSize: 12,
        color: "#666",
        marginLeft: 8,
    },
    messageActions: {
        flexDirection: "row",
        marginTop: 16,
        gap: 24,
    },
    loadingContainer: {
        padding: 20,
        alignItems: "center",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#002B49",
    },
    bottomNav: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 16,
        backgroundColor: "#FFF",
        borderTopWidth: 1,
        borderTopColor: "#E5E7EB",
    },
    bottomNavItem: {
        alignItems: "center",
    },
    bottomNavText: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
    },
})

export default DetailedResponseScreen

