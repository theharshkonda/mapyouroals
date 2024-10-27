import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import YouTubeIframe from 'react-native-youtube-iframe';
import axios from 'axios';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/MaterialIcons';

const JSON_URL = 'https://theharshkonda.github.io/Server002/JavaSpring.json';
const { width } = Dimensions.get('window');

const CourseScreen = () => {
  const [courseData, setCourseData] = useState(null);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [progressData, setProgressData] = useState({});
  const playerRef = useRef(null);

  useEffect(() => {
    axios.get(JSON_URL)
      .then(response => {
        setCourseData(response.data);
        const initialProgress = {};
        response.data.course.videos.forEach((video, index) => {
          initialProgress[index] = video.progress || 0;
        });
        setProgressData(initialProgress);
      })
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const openVideo = (video, index) => {
    setCurrentVideo({ ...video, index });
  };

  const updateProgress = (progress) => {
    if (currentVideo) {
      const updatedProgressData = { ...progressData, [currentVideo.index]: progress };
      setProgressData(updatedProgressData);
    }
  };

  const onStateChange = (state) => {
    if (state === 'ended') {
      updateProgress(1);
    }
  };

  const calculateOverallProgress = () => {
    if (!courseData) return 0;
    const totalVideos = courseData.course.videos.length;
    const completedVideos = Object.values(progressData).filter(p => p === 1).length;
    return completedVideos / totalVideos;
  };

  const renderVideoItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => openVideo(item, index)} style={styles.videoItem}>
      <View style={styles.videoInfo}>
        <View style={styles.videoTitleContainer}>
          <Icon 
            name={progressData[index] === 1 ? "check-circle" : "check-circle-outline"} 
            size={24} 
            color={progressData[index] === 1 ? "#4CAF50" : "#666"}
          />
          <Text style={styles.videoTitle}>{item.title}</Text>
        </View>
        <Text style={styles.videoDuration}>{item.duration}</Text>
        <Progress.Bar
          progress={progressData[index] || 0}
          width={null}
          color="#4CAF50"
          unfilledColor="#E0E0E0"
          borderColor="#BDBDBD"
          height={8}
          style={styles.progressBar}
        />
      </View>
      <Text style={styles.videoDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.titleProgressContainer}>
        <Text style={styles.courseTitle}>{courseData?.course.title}</Text>
        <View style={styles.overallProgressContainer}>
          <Progress.Circle
            size={60}
            progress={calculateOverallProgress()}
            showsText
            formatText={() => `${Math.round(calculateOverallProgress() * 100)}%`}
            color="#4CAF50"
            unfilledColor="#E0E0E0"
            borderColor="#BDBDBD"
          />
          <Text style={styles.overallProgressText}>
            {`${Object.values(progressData).filter(p => p === 1).length}/${courseData?.course.videos.length} completed`}
          </Text>
        </View>
      </View>
      {currentVideo && (
        <View style={styles.videoContainer}>
          <YouTubeIframe
            ref={playerRef}
            height={200}
            width="100%"
            videoId={currentVideo.url.split('v=')[1]}
            onReady={() => console.log('Video is ready')}
            onChangeState={onStateChange}
          />
          <Text style={styles.currentVideoTitle}>{currentVideo.title}</Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {courseData ? (
        <FlatList
          data={courseData.course.videos}
          renderItem={renderVideoItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <Progress.Circle size={50} indeterminate={true} color="#4CAF50" />
          <Text style={styles.loadingText}>Loading course data...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  listContent: {
    padding: 10,
  },
  header: {
    marginBottom: 20,
  },
  titleProgressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  courseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  overallProgressContainer: {
    alignItems: 'center',
  },
  overallProgressText: {
    marginTop: 5,
    fontSize: 12,
    color: '#666',
  },
  videoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 20,
  },
  currentVideoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: '#333',
  },
  videoItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#FFF',
    borderRadius: 8,
    elevation: 2,
  },
  videoInfo: {
    marginBottom: 10,
  },
  videoTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 10,
    flex: 1,
  },
  videoDuration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  progressBar: {
    marginTop: 5,
  },
  videoDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
});

export default CourseScreen;