import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import { Building2 } from 'lucide-react-native';

interface EmptyHospitalsProps {
    textColor: string;
}

export default function EmptyHospitals({ textColor }: EmptyHospitalsProps) {
    return (
        <View style={styles.container}>
            <Building2 size={48} color={textColor} style={styles.icon} />
            <Text style={[styles.title, { color: textColor }]}>No hospitals found</Text>
            <Text style={[styles.subtitle, { color: textColor }]}>We couldn't find any hospitals near you</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginBottom: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        opacity: 0.7,
        textAlign: 'center',
    },
});

