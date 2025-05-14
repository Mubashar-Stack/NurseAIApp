import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface MarkdownRendererProps {
    recommendation: string
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ recommendation }) => {
    // Parse markdown recommendation
    const renderMarkdown = () => {
        if (!recommendation) return <Text>No recommendation available</Text>

        // Split recommendation into lines for processing
        const lines = recommendation.split("\n")

        return lines.map((line, index) => {
            // Handle headers
            if (line.startsWith("# ")) {
                return (
                    <Text key={index} style={styles.h1}>
                        {line.substring(2)}
                    </Text>
                )
            } else if (line.startsWith("## ")) {
                return (
                    <Text key={index} style={styles.h2}>
                        {line.substring(3)}
                    </Text>
                )
            } else if (line.startsWith("### ")) {
                return (
                    <Text key={index} style={styles.h3}>
                        {line.substring(4)}
                    </Text>
                )
            }

            // Handle bold text
            if (line.includes("**")) {
                const parts = line.split("**")
                return (
                    <Text key={index} style={styles.paragraph}>
                        {parts.map((part, i) =>
                            i % 2 === 0 ? (
                                part
                            ) : (
                                <Text key={i} style={styles.bold}>
                                    {part}
                                </Text>
                            ),
                        )}
                    </Text>
                )
            }

            // Handle italic text
            if (line.includes("*")) {
                const parts = line.split("*")
                return (
                    <Text key={index} style={styles.paragraph}>
                        {parts.map((part, i) =>
                            i % 2 === 0 ? (
                                part
                            ) : (
                                <Text key={i} style={styles.italic}>
                                    {part}
                                </Text>
                            ),
                        )}
                    </Text>
                )
            }

            // Handle lists
            if (line.startsWith("- ")) {
                return (
                    <View key={index} style={styles.listItem}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.listText}>{line.substring(2)}</Text>
                    </View>
                )
            }

            // Handle numbered lists
            if (/^\d+\.\s/.test(line)) {
                const number = line.split(".")[0]
                return (
                    <View key={index} style={styles.listItem}>
                        <Text style={styles.number}>{number}.</Text>
                        <Text style={styles.listText}>{line.substring(number.length + 2)}</Text>
                    </View>
                )
            }

            // Default paragraph
            if (line.trim()) {
                return (
                    <Text key={index} style={styles.paragraph}>
                        {line}
                    </Text>
                )
            }

            // Empty line
            return <View key={index} style={styles.emptyLine} />
        })
    }

    return <View style={styles.container}>{renderMarkdown()}</View>
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    h1: {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 10,
        color: "#000000",
    },
    h2: {
        fontSize: 20,
        fontWeight: "bold",
        marginVertical: 8,
        color: "#000000",
    },
    h3: {
        fontSize: 18,
        fontWeight: "bold",
        marginVertical: 6,
        color: "#000000",
    },
    paragraph: {
        fontSize: 16,
        lineHeight: 24,
        marginVertical: 4,
        color: "#000000",
    },
    bold: {
        fontWeight: "bold",
    },
    italic: {
        fontStyle: "italic",
    },
    listItem: {
        flexDirection: "row",
        marginVertical: 2,
        paddingLeft: 10,
    },
    bullet: {
        fontSize: 16,
        marginRight: 10,
        color: "#000000",
    },
    number: {
        fontSize: 16,
        marginRight: 10,
        color: "#000000",
    },
    listText: {
        fontSize: 16,
        flex: 1,
        color: "#000000",
    },
    emptyLine: {
        height: 12,
    },
})

export default MarkdownRenderer
