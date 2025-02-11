import React, { createContext, useState, useContext, useCallback } from 'react';
import Voice from '@react-native-voice/voice';
import GlobalVoiceInput from '../components/GlobalVoiceInput/GlobalVoiceInput';
import { PermissionsAndroid, Platform } from 'react-native';

interface VoiceInputContextType {
    voiceInputText: string;
    isListening: boolean;
    startVoiceInput: () => Promise<void>;
    stopVoiceInput: () => Promise<void>;
}

const VoiceInputContext = createContext<VoiceInputContextType | undefined>(undefined);

export const VoiceInputProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [voiceInputText, setVoiceInputText] = useState('');
    const [isListening, setIsListening] = useState(false);

    const requestAudioPermission = async () => {
        if (Platform.OS !== 'android') return true;

        try {
            const granted = await PermissionsAndroid.request(
                //@ts-ignore
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                    title: 'Microphone Permission',
                    message: 'This app needs access to your microphone to transcribe speech.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn(err);
            return false;
        }
    };

    const startVoiceInput = useCallback(async () => {
        setVoiceInputText('');
        try {
            const hasPermission = await requestAudioPermission();
            if (!hasPermission) {
                console.error('Microphone permission denied');
                return;
            }

            await Voice.start('en-US');
            setIsListening(true);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const stopVoiceInput = useCallback(async () => {
        try {
            await Voice.stop();
            setIsListening(false);
        } catch (e) {
            console.error(e);
        }
    }, []);

    const handleTextReceived = useCallback((text: string) => {
        setVoiceInputText(text);
        setIsListening(false);
    }, []);

    return (
        <VoiceInputContext.Provider value={{ voiceInputText, isListening, startVoiceInput, stopVoiceInput }}>
            {children}
            <GlobalVoiceInput
                onTextReceived={handleTextReceived}
                isListening={isListening}
                stopListening={stopVoiceInput}
            />
        </VoiceInputContext.Provider>
    );
};

export const useVoiceInput = () => {
    const context = useContext(VoiceInputContext);
    if (context === undefined) {
        throw new Error('useVoiceInput must be used within a VoiceInputProvider');
    }
    return context;
};

