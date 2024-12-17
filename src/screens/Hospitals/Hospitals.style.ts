import { Dimensions, StyleSheet } from 'react-native';
import { Palette } from '@src/utils';

const { height } = Dimensions.get('window');
export const hospitalsStyles = (color: Palette) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.backgroundColor,
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
    backgroundColor: '#000',
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
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hospitalImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: color.Tertiary,
  },
  hospitalInfo: {
    flex: 1,
    marginLeft: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  star: {
    marginRight: 2,
  },
  bookButton: {
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
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
    backgroundColor: color.Tertiary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    minHeight: height * 0.3,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: color.textColor,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: color.backgroundColor,
    borderRadius: 12,
    marginBottom: 16,
  },
  selectButtonText: {
    flex: 1,
    marginLeft: 12,
    color: color.textColor,
  },
  confirmButton: {
    backgroundColor: '#000',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmButtonText: {
    color: color.secondaryColor,
    fontSize: 16,
    fontWeight: '500',
  },
  calendar: {
    backgroundColor: color.Tertiary,
    padding: 16,
    marginTop: 8,
    borderRadius: 12,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  weekDaysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  weekDay: {
    width: 40,
    textAlign: 'center',
    color: color.textColor,
    opacity: 0.6,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dayCell: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedDay: {
    backgroundColor: color.Tertiary,
    borderRadius: 20,
  },
  dayText: {
    textAlign: 'center',
    color: color.textColor,
  },
  selectedDayText: {
    color: color.secondaryColor,
  },
  specialtyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: color.textColor,
  },
  specialtyList: {
    backgroundColor: color.Tertiary,
    marginTop: 8,
    borderRadius: 12,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.textColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: color.textColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  editButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: color.textColor,
    borderRadius: 8,
    marginRight: 8,
    alignItems: 'center',
  },
  cancelButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#000',
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
    backgroundColor: '#D3D3D3', // Light gray color for placeholder
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
});