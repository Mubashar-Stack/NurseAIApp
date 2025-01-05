import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '@app/blueprints';
import { CreditCard } from 'lucide-react-native';

interface EmptyTransactionsProps {
    textColor: string;
}

export default function EmptyTransactions({ textColor }: EmptyTransactionsProps) {
    return (
        <View style={styles.container}>
            <CreditCard size={48} color={textColor} style={styles.icon} />
            <Text preset="h2" style={styles.title}>No transactions yet</Text>
            <Text preset="h4" style={styles.subtitle}>Your transactions will appear here</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    icon: {
        marginBottom: 16,
    },
    title: {
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        textAlign: 'center',
        opacity: 0.7,
    },
});

