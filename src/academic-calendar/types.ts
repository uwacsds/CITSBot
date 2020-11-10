export interface TeachingAcademicWeek {
  type: 'teaching';
  date: Date;
  semester: number;
  week: number;
}

export interface StudyBreakAcademicWeek {
  type: 'study-break';
  date: Date;
}

export interface UnknownAcademicWeek {
  type: 'unknown';
}

export type AcademicWeek = TeachingAcademicWeek | StudyBreakAcademicWeek | UnknownAcademicWeek;

export interface AcademicCalendar {
  weeks: Record<string, AcademicWeek>;
}

export interface AcademicCalendarService {
  fetchCalendar: () => Promise<AcademicCalendar>;
}
