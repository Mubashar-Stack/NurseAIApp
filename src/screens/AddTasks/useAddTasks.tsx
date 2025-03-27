"use client"

import { useAppContext } from "@src/context"
import { Screen } from "../../navigation/appNavigation.type"
import { useState, useCallback, useEffect } from "react"
import * as yup from "yup"
import { showErrorToast, showSuccessToast } from "@src/utils"
import { useSelector } from "react-redux"
import debounce from "lodash/debounce"

interface PatientData {
  id: number
  name: string
  email: string
  mobile_no: string
  gender: string
  address: string
}

interface Symptom {
  id: number
  name: string
}

const useAddTask = () => {
  const { color, navigation } = useAppContext()
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<PatientData[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const nurseId = useSelector((state: any) => state.auth.userInfo?.userId)
  const token = useSelector((state: any) => state.auth?.isToken)
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [isLoadingSymptoms, setIsLoadingSymptoms] = useState(false)

  // Fetch symptoms from API
  const fetchSymptoms = useCallback(async () => {
    setIsLoadingSymptoms(true)
    try {
      const response = await fetch("https://technlogics.co/api/symptoms", {
        method: "Get",
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      const data = await response.json()
      console.log("🚀 ~ fetchSymptoms ~ data:", data)
      if (data.status && Array.isArray(data.data)) {
        setSymptoms(data.data)
      } else {
        console.error("Invalid symptoms data format:", data)
      }
    } catch (error) {
      console.error("Error fetching symptoms:", error)
    } finally {
      setIsLoadingSymptoms(false)
    }
  }, [])

  // Call fetchSymptoms when component mounts
  useEffect(() => {
    fetchSymptoms()
  }, [fetchSymptoms])

  const searchPatients = useCallback(
    debounce(async (searchTerm: string) => {
      if (!searchTerm || searchTerm.length < 2) {
        setSearchResults([])
        setIsSearching(false)
        return
      }

      setIsSearching(true)
      try {
        const response = await fetch(`https://technlogics.co/api/search-user?name=${encodeURIComponent(searchTerm)}`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        const data = await response.json()
        console.log("🚀 ~ debounce ~ data:", data)
        if (data.success && data.data) {
          setSearchResults([data.data])
        } else {
          setSearchResults([])
        }
      } catch (error) {
        console.error("Error searching patients:", error)
        setSearchResults([])
      } finally {
        setIsSearching(false)
      }
    }, 300),
    [token],
  )

  const fieldValidation = yup.object().shape({
    patientName: yup.string().required("Patient name is required"),
    issue: yup.string().required("Issue is required"),
    medication: yup.string().required("Medication is required"),
    age: yup.string().required("Age is required"),
    sex: yup.string().required("Gender is required"),
    describe: yup.string().required("Task details are required"),
    patient: yup.mixed(), // Make patient optional
  })

  const initialValues = {
    patientName: "",
    issue: "",
    medication: "",
    age: "",
    sex: "",
    describe: "",
    patient: "",
  }

  const handleSubmit = useCallback(
    async (values: typeof initialValues) => {
      console.log("🚀 ~ values:", values)
      try {
        setIsLoading(true)

        // Prepare the request payload based on whether a patient is selected or just a name is typed
        const payload = values.patient
          ? {
            // If patient is selected from dropdown
            patient: Number(values.patient),
            patient_name: values?.patientName,
            gender: values.sex,
            issue: values.issue,
            age: Number.parseInt(values.age),
            medication: values.medication,
            task_details: values.describe,
            nurse: nurseId,
          }
          : {
            // If only patient name is typed
            patient_name: values.patientName,
            gender: values.sex,
            issue: values.issue,
            age: Number.parseInt(values.age),
            medication: values.medication,
            task_details: values.describe,
            nurse: nurseId,
          }

        // Use the direct API endpoint instead of the createTask function
        const response = await fetch("https://technlogics.co/api/create-task", {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: "Token b9b28943d8e92fa4e77c8fa26da4bfdef0d48f78",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })

        const data = await response.json()
        console.log("🚀 ~ data:", data)

        if (data.status) {
          showSuccessToast("Task created successfully", 2000)
          navigation.navigate(Screen.TASK_LIST)
        } else {
          showErrorToast(data.message || "Failed to create task", 2000)
        }
      } catch (error: any) {
        console.error("Error creating task:", error)
        showErrorToast(error?.message || "Failed to create task", 2000)
      } finally {
        setIsLoading(false)
      }
    },
    [navigation, nurseId],
  )

  const completeTask = () => {
    navigation.navigate(Screen.COMPLETE_TASKS)
  }

  return {
    color,
    navigation,
    initialValues,
    fieldValidation,
    handleSubmit,
    completeTask,
    isLoading,
    searchPatients,
    searchResults,
    isSearching,
    setSearchResults,
    symptoms,
    isLoadingSymptoms,
    fetchSymptoms,
  }
}

export default useAddTask

