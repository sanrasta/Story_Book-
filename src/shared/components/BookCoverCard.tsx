import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { semanticColors, colors } from '../theme/colors';
import { typography } from '../theme/typography';
import { spacing, layout } from '../theme/spacing';

interface BookCoverCardProps {
  /** Book title */
  title: string;
  /** Cover image source */
  coverImage?: ImageSourcePropType;
  /** Cover image URI */
  coverUri?: string;
  /** Whether the book is unlocked */
  unlocked?: boolean;
  /** Whether this book is new/unviewed */
  isNew?: boolean;
  /** Press handler */
  onPress?: () => void;
  /** Custom container style */
  style?: ViewStyle;
}

export function BookCoverCard({
  title,
  coverImage,
  coverUri,
  unlocked = false,
  isNew = false,
  onPress,
  style,
}: BookCoverCardProps): React.ReactElement {
  const imageSource = coverUri ? { uri: coverUri } : coverImage;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!onPress}
      activeOpacity={0.8}
      style={[styles.container, style]}
    >
      <View style={[styles.coverContainer, unlocked && styles.coverUnlocked]}>
        {imageSource ? (
          <Image
            source={imageSource}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.placeholderCover}>
            <Text style={styles.placeholderText}>{title.charAt(0)}</Text>
          </View>
        )}
        
        {/* Locked overlay */}
        {!unlocked && (
          <View style={styles.lockedOverlay}>
            <Text style={styles.lockIcon}>🔒</Text>
          </View>
        )}

        {/* New badge */}
        {isNew && unlocked && (
          <View style={styles.newBadge}>
            <Text style={styles.newBadgeText}>NEW</Text>
          </View>
        )}
      </View>

      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 120,
  },
  coverContainer: {
    width: 120,
    height: 180,
    borderRadius: layout.radiusMd,
    overflow: 'hidden',
    backgroundColor: semanticColors.background.tertiary,
    borderWidth: 1,
    borderColor: semanticColors.border.subtle,
  },
  coverUnlocked: {
    borderColor: colors.cosmic[500],
    shadowColor: colors.cosmic[500],
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  placeholderCover: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: semanticColors.background.secondary,
  },
  placeholderText: {
    ...typography.display.medium,
    color: colors.cosmic[500],
  },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(10, 14, 26, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lockIcon: {
    fontSize: 32,
  },
  newBadge: {
    position: 'absolute',
    top: spacing[2],
    right: spacing[2],
    backgroundColor: colors.gold[500],
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[0.5],
    borderRadius: layout.radiusSm,
  },
  newBadgeText: {
    ...typography.caption.small,
    color: semanticColors.text.inverse,
    fontWeight: '700',
  },
  title: {
    ...typography.label.small,
    color: semanticColors.text.primary,
    marginTop: spacing[2],
    textAlign: 'center',
  },
});

