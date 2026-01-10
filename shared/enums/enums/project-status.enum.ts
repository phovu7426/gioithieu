export enum ProjectStatus {
    PLANNING = 'planning',
    IN_PROGRESS = 'in_progress',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled',
}

export const ProjectStatusLabels: Record<ProjectStatus, string> = {
    [ProjectStatus.PLANNING]: 'Đang lên kế hoạch',
    [ProjectStatus.IN_PROGRESS]: 'Đang thực hiện',
    [ProjectStatus.COMPLETED]: 'Hoàn thành',
    [ProjectStatus.CANCELLED]: 'Đã hủy',
};

export const ProjectStatusColors: Record<ProjectStatus, string> = {
    [ProjectStatus.PLANNING]: 'blue',
    [ProjectStatus.IN_PROGRESS]: 'yellow',
    [ProjectStatus.COMPLETED]: 'green',
    [ProjectStatus.CANCELLED]: 'red',
};

export const getProjectStatusLabel = (value: ProjectStatus): string => {
    return ProjectStatusLabels[value];
};

export const getProjectStatusColor = (value: ProjectStatus): string => {
    return ProjectStatusColors[value];
};

export const getProjectStatusArray = () => {
    return Object.values(ProjectStatus).map(value => ({
        id: value,
        name: value,
        value: value,
        label: getProjectStatusLabel(value as ProjectStatus),
        color: getProjectStatusColor(value as ProjectStatus),
    }));
};

