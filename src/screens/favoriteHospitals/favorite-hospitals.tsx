import React, { useState, useEffect } from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    StyleSheet,
    Alert
} from 'react-native';
import { Text } from '@app/blueprints';
import {
    ChevronLeft,
    Star,
    Heart,
    Home,
    MessageSquare,
    Building2,
    User,
    Paperclip,
    Mic
} from 'lucide-react-native';
import { hospitalService } from '../../api/hospital';
import { FavoriteHospital } from '../../types/hospital';
import EmptyFavorites from './empty-favorites';
import { useSelector } from 'react-redux';
import Header from '@src/components/Header/Header';
import { BaseLayout } from '@src/components';

export default function FavoriteHospitalsScreen({ navigation }: any) {
    const [favorites, setFavorites] = useState<FavoriteHospital[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [toggleLoading, setToggleLoading] = useState<number | null>(null);
    const token = useSelector((state: any) => state.auth.isToken);

    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const data: any = await hospitalService.getFavoriteHospitals(token);
            console.log("🚀 ~ loadFavorites ~ data:", data)
            setFavorites(data?.results);
        } catch (error) {
            console.error('Error loading favorites:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleFavorite = async (hospitalId: number) => {
        setToggleLoading(hospitalId);
        try {
            await hospitalService.toggleFavorite(token, hospitalId);
            // Remove the hospital from favorites list
            setFavorites(prevFavorites =>
                prevFavorites.filter(fav => fav.hospital.id !== hospitalId)
            );
        } catch (error) {
            console.error('Error toggling favorite:', error);
            Alert.alert('Error', 'Failed to update favorite status');
        } finally {
            setToggleLoading(null);
        }
    };

    const renderStars = (rating: number) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                size={16}
                fill={index < rating ? '#BE0B31' : 'transparent'}
                stroke={index < rating ? '#BE0B31' : '#BE0B31'}
            />
        ));
    };


    return (
        <BaseLayout>
            <View style={styles.container}>
                {/* Header */}
                <Header onPress={() => navigation.goBack()} title="Favorite hospitals" />

                {/* Content */}
                {loading ? <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#002B49" />
                </View> : <ScrollView
                    style={styles.content}
                    contentContainerStyle={favorites.length === 0 && styles.emptyContent}
                >
                    {favorites.length === 0 ? (
                        <EmptyFavorites />
                    ) : (
                        favorites.map((favorite) => (
                            <View key={favorite?.id} style={styles.hospitalCard}>
                                <Image
                                    //@ts-ignore
                                    source={
                                        favorite?.hospital?.photo
                                            ? { uri: favorite?.hospital?.photo }
                                            : '../assets/hospital-placeholder.png'
                                    }
                                    style={styles.hospitalImage}
                                />
                                <View style={styles.hospitalInfo}>
                                    <Text style={styles.hospitalName}>
                                        {favorite?.hospital?.name}
                                    </Text>
                                    <Text style={styles.hospitalDistance}>
                                        {favorite?.hospital?.description?.length > 50
                                            ? `${favorite?.hospital?.description.substring(0, 50)}...`
                                            : favorite?.hospital?.description}
                                    </Text>
                                    <View style={styles.ratingContainer}>
                                        {renderStars(favorite?.hospital?.rating)}
                                    </View>
                                </View>
                                <TouchableOpacity
                                    style={styles.favoriteButton}
                                    onPress={() => handleToggleFavorite(favorite.hospital.id)}
                                    disabled={toggleLoading === favorite.hospital.id}
                                >
                                    {toggleLoading === favorite.hospital.id ? (
                                        <ActivityIndicator size="small" color="#C8102E" />
                                    ) : (
                                        <Heart size={24} fill="#C8102E" color="#C8102E" />
                                    )}
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </ScrollView>}
            </View>
        </BaseLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    backButton: {
        marginRight: 16,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
    },
    content: {
        flex: 1,
    },
    emptyContent: {
        flexGrow: 1,
    },
    hospitalCard: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    hospitalImage: {
        width: 88,
        height: 88,
        borderRadius: 12,
        backgroundColor: '#F0F0F0',
    },
    hospitalInfo: {
        flex: 1,
        marginLeft: 16,
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
    },
    favoriteButton: {
        padding: 8,
        marginLeft: 'auto',
    },
    inputContainer: {
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
        paddingVertical: 8,
    },
    inputActions: {
        flexDirection: 'row',
        gap: 16,
    },
    inputButton: {
        padding: 4,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

