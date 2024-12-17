import React, { useState } from 'react';
import { Modal, View, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Text } from '@app/blueprints';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface BookingModalProps {
    visible: boolean;
    onClose: () => void;
    styles: any;
    color: any;
    selectedDate: string;
    setSelectedDate: (date: string) => void;
    selectedSpecialty: string;
    setSelectedSpecialty: (specialty: string) => void;
    onConfirm: () => void;
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
}: BookingModalProps) => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [showSpecialties, setShowSpecialties] = useState(false);

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    const handleSpecialtySelect = (specialty: string) => {
        setSelectedSpecialty(specialty);
        setShowSpecialties(false);
    };

    const Calendar = ({ selectedDate, onSelectDate, styles, color }: any) => {
        const date = new Date();
        const currentMonth = date.getMonth();
        const currentYear = date.getFullYear();

        const getDaysInMonth = (month: number, year: number) => {
            return new Date(year, month + 1, 0).getDate();
        };

        const generateDays = () => {
            const daysInMonth = getDaysInMonth(currentMonth, currentYear);
            const days = [];
            for (let i = 1; i <= daysInMonth; i++) {
                days.push(i);
            }
            return days;
        };

        const formatDate = (day: number) => {
            return `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        };

        const isSelected = (day: number) => {
            return selectedDate === formatDate(day);
        };

        return (
            <View style={styles.calendar}>
                <View style={styles.calendarHeader}>
                    <Text style={styles.modalTitle}>
                        {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}
                    </Text>
                </View>
                <View style={styles.weekDaysRow}>
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => (
                        <Text key={day} style={styles.weekDay}>{day}</Text>
                    ))}
                </View>
                <View style={styles.daysGrid}>
                    {generateDays().map((day) => (
                        <TouchableOpacity
                            key={day}
                            style={[styles.dayCell, isSelected(day) && styles.selectedDay]}
                            onPress={() => onSelectDate(formatDate(day))}
                        >
                            <Text style={[
                                styles.dayText,
                                isSelected(day) && styles.selectedDayText
                            ]}>
                                {day}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };

    const SpecialtyList = ({ selectedSpecialty, onSelectSpecialty, styles, color }: any) => {
        const specialties = [
            'General',
            'Cardiology',
            'Internal Medicine',
            'Skin Specialist'
        ];

        return (
            <View style={styles.specialtyList}>
                {specialties.map((specialty) => (
                    <TouchableOpacity
                        key={specialty}
                        style={styles.specialtyItem}
                        onPress={() => onSelectSpecialty(specialty)}
                    >
                        <Text style={[styles.selectButtonText, { flex: 1 }]}>{specialty}</Text>
                        <View style={styles.radioButton}>
                            {selectedSpecialty === specialty && (
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
                                <MaterialIcons name="calendar-today" size={24} color={color.textColor} />
                                <Text style={styles.selectButtonText}>
                                    {selectedDate ? new Date(selectedDate).toLocaleDateString() : 'Select date'}
                                </Text>
                                <MaterialIcons
                                    name={showCalendar ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                    size={24}
                                    color={color.textColor}
                                />
                            </TouchableOpacity>

                            {showCalendar && (
                                <Calendar
                                    selectedDate={selectedDate}
                                    onSelectDate={handleDateSelect}
                                    styles={styles}
                                    color={color}
                                />
                            )}

                            <TouchableOpacity
                                style={styles.selectButton}
                                onPress={() => {
                                    setShowSpecialties(!showSpecialties);
                                    setShowCalendar(false);
                                }}
                            >
                                <MaterialIcons name="medical-services" size={24} color={color.textColor} />
                                <Text style={styles.selectButtonText}>
                                    {selectedSpecialty || 'Specialty'}
                                </Text>
                                <MaterialIcons
                                    name={showSpecialties ? "keyboard-arrow-up" : "keyboard-arrow-down"}
                                    size={24}
                                    color={color.textColor}
                                />
                            </TouchableOpacity>

                            {showSpecialties && (
                                <SpecialtyList
                                    selectedSpecialty={selectedSpecialty}
                                    onSelectSpecialty={handleSpecialtySelect}
                                    styles={styles}
                                    color={color}
                                />
                            )}

                            <TouchableOpacity
                                style={styles.confirmButton}
                                onPress={onConfirm}
                            >
                                <Text style={styles.confirmButtonText}>Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};