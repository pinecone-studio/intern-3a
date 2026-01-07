import { ClubFilters, NewClubType } from './types';

export function filerClubs(clubs: NewClubType[], filters: ClubFilters) {
  return clubs.filter((club) => {
    if (filters.selectedCategory && club.clubCategoryName !== filters.selectedCategory) {
      return false;
    }

    if (filters.selectedSubCategory && club.clubSubCategoryName !== filters.selectedSubCategory) {
      return false;
    }

    if (filters.classLevels.length && !filters.classLevels.some((level) => club.selectedClassLevelNames?.includes(level))) {
      return false;
    }

    if (filters.days.length || filters.timeSlots.length) {
      const schedules = club.scheduledClubTimes;

      if (!schedules) return false;
    }

    const matchesSchedule = filters.classLevels.length ? filters.classLevels.some((level) => match)
  });
}
