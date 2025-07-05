import {StyleSheet} from 'react-native';
import {colors} from './colors';
import {dimensions} from './dimensions';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: dimensions.borderRadius,
    padding: dimensions.padding,
    margin: dimensions.margin,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: dimensions.fontSize.xxlarge,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: dimensions.margin,
  },
  subtitle: {
    fontSize: dimensions.fontSize.large,
    color: colors.text,
    textAlign: 'center',
    marginBottom: dimensions.margin,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textCenter: {
    textAlign: 'center',
  },
});
