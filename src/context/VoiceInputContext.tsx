import React, { createContext, useState, useContext, useCallback } from 'react';
import Voice from '@react-native-voice/voice';
import GlobalVoiceInput from '../components/GlobalVoiceInput/GlobalVoiceInput';

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

    const startVoiceInput = useCallback(async () => {
        setVoiceInputText('')
        try {
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

