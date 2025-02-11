"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Platform, type TextInput } from "react-native"
import * as yup from "yup"
import { storage, useAppContext } from "@src/context"
import { specialCharacters } from "@src/services/Env"
import { signupHandler } from "../../api/auth"
import { StorageKeys } from "../../constants"

const useSignUp = () => {
  const { color, navigation } = useAppContext()
  const [disabled, setDisabled] = useState(false)
  const [specialities, setSpecialities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const passwordRef = useRef<TextInput>(null)

  const fieldValidation = yup.object().shape({
    name: yup.string().required("Name is required"),
    phoneNumber: yup.string().required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(specialCharacters, "Password must contain at least one special character")
      .required("Password is required"),
    role: yup.string().required("Role is required"),
    countryCode: yup.string().required("Country code is required"),
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

  const initialValues = {
    name: "",
    phoneNumber: "",
    email: "",
    password: "",
    role: "",
    speciality: "",
    countryCode: "1", // Default to US country code
  }

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      const deviceType = Platform.OS === "ios" ? "ios" : "android"
      const fcmToken = storage.getData(StorageKeys.FCM_TOKEN)
      const data = {
        name: values.name,
        email: values.email,
        mobile_no: `+${values.countryCode}${values.phoneNumber}`,
        password: values.password,
        user_photo: null,
        gender: "male",
        address: "123 Main St",
        role: values.role,
        speciality: values.speciality,
        fcm_token: fcmToken,
        device_id: fcmToken,
        device_type: deviceType,
      }
      signupHandler(data, setDisabled, setIsLoading, navigation)
    },
    [navigation],
  )

  return {
    color,
    disabled,
    fieldValidation,
    handleSubmit,
    initialValues,
    navigation,
    passwordRef,
    specialities,
    isLoading,
  }
}
export default useSignUp

