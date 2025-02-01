import { useState, useCallback } from 'react';
import { useAppContext } from '@src/context';
import mainStyle from '@src/constants/MainStyles';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { showErrorToast, showSuccessToast } from '@src/utils';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

export const faqData: FAQItem[] = [
    {
        id: '1',
        question: 'What is Nurse Pro Ai?',
        answer: 'Nurse Pro Ai is an advanced artificial intelligence platform designed to assist nursing professionals in their daily tasks and decision-making processes.',
    },
    {
        id: '2',
        question: 'Why choose Nurse Pro Ai?',
        answer: 'Nurse Pro Ai offers cutting-edge technology, personalized assistance, and continuous learning capabilities to enhance the efficiency and accuracy of nursing care.',
    },
    {
        id: '3',
        question: 'What are the payment methods?',
        answer: 'We accept various payment methods including credit cards, debit cards, and digital wallets. Please check our payment page for a full list of accepted methods.',
    },
];

const useHelpAndSupport = () => {
    const { color, navigation } = useAppContext();
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [query, setQuery] = useState('');
    const [subject, setSubject] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector((state: any) => state.auth?.isToken);

    const toggleExpand = (id: string) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const handleSend = useCallback(async () => {
        if (!query.trim()) {
            showErrorToast('Please enter your query', 2000);
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post(
                'https://technlogics.co/api/support-query',
                {
                    subject: subject || 'General Query',
                    message: query,
                },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.status) {
                showSuccessToast(response.data.message, 2000);
                setQuery('');
                setSubject('');
            }
        } catch (error: any) {
            console.error('Error submitting query:', error);
            showErrorToast(error?.response?.data?.message || 'Failed to submit query', 2000);
        } finally {
            setIsLoading(false);
        }
    }, [query, subject, token]);

    return {
        design: mainStyle(color),
        color,
        navigation,
        expandedId,
        query,
        subject,
        isLoading,
        setQuery,
        setSubject,
        toggleExpand,
        handleSend,
    };
};

export default useHelpAndSupport;

