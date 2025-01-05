import { Dimensions, StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

const { width, height } = Dimensions.get('window');

export const hospitalsStyles = (color: Palette) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#002A65',
  },
  inactiveTab: {
    backgroundColor: color.Tertiary,
  },
  tabText: {
    color: color.secondaryColor,
    fontSize: 16,
    fontWeight: '500',
  },
  hospitalCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  hospitalImage: {
    width: 88,
    height: 88,
    borderRadius: 12,
    marginRight: 16,
  },
  hospitalInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  hospitalDistance: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 4,
  },
  bookButton: {
    backgroundColor: '#002B49',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  star: {
    marginRight: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: color.Tertiary,
    padding: 12,
    borderRadius: 24,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    color: color.textColor,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    minHeight: 300,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
    color: '#000',
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 16,
  },
  selectButtonText: {
    flex: 1,
    marginLeft: 12,
    color: '#000',
    fontSize: 16,
  },
  confirmButton: {
    backgroundColor: '#002B5B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  calendar: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    color: '#666',
    fontSize: 12,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    height: 47,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#002B5B',
    borderRadius: 50,
  },
  dayText: {
    color: '#002B5B',
    fontSize: 15,
  },
  selectedDayText: {
    color: '#fff',
    fontSize: 15,
  },
  specialtyList: {
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  specialtyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#002B5B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#002B5B',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    padding: 5,
    borderWidth: 1,
    borderColor: color.textColor,
    borderRadius: 8,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    padding: 5,
    backgroundColor: '#002B5B',
    color: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: color.textColor,
    fontSize: 16,
    fontWeight: '500',
  },
  cancelButtonText: {
    color: color.secondaryColor,
    fontSize: 16,
    fontWeight: '500',
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  historyHospitalImage: {
    width: 80,
    height: 80,
    backgroundColor: '#D3D3D3',
  },
  historyHospitalInfo: {
    flex: 1,
    padding: 12,
  },
  historyHeaderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  historyNameSection: {
    flex: 1,
  },
  historyHospitalName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 4,
  },
  historyDistance: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  historyRatingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyStar: {
    marginRight: 2,
  },
  historyDivider: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  historyAppointmentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  historyAppointmentStatus: {
    fontSize: 14,
    color: '#000000',
  },
  historyAppointmentDate: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  historyReviewButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  historyReviewButtonText: {
    fontSize: 12,
    color: '#000000',
  },
  bookedHospitalsContainer: {
    marginVertical: 16,
  },
  bookedHospitalsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 16,
    marginBottom: 12,
  },
  horizontalCard: {
    width: 300,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 12
  },
  horizontalCardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    marginBottom: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  calendarContainer: {
    marginBottom: 16,
  },
  calendarNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  currentMonthYear: {
    fontSize: 16,
    fontWeight: '600',
    color: '#002B5B',
  },
  monthContainer: {
    width: width - 32,
    paddingHorizontal: 16,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#002B5B',
    marginBottom: 8,
    textAlign: 'center',
  },
  disabledDay: {
    opacity: 0.3,
  },
  disabledDayText: {
    color: '#999',
  },
});

