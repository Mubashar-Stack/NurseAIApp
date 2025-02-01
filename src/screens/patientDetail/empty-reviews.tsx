import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import { Star } from 'lucide-react-native';

export default function EmptyReviews() {
    return (
        <View style={styles.container}>
            <Star size={48} color="#666" style={styles.icon} />
            <Text style={styles.title}>No Reviews Founds!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    icon: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
});

