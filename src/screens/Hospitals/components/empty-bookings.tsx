import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import { Calendar } from 'lucide-react-native';

export default function EmptyBookings() {
    return (
        <View style={styles.container}>
            <Calendar size={48} color="#666" style={styles.icon} />
            <Text style={styles.title}>No Bookings Founds!</Text>
            <Text style={styles.subtitle}>You haven't booked any hospitals yet</Text>
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

