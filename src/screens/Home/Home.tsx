import React from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BaseLayout } from '@src/components';
import mainStyle from '@src/constants/MainStyles';
import { useColor } from '@src/context';
import { Text } from '@app/blueprints';
import { scaleHeight } from '@src/utils';
interface UpdateCardProps {
  title: string;
  description: string;
};

const Home: React.FC = () => {
  const { color } = useColor();
  const design = mainStyle(color);

  const UpdateCard: React.FC<UpdateCardProps> = ({ title, description }) => {
    return (
      <View style={styles.updateCard}>
        <Text preset='h3'>{title}</Text>
        <Text preset='h4'>{description}</Text>
        <TouchableOpacity style={styles.readMoreButton}>
          <Text style={styles.readMoreText}>Read more</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const VideoThumbnail: React.FC = () => (
    <View style={styles.videoThumbnail}>
      <AntDesign name="playcircleo" size={24} color={color?.textColor} />
    </View>
  );
  return (
    <BaseLayout>
      <View style={design.mainView}>
        <View style={design.headerView}>
          <View style={styles.locationSection}>
            <Feather name={'map-pin'} size={24} color={color?.textColor} />
            <View>
              <Text preset="h2" style={styles.locationText}>Location</Text>
              <Text preset="h4" style={styles.locationText}>Location of Nurse will be here</Text>
            </View>
          </View>
          <Ionicons name={'notifications-outline'} size={24} color={color.textColor} />
        </View>
        <View style={design.subView}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.welcomeSection}>
              <View style={styles.avatar} />
              <View>
                <Text preset='h2'>Welcome</Text>
                <Text preset='h4'>Name of Nurse</Text>
              </View>
            </View>
            <TouchableOpacity style={design.footerBtn}>
              <Text style={design.footerBtnTxt}>Check in</Text>
            </TouchableOpacity>
            <Text preset='h2' style={styles.sectionTitle}>New Updates</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              <UpdateCard title="20% OFF" description="Updates will be here" />
              <UpdateCard title="20% OFF" description="Updates will be here" />
              <UpdateCard title="20% OFF" description="Updates will be here" />
            </ScrollView>
            <Text preset='h2' style={styles.sectionTitle}>Recommended Videos</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
              <VideoThumbnail />
              <VideoThumbnail />
              <VideoThumbnail />
            </ScrollView>
          </ScrollView>
        </View>
      </View>
    </BaseLayout>
  );
};

const styles = StyleSheet.create({
  locationSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 10,
  },
  welcomeSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e0e0e0',
    marginRight: 16,
  },
  sectionTitle: {
    marginTop: scaleHeight(20),
  },
  horizontalScroll: {
    paddingVertical: scaleHeight(14),
  },
  updateCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginRight: 16,
    width: 200,
  },
  readMoreButton: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 4,
    marginVertical: scaleHeight(10),
    alignSelf: 'flex-start',
  },
  readMoreText: {
    color: '#fff',
    fontSize: 12,
  },
  videoThumbnail: {
    width: 150,
    height: 100,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Home;