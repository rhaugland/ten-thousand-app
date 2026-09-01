import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Fonts } from '../../constants/theme';
import { SCHEDULE } from '../../constants/data';

function UpNext() {
  const next = SCHEDULE.slice(0, 3);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionLabel}>Up Next</Text>
      {next.map((event) => (
        <View key={event.id} style={styles.eventCard}>
          <View style={styles.eventTime}>
            <Text style={styles.eventTimeText}>{event.time}</Text>
          </View>
          <View style={styles.eventInfo}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventMeta}>{event.origin} · {event.location}</Text>
          </View>
          <View style={[styles.categoryDot, { backgroundColor: categoryColor(event.category) }]} />
        </View>
      ))}
    </View>
  );
}

function categoryColor(cat: string) {
  switch (cat) {
    case 'food': return '#F59E0B';
    case 'fashion': return '#EC4899';
    case 'music': return Colors.blue;
    default: return Colors.blue;
  }
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.intro}>Bringing people together around</Text>
          <Text style={styles.pillars}>
            Food{'  '}
            <Text style={styles.dot}>·</Text>
            {'  '}Fashion{'  '}
            <Text style={styles.dot}>·</Text>
            {'  '}Music
          </Text>
        </View>

        <UpNext />

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>The Idea</Text>
          <Text style={styles.statement}>
            A festival for the things that{' '}
            <Text style={{ color: Colors.blue }}>connect</Text> all of us.
          </Text>
          <Text style={styles.sub}>
            The world is already here. Every culture in our state has a dish, a sound, and a style. Ten Thousand puts them all in one place.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.navy,
  },
  scroll: {
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  logo: {
    width: 260,
    height: 160,
    marginBottom: 20,
  },
  intro: {
    fontFamily: Fonts.bodyLight,
    fontSize: 12,
    letterSpacing: 3,
    textTransform: 'uppercase',
    color: Colors.lightBlue,
    marginBottom: 6,
  },
  pillars: {
    fontFamily: Fonts.heading,
    fontSize: 22,
    letterSpacing: 6,
    color: Colors.lightBlue,
  },
  dot: {
    color: Colors.blue,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  sectionLabel: {
    fontFamily: Fonts.heading,
    fontSize: 13,
    letterSpacing: 4,
    color: Colors.blue,
    marginBottom: 20,
  },
  statement: {
    fontFamily: Fonts.heading,
    fontSize: 32,
    lineHeight: 36,
    color: Colors.white,
    marginBottom: 16,
  },
  sub: {
    fontFamily: Fonts.bodyLight,
    fontSize: 15,
    lineHeight: 24,
    color: Colors.lightBlue,
  },
  eventCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59, 130, 246, 0.08)',
  },
  eventTime: {
    width: 75,
  },
  eventTimeText: {
    fontFamily: Fonts.heading,
    fontSize: 14,
    letterSpacing: 1,
    color: Colors.blue,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontFamily: Fonts.bodyMedium,
    fontSize: 15,
    color: Colors.white,
    marginBottom: 2,
  },
  eventMeta: {
    fontFamily: Fonts.bodyLight,
    fontSize: 12,
    color: Colors.muted,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 12,
  },
});
