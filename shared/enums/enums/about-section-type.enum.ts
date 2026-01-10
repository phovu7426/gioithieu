export enum AboutSectionType {
    HISTORY = 'history',
    MISSION = 'mission',
    VISION = 'vision',
    VALUES = 'values',
    CULTURE = 'culture',
    ACHIEVEMENT = 'achievement',
    OTHER = 'other',
}

export const AboutSectionTypeLabels: Record<AboutSectionType, string> = {
    [AboutSectionType.HISTORY]: 'Lịch sử',
    [AboutSectionType.MISSION]: 'Sứ mệnh',
    [AboutSectionType.VISION]: 'Tầm nhìn',
    [AboutSectionType.VALUES]: 'Giá trị cốt lõi',
    [AboutSectionType.CULTURE]: 'Văn hóa',
    [AboutSectionType.ACHIEVEMENT]: 'Thành tựu',
    [AboutSectionType.OTHER]: 'Khác',
};

export const getAboutSectionTypeLabel = (value: AboutSectionType): string => {
    return AboutSectionTypeLabels[value];
};

export const getAboutSectionTypeArray = () => {
    return Object.values(AboutSectionType).map(value => ({
        id: value,
        name: value,
        value: value,
        label: getAboutSectionTypeLabel(value as AboutSectionType),
    }));
};

