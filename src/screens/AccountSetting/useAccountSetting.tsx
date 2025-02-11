"use client"

import { useCallback, useState, useEffect } from "react"
import { storage, useAppContext } from "@src/context"
import { AccountSettingsStyles } from "./AccountSettings.style"
import * as yup from "yup"
import * as ImagePicker from "react-native-image-picker"
import { fetchUserProfile, updateProfilePhoto, updateUserProfile, deleteUserAccount } from "../../api/profile"
import { Alert } from "react-native"
import { useSelector, useDispatch } from "react-redux"
import store from "../../redux/store"
import { StorageKeys } from "@src/constants/storageKeys"
import { setToken, setUserInfo } from "../../redux/slices/auth"
import { Screen } from "../../navigation/appNavigation.type"
import { countryCodes } from '../../constants/countryCodes';

const parsePhoneNumber = (fullNumber: string) => {
  // Remove any spaces and ensure the number starts with '+'
  const cleanNumber = fullNumber.replace(/\s+/g, '');
  if (!cleanNumber.startsWith('+')) {
    // Default to the first country in the list if invalid format
    return {
      callingCode: countryCodes[0].dial_code.replace('+', ''),
      phoneNumber: cleanNumber,
      countryCode: countryCodes[0].code
    };
  }

  // Try to match the longest possible dial code
  let matchedCountry: any;
  let matchedPhoneNumber = cleanNumber;

  // Sort dial codes by length (longest first) to ensure we match the most specific code
  const sortedCodes = [...countryCodes].sort(
    (a, b) => b.dial_code.length - a.dial_code.length
  );

  for (const country of sortedCodes) {
    if (cleanNumber.startsWith(country.dial_code)) {
      matchedCountry = country;
      matchedPhoneNumber = cleanNumber.slice(country.dial_code.length);
      break;
    }
  }

  if (!matchedCountry) {
    matchedCountry = countryCodes[0]; // Default to first country if no match found
    matchedPhoneNumber = cleanNumber.slice(1); // Remove the '+' only
  }

  return {
    callingCode: matchedCountry.dial_code.replace('+', ''),
    phoneNumber: matchedPhoneNumber,
    countryCode: matchedCountry.code
  };
};

const useAccountSettings = () => {
  const { color, navigation } = useAppContext()
  const token = useSelector((state: any) => state.auth.isToken)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [profileData, setProfileData] = useState<any>(null)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [specialities, setSpecialities] = useState([])
  const [countryCode, setCountryCode] = useState("US")
  const [callingCode, setCallingCode] = useState("1")

  const fieldValidation = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    speciality: yup.string().required("Speciality is required"),
  })

  const fetchSpecialities = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch("https://technlogics.co/api/specialities")
      const result = await response.json()
      if (result.status && result.data) {
        setSpecialities(
          result.data.map((item: any) => ({
            label: item.name,
            value: item.id.toString(),
          })),
        )
      }
    } catch (error) {
      console.error("Error fetching specialities:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSpecialities()
  }, [fetchSpecialities])

  const loadProfile = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetchUserProfile(token)
      if (response.status && response.data) {
        console.log("🚀 ~ loadProfile ~ response.data:", response.data)
        const { name, email, mobile_no, userPhoto, gender } = response.data
        const [firstName, lastName] = name.split(" ")
        const { callingCode: parsedCallingCode, phoneNumber, countryCode: parsedCountryCode } = parsePhoneNumber(mobile_no);

        // Update the state
        setCallingCode(parsedCallingCode);
        setCountryCode(parsedCountryCode);
        setProfileData({
          firstName: firstName || "",
          lastName: lastName || "",
          email,
          phone: phoneNumber,
          gender: gender,
        })
        setProfilePhoto(userPhoto)
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load profile data")
    } finally {
      setIsLoading(false)
    }
  }, [token])

  useEffect(() => {
    loadProfile()
  }, [loadProfile])

  const handleImagePicker = useCallback(async () => {
    const options: any = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    }

    try {
      const response = await ImagePicker.launchImageLibrary(options)
      if (response.didCancel) return
      if (response.errorCode) {
        throw new Error(response.errorMessage)
      }

      const photo = response.assets?.[0]
      if (photo?.uri) {
        setIsLoading(true)
        const updateResponse = await updateProfilePhoto(token, photo.uri)
        if (updateResponse.status) {
          setProfilePhoto(updateResponse.data.user_photo)
          Alert.alert("Success", "Profile photo updated successfully")
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to update profile photo")
    } finally {
      setIsLoading(false)
    }
  }, [token])

  const handleSave = useCallback(
    async (values: any) => {
      try {
        setIsLoading(true)
        const updatedData = {
          name: `${values.firstName} ${values.lastName}`,
          mobile_no: `+${callingCode}${values.phone}`,
          email: values.email,
          gender: profileData.gender || "",
          address: profileData.address || "",
          speciality: values.speciality || "",
        }
        console.log("🚀 ~ handleSave ~ updatedData:", updatedData)
        const response = await updateUserProfile(token, updatedData)
        console.log("🚀 ~ handleSave ~ response:", response)
        if (response.status) {
          Alert.alert("Success", "Profile updated successfully")
          loadProfile() // Reload the profile data
        } else {
          throw new Error("Failed to update profile")
        }
      } catch (error) {
        Alert.alert("Error", "Failed to update profile")
      } finally {
        setIsLoading(false)
      }
    },
    [token, profileData, loadProfile, callingCode],
  )

  const handleDeletePress = useCallback(() => {
    setShowDeleteModal(true)
  }, [])

  const handleDeleteConfirm = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await deleteUserAccount(token)
      if (response.status) {
        setShowDeleteModal(false)
        store.dispatch(setUserInfo({ userId: null, email: null, role: null }))
        storage.deleteStorage(StorageKeys.USER_ID)
        storage.deleteStorage(StorageKeys.USER_TOKEN)
        store.dispatch(setToken(null))
        navigation.navigate(Screen.LOGIN)
        Alert.alert("Success", "Your account has been deleted")
      } else {
        throw new Error("Failed to delete account")
      }
    } catch (error) {
      Alert.alert("Error", "Failed to delete account")
    } finally {
      setIsLoading(false)
    }
  }, [token, navigation])

  return {
    navigation,
    styles: AccountSettingsStyles(color),
    isLoading,
    profileData,
    profilePhoto,
    fieldValidation,
    handleSave,
    handleImagePicker,
    color,
    showDeleteModal,
    setShowDeleteModal,
    handleDeletePress,
    handleDeleteConfirm,
    specialities,
    countryCode,
    setCountryCode,
    callingCode,
    setCallingCode,
  }
}

export default useAccountSettings

