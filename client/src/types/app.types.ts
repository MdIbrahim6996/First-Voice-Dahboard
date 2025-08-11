export interface Holiday {
    id: number;
    name: string;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface StatusChangeReason {
    item: {
        createdAt: Date;
        fromStatus: string;
        id: number;
        leadId: number;
        reason: string;
        toStatus: string;
        updatedAt: Date;
        userId: number;
    }[];
    handleClose: () => void;
}
