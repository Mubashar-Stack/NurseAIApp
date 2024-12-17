import { useAppContext } from '@src/context';
import { useState, useCallback, useEffect } from 'react';
import { fetchCompletedTasks, Task } from '../../api/tasks';
import { showErrorToast } from '@src/utils';
import { useSelector } from 'react-redux';

const useCompleteTask = () => {
    const { color, navigation } = useAppContext();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const token = useSelector((state: any) => state.auth.isToken);

    const loadTasks = useCallback(async (showLoader = true) => {
        try {
            if (showLoader) setIsLoading(true);
            const response = await fetchCompletedTasks(token);
            if (response.status) {
                setTasks(response.data);
            } else {
                showErrorToast(response.message || 'Failed to load tasks', 2000);
            }
        } catch (error: any) {
            console.error('Error loading tasks:', error);
            showErrorToast(error?.message || 'Failed to load tasks', 2000);
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        await loadTasks(false);
        setIsRefreshing(false);
    }, [loadTasks]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    const clearAll = useCallback(() => {
        setTasks([]);
    }, []);

    return {
        color,
        navigation,
        tasks,
        isLoading,
        isRefreshing,
        handleRefresh,
        clearAll,
    };
};

export default useCompleteTask;

