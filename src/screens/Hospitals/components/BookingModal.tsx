import React, { useState, useCallback } from 'react';
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@app/blueprints';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Calendar } from 'react-native-calendars';

interface BookingModalProps {
    visible: boolean;
    onClose: () => void;
    styles: any;
    color: any;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedSpecialty: number | null;
    setSelectedSpecialty: (specialty: number | null) => void;
    onConfirm: () => void;
    specialties: Array<{
        id: number;
        name: string;
    }>;
}

export const BookingModal = ({
    visible,
    onClose,
    styles,
    color,
    selectedDate,
    setSelectedDate,
    selectedSpecialty,
    setSelectedSpecialty,
    onConfirm,
    specialties,
}: BookingModalProps) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [showSpecialties, setShowSpecialties] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    const onDayPress = useCallback((day: any) => {
        setSelectedDate(day.dateString);
        setShowCalendar(false);
    }, [setSelectedDate, selectedDate]);

    const CalendarComponent = () => (
        <View style={styles.calendarContainer}>
            <Calendar
                current={selectedDate || today}
                minDate={today}
                onDayPress={onDayPress}
                monthFormat={'MMMM yyyy'}
                hideExtraDays={true}
                disableAllTouchEventsForDisabledDays={true}
                enableSwipeMonths={true}
                markedDates={{
                    [selectedDate]: { selected: true, selectedColor: '#002B5B' }
                }}
                theme={{
                    backgroundColor: '#ffffff',
                    calendarBackground: '#ffffff',
                    textSectionTitleColor: '#b6c1cd',
                    selectedDayBackgroundColor: '#002B5B',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#002B5B',
                    dayTextColor: '#2d4150',
                    textDisabledColor: '#d9e1e8',
                    dotColor: '#002B5B',
                    selectedDotColor: '#ffffff',
                    arrowColor: '#002B5B',
                    monthTextColor: '#002B5B',
                    textDayFontSize: 16,
                    textMonthFontSize: 18,
                    textDayHeaderFontSize: 14
                }}
            />
        </View>
    );

    const SpecialtyList = ({ selectedSpecialty, onSelectSpecialty, styles, color }: any) => {
        console.log("🚀 ~ SpecialtyList ~ selectedSpecialty:", selectedSpecialty, specialties)
        return (
            <View style={styles.specialtyList}>
                {specialties.map((specialty) => (
                    <TouchableOpacity
                        key={specialty.id}
                        style={styles.specialtyItem}
                        onPress={() => {
                            setSelectedSpecialty(specialty.id);
                            onSelectSpecialty(specialty.id)
                            setShowSpecialties(false);
                        }}
                    >
                        <Text style={styles.selectButtonText}>{specialty.name}</Text>
                        <View style={styles.radioButton}>
                            {selectedSpecialty == specialty.id && (
                                <View style={styles.radioButtonSelected} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    return (
        <Modal
            visible={visible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.modalOverlay}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Book now</Text>

                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => {
                                    setShowCalendar(!showCalendar);
                                    setShowSpecialties(false);
                                }}
                            >
                                <MaterialIcons name="calendar-today" size={24} color="#002B5B" />
                                <Text style={styles.selectButtonText}>
                                    {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Select date'}
                                </Text>
                                <MaterialIcons
                                    name={showCalendar ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                    size={24}
                                    color="#002B5B"
                                />
                            </TouchableOpacity>

                            {showCalendar && <CalendarComponent />}

                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => {
                                    setShowSpecialties(!showSpecialties);
                                    setShowCalendar(false);
                                }}
                            >
                                <MaterialIcons name="medical-services" size={24} color="#002B5B" />
                                <Text style={styles.selectButtonText}>
                                    {selectedSpecialty ?
                                        specialties.find(s => s.id === selectedSpecialty)?.name :
                                        'Specialty'
                                    }
                                </Text>
                                <MaterialIcons
                                    name={showSpecialties ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                    size={24}
                                    color="#002B5B"
                                />
                            </TouchableOpacity>

                            {showSpecialties && (
                                <SpecialtyList
                                    selectedSpecialty={selectedSpecialty}
                                    onSelectSpecialty={setSelectedSpecialty}
                                    styles={styles}
                                    color={color}
                                    specialties={specialties}
                                />
                            )}

                            {(selectedDate && selectedSpecialty) && (
                                <TouchableOpacity
                                    style={styles.confirmButton}
                                    onPress={onConfirm}
                                >
                                    <Text style={styles.confirmButtonText}>Confirm</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

