export type LoginFormType = {
    name: string;
};

export type LeadsFormInput = {
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    centre: string;
    address: string;
    city: string;
    country: string;
    pincode: string;
    password: string;
    dateOfBirth: string;
    phone: string;

    process: number;
    plan: string;
    closer: string;
    fee: number;
    currency: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    sort: string;
};
export type UpdateLeadsFormInput = {
    status: number;
    reason: string;
    title: string;
    firstName: string;
    middleName: string;
    lastName: string;
    centre: string;
    address: string;
    city: string;
    country: string;
    pincode: string;
    password: string;
    dateOfBirth: string;
    phone: string;

    fee: number;
    currency: string;
    bankName: string;
    accountName: string;
    accountNumber: string;
    sort: string;
};
