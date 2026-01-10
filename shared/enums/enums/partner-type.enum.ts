export enum PartnerType {
    CLIENT = 'client',
    SUPPLIER = 'supplier',
    PARTNER = 'partner',
}

export const PartnerTypeLabels: Record<PartnerType, string> = {
    [PartnerType.CLIENT]: 'Khách hàng',
    [PartnerType.SUPPLIER]: 'Nhà cung cấp',
    [PartnerType.PARTNER]: 'Đối tác',
};

export const getPartnerTypeLabel = (value: PartnerType): string => {
    return PartnerTypeLabels[value];
};

export const getPartnerTypeArray = () => {
    return Object.values(PartnerType).map(value => ({
        id: value,
        name: value,
        value: value,
        label: getPartnerTypeLabel(value as PartnerType),
    }));
};

