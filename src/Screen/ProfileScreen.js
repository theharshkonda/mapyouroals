import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const ProfileScreen = () => {
  const [openedCourses, setOpenedCourses] = React.useState([
    { id: '1', title: 'React Native Basics', progress: 0.6 },
    { id: '2', title: 'Advanced JavaScript', progress: 0.3 },
    { id: '3', title: 'UI/UX Design Principles', progress: 0.8 },
  ]);

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${item.progress * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>{`${Math.round(item.progress * 100)}%`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Profile</Text>
      <Text style={styles.subHeader}>Opened Courses:</Text>
      <FlatList
        data={openedCourses}
        renderItem={renderCourseItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  courseItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
  progressText: {
    marginTop: 5,
    textAlign: 'right',
  },
});

export default ProfileScreen;