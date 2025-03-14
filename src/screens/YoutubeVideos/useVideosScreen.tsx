"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useAppContext } from "@src/context"
import { useSelector } from "react-redux"
import axios from "axios"
import { Alert } from "react-native"
import { VideosListStyles } from "./videos-list.style"

export const useVideosScreen = () => {
    const { color, navigation } = useAppContext()
    const [videos, setVideos] = useState<any>([])
    const [loading, setLoading] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const [page, setPage] = useState(1)
    const [hasMoreVideos, setHasMoreVideos] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const token = useSelector((state: any) => state.auth?.isToken)

    // Use a ref to track API calls in progress
    const apiCallInProgress = useRef(false)
    // Use a ref to store the last search query to avoid duplicate calls
    const lastSearchQuery = useRef("")
    // Use a ref to track if component is mounted
    const isMounted = useRef(true)

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            isMounted.current = false
        }
    }, [])

    const fetchVideos = useCallback(
        async (query = "", pageNum = 1, append = false) => {
            // Prevent duplicate API calls
            if (apiCallInProgress.current) return

            // For pagination, check if we're fetching the same query
            if (pageNum > 1 && query !== lastSearchQuery.current) {
                setPage(1)
                pageNum = 1
                append = false
            }

            lastSearchQuery.current = query
            apiCallInProgress.current = true
            console.log("🚀 ~ apiCallInProgress:", `https://technlogics.co/api/youtube-search`, {
                params: {
                    q: query || "nursing+tutorial",
                    max_results: 10,
                    page: pageNum,
                },
                headers: {
                    Authorization: `Token ${token}`,
                },
            })
            setLoading(true)

            try {
                const response = await axios.get(`https://technlogics.co/api/youtube-search`, {
                    params: {
                        q: query || "nursing+tutorial",
                        max_results: 10,
                        page: pageNum,
                    },
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                })

                // Only update state if component is still mounted
                if (!isMounted.current) return

                if (response.data.status) {
                    const newVideos = response.data.data || []

                    if (append) {
                        setVideos((prev: any) => [...prev, ...newVideos])
                    } else {
                        setVideos(newVideos)
                    }

                    setHasMoreVideos(newVideos.length === 10) // Assuming 10 is the page size

                    if (newVideos.length === 0 && pageNum === 1) {
                        // Show message for no results on first page
                        Alert.alert("No Results", `No videos found for "${query}"`)
                    }
                } else {
                    // Handle API success but with error status
                    console.error("Failed to fetch videos:", response.data.message)
                    Alert.alert("Error", response.data.message || "Failed to fetch videos")
                    setHasMoreVideos(false)
                }
            } catch (error: any) {
                // Only update state if component is still mounted
                if (!isMounted.current) return

                console.error("Error fetching videos:", error)

                // Show user-friendly error message
                const errorMessage = error.response?.data?.message || "Failed to connect to the server"
                Alert.alert("Error", errorMessage)

                setHasMoreVideos(false)
            } finally {
                // Only update state if component is still mounted
                if (isMounted.current) {
                    setLoading(false)
                    setIsSearching(false)
                }

                // Allow new API calls
                apiCallInProgress.current = false
            }
        },
        [token],
    )

    // Initial load
    useEffect(() => {
        fetchVideos()
    }, [fetchVideos])

    // Debounced search function
    const searchVideos = useCallback(() => {
        if (searchQuery === lastSearchQuery.current && !isSearching) return

        setIsSearching(true)
        setPage(1)
        fetchVideos(searchQuery, 1, false)
    }, [fetchVideos, searchQuery, isSearching])

    // Handle search query changes with debounce
    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (searchQuery !== lastSearchQuery.current && searchQuery.trim().length > 2) {
                searchVideos()
            }
        }, 500) // 500ms debounce

        return () => clearTimeout(debounceTimeout)
    }, [searchQuery, searchVideos])

    const loadMoreVideos = useCallback(() => {
        if (!loading && hasMoreVideos && !apiCallInProgress.current) {
            const nextPage = page + 1
            setPage(nextPage)
            fetchVideos(searchQuery, nextPage, true)
        }
    }, [fetchVideos, loading, hasMoreVideos, page, searchQuery])

    // Function to retry the last search
    const retrySearch = useCallback(() => {
        fetchVideos(searchQuery, page, false)
    }, [fetchVideos, searchQuery, page])

    return {
        navigation,
        styles: VideosListStyles(color),
        videos,
        loading,
        searchQuery,
        setSearchQuery,
        page,
        hasMoreVideos,
        searchVideos,
        loadMoreVideos,
        retrySearch,
        isSearching,
    }
}

