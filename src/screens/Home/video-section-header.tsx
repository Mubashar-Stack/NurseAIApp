import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Text } from "@app/blueprints"
import { ChevronRight } from "lucide-react-native"

interface VideoSectionHeaderProps {
    title: string
    onViewAllPress: () => void
}

const VideoSectionHeader: React.FC<VideoSectionHeaderProps> = ({ title, onViewAllPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.viewAllButton} onPress={onViewAllPress}>
                <Text style={styles.viewAllText}>View All</Text>
                <ChevronRight size={16} color="#002B49" />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    viewAllButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    viewAllText: {
        fontSize: 14,
        color: "#002B49",
        fontWeight: "500",
        marginRight: 4,
    },
})

export default VideoSectionHeader

