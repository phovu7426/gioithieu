export enum CertificateType {
    ISO = 'iso',
    AWARD = 'award',
    LICENSE = 'license',
    CERTIFICATION = 'certification',
    OTHER = 'other',
}

export const CertificateTypeLabels: Record<CertificateType, string> = {
    [CertificateType.ISO]: 'ISO',
    [CertificateType.AWARD]: 'Giải thưởng',
    [CertificateType.LICENSE]: 'Giấy phép',
    [CertificateType.CERTIFICATION]: 'Chứng nhận',
    [CertificateType.OTHER]: 'Khác',
};

export const getCertificateTypeLabel = (value: CertificateType): string => {
    return CertificateTypeLabels[value];
};

export const getCertificateTypeArray = () => {
    return Object.values(CertificateType).map(value => ({
        id: value,
        name: value,
        value: value,
        label: getCertificateTypeLabel(value as CertificateType),
    }));
};

