import { StyleSheet } from "react-native"
import type { Palette } from "@src/utils"

export const VideosListStyles = ({ textColor }: Palette) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#F8F9FA",
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: "#fff",

        },
        backButton: {
            marginRight: 16,
        },
        headerTitle: {
            fontSize: 18,
            fontWeight: "600",
            color: "#000",
        },
        searchContainer: {
            padding: 16,
            backgroundColor: "#fff",

        },
        searchInputContainer: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#F0F0F0",
            borderRadius: 8,
            paddingHorizontal: 12,
            height: 44,
        },
        searchIcon: {
            marginRight: 8,
        },
        searchingIndicator: {
            marginLeft: 8,
        },
        searchInput: {
            flex: 1,
            height: 44,
            fontSize: 16,
            color: "#000",
        },
        listContent: {
            padding: 16,
        },
        emptyListContent: {
            flexGrow: 1,
            justifyContent: "center",
        },
        videoItem: {
            flexDirection: "row",
            marginBottom: 16,
            backgroundColor: "#fff",
            borderRadius: 8,
            overflow: "hidden",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 2,
        },
        thumbnailContainer: {
            position: "relative",
            width: 120,
            height: 90,
        },
        thumbnail: {
            width: "100%",
            height: "100%",
        },
        playIconOverlay: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.2)",
        },
        videoDetails: {
            flex: 1,
            padding: 12,
            justifyContent: "space-between",
        },
        videoTitle: {
            fontSize: 14,
            fontWeight: "600",
            color: "#000",
            marginBottom: 4,
        },
        channelTitle: {
            fontSize: 12,
            color: "#666",
        },
        loaderContainer: {
            paddingVertical: 20,
            alignItems: "center",
        },
        emptyContainer: {
            padding: 20,
            alignItems: "center",
            justifyContent: "center",
        },
        emptyText: {
            fontSize: 16,
            color: "#666",
            marginBottom: 16,
            textAlign: "center",
        },
        loadingText: {
            fontSize: 16,
            color: "#666",
            marginTop: 12,
        },
        retryButton: {
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#002B49",
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderRadius: 4,
        },
        retryIcon: {
            marginRight: 8,
        },
        retryText: {
            color: "#fff",
            fontSize: 14,
            fontWeight: "500",
        },
        paginationContainer: {
            flexDirection: "row",
            justifyContent: "center",
            padding: 16,
        },
        paginationButton: {
            paddingHorizontal: 12,
            paddingVertical: 8,
            marginHorizontal: 4,
            backgroundColor: "#002B49",
            borderRadius: 4,
        },
        paginationButtonDisabled: {
            backgroundColor: "#E5E7EB",
        },
        paginationButtonText: {
            color: "#fff",
            fontSize: 14,
        },
        paginationButtonTextDisabled: {
            color: "#666",
        },
        paginationInfo: {
            paddingHorizontal: 12,
            paddingVertical: 8,
            fontSize: 14,
            color: "#000",
        },
    })

